/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.app.freelancer;

import com.brandpulse.fv.api.dto.BankDetailDto;
import com.brandpulse.fv.api.dto.FreelancerBasicProfileRequestDto;
import com.brandpulse.fv.api.dto.FreelancerKYCDto;
import com.brandpulse.fv.api.dto.FreelancerProfileDto;
import com.brandpulse.fv.api.dto.SkillCategoryDto;
import com.brandpulse.fv.api.dto.SkillRequestDto;
import com.brandpulse.fv.api.dto.SuccessLoginUpdateDto;
import com.brandpulse.fv.api.dto.WorkDetailDto;
import com.brandpulse.fv.app.skill.Skill;
import com.brandpulse.fv.common.childDocument.AssociatedSkill;
import com.brandpulse.fv.common.childDocument.GpsLocation;
import com.brandpulse.fv.common.enums.Status;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.util.ClassUtil;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.brandpulse.fv.app.skill.SkillService;
import com.brandpulse.fv.util.SecurityUtil;
import java.util.stream.Collectors;

/**
 *
 * @author Suhail Tamboli
 */
@Service
public class FreelancerService {

    @Autowired
    FreelancerRepository freelancerRepository;

    @Autowired
    FreelancerBankRepository freelancerBankRepository;

    @Autowired
    FreelancerWorkRepository freelancerWorkRepository;

    @Autowired
    SkillService skillService;

    public Freelancer getActiveFreelancerByMobile(String mobile) {

        Freelancer freelancer = freelancerRepository.findByMobile(mobile).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FV0001));

        if (freelancer.getStatus() != Status.ACTIVE) {
            throw new ServiceException(ErrorCodeConstant.FV0002);
        }

        return freelancer;
    }

    public Freelancer getFreelancerById(String freelancerId) {
        Freelancer freelancer = freelancerRepository.findById(freelancerId).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FV0001));
        return freelancer;
    }

    public String generateFreelancerRef(String firstName, String lastName) {
        String refNo = "F";
        if (firstName != null) {
            refNo += (firstName.substring(0, 1)).toUpperCase();
        }
        if (lastName != null) {
            refNo += (lastName.substring(0, 1)).toUpperCase();
        }

        refNo += SecurityUtil.generateOtp();

        return refNo;
    }

    public Freelancer createVerifiedFreelancer(String firstName, String middleName, String lastName, String mobile, String email) {

        Freelancer freelancer = new Freelancer();
        freelancer.setFreelancerRefNo(generateFreelancerRef(firstName, lastName));
        freelancer.setFirstName(firstName);
        freelancer.setMiddleName(middleName);
        freelancer.setLastName(lastName);
        freelancer.setMobile(mobile);
        freelancer.setMobileVerified(true);
        freelancer.setEmail(email);
        freelancer.setMobileVerified(true);
        freelancer.setStatus(Status.ACTIVE);

        freelancerRepository.save(freelancer);

        return freelancer;
    }

    public boolean isValidLoginTry(Freelancer freelancer) {
        int attempts = freelancer.getLastFailedLoginTryCount();
        int number = 60 * 15;
        Instant last15Minutes = Instant.now().minusSeconds(number);

        if (freelancer.getLastFailedLoginTryAt() != null && last15Minutes.isAfter(freelancer.getLastFailedLoginTryAt())) {
            attempts = 0;
        }

        if (attempts == 0) {
            freelancer.setLastFailedLoginTryAt(Instant.now());
        }

        attempts++;
        freelancer.setLastFailedLoginTryCount(attempts);
        freelancerRepository.save(freelancer);

        return attempts <= 3;
    }

    public boolean isUniqueMobile(String mobile) {
        boolean isMobileExists = freelancerRepository.existsByMobile(mobile);
        if (isMobileExists) {
            throw new ServiceException(ErrorCodeConstant.FV0005);
        }

        return true;
    }

    public boolean isUniqueEmail(String email) {
        boolean isEmailExists = freelancerRepository.existsByEmail(email);
        if (isEmailExists) {
            throw new ServiceException(ErrorCodeConstant.FV0006);
        }

        return true;
    }

    public void successLoginUpdate(Freelancer freelancer, SuccessLoginUpdateDto slud) {
        GpsLocation gpsLocation = freelancer.getGpsLocation();

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
            freelancer.setNotificationId(slud.getNotificationId());
        }

        if (slud.getAppVersion() != null) {
            freelancer.setAppVersion(slud.getAppVersion());
        }

        freelancer.setLastLoginAt(Instant.now());
        freelancer.setLastFailedLoginTryCount(0);
        freelancer.setLastFailedLoginTryAt(null);
        freelancer.setGpsLocation(gpsLocation);

        freelancerRepository.save(freelancer);
    }

    public FreelancerProfileDto getProfile(String freelancerId) {

        Freelancer freelancer = getFreelancerById(freelancerId);
        FreelancerProfileDto freelancerProfileDto = ClassUtil.convert(freelancer, FreelancerProfileDto.class);

        Optional<FreelancerBankDetail> freelancerBankDetailO = freelancerBankRepository.findByFreelancerId(freelancerId);
        List<FreelancerWorkDetail> freelancerWorkDetailList = freelancerWorkRepository.findByFreelancerId(freelancerId);

        if (freelancerBankDetailO.isPresent()) {

            BankDetailDto freelancerBankDetailDto = ClassUtil.convert(freelancerBankDetailO.get(), BankDetailDto.class);
            freelancerProfileDto.setBankDetail(freelancerBankDetailDto);
        }

        List<WorkDetailDto> freelancerWorkDetailListDto = ClassUtil.convertList(freelancerWorkDetailList, WorkDetailDto.class);
        freelancerProfileDto.setWorkDetail(freelancerWorkDetailListDto);

        //Getting Array list of skills
        List<AssociatedSkill> freelancerSkill = freelancer.getSkills();
        if (freelancerSkill != null) {

            List<SkillCategoryDto> skillCategoryDto = skillService.getSkillCategory(freelancerSkill);
            freelancerProfileDto.setSkillCategory(skillCategoryDto);
        }

        setProfileCompletionPercentage(freelancer, freelancerProfileDto);

        return freelancerProfileDto;

    }

    public boolean setProfileCompletionPercentage(Freelancer freelancer, FreelancerProfileDto freelancerProfileDto) {
        int profileCompletionPercentage = 10;
        boolean isProfileCompleted = false;

        if (freelancer.isProfileCompleted()) {
            return true;
        }

        if (freelancerProfileDto.getFirstName() != null) {
            profileCompletionPercentage += 10;
        }

        if (freelancerProfileDto.getAddress() != null) {
            profileCompletionPercentage += 10;
        }

        if (freelancerProfileDto.getEducation() != null) {
            profileCompletionPercentage += 10;
        }

        if (freelancerProfileDto.getExperienceInYear() > 0) {
            profileCompletionPercentage += 10;
        }

        if (freelancerProfileDto.getResumeUrl() != null) {
            profileCompletionPercentage += 10;
        }

        if (freelancerProfileDto.getAdhaarNumber() != null || freelancerProfileDto.getPanNumber() != null) {
            profileCompletionPercentage += 10;
        }

        if (freelancerProfileDto.getBankDetail() != null) {
            profileCompletionPercentage += 10;
        }

        if (freelancerProfileDto.getWorkDetail().size() > 0) {
            profileCompletionPercentage += 10;
        }

        if (freelancerProfileDto.getSkillCategory().size() > 0) {
            profileCompletionPercentage += 10;
        }

        if (profileCompletionPercentage == 100) {
            isProfileCompleted = true;
        }
        if (freelancer.getProfileCompletionPercentage() != profileCompletionPercentage) {
            freelancerProfileDto.setProfileCompletionPercentage(profileCompletionPercentage);
            freelancerProfileDto.setProfileCompleted(isProfileCompleted);

            freelancer.setProfileCompletionPercentage(profileCompletionPercentage);
            freelancer.setProfileCompleted(isProfileCompleted);
            freelancerRepository.save(freelancer);
        }

        return true;
    }

    public void updateBasicProfileDetails(String freelancerId, FreelancerBasicProfileRequestDto fbprd) {

        Freelancer freelancer = getFreelancerById(freelancerId);

        freelancer.setFirstName(fbprd.getFirstName());
        freelancer.setMiddleName(fbprd.getMiddleName());
        freelancer.setLastName(fbprd.getLastName());
        freelancer.setAddress(fbprd.getAddress());
        freelancer.setExperienceInYear(fbprd.getExperienceInYear());
        freelancer.setEducation(fbprd.getEducation());

        freelancerRepository.save(freelancer);

    }

    public void updateImage(String freelancerId, String profileImagePath) {
        Freelancer freelancer = getFreelancerById(freelancerId);

        freelancer.setProfileImage(profileImagePath);
        freelancerRepository.save(freelancer);
    }

    public void updateResume(String freelancerId, String resumePath) {
        Freelancer freelancer = getFreelancerById(freelancerId);

        freelancer.setResumeUrl(resumePath);
        freelancerRepository.save(freelancer);
    }

    public void updateKyc(String freelancerId, FreelancerKYCDto kycDto) {
        Freelancer freelancer = getFreelancerById(freelancerId);

        freelancer.setAdhaarNumber(kycDto.getAdhaarNumber());
        freelancer.setPanNumber(kycDto.getPanNumber());

        freelancerRepository.save(freelancer);
    }

    public void updateSkill(String freelancerId, SkillRequestDto skillRequestDto) {
        Freelancer freelancer = getFreelancerById(freelancerId);
        List<AssociatedSkill> freelancerSkill = freelancer.getSkills();

        //remove logic
        freelancerSkill = freelancerSkill.stream()
                .filter(fs -> !skillRequestDto.getSkillToRemove().contains(fs.getId()))
                .collect(Collectors.toList());

        //add/update logic
        List<AssociatedSkill> skillToAdd = skillRequestDto.getSkillToAdd();
        List<String> skillAddIds = skillToAdd.stream().map(sta -> sta.getId()).collect(Collectors.toList());
        List<Skill> skills = skillService.getActiveSkillByIds(skillAddIds);

        if (skillToAdd.size() != skills.size()) {
            throw new ServiceException(ErrorCodeConstant.FV0005); //change this
        }

        for (AssociatedSkill as : skillToAdd) {
            boolean isExist = false;
            for (int i = 0; i < freelancerSkill.size(); i++) {
                if (freelancerSkill.get(i).getId().equals(as.getId())) {
                    freelancerSkill.get(i).setExperience(as.getExperience());
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                freelancerSkill.add(as);
            }
        }

        freelancer.setSkills(freelancerSkill);
        freelancerRepository.save(freelancer);
    }

    public void updateBank(String freelancerId, BankDetailDto bankDetailDto) {
        Optional<FreelancerBankDetail> freelancerBankDetailO = freelancerBankRepository.findByFreelancerId(freelancerId);

        FreelancerBankDetail freelancerBank = new FreelancerBankDetail();

        if (freelancerBankDetailO.isPresent()) {

            freelancerBank = freelancerBankDetailO.get();
        }

        freelancerBank.setFreelancerId(freelancerId);
        freelancerBank.setBankName(bankDetailDto.getBankName());
        freelancerBank.setAccountHolderName(bankDetailDto.getAccountHolderName());
        freelancerBank.setAccountNumber(bankDetailDto.getAccountNumber());
        freelancerBank.setBranch(bankDetailDto.getBranch());
        freelancerBank.setIfscCode(bankDetailDto.getIfscCode());
        freelancerBankRepository.save(freelancerBank);

    }

    public void addWork(String freelancerId, WorkDetailDto workDetailDto) {
        FreelancerWorkDetail freelancerWorkDetail = new FreelancerWorkDetail();
        freelancerWorkDetail.setFreelancerId(freelancerId);
        freelancerWorkDetail.setCompany(workDetailDto.getCompany());
        freelancerWorkDetail.setDesignation(workDetailDto.getDesignation());
        freelancerWorkDetail.setWorkDescription(workDetailDto.getWorkDescription());
        freelancerWorkDetail.setStartDate(workDetailDto.getStartDate());
        freelancerWorkDetail.setEndDate(workDetailDto.getEndDate());
        freelancerWorkRepository.save(freelancerWorkDetail);
    }

    public void updateWork(String freelancerId, String workId, WorkDetailDto workDetailDto) {
        Optional<FreelancerWorkDetail> freelancerWorkDetailO = freelancerWorkRepository.findById(workId);
        if (!freelancerWorkDetailO.isPresent()) {
            throw new ServiceException(ErrorCodeConstant.FVF001);
        }

        FreelancerWorkDetail freelancerWorkDetail = freelancerWorkDetailO.get();
        if (!freelancerId.equals(freelancerWorkDetail.getFreelancerId())) {
            throw new ServiceException(ErrorCodeConstant.FVF002);
        }

        freelancerWorkDetail.setCompany(workDetailDto.getCompany());
        freelancerWorkDetail.setDesignation(workDetailDto.getDesignation());
        freelancerWorkDetail.setWorkDescription(workDetailDto.getWorkDescription());
        freelancerWorkRepository.save(freelancerWorkDetail);
    }

    public void deleteWork(String freelancerId, String workId) {
        Optional<FreelancerWorkDetail> freelancerWorkDetailO = freelancerWorkRepository.findById(workId);
        if (!freelancerWorkDetailO.isPresent()) {
            throw new ServiceException(ErrorCodeConstant.FVF001);
        }

        FreelancerWorkDetail freelancerWorkDetail = freelancerWorkDetailO.get();
        if (!freelancerId.equals(freelancerWorkDetail.getFreelancerId())) {
            throw new ServiceException(ErrorCodeConstant.FVF002);
        }

        freelancerWorkRepository.delete(freelancerWorkDetail);
    }

}
