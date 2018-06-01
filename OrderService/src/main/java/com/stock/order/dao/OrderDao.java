package com.stock.order.dao;

import java.util.List;

import com.stock.order.model.Order;

public interface OrderDao {
	public List<Order> getAllOrders();
	public int addOrder(Order order);
	public List<Order> getOrdersByProductIdAndStockId(String productId, String stockId, String userId) throws AccessForbidden;
	public List<Order> getOrdersByProductId(String productId, String userId);
	public List<Order> getOrdersByStock(String stockId, String userId) throws AccessForbidden;
	public List<Order> getOrdersByDoc(int docId);
	public Order getOrderById(String id);
}
