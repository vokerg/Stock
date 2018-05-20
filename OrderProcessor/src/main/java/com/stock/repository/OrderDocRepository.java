package com.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stock.model.StockOrderDoc;

public interface OrderDocRepository extends JpaRepository<StockOrderDoc, Long>{
	public StockOrderDoc findById(Long id);
}
