package com.stock.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.stock.auth.model.User;
import com.stock.auth.repository.UserRepository;

@Component
public class AppRunner implements CommandLineRunner{

	@Autowired
	UserRepository userRepository;
	
	@Override
	public void run(String... arg0) throws Exception {
		List<User> users = userRepository.findAll();
		System.out.println("all done");
		
	}

}
