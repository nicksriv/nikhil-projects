package com.wavelabs.sb.mappers;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.wavelabs.sb.response.*;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.documents.ChartDetails;
import com.wavelabs.sb.documents.FeatureTemplate;
import com.wavelabs.sb.documents.LocationMapping;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.Screen;
import com.wavelabs.sb.documents.ScreenFields;
import com.wavelabs.sb.documents.ScreenFlows;
import com.wavelabs.sb.documents.ScreenWorkFlow;
import com.wavelabs.sb.documents.SiteOnboarding;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.AddSubmoduleRequest;
import com.wavelabs.sb.request.CreateModuleRequest;
import com.wavelabs.sb.request.CreateScreenRequest;
import com.wavelabs.sb.request.ModuleCloneRequest;
import com.wavelabs.sb.request.SaveFeatureTemplateRequest;
import com.wavelabs.sb.request.ScreenFieldsRequest;
import com.wavelabs.sb.request.UpdateScreenRequest;

public class ScreenBuilderMapper {

    public static FetchRecordsResponse getFetchAllSubmodResponse(List<SubModules> submoduleList) {

	List<FetchAllSubmodResponse> subModList = new ArrayList<>();
	submoduleList.stream().forEach(subMod -> {
	    FetchAllSubmodResponse response = new FetchAllSubmodResponse();
	    response.setId(subMod.getId());
	    response.setName(subMod.getName());
	    response.setIcon(subMod.getIconUrl());
	    response.setModuleId(subMod.getModuleId());
	    response.setRoles(
		    subMod.getRoles() != null
			    ? subMod.getRoles().stream().filter(role -> !role.isDeleted())
				    .map(roleInfo -> getRoleInfo(roleInfo)).collect(Collectors.toList())
			    : new ArrayList<>());
	    response.setStatus(subMod.getStatus().name());
	    subModList.add(response);
	});


	// List<FetchAllCustomColumnResponse> subModList1 = new ArrayList<>();
	// submoduleList.stream().forEach(subMod -> {
	//     FetchAllCustomColumnResponse response = new FetchAllCustomColumnResponse();
	//     response.setId(subMod.getId());
	//     response.setName(subMod.getName());
	//     response.setIcon(subMod.getIconUrl());
	//     response.setModuleId(subMod.getModuleId());
	//     response.setRoles(
	// 	    subMod.getRoles() != null
	// 		    ? subMod.getRoles().stream().filter(role -> !role.isDeleted())
	// 			    .map(roleInfo -> getRoleInfo(roleInfo)).collect(Collectors.toList())
	// 		    : new ArrayList<>());
	//     response.setStatus(subMod.getStatus().name());
	// 	response.setType("COLUMN");
	//     subModList1.add(response);
	// });

	FetchRecordsResponse response = new FetchRecordsResponse();
	response.setData(subModList);
	response.setTotal(subModList.size());
	return response;

    }

    public static RoleInfo getRoleInfo(RoleOnboardingDetails role) {
	RoleInfo roleInfo = new RoleInfo();
	roleInfo.setId(role.getId());
	roleInfo.setRole(role.getRole());
	return roleInfo;
    }

    public static SubModules getBasicSubmodule(AddSubmoduleRequest request, String createdModifiedBy,
	    long colorPriority) {
	SubModules subModules = new SubModules();
	subModules.setIconUrl(request.getIcon());
	subModules.setModuleId(request.getModuleId());
	subModules.setClientId(request.getClientId());
	subModules.setCreatedBy(createdModifiedBy);
	subModules.setModifiedBy(createdModifiedBy);
	subModules.setCreatedAt(Instant.now());
	subModules.setModifiedAt(Instant.now());
	subModules.setName(request.getName());
	subModules.setStatus(Status.ACTIVE);
	subModules.setColorPriority(colorPriority);
	return subModules;
    }

    public static SubModules getBasicSubmodule(ModuleCloneRequest request, String createdModifiedBy) {
	SubModules subModules = new SubModules();
	subModules.setIconUrl(request.getModuleIcon());
	subModules.setModuleId(request.getParentModuleId());
	subModules.setClientId(request.getClientId());
	subModules.setCreatedBy(createdModifiedBy);
	subModules.setModifiedBy(createdModifiedBy);
	subModules.setCreatedAt(Instant.now());
	subModules.setModifiedAt(Instant.now());
	subModules.setName(request.getModuleName());
	subModules.setStatus(Status.ACTIVE);
	return subModules;
    }

    public static Screen getScreenMapper(CreateScreenRequest request, String createdModifiedBy) {
	Screen screen = new Screen();
	screen.setClientId(request.getClientId());
	screen.setCreatedAt(Instant.now());
	screen.setForm(request.getForm());
	screen.setModifiedAt(Instant.now());
	screen.setCreatedBy(createdModifiedBy);
	screen.setModifiedBy(createdModifiedBy);
	screen.setModuleId(request.getModuleId());
	screen.setStatus(Status.ACTIVE);
	screen.setSubModuleId(request.getSubmoduleId());
	screen.setName(request.getName());
	return screen;
    }

    public static Screen getScreenMapper(Screen screen, ModuleCloneRequest request, String submoduleId,
	    String createdModifiedBy) {
	Screen screen2 = new Screen();
	screen2.setClientId(request.getClientId());
	screen2.setCreatedAt(Instant.now());
	screen2.setCreatedBy(createdModifiedBy);
	screen2.setModifiedBy(createdModifiedBy);
	screen2.setForm(screen.getForm());
	screen2.setModifiedAt(Instant.now());
	screen2.setModuleId(request.getParentModuleId());
	screen2.setStatus(Status.ACTIVE);
	screen2.setSubModuleId(submoduleId);
	screen2.setName(screen.getName());
	return screen2;
    }

    public static Screen updateScreenMapper(UpdateScreenRequest request, Screen screen, String createdByModifiedBy) {
	screen.setForm(request.getForm());
	screen.setModifiedAt(Instant.now());
	screen.setModifiedBy(createdByModifiedBy);
	screen.setModuleId(request.getModuleId());
	screen.setSubModuleId(request.getSubmoduleId());
	screen.setClientId(request.getClientId());
	screen.setName(request.getName());
	return screen;
    }

    public static ScreenFields getScreenFieldsMapper(ScreenFields screenFields, ScreenFieldsRequest request,
	    Screen screen) {
	if (screenFields == null) {
	    screenFields = new ScreenFields();
	    screenFields.setCreatedAt(Instant.now());
	    screenFields.setModuleId(screen.getModuleId());
	    screenFields.setScreenId(screen.getId());
	    screenFields.setSubModuleId(screen.getSubModuleId());
	    screenFields.setClientId(screen.getClientId());
	}
	BeanUtils.copyProperties(request, screenFields);
	screenFields.setComponentHint(request.getHint());
	screenFields.setFilterable(request.isFiltered());
	screenFields.setModifiedAt(Instant.now());
	screenFields.setVisibleontable(request.isVisibleOnTable());
	screenFields.setComponentType(request.getType());
	screenFields.setComponentValues(request.getValues());
	return screenFields;
    }

    public static ScreenFields getScreenFieldsMapper(ScreenFields screenField, Screen screen, String createdBy) {
	ScreenFields screenFields = new ScreenFields();
	BeanUtils.copyProperties(screenField, screenFields);
	screenFields.setId(null);
	screenFields.setCreatedAt(Instant.now());
	screenFields.setModuleId(screen.getModuleId());
	screenFields.setScreenId(screen.getId());
	screenFields.setSubModuleId(screen.getSubModuleId());
	screenFields.setClientId(screen.getClientId());
	screenFields.setModifiedAt(Instant.now());
	screenFields.setCreatedBy(createdBy);
	screenFields.setModifiedBy(createdBy);
	return screenFields;
    }

    public static FeatureTemplate getFeatureTemplate(SaveFeatureTemplateRequest request, String createdModifiedBy) {
	FeatureTemplate featureTemplate = new FeatureTemplate();
	featureTemplate.setClientId(request.getClientId());
	featureTemplate.setCreatedAt(Instant.now());
	featureTemplate.setCreatedBy(createdModifiedBy);
	featureTemplate.setForm(request.getForm());
	featureTemplate.setModifiedAt(Instant.now());
	featureTemplate.setModifiedBy(createdModifiedBy);
	featureTemplate.setStatus(Status.ACTIVE);
	featureTemplate.setName(request.getName());
	return featureTemplate;

    }

    public static FetchFormResponse getFetchFormResponse(Screen screen) {
	FetchFormResponse formResponse = new FetchFormResponse();
	formResponse.setName(screen.getName());
	formResponse.setModuleId(screen.getModuleId());
	formResponse.setSubModuleId(screen.getSubModuleId() != null ? screen.getSubModuleId() : null);
	formResponse.setSubModuleName(screen.getSubModuleId() != null ? screen.getSubModuleId() : null);
	formResponse.setClientId(screen.getClientId());
	if (screen.getForm() != null) {
	    formResponse.setForm(screen.getForm());
	} else {
	    formResponse.setForm(new ArrayList<>());
	}
	return formResponse;
    }

    public static Module getModule(CreateModuleRequest request, String createdModifiedBy, long colorPriority) {
	Module module = new Module();
	module.setClientId(request.getClientId());
	module.setCreatedAt(Instant.now());
	module.setCreatedBy(createdModifiedBy);
	module.setModifiedBy(createdModifiedBy);
	module.setDeleted(false);
	module.setIconUrl(request.getIcon());
	module.setModifiedAt(Instant.now());
	module.setName(request.getName());
	module.setStatus(Status.ACTIVE);
	module.setColorPriority(colorPriority);
	return module;
    }

    public static ColumnsResponse getColumn(String componentId, String componentHint, String type) {
	ColumnsResponse column = new ColumnsResponse();
	column.setComponentId(componentId);
	column.setHint(componentHint);
	column.setType(type);
	return column;
    }

    public static FiltersResponse getFilter(ScreenFields filed) {
	FiltersResponse filter = new FiltersResponse();
	filter.setComponentId(filed.getComponentId());
	filter.setHint(filed.getComponentHint());
	filter.setType(filed.getComponentType());
	filter.setValues(filed.getComponentValues());
	return filter;
    }

    public static List<FiltersResponse> getCommonFilters() {
	List<FiltersResponse> filters = new ArrayList<>();
	FiltersResponse fromFilter = new FiltersResponse();
	fromFilter.setComponentId(CollectionConstants.FROM_DATE_COMPONENTID);
	fromFilter.setHint(CollectionConstants.FROM_DATE_HINT);
	fromFilter.setType(CollectionConstants.FROM_DATE_TYPE);
	filters.add(fromFilter);
	FiltersResponse toFilter = new FiltersResponse();
	toFilter.setComponentId(CollectionConstants.TO_DATE_COMPONENTID);
	toFilter.setHint(CollectionConstants.TO_DATE_HINT);
	toFilter.setType(CollectionConstants.TO_DATE_TYPE);
	filters.add(toFilter);
	return filters;
    }

    public static List<FiltersResponse> getMappedByFilters() {
	List<FiltersResponse> filters = new ArrayList<>();
	FiltersResponse employeeFilter = new FiltersResponse();
	employeeFilter.setComponentId(CollectionConstants.EMPLOYEE_ID);
	employeeFilter.setHint(CollectionConstants.EMP_ID);
	employeeFilter.setType(CollectionConstants.DROPDOWN);
	filters.add(employeeFilter);
	FiltersResponse userNameFilter = new FiltersResponse();
	userNameFilter.setComponentId(CollectionConstants.USER_NAME);
	userNameFilter.setHint(CollectionConstants.EMP_NAME);
	userNameFilter.setType(CollectionConstants.DROPDOWN);
	filters.add(userNameFilter);
	FiltersResponse roleFilter = new FiltersResponse();
	roleFilter.setComponentId(CollectionConstants.ROLE);
	roleFilter.setHint(CollectionConstants.EMP_ROLE);
	roleFilter.setType(CollectionConstants.DROPDOWN);
	filters.add(roleFilter);
	return filters;
    }

    public static List<ColumnsResponse> getMappedByColumns() {
	List<ColumnsResponse> filters = new ArrayList<>();
	ColumnsResponse fromFilter = new ColumnsResponse();
	fromFilter.setComponentId(CollectionConstants.CREATED_AT);
	fromFilter.setHint(CollectionConstants.CREATED_DATE);
	filters.add(fromFilter);
	ColumnsResponse employeeFilter = new ColumnsResponse();
	employeeFilter.setComponentId(CollectionConstants.EMPLOYEE_ID);
	employeeFilter.setHint(CollectionConstants.EMP_ID);
	filters.add(employeeFilter);
	ColumnsResponse userNameFilter = new ColumnsResponse();
	userNameFilter.setComponentId(CollectionConstants.USER_NAME);
	userNameFilter.setHint(CollectionConstants.EMP_NAME);
	filters.add(userNameFilter);
	ColumnsResponse statusFilter = new ColumnsResponse();
	statusFilter.setComponentId(CollectionConstants.ROLES);
	statusFilter.setHint(CollectionConstants.EMP_ROLE);
	filters.add(statusFilter);
	return filters;
    }

    public static ReportColumnsResponse getColumns(ScreenFields filed) {
	ReportColumnsResponse filter = new ReportColumnsResponse();
	filter.setColumnId(filed.getComponentId());
	filter.setColumnName(filed.getComponentHint());
	filter.setColumnType(filed.getComponentType());
	filter.setStatus(filed.getStatus());
	filter.setSubModuleId(filed.getSubModuleId());
	return filter;
    }

	public static CustomResponse getCustomColumnsResponse(ScreenFields filed){
		CustomResponse filter = new CustomResponse();
	filter.setId(filed.getComponentId());
	filter.setName(filed.getComponentHint());
	filter.setType("COLUMN");
	return filter;
	}

    public static ScreenWorkFlow getCloneWorkflow(ModuleCloneRequest request, List<ScreenFlows> screenFlows,
	    String submoduleId, String createdByModifiedBy) {
	ScreenWorkFlow workFlow = new ScreenWorkFlow();
	workFlow.setCreatedAt(Instant.now());
	workFlow.setClientId(request.getClientId());
	workFlow.setDeleted(false);
	workFlow.setModifiedAt(Instant.now());
	workFlow.setStatus(Status.ACTIVE);
	workFlow.setScreenFlows(screenFlows);
	workFlow.setSubModuleId(submoduleId);
	workFlow.setModuleId(request.getParentModuleId());
	workFlow.setCreatedBy(createdByModifiedBy);
	workFlow.setModifiedBy(createdByModifiedBy);
	return workFlow;
    }

    public static String getRoles(List<RoleOnboardingDetails> roles) {

	if (roles != null && !roles.isEmpty()) {
	    return String.join(",", roles.stream().filter(role -> !role.isDeleted()).map(RoleOnboardingDetails::getRole)
		    .collect(Collectors.toList()));
	}
	return null;
    }

    public static UserModulesResponse getUserModules(List<Module> modulesList, List<SubModules> subModuleList,
	    List<ReportConfigurations> reports, List<ChartDetails> charts) {
	UserModulesResponse response = new UserModulesResponse();
	List<ModulesInfo> modules = new ArrayList<>();
	List<ChartInfo> chartsList = new ArrayList<>();
	modulesList.forEach(module -> {
	    ModulesInfo info = new ModulesInfo();
	    info.setId(module.getId());
	    info.setIconId(module.getIconUrl());
	    info.setName(module.getName());
	    info.setIconMobile(getIconUrl(module.getIconUrl()));
	    long subCount = subModuleList.stream().filter(subModule -> subModule.getModuleId().equals(module.getId())
		    && !subModule.isDeleted() && Status.ACTIVE.equals(subModule.getStatus())).count();
	    long repCount = reports.stream().filter(report -> !report.isDeleted()
		    && Status.ACTIVE.equals(report.getStatus()) && report.getModule().getId().equals(module.getId()))
		    .count();
	    info.setSubModulesCount(subCount + repCount);
	    modules.add(info);
	});
	if (charts != null) {
	    charts = charts.stream().sorted(Comparator.comparing(ChartDetails::getPriority))
		    .collect(Collectors.toList());
	    charts.forEach(chart -> {
		if (chart.isDesktop()) {
		    ChartInfo info = new ChartInfo();
		    info.setId(chart.getId());
		    info.setName(chart.getName());
		    info.setType(chart.getType());
		    info.setFilters(chart.getFilters());
		    chartsList.add(info);
		}
	    });
	}
	response.setCharts(chartsList);
	response.setModules(modules);
	return response;
    }

    public static String getIconUrl(String iconUrl) {
	return StringUtils.isBlank(iconUrl) ? null
		: iconUrl.replace(CollectionConstants.UNDERSCORE, CollectionConstants.HYPHEN);
    }

	public static DynamicMappingResponse getDynamicMapping(SiteOnboarding siteOnboarding) {
		DynamicMappingResponse dm = new DynamicMappingResponse();
		
		dm.setKey(siteOnboarding.getSiteId());
		dm.setLabel(siteOnboarding.getName());
		dm.setValue(siteOnboarding.getName());
		
		return dm;
	}
}
