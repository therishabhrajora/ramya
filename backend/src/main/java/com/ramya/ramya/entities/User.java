package com.ramya.ramya.entities;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Entity;
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
    private Long id;
    @NotBlank(message = "must be filled")
    private String firstName;
    @NotBlank(message = "must be filled")
    private String lastName;
    @NotBlank(message = "must be filled")
    @Email
    @Pattern(regexp = ".+@.+\\..+", message = "Invalid email format")
    private String email;
    @NotBlank(message = "must be filled")
    private String password;
    @NotBlank(message = "must be filled")
    @Length(max = 10)
    private String phone;
    @NotBlank(message = "must be filled")
    private String role;

}
