package com.ramya.ramya.services;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ramya.ramya.entities.User;
import com.ramya.ramya.repositories.UserRepo;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<Map<String, String>> saveUser( User user) {
        Optional<User> userExist = userRepo.findByEmail(user.getEmail());
        System.out.println("this is user exist "+userExist);
        if (userExist.isPresent()) {
            System.out.println("inside if");
            return ResponseEntity
                .badRequest()
                .body(Map.of("message", "User is already present"));
        } else {
            System.out.println(
                "inside else"
            );
            String id = UUID.randomUUID().toString();
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setId(id);
            userRepo.save(user);
            return ResponseEntity
                .ok(Map.of("message", "User registered successfully"));
        }
    }

    public User getUserByEmail(String username) {
        return userRepo.findByEmail(username).orElse(null);
    }

}
