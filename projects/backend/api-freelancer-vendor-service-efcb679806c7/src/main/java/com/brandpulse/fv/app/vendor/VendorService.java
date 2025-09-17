/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.vendor;

import com.brandpulse.fv.api.dto.BankDetailDto;

import com.brandpulse.fv.api.dto.SkillCategoryDto;
import com.brandpulse.fv.api.dto.SkillRequestDto;
import com.brandpulse.fv.api.dto.SuccessLoginUpdateDto;
import com.brandpulse.fv.api.dto.VendorBasicProfileRequestDto;
import com.brandpulse.fv.api.dto.VendorProfileDto;
import com.brandpulse.fv.api.dto.VendorUserCredentialDto;
import com.brandpulse.fv.api.dto.VendorUserRequestDto;
import com.brandpulse.fv.api.dto.VendorUserStatMonthWiseDto;
import com.brandpulse.fv.api.dto.VendorUserUpdateRequestDto;
import com.brandpulse.fv.app.job.JobCandidateRepository;
import com.brandpulse.fv.app.job.JobCandidateStatMonthWise;
import com.brandpulse.fv.app.skill.Skill;
import com.brandpulse.fv.app.skill.SkillService;
import com.brandpulse.fv.common.childDocument.AssociatedSkill;
import com.brandpulse.fv.common.childDocument.GpsLocation;
import com.brandpulse.fv.common.enums.Status;
import com.brandpulse.fv.common.enums.UserType;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.AesEncryptionUtil;
import com.brandpulse.fv.util.ClassUtil;
import com.brandpulse.fv.util.SecurityUtil;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

/**
 *
 * @author ts
 */
@Service
public class VendorService {

    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    JobCandidateRepository jobCandidateRepository;

    @Autowired
    VendorBankRepository vendorBankRepository;

    @Autowired
    SkillService skillService;

    @Autowired
    AesEncryptionUtil aesEncryption;

    @Autowired
    VendorUserRepository vendorUserRepository;

    @Autowired
    VendorUserCredentialRepository vendorUserCredentialRepository;

    @Autowired
    VendorCredentialRepository vendorCredentialRepository;

    @Autowired
    AesEncryptionUtil aesEncryptionUtil;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Vendor getVendorById(String vendorId) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVV001));

        return vendor;
    }

    public Vendor getVendorByRef(String refNo) {

        Vendor vendor = vendorRepository.findByVendorRefNo(refNo)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVV002));
        return vendor;
    }

    public VendorCredential getVendorCredentialByRef(String refNo) {

        VendorCredential vendorCredential = vendorCredentialRepository.findByUserName(refNo)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVV001));
        return vendorCredential;
    }

    public VendorCredential getVendorCredentialByVendorId(String userId) {

        VendorCredential vendorCredential = vendorCredentialRepository.findByVendorId(userId)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVV001));
        return vendorCredential;
    }

    public VendorUserCredential getVendorUserCredentialByVendorUserId(String userId) {

        VendorUserCredential vendorUserCredential = vendorUserCredentialRepository.findByVendorUserId(userId)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVV002));
        return vendorUserCredential;
    }

    public VendorProfileDto getProfile(String vendorId) {
        Vendor vendor = getVendorById(vendorId);
        VendorProfileDto vendorProfileDto = ClassUtil.convert(vendor, VendorProfileDto.class);

        Optional<VendorBankDetail> vendorBankDetailO = vendorBankRepository.findByVendorId(vendorId);

        if (vendorBankDetailO.isPresent()) {

            BankDetailDto vendorBankDetailDto = ClassUtil.convert(vendorBankDetailO.get(), BankDetailDto.class);
            vendorProfileDto.setBankDetail(vendorBankDetailDto);
        }

        // Getting Array list of skills
        List<AssociatedSkill> vendorSkill = vendor.getSkills();
        if (vendorSkill != null) {

            List<SkillCategoryDto> skillCategoryDto = skillService.getSkillCategory(vendorSkill);
            vendorProfileDto.setSkillCategory(skillCategoryDto);
        }
        setProfileCompletionPercentage(vendor, vendorProfileDto);

        return vendorProfileDto;

    }

    public boolean setProfileCompletionPercentage(Vendor vendor, VendorProfileDto vendorProfileDto) {
        int profileCompletionPercentage = 10;
        boolean isProfileCompleted = false;

        if (vendor.isProfileCompleted()) {
            return true;
        }

        if (vendorProfileDto.getVendorName() != null) {
            profileCompletionPercentage += 10;
        }

        if (vendorProfileDto.getCompanyIncorporatedAt() != null) {
            profileCompletionPercentage += 10;
        }

        if (vendorProfileDto.getCompanyLogo() != null) {
            profileCompletionPercentage += 10;
        }

        if (vendorProfileDto.getAddress() != null) {
            profileCompletionPercentage += 10;
        }

        if (vendorProfileDto.getExperienceInYear() > 0 && vendorProfileDto.getWorkHighlights() != null) {
            profileCompletionPercentage += 10;
        }

        if (vendorProfileDto.getPortfolioUrl() != null) {
            profileCompletionPercentage += 10;
        }

        if (vendorProfileDto.getBankDetail() != null) {
            profileCompletionPercentage += 10;
        }

        if (vendorProfileDto.getSkillCategory().size() > 0) {
            profileCompletionPercentage += 10;
        }

        if (vendorProfileDto.getSpocDetail() != null) {
            profileCompletionPercentage += 10;
        }

        if (profileCompletionPercentage == 100) {
            isProfileCompleted = true;
        }

        if (vendor.getProfileCompletionPercentage() != profileCompletionPercentage) {
            vendorProfileDto.setProfileCompletionPercentage(profileCompletionPercentage);
            vendorProfileDto.setProfileCompleted(isProfileCompleted);

            vendor.setProfileCompletionPercentage(profileCompletionPercentage);
            vendor.setProfileCompleted(isProfileCompleted);
            vendorRepository.save(vendor);
        }
        return true;
    }

    public void updateBasicProfileDetails(String vendorId, VendorBasicProfileRequestDto vbprd) {

        Vendor vendor = getVendorById(vendorId);

        vendor.setAddress(vbprd.getAddress());

        vendor.setExperienceInYear(vbprd.getExperienceInYear());
        vendor.setWorkHighlights(vbprd.getWorkHighlights());
        vendor.setSpocDetail(vbprd.getSpocDetails());

        vendorRepository.save(vendor);
    }

    public void updateSkill(String vendorId, SkillRequestDto skillRequestDto) {
        Vendor vendor = getVendorById(vendorId);
        List<AssociatedSkill> vendorSkill = vendor.getSkills();

        // remove logic
        vendorSkill = vendorSkill.stream()
                .filter(vs -> !skillRequestDto.getSkillToRemove().contains(vs.getId()))
                .collect(Collectors.toList());

        // add/update logic
        List<AssociatedSkill> skillToAdd = skillRequestDto.getSkillToAdd();
        List<String> skillAddIds = skillToAdd.stream().map(sta -> sta.getId()).collect(Collectors.toList());
        List<Skill> skills = skillService.getActiveSkillByIds(skillAddIds);

        if (skillToAdd.size() != skills.size()) {
            throw new ServiceException(ErrorCodeConstant.FV0011);
        }

        for (AssociatedSkill as : skillToAdd) {
            boolean isExist = false;
            for (int i = 0; i < vendorSkill.size(); i++) {
                if (vendorSkill.get(i).getId().equals(as.getId())) {
                    vendorSkill.get(i).setExperience(as.getExperience());
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                vendorSkill.add(as);
            }
        }

        vendor.setSkills(vendorSkill);
        vendorRepository.save(vendor);
    }

    public void updateBank(String vendorId, BankDetailDto bankDetailDto) {
        Optional<VendorBankDetail> vendorBankDetailO = vendorBankRepository.findByVendorId(vendorId);

        VendorBankDetail vendorBank = new VendorBankDetail();

        if (vendorBankDetailO.isPresent()) {
            vendorBank = vendorBankDetailO.get();
        }

        vendorBank.setVendorId(vendorId);
        vendorBank.setBankName(bankDetailDto.getBankName());
        vendorBank.setAccountHolderName(bankDetailDto.getAccountHolderName());
        vendorBank.setAccountNumber(bankDetailDto.getAccountNumber());
        vendorBank.setBranch(bankDetailDto.getBranch());
        vendorBank.setIfscCode(bankDetailDto.getIfscCode());
        vendorBankRepository.save(vendorBank);

    }

    public void updateCompanyLogo(String vendorId, String profileImagePath) {
        Vendor vendor = getVendorById(vendorId);

        vendor.setCompanyLogo(profileImagePath);
        vendorRepository.save(vendor);
    }

    public void updatePortfolio(String vendorId, String portfolioPath) {
        Vendor vendor = getVendorById(vendorId);

        vendor.setPortfolioUrl(portfolioPath);
        vendorRepository.save(vendor);
    }

    public VendorUser getVendorUserById(String vendorUserId, Token token) {
        VendorUser vendorUser = vendorUserRepository.findById(vendorUserId)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVV002));

        if ((token != null && token.getUserType().equals(UserType.VENDOR)) && (!vendorUser.getVendorId().equals(token.getUserId()))) {
            throw new ServiceException(ErrorCodeConstant.FVV004);
        }
        return vendorUser;
    }

    public VendorUser getVendorUserByRef(String refNo) {
        VendorUser vendorUser = vendorUserRepository.findByVendorUserRefNo(refNo)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVV002));
        return vendorUser;
    }

    public VendorUserCredential getVendorUserCredentialByRef(String refNo) {
        VendorUserCredential vendorUserCredential = vendorUserCredentialRepository.findByUserName(refNo)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVV002));
        return vendorUserCredential;
    }

    private VendorUserCredential getVendorUserCredential(String userId, Token token) {
        VendorUserCredential vendorUserCredential = vendorUserCredentialRepository.findByVendorUserId(userId)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVV002));

        if ((token.getUserType().equals(UserType.VENDOR)) && (!vendorUserCredential.getVendorId().equals(token.getUserId()))) {
            throw new ServiceException(ErrorCodeConstant.FVV004);

        }

        return vendorUserCredential;
    }

    public String generateVendorUserRef(String firstName, String lastName) {
        String refNo = "VU";
        if (firstName != null) {
            refNo += (firstName.substring(0, 1)).toUpperCase();
        }
        if (lastName != null) {
            refNo += (lastName.substring(0, 1)).toUpperCase();
        }

        refNo += SecurityUtil.generateOtp();

        return refNo;
    }

    public Page<VendorUser> getVendorUserList(Pageable pageable, Token token, String search, String userName,
            String userCode, String state, String status) {

        Query query = new Query();
        query.addCriteria(Criteria.where("vendorId").is(token.getUserId()));

        if (search != null) {
            query.addCriteria(Criteria.where("*").in(search));
        }

        if (userName != null) {
            query.addCriteria(Criteria.where("firstName")
                    .regex(Pattern.compile(userName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (userCode != null) {
            query.addCriteria(Criteria.where("vendorUserRefNo")
                    .regex(Pattern.compile(userCode, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (state != null) {
            query.addCriteria(Criteria.where("address.state")
                    .regex(Pattern.compile(state, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }
        
        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        long count = mongoTemplate.count(query, VendorUser.class);
        
        if (pageable != null) {
            query.with(pageable);
        } else {
            pageable = Pageable.ofSize((int) count);
        }
        
        List<VendorUser> result = mongoTemplate.find(query, VendorUser.class);
        Page<VendorUser> vendorUser = new PageImpl<>(result, pageable, count);

        return vendorUser;
    }

    public void createVendorUser(VendorUserRequestDto vendorUserRequestDto, Token token) {
        String userName = generateVendorUserRef(vendorUserRequestDto.getFirstName(),
                vendorUserRequestDto.getLastName());

        Optional<VendorUser> vendorUserO = vendorUserRepository.findByEmail(vendorUserRequestDto.getEmail());
        if (vendorUserO.isPresent()) {
            throw new ServiceException(ErrorCodeConstant.FVV003);
        }

        VendorUser vendorUser = ClassUtil.convert(vendorUserRequestDto, VendorUser.class);
        vendorUser.setVendorId(token.getUserId());
        vendorUser.setStatus(Status.ACTIVE);
        vendorUser.setVendorUserRefNo(userName);
        vendorUser = vendorUserRepository.save(vendorUser);

        VendorUserCredential vendorUserCredential = new VendorUserCredential();
        vendorUserCredential.setVendorId(token.getUserId());
        vendorUserCredential.setVendorUserId(vendorUser.getId());
        vendorUserCredential.setUserName(userName);
        vendorUserCredential.setPassword(aesEncryptionUtil.encrypt(SecurityUtil.generateOtp()));
        vendorUserCredentialRepository.save(vendorUserCredential);
    }

    public void updateVendorUser(String vendorUserId, VendorUserUpdateRequestDto vendorUserUpdateRequestDto,
            Token token) {
        VendorUser vendorUser = getVendorUserById(vendorUserId, token);

        vendorUser.setFirstName(vendorUserUpdateRequestDto.getFirstName());
        vendorUser.setMiddleName(vendorUserUpdateRequestDto.getMiddleName());
        vendorUser.setLastName(vendorUserUpdateRequestDto.getLastName());
        vendorUser.setAddress(vendorUserUpdateRequestDto.getAddress());
        vendorUserRepository.save(vendorUser);
    }

    public void vendorUserDeactivate(String vendorUserId, Token token) {
        VendorUser vendorUser = getVendorUserById(vendorUserId, token);

        vendorUser.setStatus(Status.INACTIVE);
        vendorUserRepository.save(vendorUser);
    }

    public void vendorUserActivate(String vendorUserId, Token token) {
        VendorUser vendorUser = getVendorUserById(vendorUserId, token);

        vendorUser.setStatus(Status.ACTIVE);
        vendorUserRepository.save(vendorUser);
    }

    public void vendorUserChangePassword(String userId, String newPassword, Token token) {
        VendorUserCredential vendorUserCredential = getVendorUserCredential(userId, token);
        vendorUserCredential.setPassword(aesEncryptionUtil.encrypt(newPassword));
        vendorUserCredentialRepository.save(vendorUserCredential);
    }

    public void updateVendorUserImage(String vendorUserId, String profileImagePath, Token token) {
        VendorUser vendorUser = getVendorUserById(vendorUserId, token);
        vendorUser.setProfileImage(profileImagePath);
        vendorUserRepository.save(vendorUser);
    }

    public void successVendorUserLoginUpdate(VendorUser vendorUser, SuccessLoginUpdateDto slud) {
        GpsLocation gpsLocation = vendorUser.getGpsLocation();
        if (gpsLocation == null) {
            gpsLocation = new GpsLocation();
        }

        if (slud.getLat() != 0) {
            gpsLocation.setLat(slud.getLat());
        }
        if (slud.getLng() != 0) {
            gpsLocation.setLng(slud.getLng());
        }

        if (slud.getNotificationId() != null) {
            vendorUser.setNotificationId(slud.getNotificationId());
        }

        if (slud.getAppVersion() != null) {
            vendorUser.setAppVersion(slud.getAppVersion());
        }

        vendorUser.setLastLoginAt(Instant.now());
        vendorUser.setLastFailedLoginTryCount(0);
        vendorUser.setLastFailedLoginTryAt(null);
        vendorUser.setGpsLocation(gpsLocation);

        vendorUserRepository.save(vendorUser);

    }

    public void successVendorLoginUpdate(Vendor vendor, SuccessLoginUpdateDto slud) {
        GpsLocation gpsLocation = vendor.getGpsLocation();
        if (gpsLocation == null) {
            gpsLocation = new GpsLocation();
        }

        if (slud.getLat() != 0) {
            gpsLocation.setLat(slud.getLat());
        }
        if (slud.getLng() != 0) {
            gpsLocation.setLng(slud.getLng());
        }

        if (slud.getNotificationId() != null) {
            vendor.setNotificationId(slud.getNotificationId());
        }

        if (slud.getAppVersion() != null) {
            vendor.setAppVersion(slud.getAppVersion());
        }

        vendor.setLastLoginAt(Instant.now());
        vendor.setLastFailedLoginTryCount(0);
        vendor.setLastFailedLoginTryAt(null);
        vendor.setGpsLocation(gpsLocation);

        vendorRepository.save(vendor);
    }

    public void changeVendorPassword(String userId, String oldPassword, String newPassword) {
        VendorCredential vendorCredential = getVendorCredentialByVendorId(userId);

        if (!aesEncryptionUtil.encrypt(oldPassword).equalsIgnoreCase(vendorCredential.getPassword())) {
            throw new ServiceException(ErrorCodeConstant.FVV006);
        }

        vendorCredential.setPassword(aesEncryptionUtil.encrypt(newPassword));
        vendorCredentialRepository.save(vendorCredential);
    }

    public Page<Vendor> getVendorList(Pageable pageable, Token token, String id, String vendorRefNo, String vendorName,
            String mobile, String name, String state, String status, OffsetDateTime from, OffsetDateTime to) {

        Query query = new Query();

        if (id != null) {
            query.addCriteria(Criteria.where("id").is(token.getUserId()));
        }

        if (vendorRefNo != null) {
            query.addCriteria(Criteria.where("vendorRefNo")
                    .regex(Pattern.compile(vendorRefNo, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (vendorName != null) {
            query.addCriteria(Criteria.where("vendorName")
                    .regex(Pattern.compile(vendorName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (mobile != null) {
            query.addCriteria(Criteria.where("spocDetail.mobile")
                    .regex(Pattern.compile(mobile, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (name != null) {
            query.addCriteria(Criteria.where("spocDetail.name")
                    .regex(Pattern.compile(name, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (state != null) {
            query.addCriteria(Criteria.where("address.state")
                    .regex(Pattern.compile(state, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status")
                    .regex(Pattern.compile(status, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (from != null) {
            query.addCriteria(Criteria.where("from").gte(from));
        }

        if (to != null) {
            query.addCriteria(Criteria.where("to").lt(to));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        long count = mongoTemplate.count(query, Vendor.class);

        // get selected records
        if (pageable != null) {
            query.with(pageable);
        }
        List<Vendor> result = mongoTemplate.find(query, Vendor.class);
        Page<Vendor> vendor = new PageImpl<>(result, pageable, count);

        return vendor;
    }

    public VendorCandidateDashboardStats vendorDashboardStats(Token token) {
        VendorCandidateDashboardStats vcds = new VendorCandidateDashboardStats();
        Integer totalJobs = 0;
        Integer totalUsers = 0;
        Integer totalCompletedJobs = 0;
        Integer totalJobsInprogress = 0;
        Integer activeUsers = 0;
        Integer inActiveUsers = 0;

        try {
            totalJobsInprogress = jobCandidateRepository.inprogressJobsByUserIdAndUserType(token.getUserId(),
                    token.getUserTypeEnum());
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            totalCompletedJobs = jobCandidateRepository.completedJobsByUserIdAndUserType(token.getUserId(),
                    token.getUserTypeEnum());
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            activeUsers = vendorUserRepository.activeUsersByVendorId(token.getUserId());
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            totalUsers = vendorUserRepository.totalUsersByVendorId(token.getUserId());
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (totalJobsInprogress == null) {
            totalJobsInprogress = 0;
        }

        if (totalCompletedJobs == null) {
            totalCompletedJobs = 0;
        }

        if (activeUsers == null) {
            activeUsers = 0;
        }

        totalJobs = totalJobsInprogress + totalCompletedJobs;

        inActiveUsers = totalUsers - activeUsers;

        vcds.setTotalJobsInprogress(totalJobsInprogress);
        vcds.setTotalCompletedJobs(totalCompletedJobs);
        vcds.setTotalJobs(totalJobs);
        vcds.setActiveUsers(activeUsers);
        vcds.setTotalUsers(totalUsers);
        vcds.setInActiveUsers(inActiveUsers);
        return vcds;
    }

    public List<VendorUserStatMonthWiseDto> vendorUserStats(String year, Token token) {
        List<VendorUserStatMonthWiseDto> vendorUserStatMonthWiseDtos = vendorUserRepository.countVendorUserByMonthAndFilterByYear(token.getUserId(), Integer.parseInt(year));
        if (vendorUserStatMonthWiseDtos.isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.FVU001);
        }
        return vendorUserStatMonthWiseDtos;
    }

    public List<JobCandidateStatMonthWise> vendorJobStats(String year, Token token) {
        List<JobCandidateStatMonthWise> vendorUserStatMonthWiseDtos = jobCandidateRepository.countJobByMonthAndFilterByYear(token.getUserId(), token.getUserTypeEnum(), Integer.parseInt(year));
        if (vendorUserStatMonthWiseDtos.isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.FVV007);
        }
        return vendorUserStatMonthWiseDtos;
    }

    public void changeVendorUserPassword(String userId, String oldPassword, String newPassword) {
        VendorUserCredential vendorUserCredential = getVendorUserCredentialByVendorUserId(userId);

        if (!aesEncryptionUtil.encrypt(oldPassword).equalsIgnoreCase(vendorUserCredential.getPassword())) {
            throw new ServiceException(ErrorCodeConstant.FVV006);
        }

        vendorUserCredential.setPassword(aesEncryptionUtil.encrypt(newPassword));
        vendorUserCredentialRepository.save(vendorUserCredential);
    }

    public VendorUserCredentialDto fetchCredentialsByVendorUserId(String vendorUserId) {

        Optional<VendorUserCredential> vendorUserOptional = vendorUserCredentialRepository.findByVendorUserId(vendorUserId);

        if (vendorUserOptional.isPresent()) {
            VendorUserCredential vendorUserCredential = vendorUserOptional.get();
            VendorUserCredentialDto response = new VendorUserCredentialDto();
            BeanUtils.copyProperties(vendorUserCredential, response);
            response.setPassword(aesEncryption.decrypt(vendorUserCredential.getPassword()));
            response.setJoiningDate(vendorUserCredential.getCreatedAt());
            response.setVendorUserId(vendorUserCredential.getVendorUserId());
            return response;
        } else {
            throw new ServiceException(ErrorCodeConstant.FVU001);
        }
    }
}
