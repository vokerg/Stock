package com.stock.order;

import java.io.IOException;
import java.util.List;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.stock.order.dao.OrderDao;
import com.stock.order.model.Order;
import com.stock.order.model.SharedUser;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {
	
	@Autowired
	OrderDao orderDao;
	
	@Autowired
	AmqpTemplate template;
	
	@Autowired
	UserService userService;
	
	@GetMapping("/{id}")
	public Order getOrder(@PathVariable String id) {
		return orderDao.getOrderById(id);
	}
	
	@GetMapping("")
	public ResponseEntity<List<Order>> getOrders(
			@RequestHeader(value = "idUser", required = true) String idUser,
			@RequestParam(value = "productId", required = false) String productId,
			@RequestParam(value = "stockId", required = false) String stockId,
			@RequestParam(value = "paramUserId", required = false) String paramUserId
	) throws JsonParseException, JsonMappingException, IOException {
		SharedUser sharedUser = (idUser != null) ? userService.getSharedUser(idUser) : null;
		if ((idUser != null) && (sharedUser == null)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		
		if ((sharedUser != null) && (stockId != null) && (!sharedUser.getViewstocks().contains(stockId))) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		}
		
		if ((productId != null) && (stockId != null)) {
			return ResponseEntity.ok(orderDao.getOrdersByProductIdAndStockId(productId, stockId));
		}
		
		if (productId != null) {
			List<Order> orders = (sharedUser == null) ? orderDao.getOrdersByProductId(productId) : orderDao.getOrdersByProductIdAndStockList(productId, sharedUser.getViewstocks());
			return ResponseEntity.ok(orders);
		}
		
		if (stockId != null) {
			return ResponseEntity.ok(orderDao.getOrdersByStock(stockId));
		}
		List<Order> orders = (sharedUser == null) ? orderDao.getAllOrders() : orderDao.getOrdersByStockList(sharedUser.getViewstocks());
		return ResponseEntity.ok(orders);
	}
	
	@PutMapping("")
	public void addOrder(@RequestBody Order order) {
		int orderId = orderDao.addOrder(order);
		template.convertAndSend("orderAddedQueue", orderId);
	}
}
