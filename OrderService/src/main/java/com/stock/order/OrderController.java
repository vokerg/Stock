package com.stock.order;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.stock.order.dao.OrderDao;
import com.stock.order.model.Order;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {
	
	OrderDao orderDao;
	
	@Autowired
	AmqpTemplate template;
	
	@Autowired
	RestTemplate restTemplate;
	
	public OrderController(OrderDao orderDao) {
		super();
		this.orderDao = orderDao;
	}
	
	@GetMapping("/{id}")
	public Order getOrder(@PathVariable String id) {
		return orderDao.getOrderById(id);
	}
	
	@GetMapping("/authorized/{id}")
	public Order getOrderAuthorizedTest(
			@PathVariable String id, 
			@RequestHeader("Authorization") String token, 
			HttpServletResponse response) {
		//example of calling authorize logic. Should be replaced with interceptors
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		HttpEntity<String> entityReq = new HttpEntity<String>("", headers);
		ResponseEntity<Object> obj = null;
		try {
			obj = restTemplate.exchange("http://localhost:8093/authorize", HttpMethod.GET, entityReq, Object.class);	
		} catch (HttpClientErrorException e) {
			response.setStatus(e.getStatusCode().value());
			return null;
		}
		
		return orderDao.getOrderById(id);
	}
	
	@GetMapping("")
	public List<Order> getOrders(
			@RequestParam(value = "productId", required = false) String productId,
			@RequestParam(value = "stockId", required = false) String stockId
	) {
		if ((productId != null) && (stockId != null)) {
			return orderDao.getOrdersByProductIdAndStockId(productId, stockId);
		}
		if (productId != null) {
			return orderDao.getOrdersByProductId(productId);
		}
		if (stockId != null) {
			return orderDao.getOrdersByStock(stockId);
		}
		return orderDao.getAllOrders();
	}
	
	@PutMapping("")
	public void addOrder(@RequestBody Order order) {
		int orderId = orderDao.addOrder(order);
		template.convertAndSend("orderAddedQueue", orderId);
	}
}
