package com.stock.auth.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.auth.repository.UserRepository;

@RestController
@RequestMapping("/tests")
public class TestController {
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("")
	public String getTest(Principal principal) {
		if (principal != null) {
			return "hello" + principal.getName();
		} else {
			return "unauthorized from controller";
		}
	}

}
