package com.ramya.ramya.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ramya.ramya.entities.BulkOrderRequest;

@Repository
public interface BulkOrderRepository extends JpaRepository<BulkOrderRequest, Long> {
   
}
