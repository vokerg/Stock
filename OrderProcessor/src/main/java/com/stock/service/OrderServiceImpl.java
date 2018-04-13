package com.stock.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stock.dao.OrderDao;
import com.stock.model.Order;

@Component
public class OrderServiceImpl implements OrderService{
	@Autowired
	OrderDao orderDao;
	
	@Override
	public void processOrder(String id) {
		Order order = orderDao.getOrderById(id);
		order.setOperationTypeId(20);
		orderDao.saveOrder(order);
	}
}
