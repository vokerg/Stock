package com.stock.main;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StockRunner implements CommandLineRunner{
	
	private StockRepository stockRepository;

	@Override
	public void run(String... arg0) throws Exception {
		Stream.of("Stock1", "Stock2", "Stock3").forEach(stockName -> stockRepository.save(new Stock(stockName)));
		stockRepository.findAll().stream().forEach(stock -> System.out.println(stock.getName()));		
	}

	public StockRunner(StockRepository stockRepository) {
		super();
		this.stockRepository = stockRepository;
	}
}
