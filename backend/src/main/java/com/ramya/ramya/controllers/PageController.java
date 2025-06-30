package com.ramya.ramya.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ramya.ramya.entities.User;
import com.ramya.ramya.services.UserService;

@RestController
@RequestMapping("/collections")
public class PageController {

    private final UserService userService;

    public PageController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> handleLoginForm(@RequestBody User user, BindingResult bindingResult) {
        return userService.saveUser(user);
    }

    
}
