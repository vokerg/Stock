package com.stock.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stock.auth.model.User;
import com.stock.auth.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService{

	@Autowired
	UserRepository userRepository;
	
	@Override
	public User getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User getUserById(String idUser) {
		return userRepository.findById(idUser);
	}

	@Override
	public void saveUser(User user) {
		userRepository.save(user);
	}

}
