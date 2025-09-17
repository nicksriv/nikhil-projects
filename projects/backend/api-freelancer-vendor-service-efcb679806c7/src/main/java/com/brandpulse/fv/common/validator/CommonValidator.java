/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.common.validator;

import com.brandpulse.fv.api.dto.WorkDetailDto;
import com.brandpulse.fv.common.childDocument.Address;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.util.ValidatorUtil;
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
            throw new ServiceException(ErrorCodeConstant.FVC001);
        }
        if (address.getLocation() == null || (address.getLocation() != null && address.getLocation().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.FVC001);
        }
        if (address.getCountry() == null || (address.getCountry() != null && address.getCountry().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.FVC001);
        }
        if (address.getState() == null || (address.getState() != null && address.getState().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.FVC001);
        }
        if (address.getCity() == null || (address.getCity() != null && address.getCity().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.FVC001);
        }
        if (address.getPinCode() == null || (address.getPinCode() != null && address.getPinCode().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.FVC001);
        }
        if (!ValidatorUtil.isPinCode(address.getPinCode())) {
            throw new ServiceException(ErrorCodeConstant.FVC002);
        }
        return true;
    }

    public boolean isValidWork(WorkDetailDto workDetailDto) {

        if (workDetailDto == null) {
            throw new ServiceException(ErrorCodeConstant.FVC003);
        }
        if (workDetailDto.getCompany() == null || (workDetailDto.getCompany() != null && workDetailDto.getCompany().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.FVC003);
        }
        if (workDetailDto.getDesignation() == null || (workDetailDto.getDesignation() != null && workDetailDto.getDesignation().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.FVC003);
        }
        if (workDetailDto.getWorkDescription() == null || (workDetailDto.getWorkDescription() != null && workDetailDto.getWorkDescription().isEmpty())) {
            throw new ServiceException(ErrorCodeConstant.FVC003);
        }
        if (workDetailDto.getStartDate() == null || workDetailDto.getEndDate() == null) {
            throw new ServiceException(ErrorCodeConstant.FVC003);
        }
        if (workDetailDto.getStartDate().after(workDetailDto.getEndDate())) {
            throw new ServiceException(ErrorCodeConstant.FVC004);
        }
        return true;
    }

    public boolean isValidImage(MultipartFile file) {

        if (file == null) {
            throw new ServiceException(ErrorCodeConstant.FVC005);
        }

        if (!(file.getOriginalFilename().toLowerCase().endsWith(".jpeg")
                || file.getOriginalFilename().toLowerCase().endsWith(".png")
                || file.getOriginalFilename().toLowerCase().endsWith(".jpg"))) {
            throw new ServiceException(ErrorCodeConstant.FVC006);
        }

        if (file.getSize() <= 0) {
            throw new ServiceException(ErrorCodeConstant.FVC006);
        }

        return true;
    }

    public boolean isValidDoc(MultipartFile file) {

        if (file == null) {
            throw new ServiceException(ErrorCodeConstant.FVC007);
        }

        if (!(file.getOriginalFilename().toLowerCase().endsWith(".doc")
                || file.getOriginalFilename().toLowerCase().endsWith(".docx")
                || file.getOriginalFilename().toLowerCase().endsWith(".ppt")
                || file.getOriginalFilename().toLowerCase().endsWith(".pdf"))) {
            throw new ServiceException(ErrorCodeConstant.FVC008);
        }

        if ((file.getSize() <= 0)) {
            throw new ServiceException(ErrorCodeConstant.FVC008);
        }

        return true;
    }
}
