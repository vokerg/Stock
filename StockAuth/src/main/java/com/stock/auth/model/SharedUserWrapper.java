package com.stock.auth.model;

import java.util.ArrayList;
import java.util.List;

public 	class SharedUserWrapper {
	
	private User user;
	
	public static SharedUserWrapper wrapUser(User user) {
		return user != null ? new SharedUserWrapper(user) : null;
	}
	
	public SharedUserWrapper(User user) {
		this.user = user;
	}
	public String getUsername() {
		return user.getUsername();
	}
	public String getId() {
		return user.getId();
	}
	
	public Boolean getAdmin() {
		return (user.getAdmin() != null && user.getAdmin());
	}

	public List<String> getViewstocks() {
		return user.getViewstocks() != null ? user.getViewstocks() : new ArrayList<String>();
	}
	
	public Boolean getProductCreator() {
		return (user.getProductCreator() != null && user.getProductCreator()); 
	}
}
