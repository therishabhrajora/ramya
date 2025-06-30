package com.ramya.ramya.entities;

import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Value;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class User {
    @Id
    private String id;
    @NotBlank(message = "must be filled")
    private String firstName;
    @NotBlank(message = "must be filled")
    private String lastName;
    @NotBlank(message = "must be filled")
    @Email
    @Pattern(regexp = ".+@.+\\..+", message = "Invalid email format")
    @Column(unique = true)
    private String email;
    @NotBlank(message = "must be filled")
    private String password;
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    @NotBlank(message = "must be filled")
    @Length(max = 10)
    private String phone; 
    @Value("user")
    private String role;

}
