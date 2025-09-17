/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wavelabs.sb.services;

import com.wavelabs.sb.documents.childDocuments.AssociatedSkill;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.Skill;
import com.wavelabs.sb.documents.Vendor;
import com.wavelabs.sb.documents.VendorBankDetail;
import com.wavelabs.sb.documents.VendorCredential;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.repositories.VendorBankRepository;
import com.wavelabs.sb.repositories.VendorCredentialRepository;
import com.wavelabs.sb.repositories.VendorRepository;
import com.wavelabs.sb.repositories.VendorUserRepository;
import com.wavelabs.sb.request.EditPasswordRequest;
import com.wavelabs.sb.request.VendorDetailRequest;
import com.wavelabs.sb.response.BankDetailDto;
import com.wavelabs.sb.response.SkillCategoryDto;
import com.wavelabs.sb.response.SkillDto;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.VendorCredentialResponse;
import com.wavelabs.sb.response.VendorDetailResponse;
import com.wavelabs.sb.response.VendorListResponse;
import com.wavelabs.sb.response.VendorUserStatResponse;
import com.wavelabs.sb.utils.AesEncryptionUtil;
import com.wavelabs.sb.utils.ClassUtil;
import com.wavelabs.sb.utils.SecurityUtil;
import org.apache.commons.lang3.StringUtils;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Sort;

/**
 *
 * @author dell
 */
@Service
public class VendorService {

    private static final Logger LOGGER = LoggerFactory.getLogger(VendorService.class);

    @Autowired
    VendorUserRepository vendorUserRepository;

    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    VendorBankRepository vendorBankRepository;

    @Autowired
    SkillService skillService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    VendorCredentialRepository vendorCredentialRepository;

    @Autowired
    AesEncryptionUtil aesEncryptionUtil;

    @Autowired
    EmailService emailService;

    public Vendor getVendorById(String vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new BadRequestException("Please provide valid vendor Id : " + vendorId));
        return vendor;
    }

    public VendorDetailResponse getVendorDetails(String vendorId) {
        Vendor vendor = getVendorById(vendorId);
        VendorDetailResponse vendorDetailsDto = ClassUtil.convert(vendor, VendorDetailResponse.class);

        Optional<VendorBankDetail> vendorBankDetailO = vendorBankRepository.findByVendorId(vendorId);
        if (vendorBankDetailO.isPresent()) {

            BankDetailDto vendorBankDetailDto = ClassUtil.convert(vendorBankDetailO.get(), BankDetailDto.class);
            vendorDetailsDto.setBankDetail(vendorBankDetailDto);

        }

        // Getting Array list of skills
        List<AssociatedSkill> vendorSkill = vendor.getSkills();
        if (!vendorSkill.isEmpty()) {

            List<SkillCategoryDto> skillCategoryDto = skillService.getSkillCategory(vendorSkill);
            vendorDetailsDto.setSkillCategory(skillCategoryDto);
        }
        return vendorDetailsDto;
    }

    public Page<Vendor> getVendorList(Pageable pageable, String id, String vendorName, String vendorRefNo, String state,
            String skills, String status, Instant from, Instant to) {
        Query query = new Query();
        if (id != null) {
            query.addCriteria(Criteria.where("id"));
        }

        if (vendorName != null) {
            query.addCriteria(Criteria.where("vendorName")
                    .regex(Pattern.compile(vendorName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));

        }
        if (vendorRefNo != null) {
            query.addCriteria(Criteria.where("vendorRefNo")
                    .regex(Pattern.compile(vendorRefNo, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (state != null) {
            query.addCriteria(Criteria.where("address.state")
                    .regex(Pattern.compile(state, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }
        if (from != null && to == null) {
            query.addCriteria(Criteria.where("createdAt").gte(from));
        }

        if (to != null && from == null) {
            query.addCriteria(Criteria.where("createdAt").lt(to));
        }

        if (from != null && to != null) {
            query.addCriteria(
                    Criteria.where("")
                            .andOperator(
                                    Criteria.where("createdAt").lt(to),
                                    Criteria.where("createdAt").gte(from)));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        long count = mongoTemplate.count(query, Vendor.class);

        if (pageable != null) {
            query.with(pageable);
        } else {
            pageable = Pageable.ofSize((int) count);
        }
        if (pageable == null) {
            pageable = Pageable.unpaged();
        }
        List<Vendor> result = mongoTemplate.find(query, Vendor.class);
        // Associated skill filter
        if (skills != null && !skills.equals("")) {
            String[] skl = skills.split(",");
            result = result.stream().filter(r -> {
                if (r.getSkills() != null && r.getSkills().size() > 0) {
                    List<String> skillIds = r.getSkills().stream().map(s -> s.getId()).collect(Collectors.toList());
                    for (String skillId : skl) {
                        if (skillIds.contains(skillId)) {
                            return true;
                        }
                    }
                }
                return false;
            }).collect(Collectors.toList());
        }
        Page<Vendor> vendor = new PageImpl<>(result, pageable, count);

        return vendor;
    }

    public Page<VendorListResponse> getVendorDtoList(Page<Vendor> vendorPage) {
        List<Vendor> vendors = vendorPage.getContent();

        List<String> skillIds = new ArrayList<>();
        Map<String, List<String>> vendorViceSkillIds = new HashMap<>();

        for (int i = 0; i < vendors.size(); i++) {
            Vendor v = vendors.get(i);

            if (v.getSkills() == null) {
                vendorViceSkillIds.put(v.getId(), new ArrayList<>());
                continue;
            }

            List<String> vskillIds = v.getSkills().stream().map(as -> as.getId()).collect(Collectors.toList());
            skillIds.addAll(vskillIds);
            vendorViceSkillIds.put(v.getId(), vskillIds);
        }

        List<Skill> skillList = skillService.getActiveSkillByIds(skillIds);
        List<SkillDto> skillDtos = ClassUtil.convertList(skillList, SkillDto.class);

        Page<VendorListResponse> vendorPageDtos = vendorPage.map(v -> {
            VendorListResponse vld = ClassUtil.convert(v, VendorListResponse.class);
            List<String> ids = vendorViceSkillIds.get(vld.getId());
            List<SkillDto> sl = skillDtos.stream().filter(s -> ids.contains(s.getId())).collect(Collectors.toList());
            vld.setSkills(sl);
            return vld;
        });
        return vendorPageDtos;
    }

    // ---------------------------------------------------------------------------------------
    public String addVendorDetails(VendorDetailRequest vendorDetailRequest) {
        // get Vendor object
        Vendor ven = new Vendor();
        // set all properties to the vendor object
        ven.setVendorName(vendorDetailRequest.getVendorName());
        ven.setStatus(Status.ACTIVE);
        ven.setCompanyIncorporatedAt(vendorDetailRequest.getCompanyIncorporatedAt());
        ven.setWorkHighlights(vendorDetailRequest.getWorkHighlights());
        ven.setAddress(vendorDetailRequest.getAddress());
        ven.setGpsLocation(vendorDetailRequest.getLocationGps());
        ven.setVendorRefNo("V" + SecurityUtil.generateOtp());
        ven.setCreatedAt(Instant.now());
        ven.setModifiedAt(Instant.now());

        ven.setSpocDetail(vendorDetailRequest.getSpocDetail());
        ven.setSkills(vendorDetailRequest.getSkills());

        vendorRepository.save(ven);

        VendorCredential vendorCredential = new VendorCredential();
        vendorCredential.setVendorId(ven.getId());
        vendorCredential.setUserName(ven.getVendorRefNo());
        vendorCredential.setCreatedAt(Instant.now());
        vendorCredential.setModifiedAt(Instant.now());

        String password = aesEncryptionUtil.encrypt(SecurityUtil.generateOtp());
        vendorCredential.setPassword(password);
        vendorCredentialRepository.save(vendorCredential);

        return ven.getId();
    }

    public void addBank(String vendorId, BankDetailDto bankDetailDto) {
        VendorBankDetail vendorBankDetail = new VendorBankDetail();
        vendorBankDetail.setVendorId(vendorId);
        vendorBankDetail.setAccountHolderName(bankDetailDto.getAccountHolderName());
        vendorBankDetail.setAccountNumber(bankDetailDto.getAccountNumber());
        vendorBankDetail.setIfscCode(bankDetailDto.getIfscCode());
        vendorBankDetail.setBranch(bankDetailDto.getBranch());
        vendorBankDetail.setBankName(bankDetailDto.getBankName());
        vendorBankDetail.setCreatedAt(Instant.now());
        vendorBankDetail.setModifiedAt(Instant.now());
        vendorBankRepository.save(vendorBankDetail);
    }

    public void updateVendorDetails(String id, VendorDetailRequest vendorDetailRequest) {

        Optional<Vendor> vendorO = vendorRepository.findById(id);
        if (!vendorO.isPresent()) {
            throw new BadRequestException("user id not exist" + id);
        }
        Vendor vendor = vendorO.get();

        vendor.setVendorName(vendorDetailRequest.getVendorName());

        vendor.setCompanyIncorporatedAt(vendorDetailRequest.getCompanyIncorporatedAt());
        vendor.setWorkHighlights(vendorDetailRequest.getWorkHighlights());
        vendor.setAddress(vendorDetailRequest.getAddress());
        vendor.setGpsLocation(vendorDetailRequest.getLocationGps());
        vendor.setSkills(vendorDetailRequest.getSkills());
        vendor.setSpocDetail(vendorDetailRequest.getSpocDetail());
        vendor.setCreatedAt(Instant.now());
        vendor.setModifiedAt(Instant.now());

        vendorRepository.save(vendor);
    }

    public void updateBank(String vendorId, BankDetailDto bankDetailDto) {
        Optional<VendorBankDetail> vendorBankDetailO = vendorBankRepository.findByVendorId(vendorId);
        if (!vendorBankDetailO.isPresent()) {
            throw new BadRequestException("the id is not present");
        }
        VendorBankDetail bankDetail = vendorBankDetailO.get();

        bankDetail.setBankName(bankDetailDto.getBankName());
        bankDetail.setAccountHolderName(bankDetailDto.getAccountHolderName());
        bankDetail.setAccountNumber(bankDetailDto.getAccountNumber());
        bankDetail.setBranch(bankDetailDto.getBranch());
        bankDetail.setIfscCode(bankDetailDto.getIfscCode());
        bankDetail.setCreatedAt(Instant.now());
        bankDetail.setModifiedAt(Instant.now());
        vendorBankRepository.save(bankDetail);

    }

    // vendor stats
    public VendorUserStatResponse vendorUserStats(String vendorId) {
        VendorUserStatResponse vus = new VendorUserStatResponse();
        Integer totalActiveUser = 0;
        Integer totalUser = 0;
        Integer totalInactiveUser = 0;

        try {
            totalActiveUser = vendorUserRepository.activeUsersByVendorIdAndUserType(vendorId);
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }

        try {
            totalInactiveUser = vendorUserRepository.inActiveUsersByVendorIdAndUserType(vendorId);
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }

        if (totalInactiveUser == null) {
            totalInactiveUser = 0;
        }

        if (totalActiveUser == null) {
            totalActiveUser = 0;
        }

        totalUser = totalInactiveUser + totalActiveUser;

        vus.setTotalActiveUser(totalActiveUser);
        vus.setTotalInactiveUser(totalInactiveUser);
        vus.setTotalUser(totalUser);

        return vus;

    }

 
  
    public void updateStatus(String vendorId, Status status) {
        Optional<Vendor> vendor0 = vendorRepository.findById(vendorId);
        if(vendor0.isPresent()) {
            Vendor vendor = vendor0.get();
            vendor.setStatus(status);
            vendorRepository.save(vendor);
        }
    }

    
    public void updateCompanyLogo(Vendor vendor,  String profileImagePath) {
        vendor.setCompanyLogo(profileImagePath);
        vendorRepository.save(vendor);
    }

    public void updatePortfolio(Vendor vendor,String portfolioPath) {
        vendor.setPortfolioUrl(portfolioPath);
        vendorRepository.save(vendor);
    }

    public SuccessResponse changePasswordOfVendor(String vendorId, EditPasswordRequest request) {

        LOGGER.info("change Password Of Vendor method Started");
        Optional<VendorCredential> vendorEntity = vendorCredentialRepository.findByVendorId(vendorId);
        if (vendorEntity.isPresent()) {
            if (vendorEntity.get() != null) {
                VendorCredential credentialsToUpdate = vendorEntity.get();
                String newPassword = aesEncryptionUtil.encrypt(request.getNewPassword());
                if (!StringUtils.isBlank(credentialsToUpdate.getPassword())
                        && !credentialsToUpdate.getPassword().equalsIgnoreCase(newPassword)) {
                    credentialsToUpdate.setModifiedAt(Instant.now());
                    credentialsToUpdate.setPassword(newPassword);
                    // credentialsToUpdate.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
                    // credentialsToUpdate.setModifiedUserType(details.getTypeOfUser());
                    vendorCredentialRepository.save(credentialsToUpdate);
                    // if (!StringUtils.isBlank(vendorEntity.get().getEmail())) {
                    // emailService.sendMail(vendorEntity.get().getEmail(), credentialsToUpdate,
                    // false);
                    // }
                    // else {
                    // LOGGER.error("change Password Of Client : Bad Request Exception - Password
                    // Cannot Be Changed");
                    // throw new BadRequestException(Constants.PASSWORD_CANNOT_BE_CHANGED);
                    // }
                } else {
                    LOGGER.error("change Password Of Vendor : Entity Not Found Exception");
                    throw new EntityNotFoundException(Constants.CREDENTIALS_NOT_FOUND_VENDOR + vendorId);
                }
            } else {
                LOGGER.error("change Password Of Vendor : Bad Request Exception - Active Vendor not found");
                throw new BadRequestException(vendorId + " " + Constants.ACTIVE_VENDOR_NOT_FOUND);
            }
        }

        SuccessResponse response = new SuccessResponse();
        response.setId(vendorId);
        response.setMessage(Constants.PASSWORD_CHANGE_SUCCESS);
        LOGGER.info("change Password Of Client method ended");
        return response;
    }

    public VendorCredentialResponse fetchCredentialsByVendorId(String vendorId) {
        LOGGER.info("fetch Credentials By Vendor Id method started");
        Optional<VendorCredential> vendorOptional = vendorCredentialRepository.findByVendorId(vendorId);
        if (vendorOptional.isPresent()) {
            if (vendorOptional.get() != null) {

                VendorCredential credentials = vendorOptional.get();
                VendorCredentialResponse response = new VendorCredentialResponse();
                BeanUtils.copyProperties(credentials, response);
                response.setUserName(credentials.getUserName());
                response.setPassword(aesEncryptionUtil.decrypt(credentials.getPassword()));
                response.setCreatedAt(credentials.getCreatedAt());

                LOGGER.info("fetch Credentials By Vendor Id method ended");
                return response;
            } else {
                LOGGER.error("fetch Credentials By Vendor Id : Entity Not Found Exception - credentials not found");
                throw new EntityNotFoundException(ErrorMessages.VENDOR_CREDENTIALS_NOT_FOUND);
            }

        } else {
            LOGGER.error("fetch Credentials By Vendor Id : Entity Not Found Exception - credentials not found");
            throw new EntityNotFoundException(ErrorMessages.VENDOR_NOT_FOUND);
        }
    }

}
