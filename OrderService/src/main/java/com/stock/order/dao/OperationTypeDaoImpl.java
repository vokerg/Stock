package com.stock.order.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.stock.order.model.OperationType;

@Component
public class OperationTypeDaoImpl implements OperationTypeDao{
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	private List<OperationType> cachedOperationTypes = null;

	@Override
	public List<OperationType> getAll() {
		if (cachedOperationTypes == null) {
			initializeOperationTypeCache();
		}
		return cachedOperationTypes;
	}

	private void initializeOperationTypeCache() {
		cachedOperationTypes = jdbcTemplate.query("SELECT * FROM operation_type", (rs, num) -> {
			OperationType op = new OperationType();
			op.setId(rs.getInt("id"));
			op.setfTransfer(rs.getBoolean("f_transfer"));
			op.setName(rs.getString("name"));
			op.setSign(rs.getInt("sign"));
			return op;
		});
	}

	@Override
	public String getOperationTypeName(int id) {
		if (cachedOperationTypes == null) {
			initializeOperationTypeCache();
		}
		return cachedOperationTypes.stream().filter(op -> op.getId() == id).findFirst().get().getName();
	}

}
