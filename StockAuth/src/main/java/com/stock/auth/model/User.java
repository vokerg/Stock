package com.stock.auth.model;

import java.util.List;

import org.springframework.data.annotation.Id;

public class User {
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Boolean getAdmin() {
		return admin;
	}
	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}

	public List<String> getViewstocks() {
		return viewstocks;
	}
	public void setViewstocks(List<String> viewstocks) {
		this.viewstocks = viewstocks;
	}

	@Id
	private String id;
	private String username;
	private String password;
	private Boolean admin;
	private List<String> viewstocks;
}
