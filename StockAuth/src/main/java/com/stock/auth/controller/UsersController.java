package com.stock.auth.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.auth.model.User;
import com.stock.auth.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UsersController {
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(User user) {
		if (userRepository.findByUsername(user.getUsername()) != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
		};
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok(null);
	}
	
	@GetMapping("/{userId}/viewstocks")
	public List<String> getViewStocks(@PathVariable String userId) {
		User user = userRepository.findById(userId);
		return (user == null) ? new ArrayList<String>() : (user.getViewstocks() == null) ? new ArrayList<String>() : user.getViewstocks();
	}
}
