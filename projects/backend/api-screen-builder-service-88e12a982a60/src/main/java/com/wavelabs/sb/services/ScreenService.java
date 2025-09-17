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
import com.wavelabs.sb.documents.Screen;
import com.wavelabs.sb.documents.ScreenFields;
import com.wavelabs.sb.documents.ScreenFlows;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.mappers.ScreenBuilderMapper;
import com.wavelabs.sb.model.CreateScreenModel;
import com.wavelabs.sb.model.UpdateScreenModel;
import com.wavelabs.sb.repository.ModuleRepository;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.repository.ScreenFlowsRepository;
import com.wavelabs.sb.repository.ScreenRepository;
import com.wavelabs.sb.repository.SubModuleRepository;
import com.wavelabs.sb.request.CreateScreenRequest;
import com.wavelabs.sb.request.ScreenFieldsRequest;
import com.wavelabs.sb.request.UpdateScreenRequest;
import com.wavelabs.sb.response.SaveScreenResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class ScreenService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ScreenService.class);

    @Autowired
    ScreenRepository screenRepository;

    @Autowired
    ScreenFieldsRepository screenFieldsRepository;

    @Autowired
    SubModuleRepository subModuleRepository;

    @Autowired
    ModuleRepository moduleRepository;

    @Autowired
    ScreenBuilderService screenBuilderService;

    @Autowired
    ScreenFlowsRepository screenFlowsRepository;

    public SaveScreenResponse saveScreen(CreateScreenModel model) {
	LOGGER.info("saveScreen method started..!");

	CreateScreenRequest request = model.getRequest();
	if (!StringUtils.isBlank(request.getSubmoduleId())) {
	    screenBuilderService.getSubModule(request.getSubmoduleId());
	}
	screenBuilderService.getModule(request.getModuleId());
	screenBuilderService.getClientDetails(request.getClientId());
	Screen screen = ScreenBuilderMapper.getScreenMapper(request,
		OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails()));
	screen = screenRepository.save(screen);
	if (!request.getFields().isEmpty()) {
	    LOGGER.info("Saving screen fields..!");
	    saveScreenFields(request.getFields(), screen);
	}
	LOGGER.info("saveScreen method ended..!");
	return new SaveScreenResponse(screen.getId(), Constants.SCREEN_CREATED);
    }

    private void saveScreenFields(List<ScreenFieldsRequest> fields, Screen screen) {
	List<ScreenFields> screenFields = fields.stream()
		.map(field -> ScreenBuilderMapper.getScreenFieldsMapper(null, field, screen))
		.collect(Collectors.toList());
	screenFieldsRepository.saveAll(screenFields);
    }

    public SuccessResponse updateScreen(UpdateScreenModel model) {
	LOGGER.info("updateScreen method started..!");
	UpdateScreenRequest request = model.getRequest();
	if (!StringUtils.isBlank(request.getSubmoduleId())) {
	    screenBuilderService.getSubModule(request.getSubmoduleId());
	}
	screenBuilderService.getModule(request.getModuleId());
	Screen screen = screenBuilderService.getScreen(request.getScreenId());
	screenBuilderService.getClientDetails(request.getClientId());
	boolean isNameUpdated = false;
	if (!StringUtils.isBlank(request.getName()) && !request.getName().equals(screen.getName())) {
	    isNameUpdated = true;
	}
	List<ScreenFields> screenFields = screenFieldsRepository.findAllByScreenId(screen.getId());
	Map<String, ScreenFields> screenFieldsMap = getScreenFieldsMap(screenFields);
	screen = ScreenBuilderMapper.updateScreenMapper(request, screen,
		OnboardingUtil.getCreatedOrModifiedBy(model.getTokenPayLoadDetails()));
	screenRepository.save(screen);
	if (!request.getFields().isEmpty()) {
	    LOGGER.info("Updating screen fields..!");
	    updateScreenFields(screenFields, request.getFields(), screenFieldsMap, screen);
	}
	if (isNameUpdated) {
	    updateScreenFlow(request.getName(), request.getScreenId());
	}
	LOGGER.info("updateScreen method ended..!");
	return new SuccessResponse(Constants.SCREEN_UPDATED);
    }

    private void updateScreenFlow(String name, String screenId) {

	Optional<ScreenFlows> optional = screenFlowsRepository.findByScreenIdAndDeleted(screenId,false);
	if (optional.isPresent()) {
	    optional.get().setScreenName(name);
	    screenFlowsRepository.save(optional.get());
	}
    }

    private void updateScreenFields(List<ScreenFields> screenFields, List<ScreenFieldsRequest> requestscreenFields,
	    Map<String, ScreenFields> screenFieldsMap, Screen screen) {
	LOGGER.info("updateScreenFields method started..!");
	List<String> fileds = requestscreenFields.stream().map(ScreenFieldsRequest::getComponentId)
		.collect(Collectors.toList());
	List<ScreenFields> screenFieldsList = new ArrayList<>();
	List<ScreenFields> deletedFields = screenFields.stream()
		.filter(field -> !fileds.contains(field.getComponentId())).collect(Collectors.toList());
	deletedFields.forEach(field -> {
	    field.setStatus(Status.INACTIVE);
	    field.setDeleted(true);
	    screenFieldsList.add(field);
	});

	requestscreenFields.forEach(field -> {
	    if (screenFieldsMap.containsKey(field.getComponentId())) {
		screenFieldsList.add(ScreenBuilderMapper
			.getScreenFieldsMapper(screenFieldsMap.get(field.getComponentId()), field, screen));
	    } else {
		screenFieldsList.add(ScreenBuilderMapper.getScreenFieldsMapper(null, field, screen));
	    }
	});
	screenFieldsRepository.saveAll(screenFieldsList);
    }

    private Map<String, ScreenFields> getScreenFieldsMap(List<ScreenFields> screenFields) {
	Map<String, ScreenFields> mapWorkFlows = new HashMap<>();
	screenFields.forEach(field -> {
	    if (!mapWorkFlows.containsKey(field.getComponentId())) {
		mapWorkFlows.put(field.getComponentId(), field);
	    }
	});
	return mapWorkFlows;
    }

}
