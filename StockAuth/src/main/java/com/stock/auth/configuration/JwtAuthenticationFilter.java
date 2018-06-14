package com.stock.auth.configuration;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stock.auth.model.AuthenticatedUser;
import com.stock.auth.model.SharedUserWrapper;
import com.stock.auth.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

	private UserService userService;
	
    JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
    		super();
    		this.setAuthenticationManager(authenticationManager);
    		this.userService = userService;
    }
    
	@Override
	protected void successfulAuthentication(HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain,
            Authentication auth) throws IOException, ServletException {
		AuthenticatedUser user = (AuthenticatedUser) auth.getPrincipal();
		String token = Jwts.builder()
				.setClaims(getAuthorizedUserMap(user))
                .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET.getBytes())
                .compact();
        res.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
        res.getWriter().print(getSharedUserJson(user));
        res.getWriter().flush();
	}

	private Map<String, Object> getAuthorizedUserMap(AuthenticatedUser user) {
		Map<String, Object> authorizedUserMap = new HashMap<String, Object>();
		authorizedUserMap.put("idUser", user.getIdUser());
		authorizedUserMap.put("username", user.getUsername());
		return authorizedUserMap; 
	}

	private String getSharedUserJson(AuthenticatedUser user) throws JsonProcessingException {
		SharedUserWrapper sharedUser = SharedUserWrapper.wrapUser(userService.getUserById(user.getIdUser()));
        ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(sharedUser);
	}
}
