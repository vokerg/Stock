package com.stock.authorization;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;


public class AuthorizationFilter extends BasicAuthenticationFilter{

	public static final String HEADER_STRING = "Authorization";
	
	@Autowired
	RestTemplate restTemplate;
	
	public AuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain)
					throws IOException, ServletException {
		
		String header = request.getHeader(HEADER_STRING);
		if (header == null) {
			chain.doFilter(request, response);
			return;
		}
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", header);
		HttpEntity<String> entityReq = new HttpEntity<String>("", headers);
		ResponseEntity<Object> obj = null;
		try {
			obj = restTemplate.exchange("http://localhost:8093/authorize", HttpMethod.GET, entityReq, Object.class);	
		} catch (HttpClientErrorException e) {
			//response.setStatus(e.getStatusCode().value());
			chain.doFilter(request, response);
			return;
		}
		
		System.out.println(obj);
		
		Authentication authentication = new UsernamePasswordAuthenticationToken("user1", null, new ArrayList<GrantedAuthority>());
		
		
		
		//SecurityContextHolder.getContext().setAuthentication(authentication);	
		chain.doFilter(request, response);
	}

}
