package com.stock.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stock.model.StockOrder;
import com.stock.repository.OrderRepository;

@Component
public class OrderServiceImpl implements OrderService{
	@Autowired
	OrderRepository orderRepository;
	
	@Override
	public void processOrder(String id) {
		StockOrder order = orderRepository.findById(Long.valueOf(id));
		order.setOperationTypeId(20);
		orderRepository.save(order);
	}
}
