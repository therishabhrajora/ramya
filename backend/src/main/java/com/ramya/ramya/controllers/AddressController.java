package com.ramya.ramya.controllers;

import com.ramya.ramya.entities.Address;
import com.ramya.ramya.entities.User;
import com.ramya.ramya.repositories.UserRepo;
import com.ramya.ramya.services.AddressService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = "http://localhost:5173") 
public class AddressController {

    private final AddressService addressService;
    private final UserRepo userRepo;

    AddressController(AddressService addressService, UserRepo userRepo) {
        this.addressService = addressService;
        this.userRepo = userRepo;
    }

    /**
     * SAVE NEW USER ADDRESS PROFILE
     * POST http://localhost:9090/api/addresses/add
     */
    @PostMapping("/add")
    public ResponseEntity<Address> addNewAddress(@RequestBody Address address, Principal principal) {
        try {
            System.out.println(address + "============================");
            System.out.println(principal.getName());
            User user = userRepo.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Logged-in user profile not found in database registry."));
            address.setUser(user);
            Address savedAddress = addressService.saveAddress(address);
            return new ResponseEntity<>(savedAddress, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Address>> getAllAddresses() {
        System.out.println(addressService.getAllAddresses()+"===================================");
        return ResponseEntity.ok(addressService.getAllAddresses());
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
    }

    @PutMapping("/update")
    public void updateAddress(@RequestBody Address address){
        addressService.updateAddress(address);
    }
}
