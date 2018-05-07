package com.stock.order.model;

import java.util.Date;

public class Order {
	private int id;
	private Date date;
	private int stockId;
	private int productId;
	private int stockId2;
	private float qty;
	private int operationTypeId;
	private String stockName;
	private String stock2Name;
	private String productName;
	private Integer statusId;
	private String operationTypeName;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getStockId() {
		return stockId;
	}
	public void setStockId(int stockId) {
		this.stockId = stockId;
	}
	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
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
	public String getStockName() {
		return stockName;
	}
	public void setStockName(String stockName) {
		this.stockName = stockName;
	}
	public String getStock2Name() {
		return stock2Name;
	}
	public void setStock2Name(String stock2Name) {
		this.stock2Name = stock2Name;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Integer getStatusId() {
		return statusId;
	}
	public void setStatusId(Integer statusId) {
		this.statusId = statusId;
	}
	public String getOperationTypeName() {
		return operationTypeName;
	}
	public void setOperationTypeName(String operationTypeName) {
		this.operationTypeName = operationTypeName;
	}
}
