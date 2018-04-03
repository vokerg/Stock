package com.stock.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.entity.Stock;
import com.stock.entity.StockRest;
import com.stock.repository.StockRepository;
import com.stock.repository.StockRestRepository;

@RestController
@RequestMapping(value = "/stocks")
public class StockController {
	private StockRepository stockRepository;
	private StockRestRepository stockRestRepository;
	
	public StockController(StockRepository stockRepository, StockRestRepository stockRestRepository) {
		super();
		this.stockRepository = stockRepository;
		this.stockRestRepository = stockRestRepository;
	}
	
	@GetMapping("")
	public List<Stock> allStocks() {
		return this.stockRepository.findAll();
	}
	
	@GetMapping("/active")
	public List<Stock> activeStocks() {
		return this.stockRepository.findAll().stream().filter(stock -> !stock.getName().equals("Stock1")).collect(Collectors.toList());
	}
	
	@GetMapping("/{id}")
	public Stock getStock(
			@PathVariable
			String id) {
		return this.stockRepository.findById(Long.valueOf(id));
	}
	
	@GetMapping("/{id}/stockrest")
	public List<StockRest> getStockRest(@PathVariable String id) {
		return this.stockRestRepository.findByStock(this.stockRepository.findById(Long.valueOf(id)));
	}
	
	@PutMapping("/")
	public void addStock(@RequestBody Stock stock) {
		stockRepository.save(stock);
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<?> updateStock(@RequestBody Stock stock, @PathVariable String id) {
		if (stock.getId() == Long.valueOf(id)) {
			stockRepository.save(stock);
			return ResponseEntity.ok(null);
		}
		return ResponseEntity.badRequest().body(null);
	}
}
