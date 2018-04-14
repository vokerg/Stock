package com.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stock.model.StockRest;

public interface StockRestRepository extends JpaRepository<StockRest, Long> {
	StockRest findByProductIdAndStockId(Integer productId, int stockId1);
}
