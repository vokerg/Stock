package com.stock.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class StockOrder {
	@Id
	private Long id;
	private Date date;
	private int stockId1;
	private Integer productId;
	private int stockId2;
	private float qty;
	private int operationTypeId;
	private Integer statusId;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getStockId1() {
		return stockId1;
	}
	public void setStockId1(int stockId1) {
		this.stockId1 = stockId1;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public int getStockId2() {
		return stockId2;
	}
	public void setStockId2(int stockId2) {
		this.stockId2 = stockId2;
	}
	public float getQty() {
		return qty;
	}
	public void setQty(float qty) {
		this.qty = qty;
	}
	public int getOperationTypeId() {
		return operationTypeId;
	}
	public void setOperationTypeId(int operationTypeId) {
		this.operationTypeId = operationTypeId;
	}
	public Integer getStatusId() {
		return statusId;
	}
	public void setStatusId(Integer statusId) {
		this.statusId = statusId;
	}

}
