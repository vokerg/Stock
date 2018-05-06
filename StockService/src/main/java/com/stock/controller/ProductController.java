package com.stock.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.stock.entity.Product;
import com.stock.entity.StockRest;
import com.stock.repository.ProductRepository;
import com.stock.repository.StockRestRepository;

@RestController
@RequestMapping(value="/products")
public class ProductController {
	
	@Autowired
	RestTemplate restTemplate;
	@Autowired
	ProductRepository productRepository;
	@Autowired
	StockRestRepository stockRestRepository;
	
	@GetMapping("")
	public List<Product> getAll() {
		return productRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Product getProduct(@PathVariable String id) {
		return this.productRepository.findById(Long.valueOf(id));
	}
	
	@GetMapping("/{id}/productrest")
	public List<StockRest> getProductRest(@PathVariable String id) {
		return this.stockRestRepository.findByProduct(this.productRepository.findById(Long.valueOf(id)));
	}
	
	@PutMapping("")
	public Product insertProduct(@RequestBody Product product) {
		this.productRepository.save(product);
		return product;
	}

	@PostMapping("/{id}")
	public ResponseEntity<?> updateStock(@RequestBody Product product, @PathVariable String id) {
		if (product.getId() == Long.valueOf(id)) {
			productRepository.save(product);
			return ResponseEntity.ok(null);
		}
		return ResponseEntity.badRequest().body(null);
	}
	
	@GetMapping("/{id}/orders")
	public Object getStockOrders(@PathVariable String id) {
		return restTemplate.getForObject("http://order-api/orders?productId=" + id, Object.class);
	}
		
}
