package com.stock.orderProcessor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan( basePackages = {"com.stock.service", "com.stock.dao", "com.stock.OrderProcessor"} )
@EnableDiscoveryClient
@EntityScan( basePackages = {"com.stock.model"} )
@EnableJpaRepositories("com.stock.repository")
@Import(RabbitConfiguration.class)
public class OrderProcessorApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderProcessorApplication.class, args);
	}
}
