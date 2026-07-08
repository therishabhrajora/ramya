package com.ramya.ramya.controllers;

 // Standard built-in JpaRepository interface
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ramya.ramya.entities.BulkOrderRequest;
import com.ramya.ramya.repositories.BulkOrderRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/bulk-orders")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class BulkOrderController {

    private final BulkOrderRepository bulkOrderRepository;

    

    @PostMapping("/submit")
    public ResponseEntity<?> submitBulkRequest(@RequestBody BulkOrderRequest bulkOrder) {
        try {
            if (bulkOrder.getItems() != null) {
                bulkOrder.getItems().forEach(item -> item.setBulkOrder(bulkOrder));
            }
            BulkOrderRequest saved = bulkOrderRepository.save(bulkOrder);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
