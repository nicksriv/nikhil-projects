/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.client;

import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ts
 */
@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    public Client getClientDetails(String clientId) {
        Client client;
        client = clientRepository.findById(clientId).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVCC01));
        return client;
    }

    public boolean isClientExists(String clientId) {
        boolean isAvailable = clientRepository.existsById(clientId);
        if (!isAvailable) {
            throw new ServiceException(ErrorCodeConstant.FVCC01);
        }
        return true;
    }
}
