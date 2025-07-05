package com.ramya.ramya.services;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.ramya.ramya.entities.User;
import com.ramya.ramya.repositories.UserRepo;

import helper.ResponseMessageConstants;
import helper.RoleConstants;

@Service
public class UserService {
    String ROLE_ADMIN=RoleConstants.ROLE_ADMIN;
    String ROLE_USER=RoleConstants.ROLE_USER;

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<String> saveUser(User user) {
        Optional<User> userExist = userRepo.findByEmail(user.getEmail());
        if (userExist.isPresent()) {
            return ResponseEntity.ok(ResponseMessageConstants.USER_ALREADY_EXISTS);
        } else {
            if(userRepo.count()==0){
                user.setRole(ROLE_ADMIN);
            }else{
                user.setRole(ROLE_USER);
            }
            String userID = UUID.randomUUID().toString();
            
            user.setId(userID);
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            userRepo.save(user);

            return ResponseEntity.ok(ResponseMessageConstants.USER_REGISTERED);
        }
    }

    public User getUserByEmail(String username) {
        return userRepo.findByEmail(username).orElse(null);
    }

}
