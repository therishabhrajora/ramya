package com.ramya.ramya.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ramya.ramya.entities.Products;
import com.ramya.ramya.services.ImageService;
import com.ramya.ramya.services.ProductService;

import forms.ProductForm;
import helper.ErrorMessages;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/collections/admin")
public class AdminController {
    private final ProductService productService;
    private final ImageService imageService;

    @Autowired
    AdminController(ProductService productService, ImageService imageService) {
        this.productService = productService;
        this.imageService = imageService;
    }

    @PostMapping(value = "/add-products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> addProducts(@Valid @ModelAttribute ProductForm productForm,
            BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = new HashMap<>();
                bindingResult.getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
                return ResponseEntity.badRequest().body(errors);
            }
            String fileName = UUID.randomUUID().toString();

            String fileURl = imageService.uploadImage(productForm.getImage(), fileName);

            Products products = new Products();
            products.setCategory(productForm.getCategory().toLowerCase());
            products.setColor(productForm.getColor().toLowerCase());
            products.setColor(productForm.getColor().toLowerCase());
            products.setGender(productForm.getGender().toLowerCase());
            products.setName(productForm.getName().toLowerCase());
            products.setPocket(productForm.getPocket());
            products.setPrice(productForm.getPrice());
            products.setRating(productForm.getRating());
            products.setImage(fileURl);
            products.setCloudinaryImagePublicId(fileName);
            productService.saveProducts(products);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Product added successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Something went wrong while adding the product");
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(errorResponse);
        }

    }

}
