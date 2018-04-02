package com.stock.order;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.order.model.Order;

@RestController
@RequestMapping(value = "/orders")
public class TestController {
	@GetMapping("")
	public Order getOrder() {
		return new Order();
	}

}
