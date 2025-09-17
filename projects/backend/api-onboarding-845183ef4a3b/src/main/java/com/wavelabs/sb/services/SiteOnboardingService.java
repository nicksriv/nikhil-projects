package com.wavelabs.sb.services;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
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

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.SiteType;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.mappers.RoleMapper;
import com.wavelabs.sb.mappers.SiteOnboardingMapper;
import com.wavelabs.sb.model.CreateSiteModel;
import com.wavelabs.sb.model.DeleteSiteModel;
import com.wavelabs.sb.model.SiteDetails;
import com.wavelabs.sb.model.SitesColumnOrder;
import com.wavelabs.sb.model.UpdateSiteModel;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.SiteOnboardingRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.FetchAllSitesRequest;
import com.wavelabs.sb.request.SiteOnboardingRequest;
import com.wavelabs.sb.request.SiteOnboardingUpdateRequest;
import com.wavelabs.sb.response.EmployeeInfo;
import com.wavelabs.sb.response.FetchAllSitesResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class SiteOnboardingService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SiteOnboardingService.class);

    @Autowired
    SiteOnboardingRepository siteOnboardingRepository;

    @Autowired
    ClientOnboardingRepository clientOnBoardingRepository;

    @Autowired
    UserOnboardingService userOnboardingService;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    @Autowired
    RoleOnboardingRepository roleOnboardingRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public SuccessResponse saveSiteDetails(CreateSiteModel model) {
	LOGGER.info("save SiteDetails method started..!");
	SiteOnboardingRequest request = model.getSiteOnboardingRequest();
	chectSiteType(request.getType());
	// duplicate site ID validation
	Optional<SiteOnboardingDetails> duplicateSiteId = siteOnboardingRepository
		.findBySiteIdAndClientIdAndDeleted(request.getSiteId(), request.getClientId(), false);
	if (duplicateSiteId.isPresent()) {
	    throw new BadRequestException(Constants.SITE_ID_ALREADY_MAPPED);
	}
	String clientObjectId = clientExistsWithClientId(request.getClientId()).getId();

	SiteOnboardingDetails siteToSave = SiteOnboardingMapper.siteOnboardingMapper(request,
		model.getTokenPayLoadDetails());
	List<String> userIds = siteToSave.getManagers();
	if (userIds != null && !userIds.isEmpty()) {
	    // adding Site Manager Role to Managers
	    removeEmptyAndNull(userIds);
	    List<Users> usersForAddingRole = userOnboardingService.fetchUserByUserIdsAndClientId(userIds,
		    siteToSave.getClientId());
	    // check if SM role exists for clientObjectId else create and save a new SM role
	    RoleOnboardingDetails siteManagerRoleByClientId = siteManagerRoleByClientId(clientObjectId);
	    usersForAddingRole.stream().forEach(user -> mapSiteManagerRole(user, siteManagerRoleByClientId));
	}
	SiteOnboardingDetails savedSite = siteOnboardingRepository.save(siteToSave);
	SuccessResponse response = new SuccessResponse();
	response.setId(savedSite.getId());
	response.setMessage(Constants.SITE_ADDED);

	LOGGER.info("save SiteDetails method Ended..!");
	return response;
    }

    public RoleOnboardingDetails siteManagerRoleByClientId(String clientObjectId) {
	LOGGER.info("existsSiteManagerByClientId :: started");
	Optional<RoleOnboardingDetails> roleOnboardingDetails = roleOnboardingRepository
		.findByClientIdAndRoleIgnoreCaseAndDeleted(clientObjectId, Constants.SITE_MANAGER_ROLE, false);
	if (roleOnboardingDetails.isPresent()) {
	    LOGGER.info("existsSiteManagerByClientId :: ended");
	    return roleOnboardingDetails.get();
	}
	LOGGER.info("existsSiteManagerByClientId :: returned new SM role");
	return roleOnboardingRepository.save(RoleMapper.getRoleWithSiteManager(clientObjectId));
    }

    public void mapSiteManagerRole(Users user, RoleOnboardingDetails siteManagerRole) {
	LOGGER.info("map site Manager Role method started..!");
	List<RoleOnboardingDetails> roles = user.getRoles();
	if (roles != null && !roles.isEmpty()) {
	    if (!siteManagerRoleExists(roles, siteManagerRole.getClientId())) {
		// add Site Manager Role to roles
		user.getRoles().add(siteManagerRole);
		userOnboardingRepository.save(user);
	    } else {
		userOnboardingRepository.save(user);
	    }
	} else {
	    roles = new ArrayList<>();
	    roles.add(siteManagerRole);
	    user.setRoles(roles);
	    userOnboardingRepository.save(user);
	}
	LOGGER.info("map site Manager Role method ended..!");
    }

    private void chectSiteType(String type) {
	List<String> siteTypes = new ArrayList<>(Arrays.asList(getNames(SiteType.class)));
	if (!StringUtils.isBlank(type) && !siteTypes.contains(type.toUpperCase())) {
	    throw new BadRequestException(ErrorMessages.PROVIDE_SITE_TYPE + StringUtils.join(siteTypes, ","));
	}
    }

    public static String[] getNames(Class<? extends Enum<?>> e) {
	return Arrays.stream(e.getEnumConstants()).map(Enum::name).toArray(String[]::new);
    }

    private boolean siteManagerRoleExists(List<RoleOnboardingDetails> roles, String clientObjectId) {
	LOGGER.info("site Manager Role Exists method started..!");
	for (RoleOnboardingDetails role : roles) {
	    if (role.getRole().equalsIgnoreCase(Constants.SITE_MANAGER_ROLE)
		    && role.getClientId().equalsIgnoreCase(clientObjectId)) {
		role.setDeleted(false);
		role.setStatus(Status.ACTIVE);
		role.setModifiedAt(Instant.now());
		role.setModifiedBy(clientObjectId);
		LOGGER.info("out of site Manager Role Exists method..!");
		return true;
	    }
	}
	LOGGER.info("out of site Manager Role Exists method..!");
	return false;
    }

    public SuccessResponse updateSiteDetails(UpdateSiteModel model) {
	LOGGER.info("update SiteDetails method started..!");
	SiteOnboardingUpdateRequest request = model.getSiteOnboardingUpdateRequest();
	Optional<SiteOnboardingDetails> siteDetails = siteOnboardingRepository.findById(request.getId());
	if (siteDetails.isPresent()) {
	    if (request.getClientId() != null && !request.getClientId().isEmpty()) {

		String clientObjectId = clientExistsWithClientId(request.getClientId()).getId();
		SiteOnboardingDetails existingSiteDetails = siteDetails.get();

		// check if SM role exists for clientObjectId else create and save a new SM role
		RoleOnboardingDetails siteManagerRoleByClientId = siteManagerRoleByClientId(clientObjectId);

		removeEmptyAndNull(request.getManagers());
		removeEmptyAndNull(existingSiteDetails.getManagers());
		List<String> existingMappedUserIdsToUnmap = existingSiteDetails.getManagers();
		List<String> userIdsToMap = request.getManagers();
		userIdsToMap.stream().forEach(userId -> {
		    existingMappedUserIdsToUnmap.removeIf(userIdToRemove -> userIdToRemove.equalsIgnoreCase(userId));
		});
		existingMappedUserIdsToUnmap.stream().forEach(userId -> {
		    userIdsToMap.removeIf(userIdToRemove -> userIdToRemove.equalsIgnoreCase(userId));
		});

		// unmap existing and removed userIds
		if (!existingMappedUserIdsToUnmap.isEmpty()) {
		    List<Users> usersForToRemoveSMROle = userOnboardingService
			    .fetchUserByUserIdsAndClientId(existingMappedUserIdsToUnmap, request.getClientId());
		    usersForToRemoveSMROle.stream().forEach(this::unmapSiteManagerRole);
		}
		// map new userids
		if (!userIdsToMap.isEmpty()) {
		    List<Users> usersForAddingRole = userOnboardingService.fetchUserByUserIdsAndClientId(userIdsToMap,
			    request.getClientId());
		    usersForAddingRole.stream().forEach(user -> mapSiteManagerRole(user, siteManagerRoleByClientId));
		}
		SiteOnboardingDetails siteToUpdate = SiteOnboardingMapper.siteOnboardingUpdateMapper(request,
			siteDetails.get(), model.getTokenPayLoadDetails());
		siteOnboardingRepository.save(siteToUpdate);
	    } else {
		LOGGER.info("update SiteDetails method Bad Request Exception..!");
		throw new BadRequestException("Updating Site Failed : Please provide clientId");
	    }
	} else {
	    LOGGER.info("update SiteDetails method Entity Found Exception..!");
	    throw new EntityNotFoundException(Constants.SITE_NOT_FOUND + request.getId());
	}
	SuccessResponse response = new SuccessResponse();
	response.setId(request.getId());
	response.setMessage(Constants.SITE_UPDATED);

	LOGGER.info("update SiteDetails method Ended..!");
	return response;
    }

    public void unmapSiteManagerRole(Users user) {
	List<RoleOnboardingDetails> rolesWithoutSiteManagerRole = user.getRoles();
	rolesWithoutSiteManagerRole.removeIf(role -> role.getRole().equalsIgnoreCase(Constants.SITE_MANAGER_ROLE));
	user.setRoles(rolesWithoutSiteManagerRole);
	userOnboardingRepository.save(user);
    }

    private void removeEmptyAndNull(List<String> list) {
	Iterator<String> i = list.iterator();
	while (i.hasNext()) {
	    String s = i.next();
	    if (s == null || s.isEmpty()) {
		i.remove();
	    }
	}
    }

    public ClientOnboardingDetails clientExistsWithClientId(String clientId) {
	LOGGER.info("clientExistsWithClientId started");
	Optional<ClientOnboardingDetails> clientById = clientOnBoardingRepository
		.findByClientIdAndStatusAndDeleted(clientId, Status.ACTIVE, false);
	if (!clientById.isPresent()) {
	    LOGGER.info("clientExistsWithClientId EntityNotFound");
	    throw new EntityNotFoundException(Constants.ACTIVE_CLIENT_NOT_FOUND + " client Id : " + clientId);
	}
	LOGGER.info("clientExistsWithClientId ended");
	return clientById.get();
    }

    public SuccessResponse deleteSiteDetails(DeleteSiteModel model) {

	LOGGER.info("delete SiteDetails method started..!");
	Optional<SiteOnboardingDetails> findBySiteId = siteOnboardingRepository.findBySiteId(model.getSiteId());
	if (findBySiteId.isPresent()) {
	    SiteOnboardingDetails siteOnboardingDetailsToDelete = findBySiteId.get();
	    siteOnboardingDetailsToDelete.setDeleted(true);
	    siteOnboardingDetailsToDelete.setModifiedAt(Instant.now());
	    siteOnboardingDetailsToDelete
		    .setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails()));
	    siteOnboardingDetailsToDelete.setModifiedUserType(model.getTokenPayLoadDetails().getTypeOfUser());
	    siteOnboardingRepository.save(siteOnboardingDetailsToDelete);
	} else {
	    LOGGER.info("delete SiteDetails method Entity Not Found Exception..!");
	    throw new EntityNotFoundException("Enitity not found with site ID : " + model.getSiteId());
	}
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId(model.getSiteId());
	successResponse.setMessage(Constants.SITE_DELETED);
	LOGGER.info("delete SiteDetails method ended..!");
	return successResponse;
    }

    public PaginationResponse<FetchAllSitesResponse> fetchAllSites(FetchAllSitesRequest fetchAllSitesRequest) {
	LOGGER.info("fetch All Sites method started..!");
	List<SiteOnboardingDetails> sitesDetails = mongoTemplate.find(
		getQuery(fetchAllSitesRequest, fetchAllSitesRequest.isPaginationRequired()),
		SiteOnboardingDetails.class);
	PaginationResponse<SiteOnboardingDetails> siteDetailsPagResponse = new PaginationResponse<>();
	siteDetailsPagResponse.setData(sitesDetails);
	siteDetailsPagResponse.setMessage(
		sitesDetails.isEmpty() ? Constants.NO_RECORDS_FOUND : Constants.RECORDS_FETCHED_SUCCESSFULLY);
	siteDetailsPagResponse
		.setSize(mongoTemplate.count(getQuery(fetchAllSitesRequest, false), SiteOnboardingDetails.class));
	LOGGER.info("fetch All Sites method ended..!");
	return fetchAllSitesResponse(siteDetailsPagResponse, fetchAllSitesRequest.isPaginationRequired());
    }

    public List<SiteDetails> fetchAllSitesToDownload(FetchAllSitesRequest fetchAllSitesRequest) {
	LOGGER.info("fetchAllSitesToDownload method started..!");
	List<SiteOnboardingDetails> detailsList = mongoTemplate.find(
		getQuery(fetchAllSitesRequest, fetchAllSitesRequest.isPaginationRequired()),
		SiteOnboardingDetails.class);
	return SiteOnboardingMapper.getDownloadSitesDetails(detailsList);
    }

    private Query getQuery(FetchAllSitesRequest fetchAllSitesRequest, boolean pagination) {
	LOGGER.info("getQuery method started..!");
	Query query = new Query();
	Order order = new Sort.Order(getSortOrder(fetchAllSitesRequest.getSortOrder()),
		getColumn(fetchAllSitesRequest.getSortBy()));
	query.with(Sort.by(order));
	if (pagination) {
	    query.with(Pageable.ofSize(getValue(fetchAllSitesRequest.getSize(), 10))
		    .withPage(getValue(fetchAllSitesRequest.getPageNumber(), 0)));
	}
	List<Criteria> filterQuery = getFilterQuery(fetchAllSitesRequest);
	if (!filterQuery.isEmpty()) {
	    Criteria andQuery = new Criteria();
	    andQuery.andOperator(filterQuery);
	    query.addCriteria(andQuery);
	}
	LOGGER.info("out of getQuery method..!");
	return query;
    }

    private Direction getSortOrder(Optional<String> sortOrder) {
	LOGGER.info("in getSortOrder method..!");
	return sortOrder != null && sortOrder.isPresent() && sortOrder.get().equalsIgnoreCase("ASC") ? Direction.ASC
		: Direction.DESC;
    }

    private String getColumn(Optional<SitesColumnOrder> order) {
	LOGGER.info("in getColumn method..!");
	return order != null && order.isPresent() ? order.get().getValue() : "modifiedAt";
    }

    private Integer getValue(Optional<Integer> value, Integer defaultValue) {
	LOGGER.info("in getValue method..!");
	return value != null && value.isPresent() ? value.get() : defaultValue;
    }

    public List<Criteria> getFilterQuery(FetchAllSitesRequest request) {
	LOGGER.info("getFilterQuery method started..!");
	ArrayList<Criteria> filters = new ArrayList<>();
	if (isValidValue(request.getName())) {
	    filters.add(Criteria.where("name").regex(request.getName(), Constants.REGEX_CASE_INSENSITIVE));
	}
	if (isValidValue(request.getSiteId())) {
	    filters.add(Criteria.where("siteId").regex(request.getSiteId(), Constants.REGEX_CASE_INSENSITIVE));
	}
	if (isValidValue(request.getClientId())) {
	    filters.add(Criteria.where("clientId").regex(request.getClientId(), Constants.REGEX_CASE_INSENSITIVE));
	}
	if (isValidValue(request.getState())) {
	    filters.add(Criteria.where("state").regex(request.getState(), Constants.REGEX_CASE_INSENSITIVE));
	}
	if (isValidValue(request.getCity())) {
	    filters.add(Criteria.where("city").regex(request.getCity(), Constants.REGEX_CASE_INSENSITIVE));
	}
	if (isValidValue(request.getStatus())) {
	    filters.add(Criteria.where("status").is(request.getStatus().toUpperCase()));
	}
	if (!request.isPaginationRequired()) {
	    filters.add(Criteria.where("status").is(Status.ACTIVE.toString()));
	}
	if (isValidValue(request.getType())) {
	    filters.add(Criteria.where("type").is(request.getType().toUpperCase()));
	}

	if (isValidValue(request.getFrom()) && !isValidValue(request.getTo())) {
	    Date from = Date.valueOf(getDate(request.getFrom()));
	    Date toDate = Date.valueOf(LocalDate.now().plusDays(1));
	    filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
	}
	if (!isValidValue(request.getFrom()) && isValidValue(request.getTo())) {
	    Date from = Date.valueOf(LocalDate.of(2021, 01, 01));
	    Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
	    filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
	}
	if (isValidValue(request.getFrom()) && isValidValue(request.getTo())) {
	    Date from = Date.valueOf(getDate(request.getFrom()));
	    Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
	    filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
	}
	filters.add(Criteria.where("deleted").is(false));
	LOGGER.info("returned from getFilterQuery method..!");
	return filters;
    }

    private boolean isValidValue(String text) {
	LOGGER.info("in isValidValue method..!");
	return text != null && !text.equalsIgnoreCase("null") && !text.isEmpty();
    }

    public LocalDate getDate(String date) {
	LOGGER.info("in getDate method..!");
	DateTimeFormatter outputDateFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy");
	try {
	    LOGGER.info("returned from getDate method..!");
	    return LocalDate.parse(date, outputDateFormat);
	} catch (Exception e) {
	    LOGGER.info("getDate method Bad Request Exception..!");
	    throw new BadRequestException("Please provide date in dd-mm-yyyy format");
	}
    }

    private PaginationResponse<FetchAllSitesResponse> fetchAllSitesResponse(
	    PaginationResponse<SiteOnboardingDetails> fetchAll, boolean pagination) {
	LOGGER.info("fetchAllSitesResponse method started..!");
	List<FetchAllSitesResponse> fetchAllSitesResponseList = new ArrayList<>();
	if (pagination) {
	    fetchAll.getData().forEach(siteDetails -> {
		FetchAllSitesResponse fetchAllSitesResponse = SiteOnboardingMapper.toFetchAllSitesResponse(siteDetails);
		List<EmployeeInfo> managers = new ArrayList<>();
		if (siteDetails.getManagers() != null && !siteDetails.getManagers().isEmpty()) {
		    List<Users> managersResponse = fetchAllManagers(siteDetails.getManagers(),
			    siteDetails.getClientId());
		    fetchAllSitesResponse.setManagers(SiteOnboardingMapper.getManagers(managersResponse));
		} else {
		    fetchAllSitesResponse.setManagers(managers);
		}
		fetchAllSitesResponseList.add(fetchAllSitesResponse);
	    });
	} else {
	    fetchAll.getData().forEach(siteDetails -> {
		FetchAllSitesResponse fetchAllSitesResponse = new FetchAllSitesResponse();
		fetchAllSitesResponse.setId(siteDetails.getId());
		fetchAllSitesResponse.setSiteId(siteDetails.getSiteId());
		fetchAllSitesResponseList.add(fetchAllSitesResponse);
	    });
	}

	PaginationResponse<FetchAllSitesResponse> response = new PaginationResponse<>();
	response.setMessage("Records fetched successfully");
	response.setData(fetchAllSitesResponseList);
	response.setSize(fetchAll.getSize());
	LOGGER.info("fetchAllSitesResponse method ended..!");
	return response;
    }

    public SiteOnboardingDetails fetchSite(String id) {
	LOGGER.info("fetchSite method started..!");
	Optional<SiteOnboardingDetails> siteOpt = siteOnboardingRepository.findById(id);
	if (!siteOpt.isPresent()) {
	    LOGGER.info("fetchSite method Entity Not Found Exception..!");
	    throw new EntityNotFoundException("Enitity not found with site ID : " + id);
	}
	LOGGER.info("fetchSite method ended..!");
	return siteOpt.get();
    }

    public List<SiteOnboardingDetails> fetchSitesBySiteIds(List<String> siteIds, String clientId) {
	LOGGER.info("fetchSiteBySiteId method started..!");
	List<SiteOnboardingDetails> sitesList = siteOnboardingRepository
		.findBySiteIdInAndClientIdAndStatusAndDeleted(siteIds, clientId, Status.ACTIVE, false);
	LOGGER.info("fetchSiteBySiteId method ended..!");
	return sitesList;
    }

    public List<Users> fetchAllManagers(List<String> userIds, String clientId) {
	LOGGER.info("in fetchAllManagers method..!");
	return userOnboardingRepository.findByUserIdInAndClientId(userIds, clientId);
    }

}
