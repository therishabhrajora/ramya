package com.ramya.ramya.controllers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ramya.ramya.services.BulkService;

@RestController
@RequestMapping("/admin")
public class BulkController {

    private final BulkService bulkService;

    BulkController(BulkService bulkService) {
        this.bulkService = bulkService;
    }

    @PostMapping("/bulk-upload")
    public ResponseEntity<String> uploadBulk(@RequestParam("file") MultipartFile file) {
        
        try {
            bulkService.processBulkFile(file);
            return ResponseEntity.ok("Successfully imported bulk inventory file records.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Processing failure error: " + e.getMessage());
        }
    }
}
