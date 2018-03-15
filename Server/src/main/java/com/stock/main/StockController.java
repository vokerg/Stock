package com.stock.main;

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

@RestController
@RequestMapping(value = "/stocks")
public class StockController {
	private StockRepository stockRepository;
	
	public StockController(StockRepository stockRepository) {
		super();
		this.stockRepository = stockRepository;
	}
	
	@GetMapping("/")
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
