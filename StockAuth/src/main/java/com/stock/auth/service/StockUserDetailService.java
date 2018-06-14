package com.stock.auth.service;

import static java.util.Collections.emptyList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stock.auth.model.AuthenticatedUser;

@Service
public class StockUserDetailService implements UserDetailsService{

	@Autowired
	UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.stock.auth.model.User user = userService.getUserByUsername(username);
		return new AuthenticatedUser(user.getUsername(), user.getPassword(), emptyList(), user.getId());
	}

}
