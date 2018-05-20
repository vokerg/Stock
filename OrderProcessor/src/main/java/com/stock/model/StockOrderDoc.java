package com.stock.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class StockOrderDoc {
	@Id
	private Long id;
	
	private Date date;
	private Integer stockId1;
	private Integer stockId2;
	private int operationTypeId;
	private Integer statusId;
	
	@OneToMany
	@JoinColumn(name="document_id", referencedColumnName="id")
	private List<StockOrder> orders;
	
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

	public Integer getStockId1() {
		return stockId1;
	}

	public void setStockId(Integer stockId1) {
		this.stockId1 = stockId1;
	}

	public Integer getStockId2() {
		return stockId2;
	}

	public void setStockId2(Integer stockId2) {
		this.stockId2 = stockId2;
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


	public List<StockOrder> getOrders() {
		return orders;
	}

	public void setOrders(List<StockOrder> orders) {
		this.orders = orders;
	}

}
