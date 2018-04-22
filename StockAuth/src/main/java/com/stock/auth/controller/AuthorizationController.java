package com.stock.auth.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authorize")
public class AuthorizationController {
	@GetMapping("")
	public String authorize(Principal principal) {
		if (principal != null) {
			return principal.getName();
		} else {
			return "unauthorized";
		}
	}
}
