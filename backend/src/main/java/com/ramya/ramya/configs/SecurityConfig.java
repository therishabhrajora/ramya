package com.ramya.ramya.configs;

import java.util.List;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.ramya.ramya.services.CustomUserDetailService;

import helper.DatabaseConstants;

@Configuration
@EnableAutoConfiguration
public class SecurityConfig {
    String CORS_ORIGIN = DatabaseConstants.CORS_ORIGIN;

    private JwtRequestFilter jwtRequestFilter;
    private CustomUserDetailService userDetailService;
    private OAuthenticationSuccessHandler oAuthenticationSuccessHandler;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter, CustomUserDetailService userDetailService,
            OAuthenticationSuccessHandler oAuthenticationSuccessHandler) {
        this.jwtRequestFilter = jwtRequestFilter;
        this.userDetailService = userDetailService;
        this.oAuthenticationSuccessHandler = oAuthenticationSuccessHandler;
    }

    @Bean
    public SecurityFilterChain sequrityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .formLogin(form -> form.disable())
                .httpBasic(httpbasic -> httpbasic.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/collections/**").permitAll() // homepage, men/women, register, login
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasRole("USER")

                        // 🔐 Secure endpoints
                        .requestMatchers("/user/**").authenticated()

                        // fallback: block anything else
                        .anyRequest().denyAll())
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowCredentials(true);

            config.setAllowedOrigins(List.of(
                    "https://ramyascrubs.netlify.app",
                    "http://localhost:3000"));

            config.addAllowedHeader("*");
            config.addAllowedMethod("*");
            return config;
        }));
       


        // http.oauth2Login(oauth -> {
        // oauth.loginPage("/collections/account");
        // oauth.successHandler(oAuthenticationSuccessHandler);
        // });

        http.logout(logout -> logout
                .logoutUrl("/collections/logout")
                .logoutSuccessUrl("/collections?logout=true")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll());

        http.sessionManagement(session -> session
                .invalidSessionUrl("/login?invalidSession=true"));

        return http.build();
         
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
