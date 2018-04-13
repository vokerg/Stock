package com.stock.dao;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stock.model.Order;

@Component
public class OrderDaoImpl implements OrderDao {
/*
	@Autowired
	private SessionFactory sessionFactory;
	
	private Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}
*/
	@Override
	public Order getOrderById(String id) {
		//return getCurrentSession().get(Order.class, id);
		EntityManagerFactory factory = Persistence.createEntityManagerFactory("com.stock");
		return factory.createEntityManager().find(Order.class, id);
		
	}

	@Override
	public void saveOrder(Order order) {
		EntityManagerFactory factory = Persistence.createEntityManagerFactory("com.stock");
		factory.createEntityManager().persist(order);
		//getCurrentSession().save(order);
		
	}

}
