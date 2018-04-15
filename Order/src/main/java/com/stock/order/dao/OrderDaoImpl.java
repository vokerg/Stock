package com.stock.order.dao;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import com.stock.order.model.Order;

@Component
public class OrderDaoImpl implements OrderDao {

	private static final String SELECT_ALL_ORDERS = "select id, date, stock_id1, stock_id2, product_id, qty, operation_type_id, status_id from stock_order";
	private static final String INSERT_STOCK_ORDER = "insert into stock_order (date, stock_id1, stock_id2, qty, operation_type_id, product_id, status_id) values (?, ?, ?, ?, ?, ?, ?)";
	private static final int STATUS_NEW = 0;
	
	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public int addOrder(Order order) {
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(connection -> {
			PreparedStatement statement =  connection.prepareStatement(INSERT_STOCK_ORDER, 
					Statement.RETURN_GENERATED_KEYS);
			statement.setDate(1, (Date) order.getDate());
			statement.setInt(2, order.getStockId());
			statement.setInt(3, order.getStockId2());
			statement.setFloat(4, order.getQty());
			statement.setInt(5, order.getOperationTypeId());
			statement.setInt(6, order.getProductId());
			statement.setInt(7, STATUS_NEW);
			return statement;
		}, keyHolder);
		return (int) keyHolder.getKeys().get("id");
	}
	
	private List<Order> getOrders(String sql) {
		return jdbcTemplate.query (SELECT_ALL_ORDERS, 
				(rs, rownNum) -> {
					Order order = new Order();
					order.setId(rs.getInt("id"));
					order.setDate(rs.getDate("date"));
					order.setStockId(rs.getInt("stock_id1"));
					order.setStockId2(rs.getInt("stock_id2"));
					order.setQty(rs.getInt("qty"));
					order.setProductId(rs.getInt("product_id"));
					order.setOperationTypeId(rs.getInt("operation_type_id"));
					order.setStatusId(rs.getInt("status_id"));
					return order;
				});
	}
	
	@Override
	public List<Order> getAllOrders() {
		return getOrders(SELECT_ALL_ORDERS);
	}
	
	@Override
	public List<Order> getOrdersByProductIdAndStockId(String productId, String stockId) {
		return getOrders(SELECT_ALL_ORDERS + " where product_id = " + productId + " and stock_id = " + stockId);
	}

	@Override
	public List<Order> getOrdersByProductId(String productId) {
		return getOrders(SELECT_ALL_ORDERS + " where product_id = " + productId);
	}

	@Override
	public List<Order> getOrdersByStock(String stockId) {
		return getOrders(SELECT_ALL_ORDERS + " where stock_id = " + stockId);
	}
}
