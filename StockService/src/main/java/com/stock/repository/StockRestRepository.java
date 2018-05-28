package com.stock.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stock.entity.Product;
import com.stock.entity.Stock;
import com.stock.entity.StockRest;

public interface StockRestRepository extends JpaRepository<StockRest, Long> {
	List<StockRest> findByStock(Stock stock);
	List<StockRest> findByProduct(Product product);
	List<StockRest> findByProductAndStockIdIn(Product product, List<Long> ids);
}
