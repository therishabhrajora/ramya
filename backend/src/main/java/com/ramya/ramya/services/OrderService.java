package com.ramya.ramya.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ramya.ramya.controllers.OrderController;
import com.ramya.ramya.entities.Order;
import com.ramya.ramya.entities.OrderItem;
import com.ramya.ramya.repositories.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    OrderService(OrderRepository orderRepo) {
        this.orderRepository = orderRepo;
    }

    Logger logger = LoggerFactory.getLogger(OrderController.class);

    public Order saveOrder(Order order) {
        System.out.println(order.getItems());

        Order newOrder = new Order();
        newOrder.setCustomerEmail(order.getCustomerEmail());
        newOrder.setCustomerName(order.getCustomerName());
        newOrder.setOrderDate(order.getOrderDate());
        newOrder.setOrderId(order.getOrderId());
        newOrder.setPaymentMethod(order.getPaymentMethod());
        newOrder.setStatus(order.getStatus());
        newOrder.setTotalAmount(order.getTotalAmount());
        newOrder.setCity(order.getCity());
        newOrder.setCountry(order.getCountry());
        newOrder.setPhone(order.getPhone());
        newOrder.setState(order.getState());
        newOrder.setStatus(order.getStatus());
        newOrder.setStreet(order.getStreet());
        newOrder.setZip(order.getZip());
        System.out.println(newOrder);
        if (order.getItems() != null) {
            order.getItems().forEach(item -> item.setOrder(newOrder));
            newOrder.setItems(order.getItems());
        }

        return orderRepository.save(newOrder);
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow();
    }

    public List<Order> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmail(email);
    }

    @Transactional
    public Order updateOrderStatus(String orderId, String newStatus) {
        Order existingOrder = getOrderById(orderId);
        existingOrder.setStatus(newStatus);
        return orderRepository.save(existingOrder);
    }

    @Transactional
    public void cancelOrder(String orderId) {
        Order order = getOrderById(orderId);

        if ("Shipped".equalsIgnoreCase(order.getStatus()) || "Delivered".equalsIgnoreCase(order.getStatus())) {
            throw new IllegalStateException("Orders that have already been shipped or delivered cannot be cancelled.");
        }

        order.setStatus("Cancelled");
        orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

}