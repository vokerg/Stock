package com.stock.auth.service;

import com.stock.auth.model.User;

public interface UserService {
	User getUserByUsername(String username);
	User getUserById(String idUser);
	void saveUser(User user);
}
