/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.wavelabs.sb.repositories;

import com.wavelabs.sb.documents.Vendor;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author dell
 */
public interface VendorRepository extends MongoRepository<Vendor, String> {

    Optional<Vendor> findByVendorRefNo(String refNo);
    Optional<Vendor> findById(String id);



}
