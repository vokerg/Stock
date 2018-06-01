package com.stock.order;

import java.util.List;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stock.order.dao.AccessForbidden;
import com.stock.order.dao.OrderDao;
import com.stock.order.model.Order;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {
	
	@Autowired
	OrderDao orderDao;
	
	@Autowired
	AmqpTemplate template;
	
	@GetMapping("/{id}")
	public Order getOrder(@PathVariable String id) {
		return orderDao.getOrderById(id);
	}
	
	@GetMapping("")
	public ResponseEntity<List<Order>> getOrders(
			@RequestParam(value = "productId", required = false) String productId,
			@RequestParam(value = "stockId", required = false) String stockId,
			@RequestParam(value = "paramUserId", required = false) String paramUserId
	) {
		try {		
			if ((productId != null) && (stockId != null)) {
				return ResponseEntity.ok(orderDao.getOrdersByProductIdAndStockId(productId, stockId, paramUserId));
			}
			if (productId != null) {
				return ResponseEntity.ok(orderDao.getOrdersByProductId(productId, paramUserId));
			}
			if (stockId != null) {
				return ResponseEntity.ok(orderDao.getOrdersByStock(stockId, paramUserId));
			}
			return ResponseEntity.ok(orderDao.getAllOrders());
		} catch (AccessForbidden e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		}
	}
	
	@PutMapping("")
	public void addOrder(@RequestBody Order order) {
		System.out.println(order);
		int orderId = orderDao.addOrder(order);
		template.convertAndSend("orderAddedQueue", orderId);
	}
}
