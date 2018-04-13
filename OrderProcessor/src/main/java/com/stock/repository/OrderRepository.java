package com.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stock.model.StockOrder;

public interface OrderRepository extends JpaRepository<StockOrder, Long> {
	StockOrder findById(Long id);
}
