package com.ramya.ramya.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ramya.ramya.entities.Products;

@Repository
public interface ProductsRepo extends JpaRepository<Products,String> {
   @Query("SELECT DISTINCT c FROM Products p JOIN p.colors c")
    List<String> findDistinctColors();
    
}
