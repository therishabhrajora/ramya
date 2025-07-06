package com.ramya.ramya.services;

import java.util.ArrayList;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ramya.ramya.entities.Products;
import com.ramya.ramya.repositories.ProductsRepo;

@Service
public class ProductService {
    private final ProductsRepo productsRepo;

    @Autowired
    ProductService(ProductsRepo productsRepo) {
        this.productsRepo = productsRepo;

    }

    public void saveProducts(Products products) {

        ArrayList<String> arr = new ArrayList<>();
        arr.add(products.getName().replaceAll(" ", "-").toLowerCase());
        arr.add(products.getCategory());
        arr.add(products.getColor());
        arr.add(String.valueOf(products.getPocket()));
        String id = String.join("-", arr);

        products.setProductId(id);
        productsRepo.save(products);
    }

}
