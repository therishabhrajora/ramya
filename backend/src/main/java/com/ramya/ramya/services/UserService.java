package com.ramya.ramya.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ramya.ramya.entities.User;
import com.ramya.ramya.repositories.UserRepo;

import forms.UserForm;
import helper.ResponseMessageConstants;
import helper.RoleConstants;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<String> saveUser(UserForm userForm) {
        Optional<User> userExist = userRepo.findByEmail(userForm.getEmail());
        if (userExist.isPresent()) {
            System.out.println("user already exist");
            return ResponseEntity.ok(ResponseMessageConstants.USER_ALREADY_EXISTS);
        } else {
            User user = new User();
            String userID = UUID.randomUUID().toString();
            user.setId(userID);
            user.setEmail(userForm.getEmail());
            user.setFirstName(userForm.getFirstName());
            user.setLastName(userForm.getLastName());
            user.setPassword(passwordEncoder.encode(userForm.getPassword()));
            user.setPhone(userForm.getPhone());

            if (userRepo.count() == 0) {
                user.setRole(RoleConstants.ROLE_ADMIN);
            } else {
                user.setRole(RoleConstants.ROLE_USER);
            }

            userRepo.save(user);

            return ResponseEntity.ok(ResponseMessageConstants.USER_REGISTERED);
        }
    }

    public User getUserByEmail(String username) {
        return userRepo.findByEmail(username).orElse(null);
    }

}
