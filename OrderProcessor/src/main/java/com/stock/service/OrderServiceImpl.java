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
		//More complicated logic should be implemented
		stockRest.setQty(stockRest.getQty() + qty);
		stockRestRepository.save(stockRest);
	}

	private StockRest getStockRest(Integer productId, int stockId1) {
		StockRest stockRest = stockRestRepository.findByProductIdAndStockId(productId, stockId1);
		if (stockRest != null) {
			return stockRest;
		}
		stockRest = new StockRest();
		stockRest.setProductId(productId);
		stockRest.setStockId(stockId1);
		stockRest.setQty(0);
		return stockRestRepository.save(stockRest);
	}

	private void updateOrderToProcessed(StockOrder order) {
		order.setStatusId(STATUS_PROCESSED);
		orderRepository.save(order);
	}

	private StockOrder getOrder(String id) {
		return orderRepository.findById(Long.valueOf(id));
	}
}
