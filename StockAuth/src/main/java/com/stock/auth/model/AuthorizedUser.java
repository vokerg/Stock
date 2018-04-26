package com.stock.auth.model;

public class AuthorizedUser {
	public String getIdUser() {
		return idUser;
	}
	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public AuthorizedUser(String idUser, String username) {
		super();
		this.idUser = idUser;
		this.username = username;
	}
	private String idUser;
	private String username;
	
}
