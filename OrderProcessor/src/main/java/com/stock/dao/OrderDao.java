package com.stock.dao;

import com.stock.model.Order;

public interface OrderDao {
	public Order getOrderById(String id);
	public void saveOrder(Order order);

}
