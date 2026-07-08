package com.ramya.ramya.repositories;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ramya.ramya.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    List<Order> findByCustomerEmail(String email);
 
}