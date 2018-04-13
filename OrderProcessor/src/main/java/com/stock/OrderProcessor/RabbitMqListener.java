package com.stock.OrderProcessor;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stock.service.OrderService;

@EnableRabbit
@Component
public class RabbitMqListener {
	
	@Autowired
	OrderService orderService;
	
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
		orderService.processOrder(id);
		System.out.println(id);
	}
}
