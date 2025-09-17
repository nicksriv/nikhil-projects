package com.wavelabs.sb.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.RoleModules;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.Screen;
import com.wavelabs.sb.documents.ScreenFields;
import com.wavelabs.sb.documents.ScreenFlows;
import com.wavelabs.sb.documents.ScreenWorkFlow;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.ScreenBuilderMapper;
import com.wavelabs.sb.mappers.ScreenWorkflowMapper;
import com.wavelabs.sb.model.CloneModulesModel;
import com.wavelabs.sb.model.SaveWorkflowModel;
import com.wavelabs.sb.repository.ModuleRepository;
import com.wavelabs.sb.repository.RoleOnboardingRepository;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.repository.ScreenFlowsRepository;
import com.wavelabs.sb.repository.ScreenRepository;
import com.wavelabs.sb.repository.ScreenWorkFlowRepository;
import com.wavelabs.sb.repository.SubModuleRepository;
import com.wavelabs.sb.request.ModuleCloneRequest;
import com.wavelabs.sb.request.SaveWorkflowRequest;
import com.wavelabs.sb.request.ScreenFlowsRequest;
import com.wavelabs.sb.response.DynamicWorkFlowDetails;
import com.wavelabs.sb.response.DynamicWorkFlowDetailsResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.WorkFlowDetails;
import com.wavelabs.sb.response.WorkFlowDetailsResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class WorkflowService {

    private static final Logger LOGGER = LoggerFactory.getLogger(WorkflowService.class);

    @Autowired
    ScreenWorkFlowRepository screenWorkFlowRepository;

    @Autowired
    ScreenFlowsRepository screenFlowsRepository;

    @Autowired
    ScreenBuilderService screenBuilderService;

    @Autowired
    SubModuleRepository subModuleRepository;

    @Autowired
    ScreenRepository screenRepository;

    @Autowired
    ModuleRepository moduleRepository;

    @Autowired
    RoleOnboardingRepository roleOnboardingRepository;

    @Autowired
    ScreenFieldsRepository screenFieldsRepository;

    public SuccessResponse saveWorkflow(SaveWorkflowModel model) {
	LOGGER.info("saveWorkflow method started..!");
	SaveWorkflowRequest request = model.getRequest();
	SubModules subModule = screenBuilderService.getSubModuleWithNull(request.getSubmoduleId());
	Module module = screenBuilderService.getModule(request.getModuleId());
	screenBuilderService.getClientDetails(request.getClientId());
	ScreenWorkFlow screenWorkFlow = null;
	if (!StringUtils.isBlank(request.getId())) {
	    screenWorkFlow = getWorkflowById(request.getId());
	} else {
	    checkWorkflow(module, subModule);
	}
	if (request.getWorkflows() == null) {
	    request.setWorkflows(new ArrayList<>());
	}
	if (request.getRoleIds() == null) {
	    request.setRoleIds(new ArrayList<>());
	}
	checkStatus(request.getStatus(), screenWorkFlow);

	List<String> workflowIds = request.getWorkflows().stream().map(ScreenFlowsRequest::getId)
		.collect(Collectors.toList());
	List<ScreenFlows> screenFlowsList = screenFlowsRepository.findAllByIds(workflowIds);
	Map<String, ScreenFlows> workFlowsMap = getWorkFlowsMap(screenFlowsList);
	List<ScreenFlows> screenFlows = new ArrayList<>();
	request.getWorkflows().forEach(workflow -> {
	    screenBuilderService.getScreen(workflow.getScreenId());
	    ScreenFlows screenFlow = null;
	    String createdByModifiedBy = OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails());
	    if (workflow.getId() != null) {
		if (workFlowsMap.get(workflow.getId()) != null) {
		    screenFlow = ScreenWorkflowMapper.getScreenFlows(workFlowsMap.get(workflow.getId()), workflow,
			    request, createdByModifiedBy);
		} else {
		    throw new ResourceNotFoundException(ErrorMessages.SCREENFLOW_NOT_FOUND_WITH_ID + workflow.getId());
		}
	    } else {
		Optional<ScreenFlows> optional = screenFlowsRepository.findByScreenIdAndDeleted(workflow.getScreenId(),false);
		if (optional.isPresent()) {
		    screenFlow = ScreenWorkflowMapper.getScreenFlows(optional.get(), workflow, request,
			    createdByModifiedBy);
		} else {
		    screenFlow = ScreenWorkflowMapper.getScreenFlows(null, workflow, request, createdByModifiedBy);
		}

	    }
	    screenFlows.add(screenFlow);
	});
	screenFlowsRepository.saveAll(screenFlows);
	List<RoleOnboardingDetails> roles = getRolesOnboarding(request.getRoleIds());
	List<SubModules> submodules = subModuleRepository.findByModuleIdAndStatusAndDeleted(module.getId(),
		Status.ACTIVE.toString(), false);
	if (screenWorkFlow != null) {
	    if (!screenWorkFlow.getStatus().equals(request.getStatus())) {
		updateStatus(module, subModule, request.getStatus(), submodules);
	    }
	    List<RoleOnboardingDetails> existingRoles = screenWorkFlow.getRoles();
	    screenWorkFlow = ScreenWorkflowMapper.getScreenWorkFlow(screenWorkFlow, request, roles);
	    if (existingRoles != null && !existingRoles.isEmpty() && request.getRoleIds() != null
		    && !request.getRoleIds().isEmpty()) {
		saveRoleModules(request.getRoleIds(), module, subModule, submodules, existingRoles);
		List<RoleOnboardingDetails> removedRoles = existingRoles.stream()
			.filter(role -> !request.getRoleIds().contains(role.getId())).collect(Collectors.toList());
		saveModuleRoles(roles, module, subModule, submodules, removedRoles);
	    }
	    if ((existingRoles == null || existingRoles.isEmpty()) && !roles.isEmpty()) {
		saveModuleRoles(roles, module, subModule, submodules, null);
	    }
	    if (existingRoles != null && !existingRoles.isEmpty() && roles.isEmpty()) {
		removeModuleRoles(existingRoles, module, subModule, submodules);
		saveRoleModules(request.getRoleIds(), module, subModule, submodules, existingRoles);
	    }

	} else {
	    screenWorkFlow = ScreenWorkflowMapper.getScreenWorkFlow(null, request, roles);
	    saveModuleRoles(roles, module, subModule, submodules, null);
	    updateStatus(module, subModule, request.getStatus(), submodules);
	}

	screenWorkFlow.setScreenFlows(screenFlows);
	screenWorkFlow = screenWorkFlowRepository.save(screenWorkFlow);
	LOGGER.info("saveWorkflow method ended..!");
	return new SuccessResponse(screenWorkFlow.getId(), Constants.WORK_FLOW_SAVED);
    }

    private void checkStatus(Status status, ScreenWorkFlow screenWorkFlow) {

	if (screenWorkFlow != null && status.equals(Status.DRAFT) && !Status.DRAFT.equals(screenWorkFlow.getStatus())) {
	    throw new BadRequestException(ErrorMessages.WORKFLOW_ACTIVE_INACTIVE_STATUS_DRAFT);
	}
    }

    private void removeModuleRoles(List<RoleOnboardingDetails> existingRoles, Module module, SubModules subModule,
	    List<SubModules> submodules) {
	if (subModule != null) {
	    subModule.setRoles(new ArrayList<>());
	    subModuleRepository.save(subModule);
	}
	if (module != null) {
	    List<String> roleIds = new ArrayList<>();
	    if (submodules != null && !submodules.isEmpty()) {
		submodules.forEach(submod -> {
		    if (submod.getRoles() != null && !submod.getRoles().isEmpty()) {
			submod.getRoles().forEach(role -> {
			    if (!roleIds.contains(role.getId())
				    && !submod.getId().equalsIgnoreCase(subModule.getId())) {
				roleIds.add(role.getId());
			    }
			});
		    }
		});
	    }
	    if (roleIds.isEmpty()) {
		module.setRoles(new ArrayList<>());
	    } else {
		existingRoles.forEach(role -> {
		    if (!roleIds.contains(role.getId())) {
			module.getRoles().remove(role);
		    }
		});
	    }
	    moduleRepository.save(module);
	}
    }

    private void saveRoleModules(List<String> roleIds, Module module, SubModules subModule, List<SubModules> submodules,
	    List<RoleOnboardingDetails> existingRoles) {
	if (!existingRoles.isEmpty()) {
	    List<RoleOnboardingDetails> removedRoles = existingRoles.stream()
		    .filter(role -> !roleIds.contains(role.getId())).collect(Collectors.toList());
	    if (!removedRoles.isEmpty()) {
		List<RoleOnboardingDetails> removedRolesList = new ArrayList<>();
		removedRoles.forEach(role -> {
		    List<String> subIds = role.getModule().stream().map(RoleModules::getId)
			    .collect(Collectors.toList());
		    Optional<RoleModules> optional = role.getModule().stream().parallel()
			    .filter(mod -> mod.getId().equalsIgnoreCase(subModule.getId())).findAny();
		    if (optional.isPresent()) {
			role.getModule().remove(optional.get());
		    }

		    Optional<SubModules> submodInRoles = submodules.stream()
			    .filter(subMod -> subIds.contains(subMod.getId())
				    && !subMod.getId().equalsIgnoreCase(subModule.getId()))
			    .findAny();
		    if (!submodInRoles.isPresent()) {
			Optional<RoleModules> optionalMod = role.getModule().stream().parallel()
				.filter(mod -> mod.getId().equalsIgnoreCase(module.getId())).findAny();
			if (optional.isPresent()) {
			    role.getModule().remove(optionalMod.get());
			}
		    }
		    removedRolesList.add(role);
		});
		roleOnboardingRepository.saveAll(removedRolesList);
	    }
	}

    }

    private void updateStatus(Module module, SubModules subModule, Status status, List<SubModules> submodules) {

	if (status.equals(Status.ACTIVE)) {
	    if (subModule != null && !subModule.getStatus().equals(Status.ACTIVE)) {
		subModule.setStatus(status);
		subModuleRepository.save(subModule);
	    }
	    if (!module.getStatus().equals(Status.ACTIVE)) {
		module.setStatus(status);
		moduleRepository.save(module);
	    }
	}
	if (status.equals(Status.INACTIVE)) {
	    if (!submodules.isEmpty() && submodules.size() > 1 && subModule != null) {
		subModule.setStatus(status);
		subModuleRepository.save(subModule);
	    } else {
		if (subModule != null && !subModule.getStatus().equals(Status.INACTIVE)) {
		    subModule.setStatus(status);
		    subModuleRepository.save(subModule);
		}
		if (!module.getStatus().equals(Status.INACTIVE)) {
		    module.setStatus(status);
		    moduleRepository.save(module);
		}
	    }

	}
	if (status.equals(Status.DRAFT)) {
	    if (!submodules.isEmpty() && submodules.size() > 1 && subModule != null) {
		subModule.setStatus(status);
		subModuleRepository.save(subModule);
	    } else {
		if (subModule != null && !subModule.getStatus().equals(Status.DRAFT)) {
		    subModule.setStatus(status);
		    subModuleRepository.save(subModule);
		    moduleRepository.save(module);
		}
	    }
	}
    }

    private void saveModuleRoles(List<RoleOnboardingDetails> roles, Module module, SubModules subModule,
	    List<SubModules> submodules, List<RoleOnboardingDetails> removedRoles) {
	List<RoleOnboardingDetails> newRoles = new ArrayList<>();

	if (subModule != null) {
	    subModule.setRoles(roles);
	    subModuleRepository.save(subModule);
	    if (!roles.isEmpty()) {
		roles.stream().forEach(role -> {
		    newRoles.add(getRoleForSubModule(role, subModule));
		});
	    }
	}
	if (module != null) {
	    if (!submodules.isEmpty()) {
		List<RoleOnboardingDetails> rolesList = new ArrayList<>();
		if (module.getRoles() != null && !module.getRoles().isEmpty()) {
		    rolesList.addAll(module.getRoles());
		}
		List<String> roleIds = rolesList.stream().map(RoleOnboardingDetails::getId)
			.collect(Collectors.toList());
		if (!roles.isEmpty()) {
		    roles.forEach(role -> {
			if (!roleIds.contains(role.getId())) {
			    rolesList.add(role);
			}
		    });
		}
		if (removedRoles != null && !removedRoles.isEmpty()) {
		    List<RoleOnboardingDetails> removedRolesList = new ArrayList<>();
		    removedRolesList.addAll(removedRoles);
		    removedRolesList.stream().forEach(role -> {
			LOGGER.info("Role id {}", role.getId());
			submodules.stream().forEach(sub -> {
			    LOGGER.info("{} sub id {}", subModule.getId(), sub.getId());
			    if (!sub.getId().equalsIgnoreCase(subModule.getId())) {
				LOGGER.info("{}", subModule.getId());
				Optional<RoleOnboardingDetails> rol = sub.getRoles().stream()
					.filter(ro -> ro.getId().equalsIgnoreCase(role.getId())).findAny();
				if (rol.isPresent() && removedRoles != null && !removedRoles.isEmpty()) {
				    removedRoles.remove(rol.get());
				}
			    }
			});
			LOGGER.info("Role id {}", role.getId());
			LOGGER.info("Role id {}", removedRolesList.size());
		    });
		    if (!removedRoles.isEmpty()) {
			rolesList.removeAll(removedRoles);
		    }
		}
		module.setRoles(rolesList);
	    } else {
		module.setRoles(roles);
	    }
	    moduleRepository.save(module);
	    if (!roles.isEmpty()) {
		roles.stream().forEach(role -> {
		    newRoles.add(getRoleForModule(role, module));
		});
	    }
	}
	roleOnboardingRepository.saveAll(newRoles);
    }

    private RoleOnboardingDetails getRoleForModule(RoleOnboardingDetails role, Module module) {
	RoleModules roleModules = new RoleModules();
	roleModules.setId(module.getId());
	roleModules.setName(module.getName());
	roleModules.setStatus(module.getStatus());
	roleModules.setDeleted(false);
	if (role.getModule() == null || (role.getModule() != null && role.getModule().isEmpty())) {
	    List<RoleModules> modules = new ArrayList<>();
	    modules.add(roleModules);
	    role.setModule(modules);
	} else {
	    Optional<RoleModules> moduleOptional = role.getModule().stream()
		    .filter(mod -> mod.getId().equalsIgnoreCase(roleModules.getId()) && !mod.isDeleted()).findAny();
	    if (!moduleOptional.isPresent()) {
		role.getModule().add(roleModules);
	    }
	}
	return role;
    }

    private RoleOnboardingDetails getRoleForSubModule(RoleOnboardingDetails role, SubModules module) {
	RoleModules roleModules = new RoleModules();
	roleModules.setId(module.getId());
	roleModules.setName(module.getName());
	roleModules.setStatus(module.getStatus());

	if (role.getModule() == null || (role.getModule() != null && role.getModule().isEmpty())) {
	    List<RoleModules> modules = new ArrayList<>();
	    modules.add(roleModules);
	    role.setModule(modules);
	} else {
	    Optional<RoleModules> moduleOptional = role.getModule().stream()
		    .filter(mod -> mod.getId().equalsIgnoreCase(roleModules.getId())).findAny();
	    if (!moduleOptional.isPresent()) {
		role.getModule().add(roleModules);
	    }
	}
	return role;
    }

    private List<RoleOnboardingDetails> getRolesOnboarding(List<String> roleIds) {
	return roleOnboardingRepository.findAllByIdIn(roleIds);
    }

    public ScreenWorkFlow getWorkflow(String workflowId) {
	Optional<ScreenWorkFlow> workflowOptional = screenWorkFlowRepository.findByIdAndStatus(workflowId,
		Status.ACTIVE);
	if (!workflowOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.SCREENWORKFLOW_NOT_FOUND_WITH_ID + workflowId);
	}
	return workflowOptional.get();
    }

    public ScreenWorkFlow getWorkflowById(String workflowId) {
	Optional<ScreenWorkFlow> workflowOptional = screenWorkFlowRepository.findById(workflowId);
	if (!workflowOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.SCREENWORKFLOW_NOT_FOUND_WITH_ID + workflowId);
	}
	return workflowOptional.get();
    }

    public void getWorkflow(String submoduleId, String mappedById) {
	if (!screenWorkFlowRepository.existsBySubModuleIdAndMappedByAndStatusAndDeleted(submoduleId, mappedById,
		Status.ACTIVE, false)) {
	    throw new ResourceNotFoundException(ErrorMessages.SCREENWORKFLOW_NOT_FOUND_SUB_MODULE);
	}
    }

    private void checkWorkflow(Module module, SubModules subModule) {
	Optional<ScreenWorkFlow> worflow = subModule != null
		? screenWorkFlowRepository.findByModuleIdAndSubModuleId(module.getId(), subModule.getId())
		: screenWorkFlowRepository.findByModuleIdAndSubModuleId(module.getId(), "");
	if (worflow.isPresent()) {
	    throw new BadRequestException(ErrorMessages.WORKFLOW_ALREADY_CREATED);
	}
    }

    private Map<String, ScreenFlows> getWorkFlowsMap(List<ScreenFlows> workFlows) {
	Map<String, ScreenFlows> mapWorkFlows = new HashMap<>();
	workFlows.forEach(workFlow -> {
	    if (!mapWorkFlows.containsKey(workFlow.getId())) {
		mapWorkFlows.put(workFlow.getId(), workFlow);
	    }
	});
	return mapWorkFlows;
    }

    public WorkFlowDetailsResponse fetchWorkFlowDetails(String workflowId) {
	LOGGER.info("fetchWorkFlowDetails method started..!");

	Optional<ScreenWorkFlow> screenworkFlow = screenWorkFlowRepository.findById(workflowId);
	if (!screenworkFlow.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.SCREENWORKFLOW_NOT_FOUND_WITH_ID + workflowId);
	}
	ScreenWorkFlow screenflow = screenworkFlow.get();
	List<WorkFlowDetails> workFlowDetails = new ArrayList<>();

	WorkFlowDetailsResponse response = new WorkFlowDetailsResponse();
	screenflow.getScreenFlows().stream().forEach(workFlows -> {
	    WorkFlowDetails workFlow = new WorkFlowDetails();
	    workFlow.setId(workFlows.getId());
	    workFlow.setDisplayOrder(workFlows.getDisplayOrder());
	    workFlow.setNextScreenId(workFlows.getNextScreenId());
	    workFlow.setPreviousScreenId(workFlows.getPreviousScreenId());
	    workFlow.setScreenId(workFlows.getScreenId());
	    workFlow.setScreenName(workFlows.getScreenName());
	    workFlow.setStatus(workFlows.getStatus());
	    workFlowDetails.add(workFlow);
	});
	response.setWorkFlows(workFlowDetails);
	response.setSubmoduleId(screenflow.getSubModuleId());
	response.setClientId(screenflow.getClientId());
	response.setModuleId(screenflow.getModuleId());
	response.setWorkflowId(workflowId);
	response.setHasApprovalOnScreens(screenflow.isHasApprovalOnScreens());
	response.setHasApprovalOnTable(screenflow.isHasApprovalOnTable());
	response.setStatus(screenflow.getStatus());
	response.setMappedBy(screenflow.getMappedBy());
	response.setRoles(screenflow.getRoles() != null
		? screenflow.getRoles().stream().filter(role -> !role.isDeleted())
			.map(roleInfo -> ScreenBuilderMapper.getRoleInfo(roleInfo)).collect(Collectors.toList())
		: new ArrayList<>());
	return response;
    }

    public DynamicWorkFlowDetailsResponse fetchDynamicWorkFlowDetails(String moduleId, String subModuleId) {
	DynamicWorkFlowDetailsResponse response = new DynamicWorkFlowDetailsResponse();
	Optional<ScreenWorkFlow> screenWorkFlowOptional = screenWorkFlowRepository
		.findByModuleIdAndSubModuleId(moduleId, subModuleId);
	if (screenWorkFlowOptional.isPresent()) {
	    ScreenWorkFlow workflow = screenWorkFlowOptional.get();
	    List<ScreenFlows> screenFlows = workflow.getScreenFlows();
	    List<DynamicWorkFlowDetails> workFlowDetails = new ArrayList<>();
	    screenFlows.stream().forEach(
		    screenFlow -> workFlowDetails.add(ScreenWorkflowMapper.getDynamicWorkFlowDetails(screenFlow)));
	    response.setWorkFlows(workFlowDetails);
	    response.setFirstScreenName(screenFlows.get(0).getScreenName());
	    response.setMappedBy(moduleId);
	    response.setHasApprovalOnScreens(workflow.isHasApprovalOnScreens());
	    response.setHasApprovalOnTable(workflow.isHasApprovalOnTable());
	    response.setStatus(workflow.getStatus() != null ? workflow.getStatus().toString() : null);
	    response.setWorkflowId(workflow.getId());
	    return response;
	}
	throw new ResourceNotFoundException(Constants.NO_RECORD_FOUND + moduleId);

    }

    public SuccessResponse cloneModuleWorkflow(CloneModulesModel model) {
	LOGGER.info("cloneModuleWorkflow method started");
	ModuleCloneRequest request = model.getRequest();
	screenBuilderService.getModule(request.getParentModuleId());
	screenBuilderService.getSubModule(request.getSubmoduleId());
	LOGGER.info("Ftech workflow with module and submodule");
	Optional<ScreenWorkFlow> screenWorkFlowOptional = screenWorkFlowRepository
		.findBySubModuleIdAndDeleted(request.getSubmoduleId(), false);
	if (!screenWorkFlowOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.WORKFLOW_NOT_FOUND_WITH_SUBMODULE);
	}
	Optional<SubModules> submoduleOpt = subModuleRepository
		.findByModuleIdAndNameIgnoreCaseAndDeleted(request.getParentModuleId(), request.getModuleName(), false);
	if (submoduleOpt.isPresent()) {
	    throw new ResourceNotFoundException(request.getModuleName() + Constants.SUB_MODULE_ALREADY_CREATED);
	}
	String createdModifiedBy = OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails());
	SubModules submodule = subModuleRepository
		.save(ScreenBuilderMapper.getBasicSubmodule(request, createdModifiedBy));
	List<ScreenFlows> screenFlows = new ArrayList<>();
	if (screenWorkFlowOptional.get().getScreenFlows() != null
		&& !screenWorkFlowOptional.get().getScreenFlows().isEmpty()) {
	    LOGGER.info("Saving screens for screen flows");
	    List<String> screenIds = screenWorkFlowOptional.get().getScreenFlows().stream()
		    .map(ScreenFlows::getScreenId).collect(Collectors.toList());
	    List<ScreenFields> screenFieldsList = screenFieldsRepository.findByScreenIdInAndStatusAndDeleted(screenIds,
		    Status.ACTIVE, false);
	    List<Screen> screens = screenRepository.findAllByIdIn(screenIds);
	    Map<String, Screen> screensMap = new HashMap<>();
	    screens.forEach(screen -> {
		Screen newScreen = ScreenBuilderMapper.getScreenMapper(screen, request, submodule.getId(),
			createdModifiedBy);
		screenRepository.save(newScreen);
		screensMap.put(screen.getId(), newScreen);
		List<ScreenFields> screenFields = screenFieldsList.stream()
			.filter(filed -> filed.getScreenId().equalsIgnoreCase(screen.getId()))
			.collect(Collectors.toList());

		List<ScreenFields> newScreenFields = screenFields.stream()
			.map(field -> ScreenBuilderMapper.getScreenFieldsMapper(field, newScreen, createdModifiedBy))
			.collect(Collectors.toList());
		screenFieldsRepository.saveAll(newScreenFields);

	    });
	    LOGGER.info("Saved screens for screen flows");
	    LOGGER.info("Saving screen flows");
	    List<String> flowIds = new ArrayList<>();
	    screenWorkFlowOptional.get().getScreenFlows().forEach(screenFlow -> {
		if (!flowIds.contains(screenFlow.getScreenId())) {
		    ScreenFlows newScreenFlow = ScreenWorkflowMapper.getScreenFlows(screenFlow, request,
			    submodule.getId(), createdModifiedBy);
		    newScreenFlow = setScreenFlowScreens(newScreenFlow, screensMap, screenFlow);
		    screenFlows.add(newScreenFlow);
		    flowIds.add(screenFlow.getScreenId());
		}

	    });
	    screenFlowsRepository.saveAll(screenFlows);
	    LOGGER.info("Saved screen flows");
	}
	LOGGER.info("Saving screen workflow");
	ScreenWorkFlow screenWorkFlow = ScreenBuilderMapper.getCloneWorkflow(request, screenFlows, submodule.getId(),
		createdModifiedBy);
	screenWorkFlowRepository.save(screenWorkFlow);
	LOGGER.info("Saved screen workflow");
	LOGGER.info("cloneModuleWorkflow method ended");
	return new SuccessResponse(screenWorkFlow.getId(), Constants.WORKFLOW_CLONED_SUCCESSFULLY);
    }

    private ScreenFlows setScreenFlowScreens(ScreenFlows newScreenFlow, Map<String, Screen> screensMap,
	    ScreenFlows screenFlow) {

	newScreenFlow.setPreviousScreenId(!StringUtils.isBlank(screenFlow.getPreviousScreenId())
		&& screensMap.get(screenFlow.getPreviousScreenId()) != null
			? screensMap.get(screenFlow.getPreviousScreenId()).getId()
			: null);
	newScreenFlow.setScreenId(
		!StringUtils.isBlank(screenFlow.getScreenId()) && screensMap.get(screenFlow.getScreenId()) != null
			? screensMap.get(screenFlow.getScreenId()).getId()
			: null);
	newScreenFlow.setNextScreenId(!StringUtils.isBlank(screenFlow.getNextScreenId())
		&& screensMap.get(screenFlow.getNextScreenId()) != null
			? screensMap.get(screenFlow.getNextScreenId()).getId()
			: null);
	newScreenFlow.setScreenName(
		(!StringUtils.isBlank(screenFlow.getScreenId()) && screensMap.get(screenFlow.getScreenId()) != null
			? screensMap.get(screenFlow.getScreenId()).getName()
			: null));

	return newScreenFlow;
    }

}
