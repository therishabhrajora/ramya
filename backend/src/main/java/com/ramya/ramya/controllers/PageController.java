package com.ramya.ramya.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ramya.ramya.configs.JwtUtil;
import com.ramya.ramya.entities.LoginRequest;
import com.ramya.ramya.entities.User;
import com.ramya.ramya.services.CustomUserDetailService;
import com.ramya.ramya.services.UserService;

@RestController
@RequestMapping("/collections")
public class PageController {

    private final UserService userService;
    private AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailService userDetailService;

    public PageController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil,
            CustomUserDetailService userDetailService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailService = userDetailService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> handleRegisterForm(@RequestBody User user, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                bindingResult.getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
                return ResponseEntity.badRequest().body(errors);
            }
            userService.saveUser(user);
            Map<String, String> successResponse = Map.of("message", "User registered successfully");
            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = Map.of("error", "Invalid input");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> handleLoginForm(@RequestBody LoginRequest loginRequest, BindingResult bindingResult) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            System.out.println("user details ==============="+userDetails);

            String token = jwtUtil.generateToken(userDetails);
            User user = userService.getUserByEmail(userDetails.getUsername());

            System.out.println("token====="+token);
            System.out.println("user====="+user);


            ObjectMapper objectMapper = new ObjectMapper();

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", objectMapper.convertValue(user, Map.class));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            if (bindingResult.hasErrors()) {
                Map<String, String> error = new HashMap<>();
                bindingResult.getFieldErrors()
                        .forEach(fieldError -> error.put(fieldError.getField(), fieldError.getDefaultMessage()));
                return ResponseEntity.badRequest().body(error);
            }
            Map<String, String> errorResponse = Map.of("error", "Authentication failed");
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

    @RequestMapping("/logout")
    public String logout() {
        return "logout";
    }

}
