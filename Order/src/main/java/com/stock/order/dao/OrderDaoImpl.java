package com.stock.order.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.stock.order.model.Order;

@Component
public class OrderDaoImpl implements OrderDao{

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
}
