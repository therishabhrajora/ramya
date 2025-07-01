package com.ramya.ramya.configs;

import java.security.Key;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    Key key = Keys.hmacShaKeyFor("your-256-bit-secret-your-256-bit-secret".getBytes());

    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
            .claim("sub", userDetails.getUsername())
            .claim("iss", "ramya")
            .claim("iat", new Date().getTime())
            .claim("exp", System.currentTimeMillis()+1000*60*60*10)
            .signWith(key)
            .compact();
    }


    public String extractUsername(String token){
        return Jwts.parser().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token,UserDetails userDetails){
        String username = extractUsername(token);
        System.out.println("this user exist ===" + username);
        return (username.equals(userDetails.getUsername()));
    }


}
