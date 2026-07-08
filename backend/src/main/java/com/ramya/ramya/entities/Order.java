package com.ramya.ramya.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString; 

import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    private String orderId;

    private String customerEmail; 

    private Double totalAmount;
    private String paymentMethod;
    private String orderDate;
    private String status;

    
    private String phone;
    private String street; 
    private String city;
    private String state;
    private String zip;
    private String country;
    private String customerName;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> items;

    

}