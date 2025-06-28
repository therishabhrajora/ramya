package com.ramya.ramya.controllers;

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

    public PageController(UserService userService){
        this.userService = userService;
    }
    
    @PostMapping("/register")
    public void handleLoginForm(@RequestBody User user, BindingResult bindingResult){
        userService.saveUser(user);
        System.out.println("saved successfully");
    }

    @GetMapping("/products")
    public void getProducts(){
        System.out.println("called products");
    }   
}
