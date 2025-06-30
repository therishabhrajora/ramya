package com.ramya.ramya.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ramya.ramya.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);



}
