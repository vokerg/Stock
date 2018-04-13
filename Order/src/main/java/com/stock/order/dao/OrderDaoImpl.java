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
public class OrderDaoImpl implements OrderDao{

	private static final String INSERT_STOCK_ORDER = "insert into stock_order (date, stock_id1, stock_id2, qty, operation_type_id) values (?, ?, ?, ?, ?)";
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@Override
	public List<Order> getAllOrders() {
		return jdbcTemplate.query ("select id, date, stock_id1, stock_id2, qty, operation_type_id from stock_order", 
				(rs, rownNum) -> {
					Order order = new Order();
					order.setId(rs.getInt("id"));
					order.setDate(rs.getDate("date"));
					order.setStockId(rs.getInt("stock_id1"));
					order.setStockId2(rs.getInt("stock_id2"));
					order.setQty(rs.getInt("qty"));
					order.setOperationTypeId(rs.getInt("operation_type_id"));
					return order;
				});
	}
	
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
			return statement;
		}, keyHolder);
		return (int) keyHolder.getKeys().get("id");
	}
}
