package com.stock.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.entity.Category;
import com.stock.entity.CategoryAttribute;
import com.stock.repository.CategoryAttributeRepository;
import com.stock.repository.CategoryRepository;

@RestController
@RequestMapping(value="/categories")
public class CategoryController {
	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	CategoryAttributeRepository categoryAttributeRepository;
	
	@GetMapping("")
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}
	
	@PutMapping("")
	public ResponseEntity<?> insertCategory(@RequestBody Category category) {
		categoryRepository.save(category);
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/attributes")
	public List<CategoryAttribute> getAllAttributes() {
		return categoryAttributeRepository.findAll();
	}
	
	@PutMapping("/{id}/attributes")
	public ResponseEntity<?> insertAttribute (@PathVariable String id, @RequestBody CategoryAttribute attribute) {
		Category category = categoryRepository.findOne(Long.valueOf(id));
		attribute.setCategory(category);
		categoryAttributeRepository.save(attribute);
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/{id}/attributes")
	public List<CategoryAttribute> getAttributesForCategory(@PathVariable String id) {
		Category category = categoryRepository.findOne(Long.valueOf(id));
		return category == null ? null : categoryAttributeRepository.findByCategory(category);	
	}
}
