package com.stock.main;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.stock.entity.Product;
import com.stock.entity.Stock;
import com.stock.entity.StockRest;
import com.stock.repository.ProductRepository;
import com.stock.repository.StockRepository;
import com.stock.repository.StockRestRepository;

@Component
public class StockRunner implements CommandLineRunner{
	
	private StockRepository stockRepository;
	private ProductRepository productRepository;
	private StockRestRepository stockRestRepository;

	@Override
	public void run(String... arg0) throws Exception {
		Stream.of("Stock1", "Stock2", "Stock3").forEach(stockName -> stockRepository.save(new Stock(stockName)));
		Stream.of("Product1", "Product2", "Product3").forEach(productName -> productRepository.save(new Product(productName)));
		stockRepository.findAll().stream().forEach(stock -> System.out.println(stock.getName()));
		productRepository.findAll().stream().forEach(product -> System.out.println(product.getName()));
		
		stockRepository.findAll().stream().forEach(stock -> {
			productRepository.findAll().stream().forEach(product -> {
				StockRest stockRest = new StockRest();
				stockRest.setProduct(product);
				stockRest.setStock(stock);
				stockRest.setQty(10);
				stockRestRepository.save(stockRest);
			});
		});
		
		stockRestRepository.findAll().stream().forEach(stockRest -> {
			System.out.println(stockRest.getProduct().getName() + " " + stockRest.getStock().getName());
		});
		
		Stock stock = stockRepository.findAll().get(0);
		StockRest stockRest = stockRestRepository.findByStock(stock).get(0);
		System.out.println(stockRest);
		
		System.out.println(this.stockRestRepository.findByStock(this.stockRepository.findById(Long.valueOf("1"))));
	}

	public StockRunner(StockRepository stockRepository, ProductRepository productRepository, StockRestRepository stockRestRepository) {
		super();
		this.stockRepository = stockRepository;
		this.productRepository = productRepository;
		this.stockRestRepository = stockRestRepository;
	}
}
