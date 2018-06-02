package com.stock.order;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stock.order.model.SharedUser;

@Component
public class UserService {
	@Autowired
	RestTemplate restTemplate;
	
	public SharedUser getSharedUser(String idUser) throws JsonParseException, JsonMappingException, IOException {
		String obj = restTemplate.getForObject("http://STOCK-AUTH/users/" + idUser, String.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.readValue(obj, SharedUser.class);
	}
}
