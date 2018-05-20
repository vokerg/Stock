package com.stock.orderProcessor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.stock.model.StockOrderDoc;
import com.stock.repository.OrderDocRepository;

@Component
public class AppRunner implements CommandLineRunner{

	@Autowired
	OrderDocRepository orderDocRepository;

	@Override
	//@Transactional
	public void run(String... arg0) throws Exception {
		StockOrderDoc doc = orderDocRepository.findById((long) 12);
		//System.out.println(doc.getOrders());
		
	}

}
