package com.stock.auth.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class AuthenticatedUser extends User{
	
	private static final long serialVersionUID = 1L;
	
	public AuthenticatedUser(String username, String password,
			Collection<? extends GrantedAuthority> authorities, String idUser) {
		super(username, password, authorities);
		this.setIdUser(idUser);
	}

	public String getIdUser() {
		return idUser;
	}
	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}
	String username;
	String idUser;
}
