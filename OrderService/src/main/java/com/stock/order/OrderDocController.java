package com.stock.order;

import java.util.List;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.order.dao.OrderDocDao;
import com.stock.order.model.OrderDoc;

@RestController("/docs")
public class OrderDocController {
	
	@Autowired
	OrderDocDao docDao;
	
	@Autowired
	AmqpTemplate template;
	
	@PostMapping("")
	public int addDoc(OrderDoc doc) {
		int newDocId =  docDao.addDoc(doc);
		template.convertAndSend("docAddedQueue", newDocId);
		return newDocId;
	}
	
	@GetMapping("")
	public List<OrderDoc> getAllDocs() {
		return docDao.getDocs();
	}
}
