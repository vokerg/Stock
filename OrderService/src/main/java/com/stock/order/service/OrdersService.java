package com.stock.order.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stock.order.dao.OperationTypeDao;
import com.stock.order.dao.OrderDao;
import com.stock.order.dao.OrderDocDao;
import com.stock.order.model.Order;
import com.stock.order.model.OrderDoc;
import com.stock.order.model.SharedUser;

@Service
public class OrdersService {
	
	@Autowired
	OrderDao orderDao;
	
	@Autowired
	OrderDocDao orderDocDao;
	
	@Autowired
	OperationTypeDao operationTypeDao;

	public List<Order> getOrders(SharedUser sharedUser, String productId, String stockId, String documentId) throws AccessForbidden {
		if (!sharedUser.isAdmin()) {
			if ((sharedUser != null) && (stockId != null) && (!sharedUser.getViewstocks().contains(stockId))) {
				throw new AccessForbidden();
			}
			
			if (documentId != null) {
				OrderDoc doc = orderDocDao.getDocumentById(documentId);
				if (!sharedUser.getViewstocks().contains(String.valueOf(doc.getStockId())) && !sharedUser.getViewstocks().contains(String.valueOf(doc.getStockId2()))) {
					throw new AccessForbidden();
				}
			}
		}

		List<Order> orders = orderDao.getFilteredOrders(productId, stockId, documentId, (sharedUser != null && !sharedUser.isAdmin()) ? sharedUser.getViewstocks() : null);
		return orders;
	}

	public String validateDoc(OrderDoc doc) {
		int sign = operationTypeDao.getAll().stream().filter(op -> op.getId() == doc.getOperationTypeId()).findFirst().get().getSign();
		if (sign >= 0) {
			return "";
		}
		int stockId = doc.getStockId();
		List<Order> failedOrders = doc.getOrders().stream()
			.filter(order-> (order.getQty() > 0))
			.filter(order -> !isEnoughStockRestsForOperation(stockId, order.getQty()))
			.collect(Collectors.toList());
		return prepareFailedOrdersResult(failedOrders);
	}

	private String prepareFailedOrdersResult(List<Order> failedOrders) {
		// TODO Auto-generated method stub
		return null;
	}

	private boolean isEnoughStockRestsForOperation(int stockId, float qty) {
		// TODO Auto-generated method stub
		return true;
	}

}
