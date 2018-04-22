package com.stock.auth.stockAuth;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tests")
public class TestController {
	@GetMapping("")
	public String getTest(Principal principal) {
		if (principal != null) {
			return "hello" + principal.getName();	
		} else {
			return "unauthorized from controller";
		}
		
	}

}
