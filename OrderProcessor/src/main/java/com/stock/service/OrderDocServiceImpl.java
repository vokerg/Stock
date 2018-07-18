package com.stock.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.stock.model.StockOrderDoc;
import com.stock.repository.OrderDocRepository;

@Component
public class OrderDocServiceImpl implements OrderDocService{

	private static final int ORDER_DOC_PROCESSED = 1;

	private static final Integer ORDER_DOC_PROCESSED_WITH_ERROR = 2;

	@Autowired
	OrderDocRepository orderDocRepository;
	
	@Autowired
	OrderService orderService;
	
	@Override
	@Transactional
	public void processOrderDoc(String id) {
		StockOrderDoc doc = orderDocRepository.findById(Long.valueOf(id));
		doc.getOrders().stream().forEach(order -> {
			try {
				orderService.processOrder(order);
				doc.setStatusId(ORDER_DOC_PROCESSED);
			} catch (OrderProcessingException e) {
				doc.setStatusId(ORDER_DOC_PROCESSED_WITH_ERROR);
			}
		});
		orderDocRepository.save(doc);
	}

}
