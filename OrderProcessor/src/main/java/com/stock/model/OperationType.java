package com.stock.model;

import javax.persistence.Entity;

import org.springframework.data.annotation.Id;

@Entity
public class OperationType {
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getSign() {
		return sign;
	}
	public void setSign(int sign) {
		this.sign = sign;
	}
	public boolean isfTransfer() {
		return fTransfer;
	}
	public void setfTransfer(boolean fTransfer) {
		this.fTransfer = fTransfer;
	}
	
	@Id
	private Long id;
	private String name;
	private int sign;
	private boolean fTransfer;
}
