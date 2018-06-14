package com.stock.auth.configuration;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.stock.auth.model.AuthorizedUser;
import com.stock.auth.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

public class JwtAuthorizationFIlter extends BasicAuthenticationFilter {

	private UserService userService;

	public JwtAuthorizationFIlter(AuthenticationManager authenticationManager, UserService userService) {
		super(authenticationManager);
		this.userService = userService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String header = request.getHeader(SecurityConstants.HEADER_STRING);
		if ((header != null) && (header.startsWith(SecurityConstants.TOKEN_PREFIX))) {
			String token = header.replace(SecurityConstants.TOKEN_PREFIX, "");
			if (token != null) {
				try {
					Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECRET.getBytes())
							.parseClaimsJws(token).getBody();
					String username = (String) claims.get("username");
					String idUser = (String) claims.get("idUser");

					if (userService.getUserById(idUser) != null) {
						Authentication authentication = new UsernamePasswordAuthenticationToken(
								new AuthorizedUser(idUser, username), null, new ArrayList<GrantedAuthority>());
						SecurityContextHolder.getContext().setAuthentication(authentication);
					}

				} catch (JwtException e) {
					request.setAttribute("exception", e);
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				}
			}
		}
		chain.doFilter(request, response);
	}

}
