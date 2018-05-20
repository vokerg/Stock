package com.stock.service;

import com.stock.model.StockOrder;

public interface OrderService {

	void processOrder(String id);

	void processOrder(StockOrder order);

}
