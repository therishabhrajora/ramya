package com.ramya.ramya.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.ramya.ramya.services.UserService;

@Controller
public class UserController {
    private final UserService userService;
    
    @Autowired
    UserController(UserService userService){
        this.userService=userService;
    }
}
