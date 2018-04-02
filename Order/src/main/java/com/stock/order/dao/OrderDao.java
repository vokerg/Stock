package com.stock.order.dao;

import java.util.List;

import com.stock.order.model.Order;

public interface OrderDao {
	public List<Order> getAllOrders();
}
