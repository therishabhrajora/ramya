package com.ramya.ramya.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    String productId;
    @NotBlank(message = "must be filled")
    String name;
    @NotBlank(message = "must be filled")
    String imageLink;
    @NotBlank(message = "must be filled")
    String gender;
    @NotBlank(message = "must be filled")
    String category;
    @NotBlank(message = "must be filled")
    String color;
    @NotBlank(message = "must be filled")
    int price;
    @NotBlank(message = "must be filled")
    int pocket;
    @NotBlank(message = "must be filled")
    float rating;

}
