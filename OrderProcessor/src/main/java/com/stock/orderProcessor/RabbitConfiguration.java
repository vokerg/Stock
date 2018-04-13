package com.stock.orderProcessor;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfiguration {

	@Bean
	public AmqpAdmin amqpAdmin(ConnectionFactory connectionFactory) {
		return new RabbitAdmin(connectionFactory);
	}
	
	@Bean
	public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
		return new RabbitTemplate(connectionFactory);
	}
	
	@Bean
		public Queue myQueue1() {
		return new Queue("queue1");
	}

	@Bean
	public Queue myQueue2() {
		return new Queue("queue2");
	}
	
	@Bean
	public Queue orderAddedQueue() {
		return new Queue("orderAddedQueue");
	}
}
