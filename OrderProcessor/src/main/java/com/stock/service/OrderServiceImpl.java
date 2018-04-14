package com.stock.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stock.model.StockOrder;
import com.stock.model.StockRest;
import com.stock.repository.OrderRepository;
import com.stock.repository.StockRestRepository;

@Component
public class OrderServiceImpl implements OrderService{
	private static final Integer STATUS_PROCESSED = 1;

	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	StockRestRepository stockRestRepository;
	
	@Override
	public void processOrder(String id) {
		StockOrder order = getOrder(id);
		StockRest stockRest = getStockRest(order.getProductId(), order.getStockId1());
		updateStockRest(stockRest, order.getOperationTypeId(), order.getQty());
		updateOrderToProcessed(order);
	}

	private void updateStockRest(StockRest stockRest, int operationTypeId, float qty) {
		// TODO Auto-generated method stub
		
	}

	private StockRest getStockRest(Integer productId, int stockId1) {
		// TODO Auto-generated method stub
		return null;
	}

	private void updateOrderToProcessed(StockOrder order) {
		order.setStatusId(STATUS_PROCESSED);
		orderRepository.save(order);
	}

	private StockOrder getOrder(String id) {
		return orderRepository.findById(Long.valueOf(id));
	}
}
