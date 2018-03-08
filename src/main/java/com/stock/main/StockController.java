package com.stock.main;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/stocks")
public class StockController {
	private StockRepository stockRepository;
	
	public StockController(StockRepository stockRepository) {
		super();
		this.stockRepository = stockRepository;
	}
	
	@GetMapping("/active")
	public List<Stock> activeStocks() {
		return this.stockRepository.findAll().stream().filter(stock -> !stock.getName().equals("Stock1")).collect(Collectors.toList());
	}
}
