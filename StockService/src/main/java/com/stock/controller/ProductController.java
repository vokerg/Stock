package com.stock.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.entity.Product;
import com.stock.repository.ProductRepository;

@RestController
@RequestMapping(value="/products")
public class ProductController {
	
	ProductRepository productRepository;
	
	public ProductController(ProductRepository productRepository) {
		super();
		this.productRepository = productRepository;
	}

	@GetMapping("")
	public List<Product> getAll() {
		return productRepository.findAll();
	}

}
