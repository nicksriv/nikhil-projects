/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.common.validator;

import com.brandpulse.job.common.childDocument.Address;
import com.brandpulse.job.common.childDocument.GpsLocation;
import com.brandpulse.job.exception.ErrorCodeConstant;
import com.brandpulse.job.exception.ServiceException;
import com.brandpulse.job.util.ValidatorUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Suhail Tamboli
 */
@Component
public class CommonValidator {

    public boolean isValidAddress(Address address) {

        if (address == null) {
            throw new ServiceException(ErrorCodeConstant.JC001);
        }

        if (address.getLocation() == null || (address.getLocation() != null && address.getLocation().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.JC001);
        }

        if (address.getCountry() == null || (address.getCountry() != null && address.getCountry().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.JC001);
        }

        if (address.getState() == null || (address.getState() != null && address.getState().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.JC001);
        }

        if (address.getCity() == null || (address.getCity() != null && address.getCity().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.JC001);
        }

        if (address.getPinCode() == null || (address.getPinCode() != null && address.getPinCode().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.JC001);
        }

        if (!ValidatorUtil.isPinCode(address.getPinCode())) {
            throw new ServiceException(ErrorCodeConstant.JC002);
        }

        return true;
    }

    public boolean isValidGPS(GpsLocation gpsLocation) {

        if (gpsLocation == null) {
            throw new ServiceException(ErrorCodeConstant.JC010);
        }

        return true;
    }

    public boolean isValidImage(MultipartFile file) {
        
        if(file == null) {
            throw new ServiceException(ErrorCodeConstant.JC005);
        }

        if (!(file.getOriginalFilename().toLowerCase().endsWith(".jpeg") || 
                file.getOriginalFilename().toLowerCase().endsWith(".png"))) {
            throw new ServiceException(ErrorCodeConstant.JC006);
        }
        
        if ((file.getSize() <= 0)) {
            throw new ServiceException(ErrorCodeConstant.JC006);
        }

        return true;
    }
    
    public boolean isValidDoc(MultipartFile file) {
        
        if(file == null) {
            throw new ServiceException(ErrorCodeConstant.JC007);
        }

        if (!(file.getOriginalFilename().toLowerCase().endsWith(".doc") || 
                file.getOriginalFilename().toLowerCase().endsWith(".docx") || 
                file.getOriginalFilename().toLowerCase().endsWith(".pdf"))) {
            throw new ServiceException(ErrorCodeConstant.JC008);
        }
        
        if ((file.getSize() <= 0)) {
            throw new ServiceException(ErrorCodeConstant.JC008);
        }

        return true;
    }
}
