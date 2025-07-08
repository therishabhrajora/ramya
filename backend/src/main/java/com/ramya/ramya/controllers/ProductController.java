package com.ramya.ramya.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ramya.ramya.entities.Products;
import com.ramya.ramya.services.ProductService;

@RestController
@RequestMapping("/collections")
public class ProductController {
     private final ProductService productService;

     public ProductController(ProductService productService){
        this.productService=productService;
     }

     @GetMapping("/products")
     public ResponseEntity<List<Products>> getProducts(){
        List<Products> products= productService.findProducts();
        return ResponseEntity.ok(products);
       

     }
    
}
