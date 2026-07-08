package com.ramya.ramya.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ramya.ramya.entities.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}
