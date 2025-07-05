package com.ramya.ramya.entities;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class Products {
    @Id
    private String productId;
    @NotBlank(message = "must be filled")
    private String name;
    
    private String imageLink;
    @NotBlank(message = "must be filled")
    private String gender;
    @NotBlank(message = "must be filled")
    private String category;
    @NotBlank(message = "must be filled")
    private String color;

    @Min(value = 1, message = "Pocket must be at least 1")
    private float price;

    @Min(value = 1, message = "Pocket must be at least 1")
    private int pocket;

    @Min(value = 1, message = "Pocket must be at least 1")
    private float rating;

}
