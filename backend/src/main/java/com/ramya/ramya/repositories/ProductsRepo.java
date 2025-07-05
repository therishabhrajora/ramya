package com.ramya.ramya.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ramya.ramya.entities.Products;

@Repository
public interface ProductsRepo extends JpaRepository<Products,String> {
    
}
