package com.stock.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.stock.model.StockOrderDoc;
import com.stock.repository.OrderDocRepository;

@Component
public class OrderDocServiceImpl implements OrderDocService{

	@Autowired
	OrderDocRepository orderDocRepository;
	
	@Autowired
	OrderService orderService;
	
	@Override
	@Transactional
	public void processOrderDoc(String id) {
		StockOrderDoc doc = orderDocRepository.findById(Long.valueOf(id));
		doc.getOrders().stream().forEach(order -> orderService.processOrder(order));
		doc.setStatusId(1);
		orderDocRepository.save(doc);
	}

}
