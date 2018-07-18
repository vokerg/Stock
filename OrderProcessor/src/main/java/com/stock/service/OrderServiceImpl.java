package com.stock.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stock.model.OperationType;
import com.stock.model.StockOrder;
import com.stock.model.StockRest;
import com.stock.repository.OperationTypeRepository;
import com.stock.repository.OrderRepository;
import com.stock.repository.StockRestRepository;

@Component
public class OrderServiceImpl implements OrderService{
	private static final Integer STATUS_PROCESSED = 1;

	private static final Integer STATUS_PROCESSED_WITH_ERROR = 2;

	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	StockRestRepository stockRestRepository;
	
	@Autowired
	OperationTypeRepository operationTypeRepository;
	
	@Override
	public void processOrder(String id) throws OrderProcessingException {
		StockOrder order = getOrder(id);
		processOrder(order);
	}

	private void updateStockRest(StockRest stockRest, StockRest stockRest2, OperationType operationType, float qty) {
		stockRest.setQty(stockRest.getQty() + qty * operationType.getSign());
		stockRestRepository.save(stockRest);
		if (!operationType.isfTransfer() || stockRest2 == null) {
			return;
		}
		stockRest2.setQty(stockRest2.getQty() + qty * operationType.getSign() * (-1));
		stockRestRepository.save(stockRest2);
	}

	private StockRest getStockRest(Integer productId, Integer stockId) {
		if (stockId == null) {
			return null;
		}
		StockRest stockRest = stockRestRepository.findByProductIdAndStockId(productId, stockId);
		if (stockRest != null) {
			return stockRest;
		}
		stockRest = new StockRest();
		stockRest.setProductId(productId);
		stockRest.setStockId(stockId);
		stockRest.setQty(0);
		return stockRestRepository.save(stockRest);
	}

	private void updateOrderToProcessed(StockOrder order) {
		order.setStatusId(STATUS_PROCESSED);
		orderRepository.save(order);
	}
	
	private void updateOrderToFailed(StockOrder order) {
		order.setStatusId(STATUS_PROCESSED_WITH_ERROR);
		orderRepository.save(order);
	}

	private StockOrder getOrder(String id) {
		return orderRepository.findById(Long.valueOf(id));
	}

	@Override
	public void processOrder(StockOrder order) throws OrderProcessingException {
		try {
			OperationType operationType = operationTypeRepository.getById((long) order.getOperationTypeId());
			if (operationType.getSign() != 0) {
				StockRest stockRest1 = getStockRest(order.getProductId(), order.getStockId1());
				StockRest stockRest2 = getStockRest(order.getProductId(), order.getStockId2());
				updateStockRest(stockRest1, stockRest2, operationType, order.getQty());
			}
			updateOrderToProcessed(order);
		} catch (RuntimeException e) {
			updateOrderToFailed(order);
			throw new OrderProcessingException(e.getCause());
		}
	}

}
