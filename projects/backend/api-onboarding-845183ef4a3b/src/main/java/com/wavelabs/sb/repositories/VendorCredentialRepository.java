package com.wavelabs.sb.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.VendorCredential;

public interface VendorCredentialRepository extends MongoRepository<VendorCredential, String>{
    
    public Optional<VendorCredential> findByUserNameAndPassword(String refNo, String password);
    public Optional<VendorCredential> findByUserName(String refNo);
 //   public Optional<VendorCredential> findByVendorId(String userId);
    public  Optional<VendorCredential> findByVendorId(String vendorId);
    

}
