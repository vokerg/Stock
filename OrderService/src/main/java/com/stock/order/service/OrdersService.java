package com.stock.order.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
