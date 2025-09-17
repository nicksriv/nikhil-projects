/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wavelabs.sb.repositories;


import com.wavelabs.sb.documents.VendorBankDetail;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author ts
 */
public interface VendorBankRepository extends MongoRepository<VendorBankDetail, String>{

    Optional<VendorBankDetail> findByVendorId(String vendorId);
    
}
