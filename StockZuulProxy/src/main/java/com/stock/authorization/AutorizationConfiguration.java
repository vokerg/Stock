package com.stock.authorization;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


@Configuration
@EnableWebSecurity
public class AutorizationConfiguration extends WebSecurityConfigurerAdapter{
	@Override
	protected void configure(HttpSecurity http) throws Exception {	
		http.csrf().disable()
		.authorizeRequests()
		//.antMatchers("/**").permitAll()
		.antMatchers("/**").authenticated()
		//.antMatchers("/tests/**").permitAll()
		//.antMatchers("/authorize/**").authenticated()
		.and()
		.addFilter(new AuthorizationFilter(authenticationManager()))
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		;
	}
	/*
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.build();
		//auth.userDetailsService(stockUserDetailService).passwordEncoder(bCryptPasswordEncoder);
	}
	*/
}
