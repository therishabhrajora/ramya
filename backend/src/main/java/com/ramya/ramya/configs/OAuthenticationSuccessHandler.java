package com.ramya.ramya.configs;

import java.io.IOException;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.stereotype.Component;

import com.ramya.ramya.entities.User;
import com.ramya.ramya.repositories.UserRepo;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
  private final UserRepo userRepo;
  private final JwtUtil jwtUtil;

  public OAuthenticationSuccessHandler(UserRepo userRepo, JwtUtil jwtUtil) {
    this.jwtUtil = jwtUtil;
    this.userRepo = userRepo;
  }

  Logger logger = LoggerFactory.getLogger(this.getClass());

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    var onAuthenticationToken = (OAuth2AuthenticationToken) authentication;
    String authorizedClientRegisterationId = onAuthenticationToken.getAuthorizedClientRegistrationId();
    var oauthUser = (DefaultOAuth2User) authentication.getPrincipal();
    System.out.println("this is oauthUser ====  " + oauthUser);
    String jwtToken = jwtUtil.generateToken((UserDetails) authentication.getPrincipal());
    System.out.println("this is token === " + jwtToken);
    response.setHeader("Authentication", "Bearer " + jwtToken);
    oauthUser.getAttributes().forEach((key, value) -> {
      logger.info(key + ": " + value); // Uncomment if logger is defined
    });

    User user = new User();
    user.setId(UUID.randomUUID().toString());
    userRepo.save(user);
    new DefaultRedirectStrategy().sendRedirect(
        request, response, "http://localhost:5173/user?token=" + jwtToken);

  }

}
