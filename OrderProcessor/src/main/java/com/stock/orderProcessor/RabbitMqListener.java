package com.stock.orderProcessor;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stock.service.OrderDocService;
import com.stock.service.OrderProcessingException;
import com.stock.service.OrderService;

@EnableRabbit
@Component
public class RabbitMqListener {
	
	@Autowired
	OrderService orderService;
	
	@Autowired
	OrderDocService orderDocService;
	
	@RabbitListener(queues = "queue1")
	public void processQueue1(String message) {
		System.out.println("from listener q1: " + message);
	}
	
	@RabbitListener(queues = "queue2")
	public void processQueue2(String message) {
		System.out.println("from listener q2: " + message);
	}
	
	@RabbitListener(queues = "orderAddedQueue")
	public void processOrderAddedQueue(String id) {
		try {
			orderService.processOrder(id);
		} catch (OrderProcessingException e) {
			e.printStackTrace();
		}
	}
	
	@RabbitListener(queues = "docAddedQueue")
	public void processOrderDocAddedQueue(String id) {
		orderDocService.processOrderDoc(id);
		System.out.println(id);
	}
}
