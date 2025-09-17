package com.wavelabs.sb.services;

import static com.mongodb.client.model.Filters.eq;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Collation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoCollection;
import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ScreenFields;
import com.wavelabs.sb.documents.ScreenWorkFlow;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.mappers.ScreenBuilderMapper;
import com.wavelabs.sb.model.DeleteFormDataModel;
import com.wavelabs.sb.model.FetchAllFormsModel;
import com.wavelabs.sb.model.SaveFormDataModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdateFormDataModel;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.repository.UserOnboardingRepository;
import com.wavelabs.sb.request.FetchFormsRequest;
import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.response.FormsResponse;
import com.wavelabs.sb.response.RoleInfo;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;
import java.util.Arrays;

@Service
public class FormDataService {

    private final static Logger LOGGER = LoggerFactory.getLogger(FormDataService.class);

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    ScreenBuilderService screenBuilderService;

    @Autowired
    ScreenFieldsRepository screenFieldsRepository;

    @Autowired
    WorkflowService workflowService;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    public SuccessResponse saveFormData(SaveFormDataModel model) {
	LOGGER.info("saveFormData method started");
	LOGGER.info("Checking form is valid or not");

	FormRequest request = model.getRequest();
	if (request.getForm().isEmpty()) {
	    throw new BadRequestException(ErrorMessages.INVALID_FORM_DATA);
	}
	screenBuilderService.getModule(request.getModuleId());
	workflowService.getWorkflow(request.getWorlflowId());
	MongoCollection<Document> collection = null;
	if (StringUtils.isBlank(request.getSubmoduleId())) {
	    LOGGER.info("Creating table name with module");
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.TABLE_ENDING);
	} else {
	    LOGGER.info("Creating table name with module and submodule");
	    screenBuilderService.getSubModule(request.getSubmoduleId());
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.HYPHEN
		    + request.getSubmoduleId() + CollectionConstants.TABLE_ENDING);
	}

	Document document = new Document(putCommonFields(request.getForm(), model.getTokenPayLoadDetails().getUserId(),
		model.getTokenPayLoadDetails().getTypeOfUser(), model.getTokenPayLoadDetails().getId(), model.getTokenPayLoadDetails().getUserSubId()));
	LOGGER.info("Saving form data");
	collection.insertOne(document);

	SuccessResponse response = new SuccessResponse();
	response.setId(document.get(CollectionConstants._ID).toString());
	response.setMessage(Constants.FORM_DATA_SAVED);
	LOGGER.info("saveFormData method ended");
	return response;
    }

    public Map<String, Object> putCommonFields(Map<String, Object> request, String createdByModifiedBy, String userType,
	    String userId, String userSubId) {
	LOGGER.info("Setting common fields of a form");
	request.put(CollectionConstants.CREATED_AT, Instant.now());
	request.put(CollectionConstants.CREATED_BY, createdByModifiedBy);
	request.put(CollectionConstants.MODIFIED_AT, Instant.now());
	request.put(CollectionConstants.MODIFIED_BY, createdByModifiedBy);
	request.put(CollectionConstants.USER_TYPE, userType);
	request.put(CollectionConstants.STATUS, Status.ACTIVE.toString());
	request.put(CollectionConstants.DELETED, false);
	request.put(CollectionConstants.USER_ID, userId);
	request.put(CollectionConstants.USER_SUB_ID, userSubId);
	return request;
    }

    public SuccessResponse updateFormData(UpdateFormDataModel model) {
	LOGGER.info("updateFormData method started");
	LOGGER.info("Checking form is valid or not");
	FormRequest request = model.getRequest();
	if (request.getForm().isEmpty()) {
	    throw new BadRequestException(ErrorMessages.INVALID_FORM_DATA);
	}
	ScreenWorkFlow workflow = workflowService.getWorkflow(request.getWorlflowId());
	if (!StringUtils.isBlank(workflow.getMappedBy()) && StringUtils.isBlank(model.getRequest().getMappedBy())) {
	    throw new BadRequestException(ErrorMessages.PLEASE_PROIVED_MAPPED_BY);
	}
	LOGGER.info("Checking form id is valid or not");
	try {
	    new ObjectId(request.getFormId());
	} catch (Exception e) {
	    throw new BadRequestException(ErrorMessages.INVALID_FORM_ID);
	}

	MongoCollection<Document> collection = null;
	if (StringUtils.isBlank(request.getSubmoduleId()) && StringUtils.isBlank(request.getMappedBy())) {
	    LOGGER.info("Creating table name with module");
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.TABLE_ENDING);
	} else if (!StringUtils.isBlank(request.getSubmoduleId()) && StringUtils.isBlank(request.getMappedBy())) {
	    LOGGER.info("Creating table name with module and submodule");
	    screenBuilderService.getSubModule(request.getSubmoduleId());
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.HYPHEN
		    + request.getSubmoduleId() + CollectionConstants.TABLE_ENDING);
	} else if (!StringUtils.isBlank(request.getSubmoduleId()) && !StringUtils.isBlank(request.getMappedBy())) {
	    screenBuilderService.getSubModule(request.getSubmoduleId());
	    screenBuilderService.getSubModule(request.getMappedBy());
	    workflowService.getWorkflow(request.getSubmoduleId(), request.getMappedBy());
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.HYPHEN
		    + request.getMappedBy() + CollectionConstants.TABLE_ENDING);
	}

	Document form = collection.find(eq(CollectionConstants._ID, new ObjectId(request.getFormId()))).first();

	if (form == null) {
	    throw new BadRequestException(ErrorMessages.RECORD_NOT_FOUND);
	}

	request.getForm().entrySet().forEach(field -> {
	    if (form.containsKey(field.getKey())) {
		form.replace(field.getKey(), field.getValue());
	    } else {
		form.put(field.getKey(), field.getValue());
	    }
	});
	form.put(CollectionConstants.MODIFIED_AT, Instant.now());
	form.put(CollectionConstants.MODIFIED_BY, model.getTokenPayLoadDetails().getId());
	form.put(CollectionConstants.USER_TYPE, model.getTokenPayLoadDetails().getTypeOfUser());
	LOGGER.info("Updating form data");
	collection.replaceOne(eq(CollectionConstants._ID, new ObjectId(request.getFormId())), form);
	SuccessResponse response = new SuccessResponse();
	response.setId(form.get(CollectionConstants._ID).toString());
	response.setMessage(Constants.FORM_DATA_UPDATED);
	LOGGER.info("updateFormData method ended");
	return response;
    }

    public SuccessResponse deleteFormData(DeleteFormDataModel model) {
	LOGGER.info("deleteFormData method started");
	LOGGER.info("Checking form id is valid or not");

	FormRequest request = model.getRequest();
	try {
	    new ObjectId(request.getFormId());
	} catch (Exception e) {
	    throw new BadRequestException(ErrorMessages.INVALID_FORM_ID);
	}
	screenBuilderService.getModule(request.getModuleId());
	MongoCollection<Document> collection = null;
	if (StringUtils.isBlank(request.getSubmoduleId())) {
	    LOGGER.info("Creating table name with module");
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.TABLE_ENDING);
	} else {
	    LOGGER.info("Creating table name with module and submodule");
	    screenBuilderService.getSubModule(request.getSubmoduleId());
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.HYPHEN
		    + request.getSubmoduleId() + CollectionConstants.TABLE_ENDING);

	}

	Document form = collection.find(eq(CollectionConstants._ID, new ObjectId(request.getFormId()))).first();

	if (form == null) {
	    throw new BadRequestException(ErrorMessages.RECORD_NOT_FOUND);
	}
	form.put(CollectionConstants.MODIFIED_AT, Instant.now());
	form.put(CollectionConstants.MODIFIED_BY,
		OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails()));
	form.put(CollectionConstants.DELETED, true);
	LOGGER.info("Updating form delete status");
	collection.replaceOne(eq(CollectionConstants._ID, new ObjectId(request.getFormId())), form);
	SuccessResponse response = new SuccessResponse();
	response.setMessage(Constants.FORM_DATA_DELETED);
	LOGGER.info("deleteFormData method ended");
	return response;
    }

    /*
     * public SuccessResponse updateFormDataBySubmoduleId(Map<String, Object>
     * request, String moduleId, String submoduleId, String formId) {
     * LOGGER.info("updateFormData method started"); if (request.isEmpty()) { throw
     * new BadRequestException(ErrorMessages.INVALID_FORM_DATA); } try { new
     * ObjectId(formId); } catch (Exception e) { throw new
     * BadRequestException(ErrorMessages.INVALID_FORM_ID); }
     * screenBuilderService.getModule(moduleId);
     * screenBuilderService.getSubModule(submoduleId); MongoCollection<Document>
     * collection = mongoTemplate .getCollection(moduleId +
     * CollectionConstants.HYPHEN + submoduleId + CollectionConstants.TABLE_ENDING);
     * Document form = collection.find(eq(CollectionConstants._ID, new
     * ObjectId(formId))).first();
     * 
     * if (form == null) { throw new
     * BadRequestException(ErrorMessages.RECORD_NOT_FOUND); }
     * 
     * request.entrySet().forEach(field -> { if (form.containsKey(field.getKey())) {
     * form.replace(field.getKey(), field.getValue()); } else {
     * form.put(field.getKey(), field.getValue()); } });
     * 
     * form.put(CollectionConstants.MODIFIED_AT, Instant.now());
     * collection.replaceOne(eq(CollectionConstants._ID, new ObjectId(formId)),
     * form); SuccessResponse response = new SuccessResponse();
     * response.setId(form.get(CollectionConstants._ID).toString());
     * response.setMessage(Constants.FORM_DATA_UPDATED);
     * LOGGER.info("updateFormData method ended"); return response; }
     * 
     * public SuccessResponse deleteFormDataBySubmodule(String moduleId, String
     * submoduleId, String formId) { LOGGER.info("deleteFormData method started");
     * try { new ObjectId(formId); } catch (Exception e) { throw new
     * BadRequestException(ErrorMessages.INVALID_FORM_ID); }
     * screenBuilderService.getModule(moduleId);
     * screenBuilderService.getSubModule(submoduleId); MongoCollection<Document>
     * collection = mongoTemplate .getCollection(moduleId +
     * CollectionConstants.HYPHEN + submoduleId + CollectionConstants.TABLE_ENDING);
     * 
     * Document form = collection.find(eq(CollectionConstants._ID, new
     * ObjectId(formId))).first();
     * 
     * if (form == null) { throw new
     * BadRequestException(ErrorMessages.RECORD_NOT_FOUND); }
     * form.put(CollectionConstants.MODIFIED_AT, Instant.now());
     * form.put(CollectionConstants.DELETED, true);
     * 
     * collection.replaceOne(eq(CollectionConstants._ID, new ObjectId(formId)),
     * form); SuccessResponse response = new SuccessResponse();
     * response.setMessage(Constants.FORM_DATA_DELETED);
     * LOGGER.info("deleteFormData method ended"); return response; }
     */

    public FormsResponse fetchAllForms(FetchAllFormsModel request, boolean pagination) {
	FetchFormsRequest fetchAllRequest = request.getRequest();
	TokenPayLoadDetails payLoadDetails = request.getPayLoadDetails();
	screenBuilderService.getModule(fetchAllRequest.getModuleId());
        
        // if client, qa or admin get all data
        // if vendor, freelancer then get user specific data
        String userId = payLoadDetails.getId();
        List<String> userTypeForFullData = Arrays.asList(Constants.ADMIN, Constants.CLIENT, Constants.QUALITY_ASSURANCE );
        if(payLoadDetails.getTypeOfUser() != null && userTypeForFullData.contains(payLoadDetails.getTypeOfUser())) {
            userId = null;
        }
        
	List<Document> formsList = null;
	List<Map<String, Object>> records = new ArrayList<>();
	String tableName = null;
	List<Users> users = new ArrayList<>();
	Query query = null;
	boolean isMappedBy = false;
	String message = null;
	if (StringUtils.isBlank(fetchAllRequest.getSubModuleId())
		&& StringUtils.isBlank(fetchAllRequest.getMappedBy())) {
	    tableName = fetchAllRequest.getModuleId() + CollectionConstants.TABLE_ENDING;
	    formsList = mongoTemplate.find(getQuery(fetchAllRequest, pagination, userId, null, payLoadDetails.getUserSubId()),
		    Document.class, tableName);
	    query = getQuery(fetchAllRequest, false, userId, null, payLoadDetails.getUserSubId());
	    message = Constants.RECORDS_FETCHED_SUCCESSFULLY;
	} else if (!StringUtils.isBlank(fetchAllRequest.getSubModuleId())
		&& StringUtils.isBlank(fetchAllRequest.getMappedBy())) {
	    screenBuilderService.getSubModule(fetchAllRequest.getSubModuleId());
	    tableName = fetchAllRequest.getModuleId() + CollectionConstants.HYPHEN + fetchAllRequest.getSubModuleId()
		    + CollectionConstants.TABLE_ENDING;
	    formsList = mongoTemplate.find(getQuery(fetchAllRequest, pagination, userId, null, payLoadDetails.getUserSubId()),
		    Document.class, tableName);
	    query = getQuery(fetchAllRequest, false, userId, null, payLoadDetails.getUserSubId());
	    message = Constants.RECORDS_FETCHED_SUCCESSFULLY;
	} else if (!StringUtils.isBlank(fetchAllRequest.getSubModuleId())
		&& !StringUtils.isBlank(fetchAllRequest.getMappedBy())) {
	    screenBuilderService.getSubModule(fetchAllRequest.getSubModuleId());
	    screenBuilderService.getSubModule(fetchAllRequest.getMappedBy());
	    workflowService.getWorkflow(fetchAllRequest.getSubModuleId(), fetchAllRequest.getMappedBy());
	    tableName = fetchAllRequest.getModuleId() + CollectionConstants.HYPHEN + fetchAllRequest.getMappedBy()
		    + CollectionConstants.TABLE_ENDING;
	    users = getUserIds(fetchAllRequest, payLoadDetails);
	    if (!users.isEmpty()) {
		List<String> userIds = getUsers(users);
		formsList = mongoTemplate.find(getQuery(fetchAllRequest, pagination, null, userIds, null), Document.class,
			tableName);
		query = getQuery(fetchAllRequest, false, null, userIds, null);
		isMappedBy = true;
		message = Constants.RECORDS_FETCHED_SUCCESSFULLY;
	    } else {
		message = Constants.NO_EMPLOYEES_REPORTING;
	    }
	}

	List<ScreenFields> screenFields = !StringUtils.isBlank(fetchAllRequest.getMappedBy())
		? getScreenFieldsList(fetchAllRequest.getModuleId(), fetchAllRequest.getMappedBy())
		: getScreenFieldsList(fetchAllRequest.getModuleId(), fetchAllRequest.getSubModuleId());
	if (formsList != null && !formsList.isEmpty()) {
	    records = getRecords(formsList, screenFields, users, isMappedBy);
	}
	long total = 0;
	if (query != null) {
	    total = mongoTemplate.count(query, Document.class, tableName);
	}
	return new FormsResponse(total, records, message);
    }

    private List<Map<String, Object>> getRecords(List<Document> formsList, List<ScreenFields> screenFields,
	    List<Users> users, boolean isMappedBy) {
	List<Map<String, Object>> records = new ArrayList<>();

	if (formsList != null) {
	    formsList.forEach(form -> {
		Map<String, Object> recordMap = new LinkedHashMap<>();
		if (users != null && !users.isEmpty() && isMappedBy) {
		    String userId = form.get(CollectionConstants.USER_ID).toString();
		    Users user = getUser(users, userId);
		    if (user != null) {
			recordMap.put(CollectionConstants.EMPLOYEE_ID, user.getUserId());
			recordMap.put(CollectionConstants.USER_NAME, user.getFirstname() + " " + user.getLastname());
			recordMap.put(CollectionConstants.ROLES, ScreenBuilderMapper.getRoles(user.getRoles()));
		    }
		    if (isMappedBy) {
			recordMap.put(CollectionConstants.PREVIOUSLY_APPROVED,
				form.getBoolean(CollectionConstants.APPROVED));
			recordMap.put(CollectionConstants.APPROVED,
				form.getBoolean(CollectionConstants.APPROVED, false));
		    }
		}
		form.entrySet().forEach(field -> {
		    if (!CollectionConstants.COLUMNS.contains(field.getKey())) {
			ScreenFields screenField = getScreenFields(screenFields, field.getKey());
			if (screenField != null && screenField.isVisibleontable()) {
			    if (recordMap.containsKey(field.getKey())) {
				recordMap.replace(field.getKey(), field.getValue());
			    } else {
				recordMap.put(field.getKey(), field.getValue());
			    }
			}
		    } else {
			if (!CollectionConstants._ID.equalsIgnoreCase(field.getKey())) {
			    recordMap.put(field.getKey(), field.getValue());
			} else {
			    recordMap.put(CollectionConstants.ID, form.get(CollectionConstants._ID).toString());
			}

		    }
		});
		recordMap.put(CollectionConstants.EDITABLE, false);
		records.add(recordMap);
	    });
	}
	return records;

    }

    private Users getUser(List<Users> users, String userId) {
	Optional<Users> userOptional = users.stream().filter(user -> user.getId().equalsIgnoreCase(userId)).findAny();
	return userOptional.isPresent() ? userOptional.get() : null;
    }

    private Query getUsersQuery(FetchFormsRequest fetchAllRequest, String clientId, List<String> userIds, String id) {
	Query query = new Query();

	if (clientId != null && !StringUtils.isBlank(clientId)) {
	    query.addCriteria(new Criteria("clientId").is(clientId));
	}
	if (!userIds.isEmpty()) {
	    query.addCriteria(new Criteria("reportingManagerId").in(userIds));
	}
	if (!userIds.isEmpty()) {
	    query.addCriteria(new Criteria("_id").ne(new ObjectId(id)));
	}
	query.addCriteria(new Criteria("deleted").is(false));

	List<Criteria> filterQuery = getUserFilterQuery(fetchAllRequest);
	if (!filterQuery.isEmpty()) {
	    Criteria andQuery = new Criteria();
	    andQuery.andOperator(filterQuery);
	    query.addCriteria(andQuery);
	}

	return query;
    }

    private List<Users> getUserIds(FetchFormsRequest fetchAllRequest, TokenPayLoadDetails payLoadDetails) {
	String clientId = payLoadDetails != null ? payLoadDetails.getClientId() : null;
	String userId = payLoadDetails != null ? payLoadDetails.getId() : null;
	List<String> userIds = new ArrayList<>();
	if (payLoadDetails != null && !StringUtils.isBlank(payLoadDetails.getId())) {
	    userIds.add(payLoadDetails.getId());
	}
	List<Users> users = new ArrayList<>();
	getUsers(users, fetchAllRequest, clientId, userIds, userId, new ArrayList<>());
	return users;
    }

    private void getUsers(List<Users> users, FetchFormsRequest fetchAllRequest, String clientId, List<String> userIds,
	    String id, List<String> uniqueUserIds) {

	List<Users> teamIds = userOnboardingRepository.getUsersByReportingManagerIds(userIds, clientId, false);
	List<String> uniqueUsers = teamIds.stream().map(Users::getId).collect(Collectors.toList());
	if (!uniqueUserIds.isEmpty()) {
	    uniqueUsers.removeAll(uniqueUserIds);
	}
	if (uniqueUsers.isEmpty()) {
	    uniqueUserIds.addAll(userIds);
	    List<Users> usersData = mongoTemplate.find(getUsersQuery(fetchAllRequest, clientId, uniqueUserIds, id),
		    Users.class);
	    users.addAll(usersData);
	    return;
	}
	uniqueUserIds.addAll(userIds);
	userIds = uniqueUsers;
	getUsers(users, fetchAllRequest, clientId, userIds, id, uniqueUserIds);

    }

    private List<Criteria> getUserFilterQuery(FetchFormsRequest fetchAllRequest) {
	ArrayList<Criteria> filters = new ArrayList<>();
	if (isValid(fetchAllRequest.getEmployeeId())) {
	    filters.add(Criteria.where("userId").is(fetchAllRequest.getEmployeeId()));
	}
	if (isValid(fetchAllRequest.getName())) {
	    filters.add(Criteria.where("firstname").regex(fetchAllRequest.getName(), Constants.REGEX_CASE_INSENSITIVE));
	    filters.add(Criteria.where("lastname").regex(fetchAllRequest.getName(), Constants.REGEX_CASE_INSENSITIVE));
	}
	if (isValid(fetchAllRequest.getRoleId())) {
	    filters.add(Criteria.where("roles.$id").is(new ObjectId(fetchAllRequest.getRoleId())));
	}
	return filters;
    }

    private List<String> getUsers(List<Users> users) {

	return users.isEmpty() ? null : users.stream().map(Users::getId).collect(Collectors.toList());
    }

    private Query getQuery(FetchFormsRequest request, boolean pagination, String userId, List<String> userIds, String userSubId) {
	Query query = new Query();

	Sort sort = Sort.by(getSortOrder(request.getSortOrder()), getColumn(request.getSortBy()));
	if (!StringUtils.isEmpty(userId)) {
	    query.addCriteria(new Criteria(CollectionConstants.USER_ID).is(userId));
	}
	if (userIds != null && !userIds.isEmpty()) {
	    query.addCriteria(new Criteria(CollectionConstants.USER_ID).in(userIds));
	}
        if (!StringUtils.isEmpty(userSubId)) {
	    query.addCriteria(new Criteria(CollectionConstants.USER_SUB_ID).is(userSubId));
	}
	query.addCriteria(new Criteria("deleted").is(false));
	query.with(sort);
	if (pagination) {
	    int size = request.getSize() > 0 ? request.getSize() : 10;
	    query.with(Pageable.ofSize(size).withPage(request.getPage()));
	}
	List<Criteria> filterQuery = getFilterQuery(request);
	if (!filterQuery.isEmpty()) {
	    Criteria andQuery = new Criteria();
	    andQuery.andOperator(filterQuery);
	    query.addCriteria(andQuery);
	}

	query.collation(Collation.of("en").strength(Collation.ComparisonLevel.secondary()));
	return query;
    }

    private Direction getSortOrder(Optional<String> optional) {
	return optional != null && optional.isPresent() && optional.get().equalsIgnoreCase("ASC") ? Direction.ASC
		: Direction.DESC;
    }

    private String getColumn(Optional<String> optional) {
	return optional != null && optional.isPresent() ? optional.get() : CollectionConstants.MODIFIED_AT;
    }

    public LocalDate getDate(String date) {
	DateTimeFormatter outputDateFormat = DateTimeFormatter.ofPattern(Constants.DATE_PATTERN);
	try {
	    return LocalDate.parse(date, outputDateFormat);

	} catch (Exception e) {
	    throw new BadRequestException("Please provide date dd-mm-yyyy format");
	}
    }

    public List<Criteria> getFilterQuery(FetchFormsRequest request) {
	ArrayList<Criteria> filters = new ArrayList<>();
	if (request.getFilters() != null) {
	    request.getFilters().forEach(filter -> {
		if (isValid(filter.getComponentValue())) {
		    filters.add(Criteria.where(filter.getComponentId()).regex(filter.getComponentValue(),
			    Constants.REGEX_CASE_INSENSITIVE));
		}
	    });
	}
        
        
        if (!StringUtils.isEmpty(request.getJobId())) {
	    filters.add(Criteria.where(CollectionConstants.JOB_ID).is(request.getJobId()));
	}
	if (isValid(request.getFrom()) && !isValid(request.getTo())) {
	    Date from = Date.valueOf(getDate(request.getFrom()));
	    Date toDate = Date.valueOf(LocalDate.now().plusDays(1));
	    filters.add(Criteria.where(CollectionConstants.CREATED_AT).gte(from).lte(toDate));
	}
	if (!isValid(request.getFrom()) && isValid(request.getTo())) {
	    Date from = Date.valueOf(LocalDate.of(2021, 01, 01));
	    Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
	    filters.add(Criteria.where(CollectionConstants.CREATED_AT).gte(from).lte(toDate));
	}
	if (isValid(request.getFrom()) && isValid(request.getTo())) {
	    Date from = Date.valueOf(getDate(request.getFrom()));
	    Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
	    filters.add(Criteria.where(CollectionConstants.CREATED_AT).gte(from).lte(toDate));
	}
	if (isValid(request.getStatus())) {
	    filters.add(Criteria.where(CollectionConstants.STATUS).is(request.getStatus().toUpperCase()));
	}
	filters.add(Criteria.where("deleted").is(false));
	return filters;
    }

    private boolean isValid(String text) {
	return text != null && !text.equalsIgnoreCase("null") && !text.isEmpty();
    }

    public Map<String, Object> fetctFormById(FormRequest request) {

	try {
	    new ObjectId(request.getFormId());
	} catch (Exception e) {
	    throw new BadRequestException(ErrorMessages.INVALID_FORM_ID);
	}
	screenBuilderService.getModule(request.getModuleId());
	boolean mappedBy = false;
	MongoCollection<Document> collection = null;
	if (StringUtils.isBlank(request.getSubmoduleId()) && StringUtils.isBlank(request.getMappedBy())) {
	    LOGGER.info("Creating table name with module");
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.TABLE_ENDING);
	} else if (!StringUtils.isBlank(request.getSubmoduleId()) && StringUtils.isBlank(request.getMappedBy())) {
	    LOGGER.info("Creating table name with module and submodule");
	    screenBuilderService.getSubModule(request.getSubmoduleId());
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.HYPHEN
		    + request.getSubmoduleId() + CollectionConstants.TABLE_ENDING);
	} else if (!StringUtils.isBlank(request.getSubmoduleId()) && !StringUtils.isBlank(request.getMappedBy())) {
	    screenBuilderService.getSubModule(request.getSubmoduleId());
	    screenBuilderService.getSubModule(request.getMappedBy());
	    workflowService.getWorkflow(request.getSubmoduleId(), request.getMappedBy());
	    collection = mongoTemplate.getCollection(request.getModuleId() + CollectionConstants.HYPHEN
		    + request.getMappedBy() + CollectionConstants.TABLE_ENDING);
	    mappedBy = true;
	}
	Document form = collection.find(eq(CollectionConstants._ID, new ObjectId(request.getFormId()))).first();

	if (form == null) {
	    throw new BadRequestException(ErrorMessages.RECORD_NOT_FOUND);
	}
	Map<String, Object> recordMap = new HashMap<>();

	form.entrySet().forEach(field -> {
	    if (!CollectionConstants._ID.equalsIgnoreCase(field.getKey())) {
		recordMap.put(field.getKey(), field.getValue());
	    } else {
		recordMap.put(CollectionConstants.ID, form.get(CollectionConstants._ID).toString());
	    }
	});
	String userId = form.get(CollectionConstants.USER_ID).toString();
	if (!StringUtils.isBlank(userId)) {
	    Optional<Users> userOptional = userOnboardingRepository.findById(userId);
	    if (userOptional.isPresent()) {
		recordMap.put(CollectionConstants.EMPLOYEE_ID, userOptional.get().getUserId());
		recordMap.put(CollectionConstants.USER_NAME, userOptional.get().getFirstname());
		recordMap.put(CollectionConstants.ROLES, ScreenBuilderMapper.getRoles(userOptional.get().getRoles()));
		recordMap.put(CollectionConstants.DATE, form.get(CollectionConstants.CREATED_AT));
		if (mappedBy) {
		    recordMap.put(CollectionConstants.PREVIOUSLY_APPROVED,
			    form.getBoolean(CollectionConstants.APPROVED));
		}
	    }
	}
	recordMap.put(CollectionConstants.EDITABLE, false);
	return recordMap;
    }

    private List<ScreenFields> getScreenFieldsList(String moduleId, String submoduleId) {
	List<ScreenFields> screenFields = new ArrayList<>();
	if (StringUtils.isBlank(submoduleId)) {
	    screenFields = screenFieldsRepository.findAllByModuleIdAndDeleted(moduleId, false);
	} else {
	    screenFields = screenFieldsRepository.findAllByModuleIdAndSubModuleIdAndDeleted(moduleId, submoduleId,
		    false);
	}
	return screenFields;
    }

    private ScreenFields getScreenFields(List<ScreenFields> screenFields, String componentId) {
	Optional<ScreenFields> screenField = screenFields.stream()
		.filter(field -> field.getComponentId() != null && field.getComponentId().equalsIgnoreCase(componentId))
		.findFirst();
	return screenField.isPresent() ? screenField.get() : null;
    }

    private String getRoles(List<RoleInfo> roles) {
	return String.join(",", roles.stream().map(RoleInfo::getRole).collect(Collectors.toList()));
    }

}
