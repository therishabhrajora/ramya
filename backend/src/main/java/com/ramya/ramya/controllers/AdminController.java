package com.ramya.ramya.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ramya.ramya.entities.Products;
import com.ramya.ramya.services.ImageService;
import com.ramya.ramya.services.ProductService;

import forms.ProductForm;
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
    public void addProducts(@Valid @ModelAttribute ProductForm productForm, BindingResult bindingResult) {

        String fileName = UUID.randomUUID().toString();
        System.out.println("file========="+productForm.getImage());
        String fileURl = imageService.uploadImage(productForm.getImage(), fileName);
        System.out.println("file imformation:{===============}" + productForm.getImage().getOriginalFilename());

        Products products = new Products();
        products.setCategory(productForm.getCategory());
        products.setColor(productForm.getColor());
        products.setColor(productForm.getColor());
        products.setGender(productForm.getGender());
        products.setName(productForm.getName());
        products.setPocket(productForm.getPocket());
        products.setPrice(productForm.getPrice());
        products.setRating(productForm.getRating());
        products.setImage(fileURl);
        products.setCloudinaryImagePublicId(fileName);

       

        productService.saveProducts(products);
    }

}
