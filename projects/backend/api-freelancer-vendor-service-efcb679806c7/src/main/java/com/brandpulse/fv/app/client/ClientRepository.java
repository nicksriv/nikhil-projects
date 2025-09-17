/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.client;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ts
 */
@Repository
public interface ClientRepository extends MongoRepository<Client, String> {

    Optional<Client> findByclientId(String clientId);

    boolean existsByClientId(String clientId);

    
    
}
