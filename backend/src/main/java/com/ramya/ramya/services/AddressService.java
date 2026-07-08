package com.ramya.ramya.services;


import com.ramya.ramya.entities.Address;
import com.ramya.ramya.repositories.AddressRepository;


import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import javax.management.RuntimeErrorException;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address saveAddress(Address address) {
        System.out.println(address+"=======================");
        long date=(long) new Date().getTime();
        address.setId(date);
        return addressRepository.save(address);
    }

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }


    public void deleteAddress(Long id) {
       addressRepository.deleteById(id);
    }

    public void updateAddress(Address address) {
       Address addr= addressRepository.findById(address.getId()).orElseThrow(()->new RuntimeErrorException(null));
       if(addr!=null){
            addr.setCity(address.getCity());
            addr.setCountry(address.getCountry());
            addr.setFullName(address.getFullName());
            addr.setId(address.getId());
            addr.setPhone(address.getPhone());
            addr.setState(address.getState());
            addr.setStreet(address.getStreet());
            addr.setUser(address.getUser());
       }

       addressRepository.save(addr);

    }
}
