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

	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	StockRestRepository stockRestRepository;
	
	@Autowired
	OperationTypeRepository operationTypeRepository;
	
	@Override
	public void processOrder(String id) {
		StockOrder order = getOrder(id);
		processOrder(order);
	}

	private void updateStockRest(StockRest stockRest, StockRest stockRest2, int operationTypeId, float qty) {
		OperationType op = operationTypeRepository.getById((long) operationTypeId);
		stockRest.setQty(stockRest.getQty() + qty * op.getSign());
		stockRestRepository.save(stockRest);
		if (!op.isfTransfer()) {
			return;
		}
		if (stockRest2 == null) {
			return;
		}
		stockRest2.setQty(stockRest2.getQty() + qty * op.getSign() * (-1));
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

	private StockOrder getOrder(String id) {
		return orderRepository.findById(Long.valueOf(id));
	}

	@Override
	public void processOrder(StockOrder order) {
		StockRest stockRest1 = getStockRest(order.getProductId(), order.getStockId1());
		StockRest stockRest2 = getStockRest(order.getProductId(), order.getStockId2());
		updateStockRest(stockRest1, stockRest2, order.getOperationTypeId(), order.getQty());
		updateOrderToProcessed(order);
		
	}
}
