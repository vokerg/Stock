package com.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stock.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
	Stock findById(Long id);
}
