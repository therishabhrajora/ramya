package com.ramya.ramya.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ramya.ramya.entities.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {

}
