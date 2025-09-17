package com.wavelabs.sb.services;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
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

import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ChartDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.FeatureTemplate;
import com.wavelabs.sb.documents.LocationMapping;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.ModuleColorsMaster;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.RoleModules;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.Screen;
import com.wavelabs.sb.documents.ScreenWorkFlow;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.documents.SiteOnboarding;
import com.wavelabs.sb.enums.ColumnOrder;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.ReportMapper;
import com.wavelabs.sb.mappers.ScreenBuilderMapper;
import com.wavelabs.sb.model.CreateModuleAndSubmoduleModel;
import com.wavelabs.sb.model.CreateSubModuleModel;
import com.wavelabs.sb.model.DeleteFeatureTemplateModel;
import com.wavelabs.sb.model.DeleteSubModuleModel;
import com.wavelabs.sb.model.FetchAllModAndSubModModel;
import com.wavelabs.sb.model.FetchAllModulesByUesrModel;
import com.wavelabs.sb.model.FetchReportChartsByModuleIdModel;
import com.wavelabs.sb.model.SaveFeatureTemplateModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repository.ChartDetailsRepository;
import com.wavelabs.sb.repository.ClientOnboardingRepository;
import com.wavelabs.sb.repository.FeatureTemplateRepository;
import com.wavelabs.sb.repository.ModuleColorsMasterRepository;
import com.wavelabs.sb.repository.ModuleRepository;
import com.wavelabs.sb.repository.ReportConfigurationsRepository;
import com.wavelabs.sb.repository.RoleOnboardingRepository;
import com.wavelabs.sb.repository.ScreenRepository;
import com.wavelabs.sb.repository.ScreenWorkFlowRepository;
import com.wavelabs.sb.repository.SubModuleRepository;
import com.wavelabs.sb.repository.UserOnboardingRepository;
import com.wavelabs.sb.repository.SiteOnboardingRepository;
import com.wavelabs.sb.request.AddSubmoduleRequest;
import com.wavelabs.sb.request.CreateModuleRequest;
import com.wavelabs.sb.request.DynamicMappingRequest;
import com.wavelabs.sb.request.FetchAllModAndSubModRequest;
import com.wavelabs.sb.request.ModuleColorRequest;
import com.wavelabs.sb.request.SaveFeatureTemplateRequest;
import com.wavelabs.sb.request.UpdateModuleRequest;
import com.wavelabs.sb.response.FeatureTemplateInfo;
import com.wavelabs.sb.response.FeatureTemplateResponse;
import com.wavelabs.sb.response.FetchAllModAndSubModResponse;
import com.wavelabs.sb.response.FetchAllModulesResponse;
import com.wavelabs.sb.response.FetchFormResponse;
import com.wavelabs.sb.response.ModuleReportResponse;
import com.wavelabs.sb.response.ModuleResponse;
import com.wavelabs.sb.response.Modules;
import com.wavelabs.sb.response.SubModulesResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.DynamicMappingResponse;
import com.wavelabs.sb.response.UserModulesResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class ScreenBuilderService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ScreenBuilderService.class);

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    SubModuleRepository subModuleRepository;

    @Autowired
    ModuleRepository moduleRepository;

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    @Autowired
    ScreenRepository screenRepository;

    @Autowired
    FeatureTemplateRepository featureTemplateRepository;

    @Autowired
    RoleOnboardingRepository roleOnboardingRepository;

    @Autowired
    ScreenWorkFlowRepository screenWorkFlowRepository;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

	@Autowired
    SiteOnboardingRepository siteOnboardingRepository;

    @Autowired
    ReportConfigurationsRepository reportConfigurationsRepository;

    @Autowired
    ChartDetailsRepository chartDetailsRepository;

    @Autowired
    ModuleColorsMasterRepository moduleColorsMasterRepository;

    public List<SubModules> fetchAllSubModules(String moduleId) {
	LOGGER.info("Fetching all submodules with module id");
	getModule(moduleId);
	return subModuleRepository.findByModuleIdAndStatusAndDeleted(moduleId, Status.ACTIVE.toString(), false);
    }

    public SuccessResponse createSubModule(CreateSubModuleModel model) {
	LOGGER.info("createSubModule method started");

	AddSubmoduleRequest request = model.getRequest();
	TokenPayLoadDetails details = model.getTokenPayLoadDetails();
	getClientDetails(request.getClientId());
	Module module = getModule(request.getModuleId());
	LOGGER.info("Checking submodule already exists with name: {}", request.getName());
	Optional<SubModules> submoduleOpt = subModuleRepository
		.findByModuleIdAndNameIgnoreCaseAndDeleted(request.getModuleId(), request.getName(), false);
	if (submoduleOpt.isPresent()) {
	    throw new ResourceNotFoundException(request.getName() + Constants.SUB_MODULE_ALREADY_CREATED);
	}
	SubModules subModule = subModuleRepository.save(ScreenBuilderMapper.getBasicSubmodule(request,
		OnboardingUtil.getCreatedOrModifiedBy(details), getSubModuleColor(request.getModuleId())));
	if (module.getStatus().equals(Status.INACTIVE)) {
	    module.setStatus(Status.ACTIVE);
	    moduleRepository.save(module);
	}
	LOGGER.info("createSubModule method ended");
	return new SuccessResponse(subModule.getId(), request.getName() + Constants.SUB_MODULE_CREATED);
    }

    public SuccessResponse updateSubModules(@Valid UpdateModuleRequest updateModuleRequest, String subModuleId,
	    TokenPayLoadDetails details) {
	LOGGER.info("enter into updateSubModules");
	LOGGER.info("updateSubModules SubModules document with submoduleId::{}", subModuleId);
	SubModules subModules = getSubModule(subModuleId);
	subModules.setName(updateModuleRequest.getName());
	subModules.setModifiedAt(Instant.now());
	subModules.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	subModuleRepository.save(subModules);
	return new SuccessResponse(Constants.SUBMODULES_UPDATED_SUCCESSFULLY);
    }

    public SuccessResponse saveModules(List<String> moduleNames, TokenPayLoadDetails details) {
	LOGGER.info("saveModules method started");
	List<Module> modules = new ArrayList<>();
	moduleNames.stream().forEach(moduleName -> {
	    if (moduleName != null) {
		Module module = new Module();
		module.setCreatedAt(Instant.now());
		module.setName(moduleName);
		module.setStatus(Status.ACTIVE);
		module.setModifiedAt(Instant.now());
		module.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		module.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		modules.add(module);
	    }
	});
	moduleRepository.saveAll(modules);
	LOGGER.info("saveModules method ended");
	return new SuccessResponse(Constants.DATA_CREATED_SUCCESSFULLY);
    }

    public ClientOnboardingDetails getClientDetails(String clientId) {
	Optional<ClientOnboardingDetails> clientDetailsOpt = clientOnboardingRepository.findById(clientId);
	if (!clientDetailsOpt.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.CLIENT_DETAILS_NOT_FOUND + clientId);
	}
	return clientDetailsOpt.get();
    }

    public SubModules getSubModule(String subModuleId) {
	Optional<SubModules> subModuleOpt = subModuleRepository.findById(subModuleId);
	if (!subModuleOpt.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.SUB_MODULE_NOT_FOUND_WITH_ID + subModuleId);
	}
	return subModuleOpt.get();
    }

    public SubModules getSubModuleWithNull(String subModuleId) {
	if (!StringUtils.isBlank(subModuleId)) {
	    Optional<SubModules> subModuleOpt = subModuleRepository.findByIdAndDeleted(subModuleId, false);
	    if (!subModuleOpt.isPresent()) {
		throw new ResourceNotFoundException(ErrorMessages.SUB_MODULE_NOT_FOUND_WITH_ID + subModuleId);
	    }
	    return subModuleOpt.get();
	} else {
	    return null;
	}

    }

    public Module getModule(String moduleId) {
	Optional<Module> modulesOpt = moduleRepository.findByIdAndDeleted(moduleId, false);
	if (!modulesOpt.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.MODULE_NOT_FOUND_WITH_ID + moduleId);
	}
	return modulesOpt.get();
    }

    public Screen getScreen(String screenId) {
	Optional<Screen> screenOptional = screenRepository.findById(screenId);
	if (!screenOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.SCREEN_NOT_FOUND_WITH_ID + screenId);
	}
	return screenOptional.get();
    }

    public SuccessResponse deleteSubModules(DeleteSubModuleModel model) {
	SubModules subModule = getSubModule(model.getSubModuleId());
	subModule.setDeleted(true);
	subModule.setModifiedAt(Instant.now());
	subModule.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails()));
	subModuleRepository.save(subModule);

	return new SuccessResponse(Constants.SUB_MODULE_SUCCESSFULLY_DELETED);
    }

    private void updateRoles(SubModules subModule, List<SubModules> subModules, Module module) {
	if (module != null && module.getRoles() != null) {
	    Map<String, RoleOnboardingDetails> roles = new HashMap<>();
	    if (!subModules.isEmpty() && subModules.size() > 1) {
		updateRoleSubModule(subModule, roles);
		List<RoleOnboardingDetails> rolesList = new ArrayList<>();
		if (module.getRoles() != null && !module.getRoles().isEmpty()) {
		    rolesList.addAll(module.getRoles());
		}
		List<String> roleIds = rolesList.stream().map(RoleOnboardingDetails::getId)
			.collect(Collectors.toList());
		if (!roles.isEmpty()) {
		    roles.entrySet().forEach(role -> {
			if (!roleIds.contains(role.getKey())) {
			    rolesList.add(role.getValue());
			}
		    });
		}
		module.setRoles(rolesList);
	    } else {
		updateRoleSubModule(subModule, roles);
		updateRoleModule(module, roles);
		module.setRoles(new ArrayList<>());
		moduleRepository.save(module);
	    }
	    if (!roles.isEmpty()) {
		roleOnboardingRepository.saveAll(roles.values());
	    }
	}
    }

    /**
     * this method is used to save feature template
     * 
     * @param request
     * @return
     */
    public FeatureTemplate saveFeatureTemplate(SaveFeatureTemplateModel model) {
	LOGGER.info("saveFeatureTemplate method started");
	SaveFeatureTemplateRequest request = model.getRequest();

	getClientDetails(request.getClientId());
	LOGGER.info("Checking feature template exists with name: {}", request.getName());
	Optional<FeatureTemplate> ftOpt = featureTemplateRepository.findByDeletedAndNameIgnoreCase(false,
		request.getName());
	if (ftOpt.isPresent()) {
	    LOGGER.info("saveFeatureTemplate method ended");
	    throw new ResourceNotFoundException(request.getName() + Constants.FEATURE_TEMPLATE_ALREADY_EXIST);
	}

	FeatureTemplate featureTemplate = ScreenBuilderMapper.getFeatureTemplate(request,
		OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails()));
	LOGGER.info("saveFeatureTemplate method ended");
	return featureTemplateRepository.save(featureTemplate);
    }

    /**
     * this method is used to get feature template by id
     * 
     * @param templateId
     * @return
     */
    public FeatureTemplateInfo getFeatureTemplateById(String templateId) {
	LOGGER.info("getFeatureTemplateById method started");
	LOGGER.info("Checking feature template exists with id: {}", templateId);
	Optional<FeatureTemplate> futureTemplate = featureTemplateRepository.findByIdAndDeleted(templateId, false);
	if (!futureTemplate.isPresent()) {
	    throw new ResourceNotFoundException(Constants.FEATURE_TEMPLATE_NOT_FOUND_WITH_THIS_ID + templateId);
	}
	FeatureTemplate template = futureTemplate.get();
	FeatureTemplateInfo futureTemplates = new FeatureTemplateInfo();
	futureTemplates.setClientId(template.getClientId());
	futureTemplates.setId(template.getId());
	futureTemplates.setName(template.getName());
	futureTemplates.setForm(template.getForm());
	LOGGER.info("getFeatureTemplateById method ended");
	return futureTemplates;
    }

    /**
     * this method is used to get feature template details
     * 
     * @return
     */
    public FeatureTemplateResponse getFeatureTemplateDetails() {
	LOGGER.info("getFeatureTemplateDetails method started");
	LOGGER.info("Fetching all feature template details from database");
	List<FeatureTemplate> featureTemplate = featureTemplateRepository.findAllByDeleted(false);
	if (featureTemplate.isEmpty()) {
	    throw new ResourceNotFoundException(Constants.FEATURE_TEMPLATE_DETAILS_NOT_FOUND);
	}
	LOGGER.info("Count {}", featureTemplate.size());
	FeatureTemplateResponse featureTemplateResponse = new FeatureTemplateResponse();
	List<FeatureTemplateInfo> response = new ArrayList<>();
	featureTemplate.stream().forEach(template -> {
	    FeatureTemplateInfo res = new FeatureTemplateInfo();
	    res.setClientId(template.getClientId());
	    res.setForm(template.getForm());
	    res.setId(template.getId());
	    res.setName(template.getName());
	    response.add(res);
	    featureTemplateResponse.setData(response);
	    featureTemplateResponse.setTotal(featureTemplate.size());
	});
	LOGGER.info("getFeatureTemplateDetails method ended");
	return featureTemplateResponse;
    }

    public FetchFormResponse fetchFormWithScreenId(String screenId) {
	Optional<Screen> screenOpt = screenRepository.findById(screenId);
	if (!screenOpt.isPresent()) {
	    throw new ResourceNotFoundException("Screen not found with id :" + screenId);
	}
	Screen screen = screenOpt.get();
	FetchFormResponse fetchFormResponse = ScreenBuilderMapper.getFetchFormResponse(screen);
	List<String> rolesInResponse = new ArrayList<>();
	fetchFormResponse.setRoles(rolesInResponse);
	return fetchFormResponse;
    }

	public List<DynamicMappingResponse> getDynamicMapping(DynamicMappingRequest request) {
		TokenPayLoadDetails tokenPayLoadDetails = request.getTokenDetails();
		String userId = tokenPayLoadDetails.getUserId();
		if (!tokenPayLoadDetails.getTypeOfUser().equals(Constants.USER)) {
			throw new BadRequestException(ErrorMessages.DYNAMIC_MAPPING_ACCESS_BY_USER);
		}

		// Note: Currently fetching dynamic mapping for Site, In future we can handle by mapTo
		String mapTo = request.getMapTo();

		Optional<Users> userO = userOnboardingRepository.findByUserId(userId);
		if (!userO.isPresent()) {
			throw new ResourceNotFoundException("User not found");
		}
		Users user = userO.get();
		List<LocationMapping> locationMappings = user.getLocationMapping();

		DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		LocalDate now = LocalDate.now(); 

		String currentDay = now.getDayOfWeek().toString();
		String currentDate = dateFormatter.format(now);

		List<LocationMapping> filteredLocationMappings = locationMappings.stream()
			.filter(lm ->
                                (lm.getDays().isEmpty() && lm.getDates().isEmpty()) ||
				lm.getDays().stream().map(d -> d.toUpperCase()).collect(Collectors.toList()).contains(currentDay) || 
				lm.getDates().stream().map(d -> d.toUpperCase()).collect(Collectors.toList()).contains(currentDate)
			).collect(Collectors.toList());

		List<String> siteIds = filteredLocationMappings.stream().map(l -> l.getLocation()).collect(Collectors.toList());
		List<SiteOnboarding> siteOnboardings = siteOnboardingRepository.findBySiteIdIn(siteIds);

		return siteOnboardings.stream().map(s -> ScreenBuilderMapper.getDynamicMapping(s)).collect(Collectors.toList());
	}
	
    /**
     * this method is used to create module
     * 
     * @param request
     * @return
     */
    public SuccessResponse createModule(CreateModuleAndSubmoduleModel model) {
	LOGGER.info("createModule method started");
	CreateModuleRequest request = model.getRequest();
	TokenPayLoadDetails tokenPayLoadDetails = model.getTokenPayLoadDetails();
	LOGGER.info("Checking module is already exists with name : {}", request.getName());
	getClientDetails(request.getClientId());
	Optional<Module> moduleOpt = moduleRepository.findByNameIgnoreCaseAndClientIdAndDeleted(request.getName(),
		request.getClientId(), false);
	if (moduleOpt.isPresent()) {
	    throw new ResourceNotFoundException(request.getName() + Constants.MODULE_ALREADY_CREATED);
	}
	Module module = moduleRepository.save(ScreenBuilderMapper.getModule(request,
		OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails), getModuleColor(request.getClientId())));
	LOGGER.info("createModule method ended");
	return new SuccessResponse(module.getId(), request.getName() + Constants.MODULE_CREATED);
    }

    private long getModuleColor(String clientId) {
	long count = moduleRepository.countFindByClientIdAndStatusAndDeleted(clientId, Status.ACTIVE, false);
	long colorCount = moduleColorsMasterRepository.count();
	if (count > colorCount) {
	    count = count % colorCount;
	}

	return count + 1;
    }

    private long getSubModuleColor(String moduleId) {
	long count = subModuleRepository.countFindByModuleIdAndStatusAndDeleted(moduleId, Status.ACTIVE, false);
	long colorCount = moduleColorsMasterRepository.count();
	if (count > colorCount) {
	    count = count % colorCount;
	}

	return count + 1;
    }

    public SuccessResponse updateModule(UpdateModuleRequest request, String moduleId, TokenPayLoadDetails details) {
	LOGGER.info("updateModule method started");
	Module module = getModule(moduleId);
	LOGGER.info("Checking module is already exists with name : {}", request.getName());
	Optional<Module> moduleOpt = moduleRepository.findByNameIgnoreCaseAndClientIdAndDeleted(request.getName(),
		module.getClientId(), false);
	if (moduleOpt.isPresent() && !moduleOpt.get().getId().equalsIgnoreCase(moduleId)) {
	    throw new ResourceNotFoundException(request.getName() + Constants.MODULE_ALREADY_CREATED);
	}
	boolean isNameChanged = false;
	if (!StringUtils.isBlank(request.getName()) && !module.getName().equalsIgnoreCase(request.getName())) {
	    isNameChanged = true;
	}
	module.setName(request.getName());
	module.setModifiedAt(Instant.now());
	module.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	moduleRepository.save(module);
	if (isNameChanged) {
	    updateRoles(module.getRoles(), module);
	}
	LOGGER.info("updateModule method ended");
	return new SuccessResponse(request.getName() + Constants.MODULE_UPDATED);
    }

    private void updateRoles(List<RoleOnboardingDetails> roles, Module module) {
	if (roles != null && !roles.isEmpty()) {
	    List<RoleOnboardingDetails> rolesUpdated = new ArrayList<>();
	    roles.forEach(role -> {
		if (role.getModule() != null && !role.getModule().isEmpty()) {
		    Optional<RoleModules> modOptional = role.getModule().stream()
			    .filter(mod -> mod.getId().equalsIgnoreCase(module.getId())).findAny();
		    if (modOptional.isPresent()) {
			int index = role.getModule().indexOf(modOptional.get());
			modOptional.get().setName(module.getName());
			role.getModule().set(index, modOptional.get());
			rolesUpdated.add(role);
		    }
		}
	    });
	    if (!rolesUpdated.isEmpty()) {
		roleOnboardingRepository.saveAll(rolesUpdated);
	    }
	}
    }

    public SuccessResponse deleteModule(String moduleId, TokenPayLoadDetails details) {
	LOGGER.info("deleteModule method started");
	Module module = getModule(moduleId);
	if (!module.isDeleted()) {
	    module.setDeleted(true);
	    moduleRepository.save(module);
	    LOGGER.info("Deleting all submodules of module: {}", module.getName());
	    List<SubModules> subModules = subModuleRepository.findAllByModuleId(moduleId);
	    subModules.forEach(subModule -> {
		subModule.setDeleted(true);
		subModule.setModifiedAt(Instant.now());
		subModule.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	    });
	    subModuleRepository.saveAll(subModules);
	    updateRoles(module, subModules);
	}
	LOGGER.info("deleteModule method ended");
	return new SuccessResponse(module.getName() + Constants.MODULE_DELETED);
    }

    private void updateRoles(Module module, List<SubModules> subModules) {
	Map<String, RoleOnboardingDetails> roles = new HashMap<>();
	if (module.getRoles() != null && !module.getRoles().isEmpty()) {
	    updateRoleModule(module, roles);
	}
	if (subModules != null && !subModules.isEmpty()) {
	    subModules.stream().forEach(sub -> {
		updateRoleSubModule(sub, roles);
	    });
	}
	if (!roles.isEmpty()) {
	    roleOnboardingRepository.saveAll(roles.values());
	}

    }

    private void updateRoleSubModule(SubModules sub, Map<String, RoleOnboardingDetails> roles) {
	if (sub.getRoles() != null) {
	    sub.getRoles().forEach(role -> {
		if (role.getModule() != null && !role.getModule().isEmpty()) {
		    if (roles.containsKey(role.getId())) {
			role.setModule(roles.get(role.getId()).getModule());
			role.getModule().stream().filter(mod -> mod.getId().equalsIgnoreCase(sub.getId()))
				.forEach(mod -> mod.setDeleted(true));
			roles.put(role.getId(), role);
		    } else {
			role.getModule().stream().filter(mod -> mod.getId().equalsIgnoreCase(sub.getId()))
				.forEach(mod -> mod.setDeleted(true));
			roles.put(role.getId(), role);
		    }
		}
	    });
	}
    }

    private void updateRoleModule(Module module, Map<String, RoleOnboardingDetails> roles) {
	if (module.getRoles() != null) {
	    module.getRoles().forEach(role -> {
		if (role.getModule() != null && !role.getModule().isEmpty()) {
		    if (roles.containsKey(role.getId())) {
			role.setModule(roles.get(role.getId()).getModule());
			role.getModule().stream().filter(mod -> mod.getId().equalsIgnoreCase(module.getId()))
				.forEach(mod -> mod.setDeleted(true));
			roles.put(role.getId(), role);
		    } else {
			role.getModule().stream().filter(mod -> mod.getId().equalsIgnoreCase(module.getId()))
				.forEach(mod -> mod.setDeleted(true));
			roles.put(role.getId(), role);
		    }
		}
	    });
	}
    }

    public FetchAllModulesResponse fetchAllModules(String clientId) {
	LOGGER.info("fetchAllModules method started");
	getClientDetails(clientId);
	List<Module> modules = moduleRepository.findByClientIdAndDeleted(clientId, false);
	List<ModuleResponse> modulesList = new ArrayList<>();
	modules.forEach(module -> {
	    ModuleResponse moduleInfo = new ModuleResponse();
	    moduleInfo.setId(module.getId());
	    moduleInfo.setName(module.getName());
	    modulesList.add(moduleInfo);
	});
	FetchAllModulesResponse response = new FetchAllModulesResponse();
	response.setModules(modulesList);
	LOGGER.info("fetchAllModules method ended");
	return response;
    }

    public SuccessResponse deleteSubModule(String moduleId, String subModuleId, TokenPayLoadDetails details) {
	LOGGER.info("deleteSubModule method stated");
	Optional<SubModules> subModuleOpt = subModuleRepository.findByModuleIdAndIdAndDeleted(moduleId, subModuleId,
		false);
	if (!subModuleOpt.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.SUB_MODULE_NOT_FOUND_WITH_ID + subModuleId);
	}
	List<SubModules> subModules = subModuleRepository.findByModuleIdAndStatusAndDeleted(moduleId,
		Status.ACTIVE.toString(), false);
	SubModules subModule = subModuleOpt.get();
	subModule.setDeleted(true);
	subModule.setModifiedAt(Instant.now());
	subModule.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	subModuleRepository.save(subModule);
	updateRoles(subModule, subModules, getModule(moduleId));
	LOGGER.info("deleteSubModule method ended");
	return new SuccessResponse(subModule.getName() + Constants.SUBMODULE_DELETED_SUCCESSFULLY);
    }

    public FetchAllModAndSubModResponse fetchAllModAndSubMod(FetchAllModAndSubModModel model) {
	LOGGER.info("fetchAllModAndSubMod method stated");
	TokenPayLoadDetails payLoadDetails = model.getTokenPayLoadDetails();
	FetchAllModAndSubModRequest request = model.getFetchAllRequest();
	String clientId = model.getClientId();
	if (payLoadDetails != null && Constants.USER.equalsIgnoreCase(payLoadDetails.getTypeOfUser())
		&& !Constants.ADMIN.equalsIgnoreCase(payLoadDetails.getUserRole())) {
	    Users user = getUser(payLoadDetails);
	    List<String> moduleIdsList = getmoduleIds(user.getRoles());
	    List<Module> modulesList = moduleRepository.findAllWithIdsAndStatusAndDeleted(moduleIdsList,
		    Status.ACTIVE.toString(), false);

	    List<SubModules> subModuleList = subModuleRepository.findByIdInAndStatusAndDeleted(moduleIdsList,
		    Status.ACTIVE.toString(), false);
	    return new FetchAllModAndSubModResponse(0,
		    getModuleRespose(modulesList, subModuleList, true, getRoleObjIds(user.getRoles())));
	} else {
	    List<Module> modulesList = mongoTemplate.find(getQuery(request, clientId, true), Module.class);
	    List<String> listOfModuleIds = modulesList.stream().map(Module::getId).collect(Collectors.toList());
	    List<SubModules> subModuleList = subModuleRepository.findByModuleIdIn(listOfModuleIds);
	    long count = mongoTemplate.count(getQuery(request, clientId, false), Modules.class);
	    LOGGER.info("fetchAllModAndSubMod method ended");
	    return new FetchAllModAndSubModResponse(count, getModuleRespose(modulesList, subModuleList, false, null));
	}

    }

    private List<Modules> getModuleRespose(List<Module> modulesList, List<SubModules> subModuleList, boolean isUser,
	    List<ObjectId> roleIds) {
	List<Modules> modulesResponse = new ArrayList<>();
	modulesList.stream().forEach(module -> {
	    Modules modules = new Modules();
	    modules.setIcon(module.getIconUrl());
	    modules.setIconMobile(ScreenBuilderMapper.getIconUrl(module.getIconUrl()));
	    modules.setId(module.getId());
	    modules.setName(module.getName());
	    modules.setStatus(module.getStatus().toString());
	    modules.setRoles(module.getRoles() != null
		    ? module.getRoles().stream().filter(role -> !role.isDeleted())
			    .map(roleInfo -> ScreenBuilderMapper.getRoleInfo(roleInfo)).collect(Collectors.toList())
		    : new ArrayList<>());
	    modules.setSubModules(getSubmodules(subModuleList, module.getId()));
	    modules.setRolesCount(modules.getRoles().isEmpty() ? 0 : modules.getRoles().size());
	    ScreenWorkFlow workFlow = getWorkFlowId(module.getId(), Constants.EMPTY);
	    modules.setWorkFlowId(workFlow != null ? workFlow.getId() : null);
	    if (isUser && roleIds != null && !roleIds.isEmpty()) {
		if (checkRoleReports(module.getId(), roleIds)) {
		    List<SubModulesResponse> list = modules.getSubModules();
		    SubModulesResponse sub = new SubModulesResponse();
		    sub.setName(CollectionConstants.REPORTS);
		    list.add(sub);
		}
	    }

	    long index = modulesList.indexOf(module) + 1;
	    long colorCount = moduleColorsMasterRepository.count();
	    if (index > colorCount) {
		index = index % colorCount;
	    }
	    Optional<ModuleColorsMaster> moduleColor = moduleColorsMasterRepository.findByOrder(index);
	    if (moduleColor.isPresent()) {
		modules.setModuleColor(moduleColor.get().getColor());
	    }
	    modulesResponse.add(modules);
	});

	return modulesResponse;
    }

    private boolean checkRoleReports(String id, List<ObjectId> roleIds) {
	List<ReportConfigurations> reports = reportConfigurationsRepository
		.findByModuleIdAndStatusAndDeletedAndRolesIn(new ObjectId(id), Status.ACTIVE, false, roleIds);
	return !reports.isEmpty();
    }

    public Users getUser(TokenPayLoadDetails payLoadDetails) {
	Optional<Users> userOptional = userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(
		payLoadDetails.getUserId(), payLoadDetails.getClientId(), Status.ACTIVE, false);
	if (!userOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.USER_NOT_FOUND);
	}
	return userOptional.get();
    }

    public Users getUser(String id) {
	Optional<Users> userOptional = userOnboardingRepository.findByIdAndStatusAndDeleted(id, Status.ACTIVE, false);
	if (!userOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.USER_NOT_FOUND);
	}
	return userOptional.get();
    }

    public List<String> getmoduleIds(List<RoleOnboardingDetails> roles) {
	List<String> moduleIds = new ArrayList<>();
	if (roles != null) {
	    roles.forEach(role -> {
		if (Status.ACTIVE.equals(role.getStatus()) && role.getModule() != null && !role.getModule().isEmpty()) {
		    moduleIds.addAll(role.getModule().stream()
			    .filter(mod -> Status.ACTIVE.equals(mod.getStatus()) && !mod.isDeleted())
			    .map(RoleModules::getId).collect(Collectors.toList()));
		}
	    });
	}
	return moduleIds;
    }

    public List<ObjectId> getModuleObjIds(List<RoleOnboardingDetails> roles) {
	List<ObjectId> moduleIds = new ArrayList<>();
	if (roles != null) {
	    roles.forEach(role -> {
		if (Status.ACTIVE.equals(role.getStatus()) && role.getModule() != null && !role.getModule().isEmpty()) {
		    moduleIds.addAll(role.getModule().stream()
			    .filter(mod -> Status.ACTIVE.equals(mod.getStatus()) && !mod.isDeleted())
			    .map(mod -> new ObjectId(mod.getId())).collect(Collectors.toList()));
		}
	    });
	}
	return moduleIds;
    }

    public List<ObjectId> getRoleObjIds(List<RoleOnboardingDetails> roles) {

	if (roles != null && !roles.isEmpty()) {
	    return roles.stream().filter(role -> Status.ACTIVE.equals(role.getStatus()) && !role.isDeleted())
		    .map(role -> new ObjectId(role.getId())).collect(Collectors.toList());
	}

	return new ArrayList<>();
    }

    private ScreenWorkFlow getWorkFlowId(String moduleId, String subModuleId) {
	LOGGER.info("getWorkFlowId method stated");
	Optional<ScreenWorkFlow> screenWorkFlowOpt = screenWorkFlowRepository
		.findByModuleIdAndSubModuleIdAndDeleted(moduleId, subModuleId, false);
	if (screenWorkFlowOpt.isPresent()) {
	    LOGGER.info("getWorkFlowId method ended");
	    return screenWorkFlowOpt.get();
	}
	LOGGER.info("getWorkFlowId method ended");
	return null;
    }

    private Query getQuery(FetchAllModAndSubModRequest request, String clientId, boolean pagination) {
	LOGGER.info("getQuery method started");
	Query query = new Query();
	Sort sort = Sort.by(getSortOrder(request.getSortOrder()), getColumn(request.getSortBy()));
	query.with(sort);
	if (pagination) {
	    int size = request.getSize() > 0 ? request.getSize() : 10;
	    query.with(Pageable.ofSize(size).withPage(request.getPage()));
	}
	List<Criteria> filterQuery = getFilterQuery(request, clientId);
	if (!filterQuery.isEmpty()) {
	    Criteria andQuery = new Criteria();
	    andQuery.andOperator(filterQuery);
	    query.addCriteria(andQuery);
	}
	query.collation(Collation.of("en").strength(Collation.ComparisonLevel.secondary()));
	LOGGER.info("getQuery method ended");
	return query;
    }

    public List<Criteria> getFilterQuery(FetchAllModAndSubModRequest request, String clientId) {
	LOGGER.info("Setting all filter columns");
	ArrayList<Criteria> filters = new ArrayList<>();
	if (isValid(request.getModuleName())) {
	    filters.add(Criteria.where("name").regex(request.getModuleName(), Constants.REGEX_CASE_INSENSITIVE));
	}
	if (isValid(request.getStatus())) {
	    filters.add(Criteria.where("status").is(request.getStatus().toUpperCase()));
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
	filters.add(Criteria.where("deleted").is(false));
	filters.add(Criteria.where("clientId").is(getClientDetails(clientId).getId()));
	return filters;
    }

    public LocalDate getDate(String date) {
	DateTimeFormatter outputDateFormat = DateTimeFormatter.ofPattern(Constants.DATE_PATTERN);
	try {
	    return LocalDate.parse(date, outputDateFormat);

	} catch (Exception e) {
	    throw new BadRequestException("Please provide date dd-mm-yyyy format");
	}
    }

    private boolean isValid(String text) {
	return text != null && !text.equalsIgnoreCase("null") && !text.isEmpty();
    }

//    private PageRequest getPageRequest(FetchAllModAndSubModRequest request) {
//	int size = request.getSize() > 0 ? request.getSize() : 10;
//	Sort sort = Sort.by(getSortOrder(request.getSortOrder()), getColumn(request.getSortBy()));
//	return PageRequest.of(request.getPage(), size, sort);
//    }

    private Direction getSortOrder(Optional<String> sortOrder) {
	return sortOrder != null && sortOrder.isPresent() && sortOrder.get().equalsIgnoreCase("ASC") ? Direction.ASC
		: Direction.DESC;
    }

    private String getColumn(Optional<ColumnOrder> order) {
	return order != null && order.isPresent() ? order.get().getValue() : "modifiedAt";
    }

    private List<SubModulesResponse> getSubmodules(List<SubModules> subModuleList, String id) {
	LOGGER.info("getSubmodules method started");
	List<SubModules> submodulesForModile = subModuleList.stream()
		.filter(subModule -> subModule.getModuleId().equals(id) && !subModule.isDeleted())
		.collect(Collectors.toList());
	List<SubModulesResponse> subModulesResponseList = new ArrayList<>();
	submodulesForModile.stream().forEach(subModule -> {
	    SubModulesResponse subModulesResponse = new SubModulesResponse();
	    subModulesResponse.setIcon(subModule.getIconUrl());
	    subModulesResponse.setIconMobile(ScreenBuilderMapper.getIconUrl(subModule.getIconUrl()));
	    ScreenWorkFlow workFlow = getWorkFlowId(id, subModule.getId());
	    if (workFlow != null) {
		subModulesResponse.setWorkFlowId(workFlow.getId());
		subModulesResponse.setMappedBy(workFlow.getMappedBy());
		subModulesResponse.setHasApprovalOnScreens(workFlow.isHasApprovalOnScreens());
		subModulesResponse.setHasApprovalOnTable(workFlow.isHasApprovalOnTable());
	    }
	    subModulesResponse.setId(subModule.getId());
	    subModulesResponse.setName(subModule.getName());
	    subModulesResponse.setStatus(subModule.getStatus().toString());
	    subModulesResponse.setRoles(subModule.getRoles() != null
		    ? subModule.getRoles().stream().filter(role -> !role.isDeleted())
			    .map(roleInfo -> ScreenBuilderMapper.getRoleInfo(roleInfo)).collect(Collectors.toList())
		    : new ArrayList<>());
	    subModulesResponse
		    .setRolesCount(subModulesResponse.getRoles().isEmpty() ? 0 : subModulesResponse.getRoles().size());
	    long index = submodulesForModile.indexOf(subModule) + 1;
	    long colorCount = moduleColorsMasterRepository.count();
	    if (index > colorCount) {
		index = index % colorCount;
	    }
	    Optional<ModuleColorsMaster> moduleColor = moduleColorsMasterRepository.findByOrder(index);
	    if (moduleColor.isPresent()) {
		subModulesResponse.setModuleColor(moduleColor.get().getColor());
	    }
	    subModulesResponseList.add(subModulesResponse);
	});
	LOGGER.info("getSubmodules method ended");

	return subModulesResponseList;
    }

    /**
     * this method is used to delete feature template
     * 
     * @param templateId
     * @return
     */
    public SuccessResponse deleteFeatureTemplate(DeleteFeatureTemplateModel model) {
	LOGGER.info("deleteFeatureTemplateDetails method started");
	LOGGER.info("Checking feature template with id : {}", model.getTemplateId());
	Optional<FeatureTemplate> futureTemplate = featureTemplateRepository.findByIdAndDeleted(model.getTemplateId(),
		false);
	if (!futureTemplate.isPresent()) {
	    throw new ResourceNotFoundException(
		    Constants.FEATURE_TEMPLATE_NOT_FOUND_WITH_THIS_ID + model.getTemplateId());
	}
	futureTemplate.get().setDeleted(true);
	futureTemplate.get().setModifiedAt(Instant.now());
	futureTemplate.get().setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails()));
	featureTemplateRepository.save(futureTemplate.get());
	LOGGER.info("deleteFeatureTemplateDetails method ended");
	return new SuccessResponse(Constants.FEATURE_TEMPLATE_DELETED_SUCCESSFULLY);
    }

    public UserModulesResponse fetchAllModulesForDashboard(FetchAllModulesByUesrModel model) {
	LOGGER.info("fetchAllModulesForDashboard method started");

	if (Constants.USER.equalsIgnoreCase(model.getType())) {
	    Users user = getUser(model.getId());
	    List<String> moduleIdsList = getmoduleIds(user.getRoles());
	    List<ObjectId> moduleObjIdsList = getModuleObjIds(user.getRoles());
	    List<ObjectId> rolesObjIdsList = getRoleObjIds(user.getRoles());
	    List<Module> modulesList = moduleRepository.findAllWithIdsAndStatusAndDeleted(moduleIdsList,
		    Status.ACTIVE.toString(), false);
	    List<SubModules> subModuleList = subModuleRepository.findByModuleIdInAndStatusAndDeleted(moduleIdsList,
		    Status.ACTIVE.toString(), false);
	    List<ReportConfigurations> reports = reportConfigurationsRepository
		    .findByModuleInAndStatusAndDeletedAndRolesIn(moduleObjIdsList, Status.ACTIVE, false,
			    rolesObjIdsList);
	    List<String> reportIds = reports.stream().map(ReportConfigurations::getId).collect(Collectors.toList());
	    List<ChartDetails> charts = chartDetailsRepository.findByReportIdInAndStatusAndDeleted(reportIds,
		    Status.ACTIVE, false);
	    LOGGER.info("fetchAllModulesForDashboard method ended");
	    return ScreenBuilderMapper.getUserModules(modulesList, subModuleList, reports, charts);
	}
	if (Constants.CLIENT.equalsIgnoreCase(model.getType())) {
	    List<Module> modulesList = moduleRepository.findByClientIdAndStatusAndDeleted(model.getId(),
		    Status.ACTIVE.toString(), false);
	    List<String> moduleIdsList = modulesList.stream().map(Module::getId).collect(Collectors.toList());
	    List<ObjectId> moduleObjIdsList = modulesList.stream().map(mod -> new ObjectId(mod.getId()))
		    .collect(Collectors.toList());
	    List<SubModules> subModuleList = subModuleRepository.findByModuleIdInAndStatusAndDeleted(moduleIdsList,
		    Status.ACTIVE.toString(), false);
	    List<ReportConfigurations> reports = reportConfigurationsRepository
		    .findByModuleInAndStatusAndDeleted(moduleObjIdsList, Status.ACTIVE, false);
	    LOGGER.info("fetchAllModulesForDashboard method ended");
	    return ScreenBuilderMapper.getUserModules(modulesList, subModuleList, reports, null);
	}
	return null;
    }

    public ModuleReportResponse getReportsList(FetchReportChartsByModuleIdModel model) {
	LOGGER.info("fetchAllModAndSubModByUser method started");
	Users user = getUser(model.getDetails().getId());
	getModule(model.getModuleId());
	List<ObjectId> rolesObjIdsList = getRoleObjIds(user.getRoles());
	List<ReportConfigurations> reports = reportConfigurationsRepository.findByModuleIdAndStatusAndDeletedAndRolesIn(
		new ObjectId(model.getModuleId()), Status.ACTIVE, false, rolesObjIdsList);
	if (StringUtils.isBlank(model.getSortOrder())) {
	    reports = reports.stream().sorted(Comparator.comparing(ReportConfigurations::getName))
		    .collect(Collectors.toList());
	} else {
	    reports = model.getSortOrder().equalsIgnoreCase("DESC")
		    ? reports.stream().sorted(Comparator.comparing(ReportConfigurations::getName).reversed())
			    .collect(Collectors.toList())
		    : reports.stream().sorted(Comparator.comparing(ReportConfigurations::getName))
			    .collect(Collectors.toList());
	}
	LOGGER.info("fetchAllModAndSubModByUser method ended");
	return ReportMapper.getModuleReports(reports);
    }

}
