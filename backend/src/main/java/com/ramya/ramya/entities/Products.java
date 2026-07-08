package com.ramya.ramya.entities;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    @Column(name = "product_id", length = 50)
    private String productId;

    @NotBlank(message = "Product name is mandatory")
    private String name;

    @NotBlank(message = "Tagline cannot be blank")
    private String tagline;

    @NotBlank(message = "Gender target is mandatory")
    private String gender;

    @NotBlank(message = "Category is mandatory")
    private String category;

    @Min(value = 0, message = "Price must be positive")
    private float price;

    @Column(name = "original_price")
    @Min(value = 0, message = "Original price must be positive")
    private float originalPrice;

    private String discount; // Calculated string like '33% OFF'

    @Min(value = 0, message = "Pocket inventory capacity must be at least 0")
    private int pocket;

    @Min(value = 0, message = "Rating cannot be lower than 0")
    private float rating;

    @Column(name = "reviews_count")
    private int reviewsCount;

    @Column(name = "cloudinary_image_public_id")
    private String cloudinaryImagePublicId;
    
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images; // Stores multiple image paths

    @ElementCollection
    @CollectionTable(name = "product_colors", joinColumns = @JoinColumn(name = "product_id", columnDefinition = "VARCHAR(50)"))
    @Column(name = "color_name")
    private List<String> colors; // Array mapping ['Space Gray', 'Silver Oxide']

    @ElementCollection
    @CollectionTable(name = "product_sizes", joinColumns = @JoinColumn(name = "product_id", columnDefinition = "VARCHAR(50)"))
    @Column(name = "size_name")
    private List<String> sizes; // Array mapping ['S', 'M', 'L']
}
