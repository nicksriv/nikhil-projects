package com.wavelabs.sb.services;

import java.sql.Date;
import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.LocationMapping;
import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.documents.UserBankDetails;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.UserOnboardingMapper;
import com.wavelabs.sb.model.FetchUserColumnOrder;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UploadUserLocationMappingModel;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.ModuleRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.SiteOnboardingRepository;
import com.wavelabs.sb.repositories.StoreRepository;
import com.wavelabs.sb.repositories.SubModuleRepository;
import com.wavelabs.sb.repositories.ThemeDetailsRepository;
import com.wavelabs.sb.repositories.UserBankDetailsRepository;
import com.wavelabs.sb.repositories.UserCredentialsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.EmployeeRequest;
import com.wavelabs.sb.request.FetchAllUsersRequest;
import com.wavelabs.sb.request.LocationRequest;
import com.wavelabs.sb.request.ReferralRequest;
import com.wavelabs.sb.request.ReportingManagerRequest;
import com.wavelabs.sb.request.SearchEmployee;
import com.wavelabs.sb.request.UserBankRequest;
import com.wavelabs.sb.request.UserRequest;
import com.wavelabs.sb.response.BanksResponse;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.EmployeeDetails;
import com.wavelabs.sb.response.EmployeeInfo;
import com.wavelabs.sb.response.LocationDetails;
import com.wavelabs.sb.response.LocationDetailsResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserBankDetailsResponse;
import com.wavelabs.sb.response.UserCredentialsResponse;
import com.wavelabs.sb.response.UserEmployeeInfo;
import com.wavelabs.sb.response.UserLocationMapping;
import com.wavelabs.sb.response.UserModulesResponse;
import com.wavelabs.sb.response.UserSitesFilterResponse;
import com.wavelabs.sb.utils.ExcelReader;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class UserOnboardingService {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    @Autowired
    UserBankDetailsRepository userBankDetailsRepository;

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    UserCredentialsRepository userCredentialsRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    RoleOnboardingRepository roleOnboardingRepository;

    @Autowired
    SiteOnboardingRepository siteOnboardingRepository;

    @Autowired
    ClientOnboardingService clientOnboardingService;

	@Autowired
    FileService fileService;

    @Autowired
    ModuleRepository moduleRepository;

    @Autowired
    SubModuleRepository subModuleRepository;

    @Autowired
    ThemeDetailsRepository themeDetailsRepository;

    @Autowired
    ClientOnboardingRepository clientOnBoardingRepository;

    @Autowired
    SiteOnboardingService siteOnboardingService;

    @Autowired
    AesEncryption aesEncryption;

    @Autowired
    UserProfileService userProfileService;

    private Logger log = LoggerFactory.getLogger(UserOnboardingService.class);

    /**
     * This method is used to save user basic details
     *
     * @param userRequest
     * @param clientId
     * @return Users
     * @throws ParseException
     */
    public Users saveUserBasicDetails(@Valid UserRequest userRequest, String clientId, TokenPayLoadDetails details)
	    throws ParseException {
	Optional<ClientOnboardingDetails> client = clientOnBoardingRepository.findByClientId(clientId);
	if (!client.isPresent()) {
	    throw new BadRequestException(ErrorMessages.NO_RECORD_FOUND_BY_CLIENTID);
	}

	if (!userOnboardingRepository.existsByPersonnelPhoneNumberAndClientIdAndDeleted(userRequest.getContactNumber(),
		clientId, false)) {
	    Users users = UserOnboardingMapper.getUser(userRequest, new Users(), clientId, details);
	    log.info("Saving User basic deatils");
	    return userOnboardingRepository.save(users);
	}
	throw new ResourceNotFoundException(Constants.USER_ONBOARDED);
    }

    /**
     * This method used to update employee details
     *
     * @param employeeRequest
     * @param userId
     * @return Users
     * @throws ParseException
     */
    public Users updateEmployeeDetails(@Valid EmployeeRequest employeeRequest, String userId,
	    TokenPayLoadDetails tokenPayLoadDetails) throws ParseException {
	log.info("Enter into updateEmployeeDetails");
	log.info("Fetch User with userId:: {}", userId);
	Users user = getUser(userId);
	Boolean employee = userOnboardingRepository.existsByUserIdAndIdNotAndDeleted(employeeRequest.getEmployeeId(),
		userId, false);
	if (employee) {
	    throw new BadRequestException(ErrorMessages.EMPLOYEE_ID_ALREADY_MAPPED);
	}
	List<RoleOnboardingDetails> roles = getRoles(
		employeeRequest.getRoles().stream().distinct().collect(Collectors.toList()),
		clientOnboardingService.fetchClientByClientId(user.getClientId()).getId());
	UserOnboardingMapper.mapEmployeeDetails(employeeRequest, user, roles, tokenPayLoadDetails);
	log.info("Saving User employee deatils with userId:: {}", userId);
	return userOnboardingRepository.save(user);
    }

    public String getRMUserId(ReportingManagerRequest userRequest) {
	String id = null;
	if (userRequest != null && !StringUtils.isBlank(userRequest.getId())) {
	    Users user = userProfileService.getUserOrNull(userRequest.getId());
	    id = user != null ? user.getId() : null;
	}
	return id;
    }

    public String getReferralUserId(ReferralRequest userRequest) {
	String id = null;
	if (userRequest != null && !StringUtils.isBlank(userRequest.getId())) {
	    Users user = userProfileService.getUserOrNull(userRequest.getId());
	    id = user != null ? user.getId() : null;
	}
	return id;
    }

    private List<RoleOnboardingDetails> getRoles(List<String> roleIds, String clientId) {
	if (roleIds != null && !roleIds.isEmpty()) {
	    List<RoleOnboardingDetails> roles = roleOnboardingRepository.findByIdInAndClientIdAndDeleted(roleIds,
		    clientId, false);
	    if (!roles.isEmpty() && roleIds.size() != roles.size()) {
		List<String> existingIds = roles.stream().map(RoleOnboardingDetails::getId)
			.collect(Collectors.toList());
		// Site Manager Role not allowed to add
		List<String> existingRoles = roles.stream().map(RoleOnboardingDetails::getRole)
			.collect(Collectors.toList());
		if (existingRoles.stream().anyMatch(Constants.SITE_MANAGER_ROLE::equalsIgnoreCase)) {
		    throw new BadRequestException(ErrorMessages.SITE_MANAGER_ROLE_NOT_ALLOWED);
		}
		roleIds.forEach(role -> {
		    if (!existingIds.contains(role)) {
			throw new ResourceNotFoundException(ErrorMessages.ROLE_NOT_FOUND_WITH_ID + role);
		    }
		});
	    }
	    if (roles.isEmpty()) {
		throw new ResourceNotFoundException(ErrorMessages.ROLES_NOT_FOUND);
	    }
	    return roles;
	}
	return Collections.emptyList();
    }

    /**
     * This method used to save user bank details.
     *
     * @param userBankRequest
     * @param userId
     * @return BaseResponse
     */
    public BaseResponse saveUserBankDetails(UserBankRequest userBankRequest, String userId,
	    TokenPayLoadDetails tokenPayLoadDetails) {
	log.info("Save user bank details method started");
	log.info("Fetch User document with userId:: {}", userId);
	Users user = getUser(userId);
	UserBankDetails userBankDetails = UserOnboardingMapper.getUserBankDetails(
		user.getBank() == null ? new UserBankDetails() : user.getBank(), userBankRequest, tokenPayLoadDetails);
	log.info("Saving User bank deatils with userId:: {}", userId);
	userBankDetailsRepository.save(userBankDetails);
	log.info("userBank {}", user.getBank());
	user.setBank(userBankDetails);
	userOnboardingRepository.save(user);
	BaseResponse baseResponse = new BanksResponse();
	baseResponse.setMessage(Constants.USER_BANK_DETAILS_SAVED);
	log.info("Save user bank details method ended");
	return baseResponse;
    }

    /**
     * This method used to update user basic details.
     *
     * @param userRequest
     * @param userId
     * @return BaseResponse
     * @throws ParseException
     */
    public BaseResponse updateUserBasicDetails(@Valid UserRequest userRequest, String userId,
	    TokenPayLoadDetails tokenPayLoadDetails) throws ParseException {
	log.info("Update user basic details method started");
	log.info("Fetch User document with userId:: {}", userId);
	Users user = getUser(userId);
	Optional<Users> uniqueUser = userOnboardingRepository.findByPersonnelPhoneNumberAndClientIdAndDeleted(
		userRequest.getContactNumber(), user.getClientId(), false);
	if (uniqueUser.isPresent() && !uniqueUser.get().getId().equals(user.getId())) {
	    throw new BadRequestException(ErrorMessages.CONTACT_NUMBER_ALREADY_MAPPED);
	}
	if (!user.getFirstname().equalsIgnoreCase(userRequest.getFirstName())
		|| !user.getLastname().equalsIgnoreCase(userRequest.getLastName())) {
	    updateReportManagerName(userRequest.getFirstName() + " " + userRequest.getLastName(), user.getId());
	}
	Users users = UserOnboardingMapper.getUser(userRequest, user, null, tokenPayLoadDetails);
	log.info("Updating User document with userId:: {}", userId);
	userOnboardingRepository.save(users);
	BaseResponse response = new BaseResponse();
	response.setMessage(Constants.USER_UPDATED);
	log.info("Update user basic details method ended");
	return response;
    }

    private void updateReportManagerName(String name, String userId) {
	List<Users> users = userOnboardingRepository.findByReportingManagerIdAndDeleted(userId, false);
	users.forEach(user -> user.setReportingManagerName(name));
	userOnboardingRepository.saveAll(users);
    }

    /**
     * This method used to fetch all users with filters.
     *
     * @param fetchAllRequest
     * @param clientId
     * @return PaginationResponse<Users>
     */
    public PaginationResponse<Users> fetchAll(FetchAllUsersRequest fetchAllRequest, String clientId,
	    Boolean isPaginationReq) {
	log.info("enter into fetchAll");
	log.info("fetch users with filters query for clientId {}", clientId);
	Optional<ClientOnboardingDetails> client = clientOnBoardingRepository.findByClientId(clientId);
	if (!client.isPresent()) {
	    throw new BadRequestException(ErrorMessages.NO_RECORD_FOUND_BY_CLIENTID);
	}
	List<Users> fetchAllUser = mongoTemplate.find(getQuery(fetchAllRequest, clientId, isPaginationReq),
		Users.class);
	log.info("fetched users for clientId list size {}", fetchAllUser.size());
	PaginationResponse<Users> userDetails = new PaginationResponse<>();
	userDetails.setMessage("Records fetched successfully");
	userDetails.setData(fetchAllUser);
	long count = mongoTemplate.count(getQuery(fetchAllRequest, clientId, false), Users.class);
	userDetails.setSize(count);
	return userDetails;

    }

    /**
     * This method used to form a query for user filter
     *
     * @param fetchAllRequest
     * @param clientId
     * @param withPagination
     * @return Query
     */
    private Query getQuery(FetchAllUsersRequest fetchAllRequest, String clientId, boolean withPagination) {
	Query query = new Query();
	Order order = new Sort.Order(getSortOrder(fetchAllRequest.getSortOrder()),
		getColumn(fetchAllRequest.getSortBy()));
	query.with(Sort.by(order));
	query.addCriteria(new Criteria("clientId").is(clientId));
	query.addCriteria(new Criteria("deleted").is(false));
	if (withPagination) {
	    query.with(Pageable.ofSize(getValue(fetchAllRequest.getSize(), 10))
		    .withPage(getValue(fetchAllRequest.getPageNumber(), 0)));
	}
	List<Criteria> filterQuery = getFilterQuery(fetchAllRequest);
	if (!filterQuery.isEmpty()) {
	    Criteria andQuery = new Criteria();
	    andQuery.andOperator(filterQuery);
	    query.addCriteria(andQuery);
	}
	return query;
    }

    private List<ObjectId> getRoleIds(String role) {
	List<RoleOnboardingDetails> roles = roleOnboardingRepository.findByRoleLike(role);
	List<ObjectId> roleIds = new ArrayList<>();
	roles.forEach(id -> {
	    roleIds.add(new ObjectId(id.getId()));
	});
	return roleIds;
    }

    /**
     * This method used to form a query for user filter
     *
     * @param request
     * @param clientId
     * @return List<Criteria>
     */
    private List<Criteria> getFilterQuery(FetchAllUsersRequest request) {
	ArrayList<Criteria> filters = new ArrayList<>();
	if (isValid(request.getContactNumber())) {
	    filters.add(Criteria.where("personnelPhoneNumber").regex(request.getContactNumber()));
	}
	if (isValid(request.getEmployeeName())) {
	    List<String> list = Arrays.asList(request.getEmployeeName().split(" "));
	    Criteria orCriteria = new Criteria();
	    Criteria[] regExList = new Criteria[list.size() * 2];
	    IntStream.range(0, list.size()).forEach(i -> {
		regExList[i] = Criteria.where("firstname").regex(list.get(i), Constants.REGEX_CASE_INSENSITIVE);
	    });
	    IntStream.range(0, list.size()).forEach(i -> {
		regExList[regExList.length + i -list.size()] = Criteria.where("lastname").regex(list.get(i),
			Constants.REGEX_CASE_INSENSITIVE);
	    });
	    orCriteria.orOperator(regExList);
	    filters.add(orCriteria);
	}

	if (isValid(request.getEmployeeId())) {
	    filters.add(Criteria.where("userId").regex(request.getEmployeeId(), Constants.REGEX_CASE_INSENSITIVE));
	}

	if (isValid(request.getFrom()) && !isValid(request.getTo())) {
	    Date from = Date.valueOf(getDate(request.getFrom()));
	    Date toDate = Date.valueOf(LocalDate.now().plusDays(1));
	    filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
	}
	if (!isValid(request.getFrom()) && isValid(request.getTo())) {
	    Date from = Date.valueOf(LocalDate.of(2021, 01, 01));
	    Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
	    filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
	}
	if (isValid(request.getFrom()) && isValid(request.getTo())) {
	    Date from = Date.valueOf(getDate(request.getFrom()));
	    Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
	    filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
	}

	if (isValid(request.getAgeTo()) && !isValid(request.getAgeFrom())) {
	    request.setAgeFrom("0");
	}
	if (!isValid(request.getAgeTo()) && isValid(request.getAgeFrom())) {
	    request.setAgeTo("100");
	}

	if (isValid(request.getAgeFrom())) {
	    LocalDate currentDate = LocalDate.now();
	    Date fromDate = Date.valueOf(currentDate.minusYears(Integer.valueOf(request.getAgeFrom())));
	    Date toDate = Date.valueOf(currentDate);
	    if (isValid(request.getAgeTo())) {
		int age = Integer.valueOf(request.getAgeTo()) + 1;
		toDate = Date.valueOf(currentDate.minusYears(age));
	    }
	    filters.add(Criteria.where("dateofBirth").lte(fromDate).gte(toDate));
	}

	if (isValid(request.getMappedStore())) {
	    filters.add(Criteria.where("locations").in(request.getMappedStore(), Constants.REGEX_CASE_INSENSITIVE));
	}
	if (isValid(request.getReportingManager())) {
	    filters.add(Criteria.where("reportingManagerName").regex(request.getReportingManager(),
		    Constants.REGEX_CASE_INSENSITIVE));
	}
	if (isValid(request.getGender())) {
	    filters.add(Criteria.where("gender").is(request.getGender().toUpperCase()));
	}
	if (isValid(request.getRole())) {
	    filters.add(Criteria.where("roles.$id").in(getRoleIds(request.getRole())));
	}
	if (request.getStatus() != null) {
	    if (request.getStatus().getStatus().equalsIgnoreCase("DRAFT")) {
		filters.add(Criteria.where("userCredentials").exists(false));
	    } else {
		filters.add(new Criteria("status").is(request.getStatus().getStatus()));
		filters.add(Criteria.where("userCredentials").exists(true));
	    }
	}
	return filters;

    }

    public LocalDate getDate(String date) {
	DateTimeFormatter outputDateFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy");
	try {
	    return LocalDate.parse(date, outputDateFormat);

	} catch (Exception e) {
	    throw new BadRequestException("Please provide date dd-mm-yyyy format");
	}
    }

//    /**
//     * This method used to get date
//     *
//     * @param date
//     * @return Instant
//     */
//    public String getDate(String date) {
////	DateTimeFormatter ofPattern = DateTimeFormatter.ofPattern("dd-MM-yyyy'T'HH:mm:ss");
////	TemporalAccessor parse = ofPattern.parse(date);
////	LocalDateTime localDateTime = LocalDateTime.from(parse);
////	ZonedDateTime of = ZonedDateTime.of(localDateTime, ZoneOffset.UTC);
////	return of.toInstant();
//
//	TimeZone tz = TimeZone.getTimeZone("UTC");
//	DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
//	df.setTimeZone(tz);
//	return df.format(UserOnboardingMapper.getDate(date));
//    }

    private boolean isValid(String text) {
	return text != null && !text.equalsIgnoreCase("null") && !text.isEmpty();
    }

    private Integer getValue(Optional<Integer> value, Integer defaultValue) {
	return value != null && value.isPresent() ? value.get() : defaultValue;
    }

    private Direction getSortOrder(Optional<String> sortOrder) {
	return sortOrder != null && sortOrder.isPresent() && sortOrder.get().equalsIgnoreCase("ASC") ? Direction.ASC
		: Direction.DESC;
    }

    private String getColumn(Optional<FetchUserColumnOrder> optional) {
	return optional != null && optional.isPresent() ? optional.get().getValue() : "modifiedAt";
    }

    /**
     * This method used to fetch user bank details
     *
     * @param userId
     * @return UserBankDetailsResponse
     */
    public UserBankDetailsResponse fetchUserBankDetails(String userId) {
	Users user = getUser(userId);
	if (user.getBank() == null) {
	    return new UserBankDetailsResponse();
	}
	return UserOnboardingMapper.getUserBankDetails(user.getBank(), new UserBankDetailsResponse());
    }

    /**
     * This method used to get user details
     *
     * @param userId
     * @return Users
     */
    public Users getUser(String userId) {
	Optional<Users> users = userOnboardingRepository.findById(userId);
	if (users.isPresent()) {
	    return users.get();
	}

	throw new ResourceNotFoundException("User details not found with ID " + userId);
    }

    /**
     * This method is used to update user locations
     *
     * @param locationRequest
     * @param userId
     * @return SuccessResponse
     */
    public SuccessResponse updateUserLocations(@Valid LocationRequest locationRequest,
	    TokenPayLoadDetails tokenPayLoadDetails, String userId) {
	log.info("enter into updateUserLocations");
	checkSiteIds(locationRequest);

	List<LocationMapping> sitesMap = locationRequest.getSitesToMap() != null ? locationRequest.getSitesToMap()
		: new ArrayList<>();
	List<String> siteIdsMap = sitesMap.stream().map(sm -> sm.getLocation()).collect(Collectors.toList());
	List<String> deleteList = locationRequest.getSiteIdsToDelete() != null ? locationRequest.getSiteIdsToDelete()
		: new ArrayList<>();
	List<String> list = deleteList.stream().filter(siteIdsMap::contains).collect(Collectors.toList());
	if (list.isEmpty()) {
	    log.info("updateUserLocations User document with userId::{}", userId);
	    Users user = getUser(userId);
	    List<String> siteIdsToMap = siteIdsMap.stream().distinct().collect(Collectors.toList());
	    siteIdsToMap.removeAll(Arrays.asList("", null));
	    // check if given site IDs are active and not deleted
	    List<String> siteIdsToSave = new ArrayList<>();
	    List<SiteOnboardingDetails> siteDetailsList = siteOnboardingRepository
		    .findBySiteIdInAndClientIdAndStatusAndDeleted(siteIdsToMap, user.getClientId(), Status.ACTIVE,
			    false);
	    List<String> siteIds = siteDetailsList.stream().map(SiteOnboardingDetails::getSiteId)
		    .collect(Collectors.toList());
	    String error = String.join(",",
		    siteIdsMap.stream().filter(id -> !siteIds.contains(id)).collect(Collectors.toList()));
	    if (!StringUtils.isBlank(error)) {
		log.info("Mapping locations not found");
		throw new ResourceNotFoundException(ErrorMessages.MAPPING_LOCATIONS_NOT_FOUND + error);
	    }
	    if (!siteDetailsList.isEmpty()) {
		siteDetailsList.stream().forEach(site -> {
		    if (!siteIdsToSave.contains(site.getSiteId())) {
			siteIdsToSave.add(site.getSiteId());
		    }
		});
	    }
	    // delete Site Ids from user
	    if (user.getLocations() != null && !user.getLocations().isEmpty() && !deleteList.isEmpty()) {
		deleteList.forEach(siteId -> {
		    user.getLocations().removeIf(value -> value.equalsIgnoreCase(siteId));
		});
	    }
	    if (!userCredentialsRepository.existsByUserId(user.getUserId())) {
		UserCredentials userCredentials = UserOnboardingMapper.createCredentials(user,
			aesEncryption.encrypt(Constants.PASSWORD), tokenPayLoadDetails);
		userCredentials.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		userCredentials.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		userCredentialsRepository.save(userCredentials);
		user.setUserCredentials(userCredentials);
	    }

		List<LocationMapping> locationMappingsToSave = sitesMap.stream()
			.filter(s -> siteIdsToSave.contains(s.getLocation())).collect(Collectors.toList());

	    // add new site IDs to users table and save
	    user.setLocations(siteIdsToSave);
		user.setLocationMapping(locationMappingsToSave);
	    user.setModifiedAt(Instant.now());
	    user.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	    user.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	    userOnboardingRepository.save(user);
	} else {
	    log.info("enter into updateUserLocations : Bad Request - delete site IDs list, map Site Ids list are same");
	    throw new BadRequestException("Location IDs to Map and Delete should not contain similar IDs");
	}
	log.info("enter into updateUserLocations : ended");
	return new SuccessResponse(Constants.USER_LOCATIONS_UPDATED_SUCCESSFULLY);
    }

 	/**
     * This method is used to upload user location mapping
     *
     * @param model
     * @return SuccessResponse
     */
	public SuccessResponse uploadUserLocationMapping(UploadUserLocationMappingModel model) {
		TokenPayLoadDetails tokenDetails = model.getDetails();

		Map<String, List<LocationMapping>> fileLocationMappings = ExcelService.excelToLocationMapping(model.getFile());
        
		Set<String> uniqueUserIdsFromFile = fileLocationMappings.keySet();
		List<String> ids = new ArrayList<>(uniqueUserIdsFromFile);
		List<Users> usersList = userOnboardingRepository.findByUserIdInAndClientIdAndStatusAndDeleted(ids, tokenDetails.getClientId(), Status.ACTIVE, false);
		
		if (uniqueUserIdsFromFile.size() != usersList.size()) {
			List<String> uniqueUserIdsListFromDb = usersList.stream().map(u -> u.getUserId()).distinct().collect(Collectors.toList());
			List<String> userIdsNotExistsInDb = uniqueUserIdsFromFile.stream().filter(uid -> !uniqueUserIdsListFromDb.contains(uid)).collect(Collectors.toList());
			throw new BadRequestException(ErrorMessages.INVALID_USER_IDS + userIdsNotExistsInDb);
		}

		List<String> locationsFromFile = new ArrayList<>();
		for (Map.Entry<String, List<LocationMapping>> locationMappingEntry : fileLocationMappings.entrySet()) {
			locationMappingEntry.getValue().stream().forEach(lm -> {
				if (!locationsFromFile.contains(lm.getLocation())) {
					locationsFromFile.add(lm.getLocation());
				}
			});
		}

		List<SiteOnboardingDetails> siteDetailsList = siteOnboardingRepository.findBySiteIdInAndClientIdAndStatusAndDeleted(locationsFromFile, tokenDetails.getClientId(), Status.ACTIVE, false);
		if (locationsFromFile.size() != siteDetailsList.size()) {
			List<String> uniqueSiteIdsListFromDb = siteDetailsList.stream().map(s -> s.getSiteId()).distinct().collect(Collectors.toList());
			List<String> siteIdsNotExistsInDb = locationsFromFile.stream().filter(uid -> !uniqueSiteIdsListFromDb.contains(uid)).collect(Collectors.toList());
			
			throw new BadRequestException(ErrorMessages.INVALID_SITE_IDS + siteIdsNotExistsInDb);
		}

		usersList.forEach(user -> {
			List<LocationMapping> existingLocationMappings = new ArrayList<>();
			List<String> existingLocations =  new ArrayList<>();

			if (user.getLocationMapping() != null) {
				existingLocationMappings = user.getLocationMapping();
			}
			if (user.getLocations() != null) {
				existingLocations = user.getLocations();
			}

			List<LocationMapping> locationMappingList = fileLocationMappings.get(user.getUserId());
			locationMappingList.addAll(existingLocationMappings);

			Map<String, LocationMapping> locations = new HashMap<>();

			for (LocationMapping elm : locationMappingList) {
				LocationMapping lm = new LocationMapping();
				
				lm.setUserId(elm.getUserId());
				lm.setLocation(elm.getLocation());

				if (locations.get(elm.getLocation()) != null) {
					lm = locations.get(elm.getLocation());
				}

				List<String> days = new ArrayList<>();
				List<String> dates = new ArrayList<>();

				if (elm.getDays() != null) {
					days = elm.getDays();
				}
				if (elm.getDates() != null) {
					dates = elm.getDates();
				}

				if (lm.getDays() != null) {
					List<String> lmDays = lm.getDays();
					for (String day : lmDays) {
						if (!days.contains(day)) {
							days.add(day);
						}
					}
				}
				if (lm.getDates() != null) {
					List<String> lmDates = lm.getDates();
					for (String date : lmDates) {
						if (!dates.contains(date)) {
							dates.add(date);
						}
					}
				}

				List<String> distinctDays = days.stream().distinct().collect(Collectors.toList());
				List<String> distinctDates = dates.stream().distinct().collect(Collectors.toList());

				lm.setDays(distinctDays);
				lm.setDates(distinctDates);

				locations.put(lm.getLocation(), lm);
			}
			List<LocationMapping> updatedList = new ArrayList<LocationMapping>(locations.values());
			user.setLocationMapping(updatedList);

			Set<String> uniqueLocations = locations.keySet();
			List<String> locationsList = new ArrayList<>(uniqueLocations);
			locationsList.addAll(existingLocations);
			List<String> distinctLocations = locationsList.stream().distinct().collect(Collectors.toList());

			user.setLocations(distinctLocations);
		});
		
		userOnboardingRepository.saveAll(usersList);
		return new SuccessResponse(Constants.USER_LOCATION_MAPPING_UPLOADED_SUCCESSFULLY);
	}

    private void checkSiteIds(LocationRequest locationRequest) {
		if (locationRequest.getSiteIdsToDelete() != null && !locationRequest.getSiteIdsToDelete().isEmpty()
				&& locationRequest.getSitesToMap() != null && !locationRequest.getSitesToMap().isEmpty()) {
			if (locationRequest.getSiteIdsToDelete().contains(null)
					|| locationRequest.getSiteIdsToDelete().contains("")) {
				throw new BadRequestException(ErrorMessages.PROVIDE_VALID_DELETE_USER_LOCATIONS);
			}
			if (locationRequest.getSitesToMap().contains(null) || locationRequest.getSitesToMap().contains("")) {
				throw new BadRequestException(ErrorMessages.PROVIDE_VALID_MAP_USER_LOCATIONS);
			}

			List<String> siteIdsToMap = locationRequest.getSitesToMap().stream().map(sm -> sm.getLocation())
					.collect(Collectors.toList());

			String error = String.join(",", locationRequest.getSiteIdsToDelete().stream()
					.filter(id -> siteIdsToMap.contains(id)).collect(Collectors.toList()));
			if (!StringUtils.isBlank(error)) {
				log.info("Mapping locations and delete locations are same, please provide valid data");
				throw new ResourceNotFoundException(
						ErrorMessages.THESE_MAPPING_LOCATIONS_AND_DELETE_LOCATIONS_ARE_SAME + error);
			}
		}
		
		if (locationRequest.getSitesToMap() != null && !locationRequest.getSitesToMap().isEmpty()) {
			List<String> invalidDays = new ArrayList<>();
			List<String> invalidDates = new ArrayList<>();
			
			ExcelReader er = new ExcelReader();

			for (LocationMapping lm : locationRequest.getSitesToMap()) {
				List<String> days = lm.getDays();
				List<String> dates = lm.getDates();
				
				for (String day : days) {
					day = day.trim();
					if (!Constants.WEEK_DAYS.contains(day.toUpperCase())) {
						invalidDays.add(day);
					}
				}

				for (String date : dates) {
					date = date.trim();

					if (!er.isDateValid(date, "dd-MM-yyyy")) {
						invalidDates.add(date);
					}
				}
			}

			if (!invalidDays.isEmpty()) {
				throw new BadRequestException(ErrorMessages.INVALID_DAYS + invalidDays);
			}
			if (!invalidDates.isEmpty()) {
				throw new BadRequestException(ErrorMessages.INVALID_DATES + invalidDates);
			}
		}
	}

    /**
     * This method used to delete user
     *
     * @param userId
     * @return SuccessResponse
     */
    public SuccessResponse deleteUserByUserId(String userId, TokenPayLoadDetails tokenPayLoadDetails) {
	log.info("enter into deleteUserByUserId");
	log.info("delete User document with userId:: {}", userId);
	Users user = getUser(userId);
	user.setDeleted(true);
	user.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	user.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	userOnboardingRepository.save(user);
	return new SuccessResponse(Constants.USER_DELETED_SUCCESSFULLY);
    }

    /**
     * This method used to fetch location details mapped to user
     *
     * @param userId
     * @return LocationDetailsResponse
     */
    public LocationDetailsResponse viewLocationDetailsByUserId(String userId) {
		log.info("enter into viewLocationDetailsByUserId");
		log.info("fetch User document with userId:: {}", userId);
		Optional<Users> users = userOnboardingRepository.findById(userId);
		if (!users.isPresent()) {
			log.info("enter into viewLocationDetailsByUserId : Resource Not Found - user not found");
			throw new ResourceNotFoundException("userId not found with this id:" + userId);
		}

		LocationDetailsResponse response = new LocationDetailsResponse();
		List<LocationDetails> storesResponse = new ArrayList<>();

		if (users.get().getLocations() != null && !users.get().getLocations().isEmpty()) {
			List<String> siteIds = users.get().getLocations();
			// siteIds.removeAll(Arrays.asList("", null));
			// get site details for each site Id
			log.info("enter into viewLocationDetailsByUserId :: fetching site details");
			List<SiteOnboardingDetails> siteDetailsList = siteOnboardingService.fetchSitesBySiteIds(siteIds,
					users.get().getClientId());

			if (siteDetailsList != null && !siteDetailsList.isEmpty()) {
				siteDetailsList.stream().forEach(site -> {
					List<Users> usersList = new ArrayList<>();
					if (site.getManagers() != null && !site.getManagers().isEmpty()) {
						usersList = siteOnboardingService.fetchAllManagers(site.getManagers(), site.getClientId());
					}

					List<LocationMapping> locationMappingList = new ArrayList<>();
					if (users.get().getLocationMapping() != null) {
						locationMappingList = users.get().getLocationMapping();
					}

					LocationDetails locationDetailsOfSite = UserOnboardingMapper.getLocationDetailsOfSite(site, usersList, locationMappingList);
					storesResponse.add(locationDetailsOfSite);
				});
			}
		}
		response.setLocations(storesResponse);
		response.setTotal(storesResponse.size());
		log.info("enter into viewLocationDetailsByUserId - ended");
		return response;
	}

    /**
     * This method used to change user password
     *
     * @param userId
     * @param newPassword
     * @return SuccessResponse
     */
    public SuccessResponse changePasswordOfUser(String userId, String newPassword,
	    TokenPayLoadDetails tokenPayLoadDetails) {
	log.info("enter into changePasswordOfUser");
	log.info("fetch User document with userId:: {}", userId);
	Optional<Users> onboardingDetailsEntity = userOnboardingRepository.findById(userId);
	if (onboardingDetailsEntity.isPresent() && onboardingDetailsEntity.get().getStatus().equals(Status.ACTIVE)
		&& !onboardingDetailsEntity.get().isDeleted()) {
	    Optional<UserCredentials> credentialsEntity = userCredentialsRepository.findByUserId(userId);
	    if (credentialsEntity.isPresent()) {
		if (!credentialsEntity.get().getPassword().equalsIgnoreCase(newPassword)) {
		    UserCredentials credentialsToUpdate = credentialsEntity.get();
		    credentialsToUpdate.setModifiedAt(Instant.now());
		    String encryptedNewPassword = aesEncryption.encrypt(newPassword);
		    userProfileService.checkPassword(credentialsToUpdate.getPassword(), encryptedNewPassword, null);
		    credentialsToUpdate.setPassword(encryptedNewPassword);
		    credentialsToUpdate.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		    credentialsToUpdate.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
		    userCredentialsRepository.save(credentialsToUpdate);
		    try {
			emailService.sendMail(onboardingDetailsEntity.get().getPersonnelEmail(), credentialsToUpdate,
				false);
		    } catch (Exception exception) {
			log.info("Error occured while sending mail: {}", exception.getMessage());
		    }

		} else {
		    throw new BadRequestException(Constants.PASSWORD_CANNOT_BE_CHANGED);
		}
	    } else {
		throw new EntityNotFoundException(Constants.USER_CREDENTIALS_NOT_FOUND + userId);
	    }
	} else {
	    throw new BadRequestException(userId + " " + Constants.ACTIVE_USER_NOT_FOUND);
	}
	SuccessResponse response = new SuccessResponse();
	response.setId(userId);
	response.setMessage(Constants.PASSWORD_CHANGE_SUCCESS);
	return response;
    }

    /**
     * This method used to fetch user credentials
     *
     * @param userId
     * @return UserCredentialsResponse
     */
    public UserCredentialsResponse fetchCredentialsByUserId(String userId) {
	log.info("enter into fetchCredentialsByUserId");
	log.info("fetch User credentials document with userId:: {}", userId);
	Optional<Users> userOptional = userOnboardingRepository.findById(userId);
	if (!userOptional.isPresent()) {
	    throw new EntityNotFoundException(Constants.NO_RECORD_FOUND + userId);
	}
	if (userOptional.get().getUserCredentials() != null) {
	    UserCredentialsResponse response = new UserCredentialsResponse();
	    response.setJoiningDate(userOptional.get().getUserCredentials().getCreatedAt());
	    response.setUsername(userOptional.get().getUserCredentials().getName());
	    response.setPassword(aesEncryption.decrypt(userOptional.get().getUserCredentials().getPassword()));
	    response.setUserId(userId);
	    response.setEmpId(userOptional.get().getUserId());
	    return response;
	} else {
	    throw new EntityNotFoundException(Constants.USER_CREDENTIALS_NOT_FOUND + userId);
	}
    }

    public EmployeeInfo fetchEmployeeByUserIdClientId(SearchEmployee searchEmp) {
	log.info("enter into fetchEmployeeByUserIdClientId");
	Optional<Users> users = userOnboardingRepository.findByUserIdAndClientIdAndDeleted(searchEmp.getUserId(),
		searchEmp.getClientId(), false);
	if (users.isPresent()) {
	    return UserOnboardingMapper.toEmployeeInfo(users.get());
	}
	log.info("fetchEmployeeByUserIdClientId : User not found with client ID : " + searchEmp.getClientId()
	+ " and user ID : " + searchEmp.getUserId());
	throw new ResourceNotFoundException("Employee not found with client ID : " + searchEmp.getClientId()
		+ " and user ID : " + searchEmp.getUserId());
    }

    public List<Users> fetchUserByUserIdsAndClientId(List<String> userIds, String clientId) {
	log.info("enter into fetchUserByUserIdClientId");
	List<Users> users = userOnboardingRepository.findByUserIdInAndClientIdAndStatusAndDeleted(userIds, clientId,
		Status.ACTIVE, false);
	if (users != null && !users.isEmpty()) {
	    return users;
	}
	log.info("fetchUserByUserIdClientId : Users not found with client ID : " + clientId + " and user IDs : "
		+ userIds.toString());
	throw new ResourceNotFoundException(
		"Active User / User not found with client ID : " + clientId + " and user IDs : " + userIds.toString());
    }

    public List<UserModulesResponse> getUserModules(TokenPayLoadDetails details) {
	Optional<Users> userOptional = userOnboardingRepository.findByUserIdAndClientIdAndDeleted(details.getUserId(),
		details.getClientId(), false);

	if (!userOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.USER_NOT_FOUND_WITH_ID + details.getUserId());
	}

	List<String> moduleIds = new ArrayList<>();
	Users user = userOptional.get();
	user.getRoles().forEach(role -> {
	    role.getModule().forEach(module -> {
		if (!moduleIds.contains(module.getId())) {
		    moduleIds.add(module.getId());
		}
	    });
	});
	List<UserModulesResponse> moduleResponseList = new ArrayList<>();
	List<Module> modules = moduleRepository.findByIdIn(moduleIds);
	List<SubModules> subModules = subModuleRepository.findByIdIn(moduleIds);
	modules.forEach(module -> {
	    if (!module.isDeleted()) {
		UserModulesResponse response = new UserModulesResponse();
		response.setIcon(module.getIconUrl());
		response.setId(module.getId());
		response.setName(module.getName());
		response.setSubModules(getSubModules(subModules, module.getId()));
		moduleResponseList.add(response);
	    }
	});
	return moduleResponseList;
    }

    private List<UserModulesResponse> getSubModules(List<SubModules> subModules, String id) {
	List<UserModulesResponse> moduleResponseList = new ArrayList<>();
	List<SubModules> subModulesList = subModules.stream()
		.filter(module -> module.getModuleId().equalsIgnoreCase(id)).collect(Collectors.toList());
	subModulesList.forEach(module -> {
	    if (!module.isDeleted()) {
		UserModulesResponse response = new UserModulesResponse();
		response.setIcon(module.getIconUrl());
		response.setId(module.getId());
		response.setName(module.getName());
		moduleResponseList.add(response);
	    }
	});
	return moduleResponseList;
    }

    public EmployeeDetails getEmployeeDetails(String userId) {

	Users user = getUser(userId);
	Users refferedUser = null;
	Users reportingUser = null;
	if (!StringUtils.isBlank(user.getRefferedEmployeeId())) {
	    refferedUser = userProfileService.getUserOrNull(user.getRefferedEmployeeId());
	}
	if (!StringUtils.isBlank(user.getReportingManagerId())) {
	    reportingUser = userProfileService.getUserOrNull(user.getReportingManagerId());
	}

	return UserOnboardingMapper.toEmployeeDetails(user, reportingUser, refferedUser);
    }

    public List<UserEmployeeInfo> getEmployeeInfo(TokenPayLoadDetails details) {

	List<Users> users = new ArrayList<>();
	List<String> userIds = new ArrayList<>();
	userIds.add(details.getId());
	getUsers(userIds, users, details.getId());

	return users.stream().map(user -> UserOnboardingMapper.getUsersEmployeeInfo(user)).collect(Collectors.toList());

    }

    private void getUsers(List<String> userIds, List<Users> users, String id) {

	List<Users> teamIds = userOnboardingRepository.findByReportingManagerIdInAndDeletedAndIdNot(userIds, false, id);
	if (!users.isEmpty()) {
	    teamIds.removeAll(users);
	}
	if (teamIds.isEmpty()) {
	    return;
	}
	users.addAll(teamIds);
	List<String> uniqueUsers = teamIds.stream().map(Users::getId).collect(Collectors.toList());
	userIds = uniqueUsers;
	getUsers(userIds, users, id);

    }

    public List<UserSitesFilterResponse> fetchSitesByUser(TokenPayLoadDetails details) {
	log.info("enter into viewLocationDetailsByUserId");
	log.info("fetch User document with userId:: {}", details.getId());
	Optional<Users> users = userOnboardingRepository.findById(details.getId());
	if (!users.isPresent()) {
	    log.info("enter into viewLocationDetailsByUserId : Resource Not Found - user not found");
	    throw new ResourceNotFoundException("userId not found with this id:" + details.getId());
	}
	List<UserSitesFilterResponse> storesResponse = new ArrayList<>();
	if (users.get().getLocations() != null && !users.get().getLocations().isEmpty()) {
	    List<String> siteIds = users.get().getLocations();
	    log.info("enter into viewLocationDetailsByUserId :: fetching site details");
	    List<SiteOnboardingDetails> siteDetailsList = siteOnboardingService.fetchSitesBySiteIds(siteIds,
		    users.get().getClientId());
	    if (siteDetailsList != null && !siteDetailsList.isEmpty()) {
		storesResponse = siteDetailsList.stream()
			.map(site -> UserOnboardingMapper.getUserSitesFilterResponse(site))
			.collect(Collectors.toList());
	    }
	}
	log.info("enter into viewLocationDetailsByUserId - ended");
	return storesResponse;
    }

	public List<UserLocationMapping> getUserLocationMapping(String userId) {
		Optional<Users> userO = userOnboardingRepository.findByUserId(userId);
		if (!userO.isPresent()) {
			throw new ResourceNotFoundException("User not found with this id:" + userId);
		}
		Users user = userO.get();
		List<LocationMapping> locationMappings = user.getLocationMapping();
		return locationMappings.stream().map(lm -> UserOnboardingMapper.getUserLocationMapping(lm)).collect(Collectors.toList());
	}

}
