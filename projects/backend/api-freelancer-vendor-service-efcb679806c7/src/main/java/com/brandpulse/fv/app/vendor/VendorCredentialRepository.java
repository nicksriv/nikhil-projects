/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.vendor;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ts
 */
@Repository
public interface VendorCredentialRepository extends MongoRepository<VendorCredential, String>{

    public Optional<VendorCredential> findByUserNameAndPassword(String refNo, String password);
    public Optional<VendorCredential> findByUserName(String refNo);
    public Optional<VendorCredential> findByVendorId(String userId);
    
}
