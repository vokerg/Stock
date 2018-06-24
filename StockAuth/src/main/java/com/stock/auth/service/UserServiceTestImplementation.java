package com.stock.auth.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.stock.auth.model.User;

//@Service
public class UserServiceTestImplementation implements UserService{
	
	private static User user = getTestUser();

	@Override
	public User getUserByUsername(String username) {
		return user;
	}

	private static User getTestUser() {
		User user = new User();
		user.setAdmin(false);
		user.setId("12345");
		user.setUsername("guest");
		user.setPassword("$2a$10$FFO//FAYSrbLD4FF8H8Bf.qDeyUSTUNRIB/1/mD3s..X2dvDZf/OC");
		user.setProductCreator(true);
		user.setViewstocks(new ArrayList<String>());
		return user;
	}

	@Override
	public User getUserById(String idUser) {
		return user;
	}

	@Override
	public void saveUser(User user) {
		// Do nothing
	}

}
