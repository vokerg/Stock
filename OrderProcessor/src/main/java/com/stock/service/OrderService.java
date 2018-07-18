package com.stock.service;

import com.stock.model.StockOrder;

public interface OrderService {

	void processOrder(String id) throws OrderProcessingException;

	void processOrder(StockOrder order) throws OrderProcessingException;

}
