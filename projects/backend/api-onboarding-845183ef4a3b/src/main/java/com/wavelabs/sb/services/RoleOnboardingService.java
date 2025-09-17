package com.wavelabs.sb.services;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.collections4.map.HashedMap;
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

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.enums.FetchAllColumnOrder;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.model.DeleteRoleModel;

import com.wavelabs.sb.repositories.ModuleRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.SubModuleRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.FetchAllRolesRequest;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class RoleOnboardingService {

    private Logger LOGGER = LoggerFactory.getLogger(RoleOnboardingService.class);

    @Autowired
    ModuleRepository moduleRepository;

    @Autowired
    RoleOnboardingRepository roleOnboardingRepository;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    @Autowired
    SubModuleRepository subModuleRepository;
    @Autowired
    ClientOnboardingRepository clientOnBoardingRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public PaginationResponse<RoleOnboardingDetails> fetchAllRoles(FetchAllRolesRequest request, String clientId) {
	LOGGER.info("enter into fetchAll");
	Optional<ClientOnboardingDetails> client = clientOnBoardingRepository.findById(clientId);
	if (!client.isPresent()) {
	    throw new BadRequestException(ErrorMessages.NO_RECORD_FOUND);
	}

	List<RoleOnboardingDetails> fetchAllUser = mongoTemplate
		.find(getQuery(request, request.isPagination(), clientId), RoleOnboardingDetails.class);
	LOGGER.info("fetched users for clientId list size {}", fetchAllUser.size());
	PaginationResponse<RoleOnboardingDetails> allRoles = new PaginationResponse<>();
	allRoles.setMessage("Records fetched successfully");
	allRoles.setData(fetchAllUser);
	long count = mongoTemplate.count(getQuery(request, false, clientId), RoleOnboardingDetails.class);
	allRoles.setSize(count);
	LOGGER.info("fetch All Roles : end");
	return allRoles;

    }

    /**
     * This method used to form a query for user filter
     * 
     * @param fetchAllRequest
     * @param clientId
     * @param withPagination
     * @return Query
     */
    private Query getQuery(FetchAllRolesRequest request, boolean withPagination, String clientId) {
	LOGGER.info("get Query : begin");
	Query query = new Query();
	Order order = new Sort.Order(getSortOrder(request.getSortBy()), getColumn(request.getSortColumn()));
	query.with(Sort.by(order));
	if (isValid(request.getRoleName())) {
	    query.addCriteria(new Criteria("role").regex(request.getRoleName(), Constants.REGEX_CASE_INSENSITIVE));
	}
	query.addCriteria(new Criteria("deleted").is(false));
	if (isValid(request.getStatus()) && request.isPagination()) {
	    query.addCriteria(new Criteria("status").is(request.getStatus()));
	}
	if (isValid(request.getModules())) {
	    query.addCriteria(new Criteria("module._id").in(getModuleIdList(request.getModules())));
	}
	if (!request.isPagination()) {
	    query.addCriteria(new Criteria("status").is(Status.ACTIVE.toString()));
	}
	query.addCriteria(new Criteria("clientId").is(clientId));
	if (withPagination) {
	    query.with(Pageable.ofSize(getValue(request.getSize(), 10)).withPage(getValue(request.getPage(), 0)));
	}
	List<Criteria> filterQuery = getFilterQuery(request);
	if (!filterQuery.isEmpty()) {
	    Criteria andQuery = new Criteria();
	    andQuery.andOperator(filterQuery);
	    query.addCriteria(andQuery);
	}
	LOGGER.info("get Query : end");
	return query;
    }

    private List<ObjectId> getModuleIdList(String moduleName) {
	LOGGER.info("get Modules List : begin");
	List<Module> roles = moduleRepository.findByNameLike(moduleName);
	List<SubModules> subModules = subModuleRepository.findByNameLike(moduleName);
	List<ObjectId> roleIds = new ArrayList<>();
	roles.forEach(id -> {
	    roleIds.add(new ObjectId(id.getId()));
	});
	subModules.forEach(id -> {
	    roleIds.add(new ObjectId(id.getId()));
	});
	LOGGER.info("get Modules List : end");
	return roleIds;
    }

    /**
     * This method used to form a query for user filter
     * 
     * @param request
     * @param clientId
     * @return List<Criteria>
     */
    private List<Criteria> getFilterQuery(FetchAllRolesRequest request) {
	LOGGER.info("get Filter Query : begin");
	ArrayList<Criteria> filters = new ArrayList<>();
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
	LOGGER.info("get Filter Query : end");
	return filters;

    }

    public LocalDate getDate(String date) {
	LOGGER.info("get Date : begin");
	DateTimeFormatter outputDateFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy");
	try {
	    LOGGER.info("get Date : end");
	    return LocalDate.parse(date, outputDateFormat);

	} catch (Exception e) {
	    LOGGER.info("get Date : Bad Request Exception - Invalid Date Format");
	    throw new BadRequestException("Please provide date dd-mm-yyyy format");
	}
    }

    private boolean isValid(String text) {
	LOGGER.info("In is Valid Field :: method");
	return text != null && !text.equalsIgnoreCase("null") && !text.isEmpty();
    }

    private Integer getValue(Optional<Integer> value, Integer defaultValue) {
	LOGGER.info("In get Value :: method");
	return value != null && value.isPresent() ? value.get() : defaultValue;
    }

    private Direction getSortOrder(Optional<String> sortOrder) {
	LOGGER.info("In get Sort Order :: method");
	return sortOrder != null && sortOrder.isPresent() && sortOrder.get().equalsIgnoreCase("ASC") ? Direction.ASC
		: Direction.DESC;
    }

    private String getColumn(Optional<FetchAllColumnOrder> optional) {
	LOGGER.info("In get Column :: method");
	return optional != null && optional.isPresent() ? optional.get().getValue() : "modifiedAt";
    }

    public RoleOnboardingDetails fetchRoleById(String id) {
	LOGGER.info("fetch Role By Id :: begin");
	Optional<RoleOnboardingDetails> responseOpt = roleOnboardingRepository.findByIdAndDeleted(id, false);
	if (responseOpt.isPresent()) {
	    LOGGER.info("fetch Role By Id :: end");
	    return responseOpt.get();
	}
	LOGGER.info("fetch Role By Id :: Entity Not Foubd Exception - No Records Found");
	throw new EntityNotFoundException(Constants.NO_RECORD_FOUND + id);
    }

    public List<String> fetchRoleIds(PaginationResponse<RoleOnboardingDetails> response) {
	LOGGER.info("fetching Role Ids :: ");
	return response.getData().stream().map(role -> role.getId()).collect(Collectors.toList());
    }

    public Map<String, List<Module>> getModules(List<String> roleIds) {
	LOGGER.info("get Modules :: begin");
	Map<String, List<Module>> map = new HashedMap<>();
	roleIds.stream().forEach(id -> {
	    map.put(id, moduleRepository.findAllByRoleId(id));
	});
	LOGGER.info("get Modules :: end");
	return map;

    }

    public Map<String, Integer> getUserCount(List<String> roleIds) {
	LOGGER.info("get User Count :: Begin");
	Map<String, Integer> map = new HashedMap<>();
	roleIds.stream().forEach(id -> {
	    map.put(id, userOnboardingRepository.userCountWithRole(id, false).size());
	});
	LOGGER.info("get User Count :: end");
	return map;
    }

    public SuccessResponse deleteRole(DeleteRoleModel model) {

	LOGGER.info("delete Role :: begin");
	Optional<RoleOnboardingDetails> roleOptional = roleOnboardingRepository.findById(model.getId());
	if (!roleOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.ROLE_NOT_FOUND);
	}

	if (roleOptional.get().getRole().equalsIgnoreCase(Constants.SITE_MANAGER_ROLE)) {
	    throw new BadRequestException(ErrorMessages.SITE_MANAGER_ROLE_CANNOT_BE_DELETED);
	}
	if (roleOptional.get().getRole().equalsIgnoreCase(Constants.ADMIN)) {
	    throw new BadRequestException(ErrorMessages.ADMIN_ROLE_CANNOT_BE_DELETED);
	}
	roleOptional.get().setDeleted(true);
	roleOptional.get().setModifiedAt(Instant.now());
	roleOptional.get().setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails()));
	roleOptional.get().setModifiedUserType(model.getTokenPayLoadDetails().getTypeOfUser());
	LOGGER.info("delete Role :: updating Role");
	roleOnboardingRepository.save(roleOptional.get());

	LOGGER.info("delete Role :: end");
	return new SuccessResponse(Constants.ROLE_DELETED_SUCCESSFULLY);
    }

}
