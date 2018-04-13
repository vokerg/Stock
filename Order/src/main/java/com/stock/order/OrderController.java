package com.stock.order;

import java.util.List;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.order.dao.OrderDao;
import com.stock.order.model.Order;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {
	
	OrderDao orderDao;
	
	@Autowired
	AmqpTemplate template;
	
	public OrderController(OrderDao orderDao) {
		super();
		this.orderDao = orderDao;
	}
	
	@GetMapping("")
	public List<Order> getOrders() {
		return orderDao.getAllOrders();
	}
	
	@PutMapping("")
	public void addOrder(@RequestBody Order order) {
		int orderId = orderDao.addOrder(order);
		template.convertAndSend("orderAddedQueue", orderId);
	}
}
