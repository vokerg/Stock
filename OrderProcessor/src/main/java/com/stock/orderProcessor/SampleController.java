package com.stock.orderProcessor;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SampleController {
	
	@Autowired
	AmqpTemplate template;
	
	@RequestMapping("/emit")
	@ResponseBody
	String queue1() {
		template.convertAndSend("queue1", "hello from rabbitmq");
		return "Emit to queue1";
	}
	
	@RequestMapping("/emit2")
	@ResponseBody
	String queue2() {
		template.convertAndSend("queue2", "hello from rabbitmq queue2");
		return "Emit to queue 2";
	}	
}
