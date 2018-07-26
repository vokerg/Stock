package com.stock.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.stock.entity.CategoryAttribute;
import com.stock.entity.CategoryAttributeProduct;
import com.stock.entity.Product;
import com.stock.entity.SharedUser;
import com.stock.entity.StockRest;
import com.stock.repository.CategoryAttributeProductRepository;
import com.stock.repository.CategoryAttributeRepository;
import com.stock.repository.ProductRepository;
import com.stock.repository.StockRestRepository;
import com.stock.service.UserService;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

	@Autowired
	RestTemplate restTemplate;

	@Autowired
	ProductRepository productRepository;

	@Autowired
	StockRestRepository stockRestRepository;

	@Autowired
	UserService userService;

	@Autowired
	CategoryAttributeRepository categoryAttributeRepository;
	
	@Autowired
	CategoryAttributeProductRepository categoryAttributeProductRepository;

	@GetMapping("")
	public List<Product> getAll() {
		return productRepository.findAll();
	}

	@GetMapping("/{id}")
	public Product getProduct(@PathVariable String id) {
		return this.productRepository.findById(Long.valueOf(id));
	}

	@GetMapping("/{id}/productrest")
	public List<StockRest> getProductRest(@RequestHeader(value = "idUser", required = true) String idUser,
			@PathVariable String id) throws JsonParseException, JsonMappingException, IOException {
		if (idUser != null) {
			SharedUser user = userService.getSharedUser(idUser);
			Product product = productRepository.findById(Long.valueOf(id));
			return user.isAdmin() 
					? stockRestRepository.findByProduct(product) 
					: stockRestRepository.findByProductAndStockIdIn(product, user.getViewstocks().stream().map(stockId -> Long.valueOf(stockId)).collect(Collectors.toList()));
		}
		return stockRestRepository.findByProduct(productRepository.findById(Long.valueOf(id)));
	}

	@PutMapping("")
	public ResponseEntity<Product> createProduct(@RequestHeader(value = "idUser", required = true) String idUser,
			@RequestBody Product product) throws JsonParseException, JsonMappingException, IOException {
		if (!userService.isAllowedToChangeProduct(idUser)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		}
		productRepository.save(product);
		return ResponseEntity.ok(product);
	}

	@PostMapping("/{id}")
	public ResponseEntity<?> updateProduct(@RequestHeader(value = "idUser", required = true) String idUser,
			@RequestBody Product product, @PathVariable String id)
			throws JsonParseException, JsonMappingException, IOException {
		if (!userService.isAllowedToChangeProduct(idUser)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
		}
		if (product.getId() == Long.valueOf(id)) {
			productRepository.save(product);
			return ResponseEntity.ok(null);
		}
		return ResponseEntity.badRequest().body(null);
	}
	
	@PostMapping("/{id}/attributes")
	public ResponseEntity<?> updateProductAttributes(@PathVariable String id, @RequestBody List<String> attributesIds) {
		Product product = productRepository.findById(Long.valueOf(id));
		List<CategoryAttributeProduct> productAttributes = categoryAttributeProductRepository.findByProduct(product);
		Map<Long, CategoryAttributeProduct> attributesMap = productAttributes.stream().collect(Collectors.toMap(element -> element.getId(), element -> element));
		attributesIds.stream().forEach(attributeId -> {
			Long idLong = Long.valueOf(attributeId);
			if (!attributesMap.containsKey(idLong)) {
				CategoryAttribute attr = categoryAttributeRepository.findOne(idLong);
				if (attr != null) {
					CategoryAttributeProduct attrProduct = new CategoryAttributeProduct();
					attrProduct.setCategoryAttribute(attr);
					attrProduct.setProduct(product);
					categoryAttributeProductRepository.save(attrProduct);
				}
			}
		});
		return ResponseEntity.ok(null);
	}

	@GetMapping("/{id}/orders")
	public Object getStockOrders(@RequestHeader(value = "idUser", required = true) String idUser, @PathVariable String id) {
		return (idUser != null) 
				? restTemplate.getForObject("http://order-api/orders?productId=" + id + "&paramUserId=" + idUser, Object.class)
				: restTemplate.getForObject("http://order-api/orders?productId=" + id, Object.class);
	}

}
