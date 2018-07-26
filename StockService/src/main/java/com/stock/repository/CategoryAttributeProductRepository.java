package com.stock.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stock.entity.CategoryAttributeProduct;
import com.stock.entity.Product;

public interface CategoryAttributeProductRepository extends JpaRepository<CategoryAttributeProduct, Long>{

	List<CategoryAttributeProduct> findByProduct(Product findById);

}
