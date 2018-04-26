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

import com.stock.auth.model.AuthenticatedUser;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
    		super();
    		this.setAuthenticationManager(authenticationManager);
    }
    
	@Override
	protected void successfulAuthentication(HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain,
            Authentication auth) throws IOException, ServletException {
		AuthenticatedUser user = (AuthenticatedUser) auth.getPrincipal();
		Map<String, Object> authorizedUserMap = new HashMap<String, Object>();
		authorizedUserMap.put("idUser", user.getIdUser());
		authorizedUserMap.put("username", user.getUsername());
		String token = Jwts.builder()
				.setClaims(authorizedUserMap)
                .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET.getBytes())
                .compact();
        res.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
	}
}
