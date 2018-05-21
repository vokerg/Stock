package com.stock.auth.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.stock.auth.model.User;

public interface UserRepository extends MongoRepository<User, String>{
	public User findByUsername(String username);
	public User findById(String id);

}
