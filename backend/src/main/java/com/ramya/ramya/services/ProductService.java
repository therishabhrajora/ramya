package com.ramya.ramya.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cloudinary.http5.api.Response;
import com.ramya.ramya.entities.Products;
import com.ramya.ramya.repositories.ProductsRepo;

import helper.ResponseMessageConstants;

@Service
public class ProductService {
    private final ProductsRepo productsRepo;

    @Autowired
    ProductService(ProductsRepo productsRepo) {
        this.productsRepo = productsRepo;

    }

    public ResponseEntity<String> saveProducts(Products products) {

        ArrayList<String> arr = new ArrayList<>();
        arr.add(products.getName().replaceAll(" ", "-").toLowerCase());
        arr.add(products.getCategory());
        arr.add(products.getColor());
        arr.add(String.valueOf(products.getPocket()));
        String id = String.join("-", arr);

        products.setProductId(id);
        productsRepo.save(products);

        return ResponseEntity.ok(ResponseMessageConstants.CREATE_SUCCESS);
    }

    public List<Products> findProducts() {
        return productsRepo.findAll();
    }


    




}
