package com.stock.auth.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.stock.auth.service.StockUserDetailService;

@Configuration
@EnableWebSecurity
public class AuthConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	StockUserDetailService stockUserDetailService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {		
		http.csrf().disable()
		.authorizeRequests()
		//.antMatchers("/**").permitAll()
		.antMatchers("/tests/**").permitAll()
		.antMatchers("/authorize/**").authenticated()
		.and()
		.addFilter(new JwtAuthenticationFilter(authenticationManager()))
		.addFilter(new JwtAuthorizationFIlter(authenticationManager()))
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(stockUserDetailService).passwordEncoder(bCryptPasswordEncoder);
	}
}
