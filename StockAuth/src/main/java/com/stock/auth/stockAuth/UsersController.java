package com.stock.auth.stockAuth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UsersController {
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping("/signup")
	public void signUp(ApplicationUser user) {
		System.out.println("username: " + user.getUsername() + " password: " + bCryptPasswordEncoder.encode(user.getPassword()));
	}
}
