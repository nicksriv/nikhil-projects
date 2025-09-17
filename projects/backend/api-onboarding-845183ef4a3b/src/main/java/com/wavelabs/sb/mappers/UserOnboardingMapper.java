package com.wavelabs.sb.mappers;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.LocationMapping;
import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.documents.ThemeDetails;
import com.wavelabs.sb.documents.UserBankDetails;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.EmployeeRequest;
import com.wavelabs.sb.request.ThemeRequest;
import com.wavelabs.sb.request.UploadUserRequest;
import com.wavelabs.sb.request.UserBankRequest;
import com.wavelabs.sb.request.UserProfileUpdateRequest;
import com.wavelabs.sb.request.UserRequest;
import com.wavelabs.sb.response.EmployeeDetails;
import com.wavelabs.sb.response.EmployeeInfo;
import com.wavelabs.sb.response.LocationDetails;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.Referral;
import com.wavelabs.sb.response.ReportingManager;
import com.wavelabs.sb.response.ReportingOrTeamInfo;
import com.wavelabs.sb.response.RoleDetails;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.ThemeResponse;
import com.wavelabs.sb.response.UserBankDetailsResponse;
import com.wavelabs.sb.response.UserDetails;
import com.wavelabs.sb.response.UserEmployeeInfo;
import com.wavelabs.sb.response.UserLocationMapping;
import com.wavelabs.sb.response.UserPersonalInfo;
import com.wavelabs.sb.response.UserProfileDetails;
import com.wavelabs.sb.response.UserSitesFilterResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

public class UserOnboardingMapper {

	private UserOnboardingMapper() {
	}

	public static Users getUser(UserRequest userRequest, Users users, String clientId, TokenPayLoadDetails details) {

		BeanUtils.copyProperties(userRequest, users);
		users.setFirstname(userRequest.getFirstName());
		users.setLastname(userRequest.getLastName());
		users.setMiddlename(userRequest.getMiddleName());
		users.setDateofBirth(getDate(userRequest.getDob()));
		users.setPersonnelPhoneNumber(userRequest.getContactNumber());
		users.setPersonnelEmail(userRequest.getPersonalEmail());
		users.setPanNumber(userRequest.getPan());
		users.setPincode(userRequest.getPinCode());
		users.setGender(userRequest.getGender() != null ? Gender.valueOf(userRequest.getGender().toUpperCase()) : null);
		if (clientId != null) {
			users.setClientId(clientId);
			users.setStatus(Status.DRAFT);
		}
		users.setCreatedAt(Instant.now());
		users.setModifiedAt(Instant.now());
		users.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		users.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		users.setCreatedUserType(details.getTypeOfUser());
		users.setModifiedUserType(details.getTypeOfUser());
		return users;
	}

	public static Users getUser(UploadUserRequest userRequest, Users users, String clientId) {
		BeanUtils.copyProperties(userRequest, users);
		users.setFirstname(userRequest.getFirstName());
		users.setLastname(userRequest.getLastName());
		users.setMiddlename(userRequest.getMiddleName());
		users.setDateofBirth(getDate(userRequest.getDob()));
		users.setPersonnelPhoneNumber(userRequest.getContactNumber());
		users.setPersonnelEmail(userRequest.getPersonalEmail());
		users.setPanNumber(userRequest.getPan());
		users.setGender(userRequest.getGender() != null ? Gender.valueOf(userRequest.getGender().toUpperCase()) : null);
		users.setPincode(userRequest.getPinCode());
		users.setStatus(userRequest.getStatus());
		if (clientId != null) {
			users.setClientId(clientId);
		}
		return users;
	}

	public static Date getDate(String dob) {
		try {
			return (new SimpleDateFormat("dd-MM-yyyy").parse(dob));
		} catch (Exception e) {
			throw new BadRequestException("Please provide date dd-mm-yyyy format");
		}
	}

	public static SuccessResponse toResponse(Users user) {
		SuccessResponse successResponse = new SuccessResponse();
		successResponse.setId(user.getId());
		successResponse.setMessage(Constants.USER_CREATED);
		return successResponse;
	}

	public static UserBankDetails getUserBankDetails(UserBankDetails userBankDetails, UserBankRequest userBankRequest,
			TokenPayLoadDetails tokenPayLoadDetails) {

		userBankDetails.setAccountNumber(userBankRequest.getAccountNumber());
		userBankDetails.setBranch(userBankRequest.getBranchName());
		userBankDetails.setIfscCode(userBankRequest.getIfscCode());
		userBankDetails.setName(userBankRequest.getBankName());
		userBankDetails.setModifiedAt(Instant.now());
		if (StringUtils.isBlank(userBankDetails.getId())) {
			userBankDetails.setCreatedAt(Instant.now());
			userBankDetails.setModifiedAt(Instant.now());
			userBankDetails.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
			userBankDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
			userBankDetails.setCreatedUserType(tokenPayLoadDetails.getTypeOfUser());
			userBankDetails.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
		}
		userBankDetails.setStatus(Status.ACTIVE);
		return userBankDetails;
	}

	public static UserBankDetails getUserBankDetails(UserBankDetails userBankDetails,
			UploadUserRequest userBankRequest) {
		userBankDetails.setAccountNumber(userBankRequest.getAccountNumber());
		userBankDetails.setBranch(userBankRequest.getBranchName());
		userBankDetails.setIfscCode(userBankRequest.getIfscCode());
		userBankDetails.setName(userBankRequest.getBankName());
		userBankDetails.setModifiedAt(Instant.now());
		if (StringUtils.isBlank(userBankDetails.getId())) {
			userBankDetails.setCreatedAt(Instant.now());
		}
		userBankDetails.setStatus(Status.ACTIVE);
		return userBankDetails;
	}

	public static void mapEmployeeDetails(EmployeeRequest employeeRequest, Users user,
			List<RoleOnboardingDetails> roles, TokenPayLoadDetails tokenPayLoadDetails) {
		user.setRoles(roles);
		user.setUserId(employeeRequest.getEmployeeId());
		user.setTypeOfEmployment(employeeRequest.getTypeOfEmployment());
		user.setDateOfJoining(getDate(employeeRequest.getJoiningDate()));
		user.setOfficialEmail(employeeRequest.getEmail());
		user.setStatus(Status.valueOf(employeeRequest.getStatus()));
		if (employeeRequest.getReferral() != null) {
			user.setRefferedEmployeeId(employeeRequest.getReferral().getId());
			user.setRefferedEmployeeName(employeeRequest.getReferral().getName());
		}
		if (employeeRequest.getReportingManager() != null) {
			user.setReportingManagerId(employeeRequest.getReportingManager().getId());
			user.setReportingManagerName(employeeRequest.getReportingManager().getName());
		}
		user.setModifiedAt(Instant.now());
		user.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		user.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	}

	public static int getAge(Date dateofBirth) {
		LocalDate dob = dateofBirth.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		return Period.between(dob, LocalDate.now()).getYears();
	}

	public static UserBankDetailsResponse getUserBankDetails(UserBankDetails userBankDetails,
			UserBankDetailsResponse userBankDetailsResponse) {
		userBankDetailsResponse.setAccountNumber(userBankDetails.getAccountNumber());
		userBankDetailsResponse.setBankName(userBankDetails.getName());
		userBankDetailsResponse.setBranchName(userBankDetails.getBranch());
		userBankDetailsResponse.setIfscCode(userBankDetails.getIfscCode());
		return userBankDetailsResponse;
	}

	public static PaginationResponse<UserDetails> toFetchResponse(PaginationResponse<Users> fetchAllUsers) {
		List<UserDetails> collect = fetchAllUsers.getData().stream().map(UserOnboardingMapper::mapUserResponse)
				.collect(Collectors.toList());
		PaginationResponse<UserDetails> fetchAll = new PaginationResponse<>();
		fetchAll.setMessage(collect.isEmpty() ? Constants.NO_RECORDS_FOUND : Constants.RECORDS_FETCHED_SUCCESSFULLY);
		fetchAll.setData(collect);
		fetchAll.setSize(fetchAllUsers.getSize());
		return fetchAll;
	}

	public static UserDetails mapUserResponse(Users user) {
		UserDetails userDetails = new UserDetails();
		userDetails.setAge(getAge(user.getDateofBirth()));
		userDetails.setCity(user.getCity());
		userDetails.setContactNumber(user.getPersonnelPhoneNumber());
		userDetails.setEmployeeId(user.getUserId());
		userDetails.setEmployeeName(StringUtils.stripToEmpty(user.getFirstname()) + " "
				+ StringUtils.stripToEmpty(user.getMiddlename()) + " " + StringUtils.stripToEmpty(user.getLastname()));
		userDetails.setGender(user.getGender() != null ? user.getGender().toString() : null);
		userDetails.setMappedStores(user.getLocations());
		userDetails.setReportingManager(user.getReportingManagerName());
		userDetails.setRoles(user.getRoles() != null
				? user.getRoles().stream().filter(role -> role != null && !role.isDeleted())
						.map(roleDetails -> getRoleDetails(roleDetails)).collect(Collectors.toList())
				: new ArrayList<>());
		userDetails.setStatus(user.getUserCredentials() == null ? Status.DRAFT.name() : user.getStatus().name());
		userDetails.setUserId(user.getId());
		return userDetails;
	}

	private static RoleDetails getRoleDetails(RoleOnboardingDetails roleDetails) {
		RoleDetails role = new RoleDetails();
		role.setId(roleDetails.getId());
		role.setName(roleDetails.getRole());
		return role;
	}

	public static UserPersonalInfo toUserPersonalInfo(Users user) {
		UserPersonalInfo userPersonalInfo = new UserPersonalInfo();
		BeanUtils.copyProperties(user, userPersonalInfo);
		userPersonalInfo.setContactNumber(user.getPersonnelPhoneNumber());
		userPersonalInfo.setDob(getDobString(user.getDateofBirth()));
		userPersonalInfo.setFirstName(user.getFirstname());
		userPersonalInfo.setLastName(user.getLastname());
		userPersonalInfo.setMiddleName(user.getMiddlename());
		userPersonalInfo.setPan(user.getPanNumber());
		userPersonalInfo.setPersonalEmail(user.getPersonnelEmail());
		userPersonalInfo.setPinCode(user.getPincode());
		userPersonalInfo.setGender(user.getGender() != null ? user.getGender().toString() : null);
		return userPersonalInfo;
	}

	private static String getDobString(Date dateofBirth) {
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		return formatter.format(dateofBirth);
	}

	public static EmployeeDetails toEmployeeDetails(Users user, Users reportingManagerUser, Users refferalUser) {
		EmployeeDetails employeeDetails = new EmployeeDetails();
		BeanUtils.copyProperties(user, employeeDetails);
		employeeDetails.setEmail(user.getOfficialEmail());
		employeeDetails.setEmployeeId(user.getUserId());
		employeeDetails.setJoiningDate(user.getDateOfJoining() != null ? getDobString(user.getDateOfJoining()) : null);
		employeeDetails
				.setReportingManager(reportingManagerUser != null ? getReposrtingManagerDetails(reportingManagerUser)
						: new ReportingManager());
		employeeDetails.setReferral(refferalUser != null ? getReferral(refferalUser) : new Referral());
		employeeDetails.setRoles(user.getRoles() != null
				? user.getRoles().stream().filter(role -> !role.isDeleted())
						.map(roleDetails -> getRoleDetails(roleDetails)).collect(Collectors.toList())
				: new ArrayList<>());
		return employeeDetails;
	}

	private static Referral getReferral(Users refferalUser) {
		Referral referral = new Referral();
		referral.setId(refferalUser.getId());
		referral.setEmployeeId(refferalUser.getUserId());
		referral.setName(refferalUser.getFirstname() + " " + refferalUser.getLastname());
		referral.setRoles(refferalUser.getRoles() != null
				? refferalUser.getRoles().stream().filter(role -> !role.isDeleted())
						.map(roleDetails -> getRoleDetails(roleDetails)).collect(Collectors.toList())
				: new ArrayList<>());
		return referral;
	}

	private static ReportingManager getReposrtingManagerDetails(Users reportingManagerUser) {
		ReportingManager reportingManager = new ReportingManager();
		reportingManager.setId(reportingManagerUser.getId());
		reportingManager.setEmployeeId(reportingManagerUser.getUserId());
		reportingManager.setName(reportingManagerUser.getFirstname() + " " + reportingManagerUser.getLastname());
		reportingManager.setRoles(reportingManagerUser.getRoles() != null
				? reportingManagerUser.getRoles().stream().filter(role -> !role.isDeleted())
						.map(roleDetails -> getRoleDetails(roleDetails)).collect(Collectors.toList())
				: new ArrayList<>());
		return reportingManager;
	}

	public static LocationDetails getLocationDetailsOfSite(SiteOnboardingDetails site, List<Users> users,
			List<LocationMapping> locationMappingList) {
		LocationDetails locationDetails = new LocationDetails();
		locationDetails.setSiteId(site.getSiteId());
		locationDetails.setId(site.getId());
		locationDetails.setAddress(site.getAddress());
		locationDetails.setStatus(site.getStatus());
		locationDetails.setManagers(users != null ? getManagers(users) : new ArrayList<>());

		locationMappingList = locationMappingList.stream().filter(lm -> lm.getLocation().equals(site.getSiteId()))
				.collect(Collectors.toList());
		if (!locationMappingList.isEmpty()) {
			LocationMapping locationMapping = locationMappingList.get(0);

			locationDetails.setDays(locationMapping.getDays());
			locationDetails.setDates(locationMapping.getDates());
		}

		return locationDetails;
	}

	public static List<EmployeeInfo> getManagers(List<Users> users) {
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
		return managerList;
	}

	public static UserCredentials createCredentials(Users user, String password, TokenPayLoadDetails details) {
		UserCredentials userCredentials = new UserCredentials();
		userCredentials.setCreatedAt(Instant.now());
		userCredentials.setModifiedAt(Instant.now());
		userCredentials.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		userCredentials.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		userCredentials.setCreatedUserType(details.getTypeOfUser());
		userCredentials.setModifiedUserType(details.getTypeOfUser());

		userCredentials.setName(user.getFirstname());
		userCredentials.setPassword(password);
		userCredentials.setUserId(user.getId());
		return userCredentials;
	}

	public static Users getUserEmployeeInfo(UploadUserRequest userRequest, Users user,
			List<RoleOnboardingDetails> roles, String referralId, String rmId) {
		user.setRoles(roles);
		user.setUserId(userRequest.getEmployeeId());
		user.setTypeOfEmployment(userRequest.getTypeOfEmployment());
		user.setDateOfJoining(getDate(userRequest.getJoiningDate()));
		user.setOfficialEmail(userRequest.getEmployeeEmail());
		if (userRequest.getReferral() != null) {
			user.setRefferedEmployeeId(referralId);
			user.setRefferedEmployeeName(userRequest.getReferral().getName());
		}
		if (userRequest.getReportingManager() != null) {
			user.setReportingManagerId(rmId);
			user.setReportingManagerName(userRequest.getReportingManager().getName());
		}
		if (user.getLocations() != null) {
			user.getLocations().add(userRequest.getLocation());
			user.setLocations(user.getLocations());
		} else {
			ArrayList<String> locations = new ArrayList<>();
			locations.add(userRequest.getLocation());
			user.setLocations(locations);
		}
		user.setGender(userRequest.getGender() != null ? Gender.valueOf(userRequest.getGender().toUpperCase()) : null);
		return user;
	}

	public static EmployeeInfo toEmployeeInfo(Users user) {
		EmployeeInfo emp = new EmployeeInfo();
		emp.setId(user.getUserId());
		emp.setFirstName(user.getFirstname());
		emp.setLastName(user.getLastname());
		emp.setMiddleName(user.getMiddlename());
		emp.setMobile(user.getPersonnelPhoneNumber());
		emp.setEmail(user.getPersonnelEmail());
		return emp;
	}

	public static UserProfileDetails getUserProfile(Users user, Users reportingManagerUser, Users refferalUser) {
		UserProfileDetails response = new UserProfileDetails();
		response.setFirstName(user.getFirstname());
		response.setLastName(user.getLastname());
		response.setFullName(user.getFirstname() + " " + user.getLastname());
		response.setDob(getDobString(user.getDateofBirth()));
		response.setPhone(user.getPersonnelPhoneNumber());
		response.setEmail(user.getPersonnelEmail());
		response.setGender(user.getGender());
		response.setPan(user.getPanNumber());
		response.setAadhar(user.getAadharNumber());
		response.setProfileUrl(user.getProfileImage() != null ? user.getProfileImage().getName() : null);
		response.setProfileId(user.getProfileImage() != null ? user.getProfileImage().getId() : null);
		response.setEmployeeDetails(toEmployeeDetails(user, reportingManagerUser, refferalUser));
		response.setUserBankDetails(
				user.getBank() != null ? getUserBankDetails(user.getBank(), new UserBankDetailsResponse())
						: new UserBankDetailsResponse());
		response.setStatus(user.getUserCredentials() == null ? Status.DRAFT.name() : user.getStatus().name());
		response.setArea(user.getArea());
		response.setCity(user.getCity());
		response.setState(user.getState());
		response.setAddress(user.getAddress());
		response.setPincode(user.getPincode());
		response.setCountry(StringUtils.isBlank(user.getCountry()) ? Constants.DEFAULT_COUNTRY : user.getCountry());
		return response;
	}

	public static UserProfileDetails getAdminProfile(AdminDetails adminDetails) {
		UserProfileDetails response = new UserProfileDetails();
		BeanUtils.copyProperties(adminDetails, response);
		response.setDob(getDobString(adminDetails.getDateofBirth()));
		response.setPhone(adminDetails.getMobile());
		response.setEmail(adminDetails.getEmail());
		response.setGender(adminDetails.getGender());
		response.setPan(adminDetails.getPanNumber());
		response.setAadhar(adminDetails.getAadharNumber());
		response.setProfileUrl(
				adminDetails.getProfileImage() != null ? adminDetails.getProfileImage().getName() : null);
		response.setProfileId(adminDetails.getProfileImage() != null ? adminDetails.getProfileImage().getId() : null);
		response.setFullName(adminDetails.getFullName());
		response.setArea(adminDetails.getArea());
		response.setCity(adminDetails.getCity());
		response.setState(adminDetails.getState());
		response.setAddress(adminDetails.getAddress());
		response.setCountry(
				StringUtils.isBlank(adminDetails.getCountry()) ? Constants.DEFAULT_COUNTRY : adminDetails.getCountry());
		return response;
	}

	public static UserProfileDetails getUserProfile(ClientOnboardingDetails details) {
		UserProfileDetails response = new UserProfileDetails();
		response.setFirstName(details.getFirstName());
		response.setLastName(details.getLastName());
		response.setPhone(details.getMobile());
		response.setEmail(details.getEmail());
		response.setProfileUrl(details.getProfileImage() != null ? details.getProfileImage().getName() : null);
		response.setProfileId(details.getProfileImage() != null ? details.getProfileImage().getId() : null);
		return response;
	}

	public static ClientOnboardingDetails getClientDetailsToUpdate(ClientOnboardingDetails details,
			UserProfileUpdateRequest updateRequest, TokenPayLoadDetails tokenPayLoadDetails) {
		details.setFirstName(updateRequest.getFirstName());
		details.setLastName(updateRequest.getLastName());
		details.setMobile(updateRequest.getPhone());
		details.setEmail(updateRequest.getEmail());
		details.setModifiedAt(Instant.now());
		details.setAddress(updateRequest.getAddress());
		details.setState(updateRequest.getState());
		details.setCity(updateRequest.getCity());
		details.setArea(updateRequest.getArea());
		details.setPinCode(updateRequest.getPincode());
		details.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		details.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
		return details;
	}

	public static Users getUserDetailsToUpdate(Users user, UserProfileUpdateRequest updateRequest,
			TokenPayLoadDetails tokenPayLoadDetail) {
		user.setPersonnelEmail(updateRequest.getEmail());
		user.setPersonnelPhoneNumber(updateRequest.getPhone());
		user.setModifiedAt(Instant.now());
		user.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetail));
		user.setModifiedUserType(tokenPayLoadDetail.getTypeOfUser());
		user.setAddress(updateRequest.getAddress());
		user.setState(updateRequest.getState());
		user.setCity(updateRequest.getCity());
		user.setArea(updateRequest.getArea());
		user.setPincode(updateRequest.getPincode());

		return user;
	}
	/*
	 * public static Users getUserEmployeeInfo(EmployeeRequest employeeRequest,
	 * Users user, String location) throws ParseException {
	 * employeeRequest.getReferral();
	 * user.setReferedEmployeeRole(employeeRequest.getReferral().getRole());
	 * user.setRefferedEmployeeId(employeeRequest.getReferral().getId());
	 * user.setRefferedEmployeeName(employeeRequest.getReferral().getName());
	 * user.setDateOfJoining(getDate(employeeRequest.getJoiningDate()));
	 * user.setReportingManagerId(employeeRequest.getReportingManager().getId());
	 * user.setReportingManagerName(employeeRequest.getReportingManager().getName())
	 * ;
	 * user.setReportingManagerRole(employeeRequest.getReportingManager().getRole())
	 * ; if (user.getLocations() != null) { user.getLocations().add(location);
	 * user.setLocations(user.getLocations()); } else { ArrayList<String> locations
	 * = new ArrayList<>(); user.setLocations(locations); }
	 * 
	 * return user; }
	 */

	public static ThemeDetails getThemeDetails(ThemeRequest themeRequest, TokenPayLoadDetails tokenPayLoadDetails) {
		ThemeDetails details = new ThemeDetails();
		details.setClientId(themeRequest.getClientId());
		details.setPrimaryColor(themeRequest.getPrimaryColor());
		details.setSecondaryColor(themeRequest.getMenuColor());
		details.setFontName(themeRequest.getFont());
		details.setDeleted(false);
		details.setStatus(Status.ACTIVE);
		details.setCreatedAt(Instant.now());
		details.setModifiedAt(Instant.now());
		details.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		details.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		details.setClientId(tokenPayLoadDetails.getId());
		return details;
	}

	public static ThemeDetails getDefaultThemeDetails(ThemeRequest themeRequest, String clientId,
			TokenPayLoadDetails tokenPayLoadDetails) {
		ThemeDetails details = new ThemeDetails();
		details.setClientId(themeRequest.getClientId());
		details.setPrimaryColor(themeRequest.getPrimaryColor());
		details.setSecondaryColor(themeRequest.getMenuColor());
		details.setFontName(themeRequest.getFont());
		details.setDeleted(false);
		details.setStatus(Status.ACTIVE);
		details.setCreatedAt(Instant.now());
		details.setModifiedAt(Instant.now());
		details.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		details.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		details.setClientId(clientId);
		return details;
	}

	public static AdminDetails getAdminDetailsToUpdate(AdminDetails adminDetails,
			UserProfileUpdateRequest updateRequest) {
		adminDetails.setModifiedAt(Instant.now());
		adminDetails.setAddress(updateRequest.getAddress());
		adminDetails.setState(updateRequest.getState());
		adminDetails.setCity(updateRequest.getCity());
		adminDetails.setArea(updateRequest.getArea());
		adminDetails.setPincode(updateRequest.getPincode());

		return adminDetails;
	}

	public static ThemeDetails getUpdatedThemeDetails(ThemeDetails existingTheme, ThemeRequest themeRequest,
			TokenPayLoadDetails details) {
		existingTheme.setPrimaryColor(themeRequest.getPrimaryColor());
		existingTheme.setSecondaryColor(themeRequest.getMenuColor());
		existingTheme.setFontName(themeRequest.getFont());
		existingTheme.setDeleted(false);
		existingTheme.setStatus(Status.ACTIVE);
		existingTheme.setModifiedAt(Instant.now());
		existingTheme.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		existingTheme.setModifiedUserType(details.getTypeOfUser());
		return existingTheme;
	}

	public static ThemeResponse getThemeResponse(ThemeDetails themeDetails) {
		ThemeResponse response = new ThemeResponse();
		response.setPrimaryColor(themeDetails.getPrimaryColor());
		response.setMenuColor(themeDetails.getSecondaryColor());
		response.setFont(themeDetails.getFontName());
		return response;
	}

	public static UserEmployeeInfo getUsersEmployeeInfo(Users user) {
		UserEmployeeInfo info = new UserEmployeeInfo();
		info.setId(user.getId());
		info.setEmployeeId(user.getUserId());
		info.setName(user.getFirstname());
		info.setRoles(user.getRoles() != null
				? user.getRoles().stream().filter(role -> !role.isDeleted())
						.map(roleDetails -> getRoleDetails(roleDetails)).collect(Collectors.toList())
				: new ArrayList<>());
		return info;
	}

	public static UserLocationMapping getUserLocationMapping(LocationMapping locationMapping) {
		UserLocationMapping ulm = new UserLocationMapping();

		ulm.setUserId(locationMapping.getUserId());
		ulm.setLocation(locationMapping.getLocation());
		ulm.setDays(locationMapping.getDays());
		ulm.setDates(locationMapping.getDates());

		return ulm;
	}

	public static ReportingOrTeamInfo getReportingOrTeamInfo(Users reportingUser) {
		ReportingOrTeamInfo info = new ReportingOrTeamInfo();
		info.setEmployeId(reportingUser.getUserId());
		info.setProfileid(reportingUser.getProfileImage() != null ? reportingUser.getProfileImage().getId() : null);
		info.setName(reportingUser.getFirstname() + " " + reportingUser.getLastname());
		return info;
	}

	public static List<ReportingOrTeamInfo> getTeams(List<Users> users) {
		List<ReportingOrTeamInfo> teamInfos = new ArrayList<>();
		users.forEach(user -> {
			ReportingOrTeamInfo data = new ReportingOrTeamInfo();
			data.setName(user.getFirstname());
			data.setEmployeId(user.getUserId());
			data.setProfileid(user.getProfileImage() != null ? user.getProfileImage().getId() : null);
			teamInfos.add(data);
		});
		return teamInfos;
	}

	public static UserSitesFilterResponse getUserSitesFilterResponse(SiteOnboardingDetails site) {
		UserSitesFilterResponse response = new UserSitesFilterResponse();
		response.setId(site.getId());
		response.setName(site.getName());
		response.setSiteId(site.getSiteId());
		return response;
	}

	public static UserProfileDetails getQualityAssuranceProfile(QualityAssurance qualityAssurance) {
		UserProfileDetails response = new UserProfileDetails();
		response.setFirstName(qualityAssurance.getFirstName());
		response.setLastName(qualityAssurance.getLastName());
		response.setFullName(qualityAssurance.getFirstName() + " " + qualityAssurance.getLastName());
		response.setEmail(qualityAssurance.getEmail());
		response.setPhone(qualityAssurance.getMobile());
		return response;
	}
}
