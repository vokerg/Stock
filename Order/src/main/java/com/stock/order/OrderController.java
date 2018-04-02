package com.stock.order;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.order.dao.OrderDao;
import com.stock.order.model.Order;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {
	
	OrderDao orderDao;
	
	public OrderController(OrderDao orderDao) {
		super();
		this.orderDao = orderDao;
	}
	
	@GetMapping("")
	public List<Order> getOrders() {
		return orderDao.getAllOrders();
	}

}
