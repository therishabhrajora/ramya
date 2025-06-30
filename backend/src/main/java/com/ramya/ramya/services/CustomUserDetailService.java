package com.ramya.ramya.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ramya.ramya.entities.User;
import com.ramya.ramya.repositories.UserRepo;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepo userRepo;

    @Autowired
    public CustomUserDetailService(UserRepo userRepo){
        this.userRepo=userRepo;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        User user=userRepo.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found with email"+ email));
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),new ArrayList<>());
        
    }

}
