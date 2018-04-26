package com.stock.auth.controller;

import java.security.Principal;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.auth.model.AuthorizedUser;

@RestController
@RequestMapping("/authorize")
public class AuthorizationController {
	@GetMapping("")
	public AuthorizedUser authorize(Principal principal) {
		if (principal != null) {
			return (AuthorizedUser) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
		} else {
			return null;
		}
	}
}
