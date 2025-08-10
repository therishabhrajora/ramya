package com.ramya.ramya.entities;
import org.springframework.web.multipart.MultipartFile;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "products")
public class Products {
    @Id
    private String productId;
    @NotBlank
    private String name;
    private String image;
    @NotBlank
    private String gender;
    @NotBlank
    private String category;
    @NotBlank
    private String color;
    @Min(value = 1, message = "Pocket must be at least 1")
    private float price;
    @Min(value = 1, message = "Pocket must be at least 1")
    private int pocket;
    @Min(value = 1, message = "Pocket must be at least 1")
    private float rating;
    private String cloudinaryImagePublicId;
}
