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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ramya.ramya.configs.JwtUtil;

import com.ramya.ramya.entities.User;
import com.ramya.ramya.services.CustomUserDetailService;

import com.ramya.ramya.services.UserService;

import forms.LoginRequest;
import forms.UserForm;
import helper.ErrorMessages;
import helper.ResponseMessageConstants;
import jakarta.validation.Valid;

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
    public ResponseEntity<Map<String, String>> handleRegisterForm(@Valid @RequestBody UserForm userForm,
            BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                bindingResult.getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
                return ResponseEntity.badRequest().body(errors);
            }
            ResponseEntity<String> reponse = userService.saveUser(userForm);
            Map<String, String> successResponse = Map.of("message", reponse.getBody());
            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = Map.of("error", ErrorMessages.INVALID_CREDENTIALS);
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> handleLoginForm(@Valid @RequestBody LoginRequest loginRequest,
            BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                bindingResult.getFieldErrors()
                        .forEach(fieldError -> errors.put(fieldError.getField(), fieldError.getDefaultMessage()));
                return ResponseEntity.badRequest().body(errors);
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            String token = jwtUtil.generateToken(userDetails);
            User user = userService.getUserByEmail(userDetails.getUsername());
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            ObjectMapper objectMapper = new ObjectMapper();

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);
            response.put("user", objectMapper.convertValue(user, Map.class));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> errorResponse = Map.of("error", ErrorMessages.AUTHENTICATION_FAILED);
            return ResponseEntity.status(401).body(errorResponse);
        }

    }

    @RequestMapping("/logout")
    public String logout() {
        return "logout";
    }

}
