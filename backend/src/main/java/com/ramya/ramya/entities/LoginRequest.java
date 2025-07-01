package com.ramya.ramya.entities;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class LoginRequest {
    @Email
    @Pattern(regexp = ".+@.+\\..+", message = "Invalid email format")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "must be filled")
    private String password;

}
