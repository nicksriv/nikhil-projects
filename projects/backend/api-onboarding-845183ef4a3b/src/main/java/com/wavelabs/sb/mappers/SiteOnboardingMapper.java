package com.wavelabs.sb.mappers;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;

import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.SiteType;
import com.wavelabs.sb.model.SiteDetails;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.SiteOnboardingRequest;
import com.wavelabs.sb.request.SiteOnboardingUpdateRequest;
import com.wavelabs.sb.request.UploadSiteRequest;
import com.wavelabs.sb.response.EmployeeInfo;
import com.wavelabs.sb.response.FetchAllSitesResponse;
import com.wavelabs.sb.response.SiteResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

public class SiteOnboardingMapper {

    private SiteOnboardingMapper() {
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(SiteOnboardingMapper.class);

    public static SiteOnboardingDetails siteOnboardingMapper(SiteOnboardingRequest request, TokenPayLoadDetails details) {
	LOGGER.info("site Onboarding Mapper method started..!");
	SiteOnboardingDetails siteDetails = new SiteOnboardingDetails();
	BeanUtils.copyProperties(request, siteDetails);
	if (request.getManagers() != null && !request.getManagers().isEmpty()) {
	    siteDetails.setManagers(request.getManagers());
	} else {
	    siteDetails.setManagers(new ArrayList<>());
	}
	siteDetails.setType(
		!StringUtils.isBlank(request.getType()) ? SiteType.valueOf(request.getType().toUpperCase()) : null);
	
	siteDetails.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	siteDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	siteDetails.setCreatedUserType(details.getTypeOfUser());
	siteDetails.setModifiedUserType(details.getTypeOfUser());
	
	siteDetails.setDeleted(false);
	siteDetails.setCreatedAt(Instant.now());
	siteDetails.setModifiedAt(Instant.now());
	LOGGER.info("site Onboarding Mapper method ended..!");
	return siteDetails;
    }

    public static SiteOnboardingDetails siteOnboardingUpdateMapper(SiteOnboardingUpdateRequest updateRequest,
	    SiteOnboardingDetails existingSite, TokenPayLoadDetails details) {
	LOGGER.info("site Onboarding Update Mapper method started..!");
	BeanUtils.copyProperties(updateRequest, existingSite);
	if (updateRequest.getManagers() != null && !updateRequest.getManagers().isEmpty()) {
	    existingSite.setManagers(updateRequest.getManagers());
	} else {
	    existingSite.setManagers(new ArrayList<>());
	}
	existingSite.setType(
		!StringUtils.isBlank(updateRequest.getType()) ? SiteType.valueOf(updateRequest.getType().toUpperCase()) : null);
	existingSite.setModifiedAt(Instant.now());
	existingSite.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	existingSite.setModifiedUserType(details.getTypeOfUser());
	LOGGER.info("site Onboarding Update Mapper method ended..!");
	return existingSite;
    }

    public static FetchAllSitesResponse toFetchAllSitesResponse(SiteOnboardingDetails siteDetails) {
	LOGGER.info("to Fetch All Sites Response method started..!");
	FetchAllSitesResponse response = new FetchAllSitesResponse();
	BeanUtils.copyProperties(siteDetails, response);
	response.setSiteName(siteDetails.getName());
	response.setContactNumber(siteDetails.getPhone());
	LOGGER.info("to Fetch All Sites Response method ended..!");
	return response;
    }

    public static SiteOnboardingDetails siteOnboardingUpdateMapper(UploadSiteRequest request) {
	LOGGER.info("site Onboarding Update upload Mapper method started..!");
	SiteOnboardingDetails siteDetails = new SiteOnboardingDetails();
	BeanUtils.copyProperties(request, siteDetails);
	siteDetails.setType(
		!StringUtils.isBlank(request.getType()) ? SiteType.valueOf(request.getType().toUpperCase()) : null);
	siteDetails.setCreatedAt(Instant.now());
	siteDetails.setModifiedAt(Instant.now());
	LOGGER.info("site Onboarding Update upload Mapper method ended..!");
	return siteDetails;
    }

    public static SiteResponse getSite(SiteOnboardingDetails site, List<Users> users) {
	LOGGER.info("get site method started..!");
	SiteResponse response = new SiteResponse();
	response.setAddress(site.getAddress());
	response.setArea(site.getArea());
	response.setCity(site.getCity());
	response.setClientId(site.getClientId());
	response.setCountry(site.getCountry());
	response.setEmail(site.getEmail());
	response.setId(site.getId());
	response.setLatitude(site.getLatitude());
	response.setLongitude(site.getLongitude());
	response.setManagers(getManagers(users));
	response.setName(site.getName());
	response.setPhone(site.getPhone());
	response.setPin(site.getPin());
	response.setSiteId(site.getSiteId());
	response.setState(site.getState());
	response.setStatus(site.getStatus());
	response.setType(site.getType());
	LOGGER.info("get site method ended..!");
	return response;
    }

    public static List<EmployeeInfo> getManagers(List<Users> users) {
	LOGGER.info("get managers method started..!");
	List<EmployeeInfo> managerList = new ArrayList<>();

	users.stream().forEach(user -> {
	    EmployeeInfo empInfo = new EmployeeInfo();
	    empInfo.setEmail(user.getOfficialEmail());
	    empInfo.setFirstName(user.getFirstname());
	    empInfo.setId(user.getUserId());
	    empInfo.setLastName(user.getLastname());
	    empInfo.setMiddleName(user.getMiddlename());
	    empInfo.setMobile(user.getPersonnelPhoneNumber());
	    managerList.add(empInfo);
	});
	LOGGER.info("get managers method ended..!");
	return managerList;
    }

    public static List<SiteDetails> getDownloadSitesDetails(List<SiteOnboardingDetails> siteDetails) {
	LOGGER.info("get Download Sites Details method started..!");
	List<SiteDetails> detailsList = new ArrayList<>();
	siteDetails.forEach(site -> {
	    SiteDetails details = new SiteDetails();
	    details.setSiteId(site.getSiteId());
	    details.setSiteName(site.getName());
	    details.setSiteType(site.getType());
	    details.setContactNumber(site.getPhone());
	    details.setEmail(site.getEmail());
	    details.setAddress(site.getAddress());
	    details.setCountry(site.getCountry());
	    details.setCity(site.getCity());
	    details.setArea(site.getArea());
	    details.setState(site.getState());
	    details.setPin(site.getPin());
	    details.setLatitude(site.getLatitude());
	    details.setLongitude(site.getLongitude());
	    details.setClientId(site.getClientId());
	    if (site.getManagers() != null && !site.getManagers().isEmpty()) {
		details.setManagers(site.getManagers());
	    } else {
		details.setManagers(new ArrayList<>());
	    }
	    details.setStatus(site.getStatus());
	    detailsList.add(details);
	});
	LOGGER.info("get Download Sites Details method ended..!");
	return detailsList;
    }

}
