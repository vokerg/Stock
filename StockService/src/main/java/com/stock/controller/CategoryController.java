package com.stock.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.entity.Category;
import com.stock.repository.CategoryRepository;

@RestController
@RequestMapping(value="/category")
public class CategoryController {
	@Autowired
	CategoryRepository categoryRepository;
	
	@GetMapping("")
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}
}
