package com.stock.order.dao;


import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.stock.order.model.OrderDoc;

@Component
public class OrderDocDaoImpl implements OrderDocDao{

	private static final String SELECT_STOCK_ORDER_DOCS = 
			"SELECT d.*, s1.name as stock1_name, s2.name as stock2_name from stock_order_doc d" +
					"left join stock s1 on s1.id = d.stock_id1\n" + 
					"left join stock s2 on s2.id = d.stock_id2";

	@Autowired
	OrderDao orderDao;
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@Autowired
	OperationTypeDao operationTypeDao;
	
	@Override
	@Transactional
	public int addDoc(OrderDoc doc) {
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(connection -> {
			PreparedStatement statement = connection.prepareStatement("insert into stock_order_doc (date, stock_id1, stock_id2, operation_type_id, status_id) values (?, ?, ?, ?, ?)");
			statement.setDate(0, (Date) doc.getDate());
			statement.setInt(1, doc.getStockId());
			statement.setInt(2, doc.getStockId2());
			statement.setInt(3, doc.getOperationTypeId());
			statement.setInt(4, doc.getStatusId());
			return statement;
		}, keyHolder);
		int docId = (int) keyHolder.getKeys().get("id");
		
		doc.getOrders().stream()
			.peek(order -> order.setDocumentId(docId))
			.forEach(order -> orderDao.addOrder(order));
		return docId;
	}

	@Override
	public List<OrderDoc> getDocs() {
		return jdbcTemplate.query(SELECT_STOCK_ORDER_DOCS, (ResultSet rs, int rowNum) -> {
			OrderDoc doc = new OrderDoc();
			doc.setDate(rs.getDate("date"));
			doc.setDocumentId(rs.getInt("document_id"));
			doc.setId(rs.getInt("id"));
			doc.setOperationTypeId(rs.getInt("operation_type_id"));
			doc.setOperationTypeName(operationTypeDao.getOperationTypeName(doc.getOperationTypeId()));
			doc.setStockId(rs.getInt("stock_id1"));
			doc.setStockId2(rs.getInt("stock_id2"));
			doc.setStockName(rs.getString("stock1_name"));
			doc.setStock2Name(rs.getString("stock2_name"));
			doc.setOrders(orderDao.getOrdersByDoc(doc.getId()));
			return doc;
		});
	}

}
