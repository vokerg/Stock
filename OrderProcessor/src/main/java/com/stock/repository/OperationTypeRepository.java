package com.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stock.model.OperationType;

public interface OperationTypeRepository extends JpaRepository<OperationType, Long>{
	public OperationType getById(Long id);
}
