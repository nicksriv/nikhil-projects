package com.wavelabs.sb.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.documents.ScreenFields;
import com.wavelabs.sb.mappers.ScreenBuilderMapper;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.request.FetchColumnsRequest;
import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.response.ColumnsAndFiltersResponse;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.FetchColumnsResponse;
import com.wavelabs.sb.response.FiltersResponse;
import com.wavelabs.sb.response.ReportColumnsResponse;

@Service
public class ColumnsAndFiltersService {

    private final static Logger LOGGER = LoggerFactory.getLogger(ColumnsAndFiltersService.class);

    @Autowired
    ScreenFieldsRepository screenFieldsRepository;

    @Autowired
    ScreenBuilderService screenBuilderService;

    public ColumnsAndFiltersResponse fetechColumnsAndFilters(FormRequest request) {
	LOGGER.info("fetechColumnsAndFilters method started");
	screenBuilderService.getModule(request.getModuleId());
	List<ScreenFields> screenFields = new ArrayList<>();
	if (!StringUtils.isBlank(request.getSubmoduleId())) {
	    if (StringUtils.isBlank(request.getMappedBy())) {
		screenBuilderService.getSubModule(request.getSubmoduleId());
		screenFields = screenFieldsRepository.findAllByModuleIdAndSubModuleIdAndDeleted(request.getModuleId(),
			request.getSubmoduleId(), false);
	    } else {
		screenBuilderService.getSubModule(request.getSubmoduleId());
		screenBuilderService.getSubModule(request.getMappedBy());
		screenFields = screenFieldsRepository.findAllByModuleIdAndSubModuleIdAndDeleted(request.getModuleId(),
			request.getMappedBy(), false);
	    }
	}
	List<FiltersResponse> filters = new ArrayList<>();
	List<ColumnsResponse> columns = new ArrayList<>();
	if (!StringUtils.isBlank(request.getMappedBy())) {
	    filters.addAll(ScreenBuilderMapper.getMappedByFilters());
	    columns.addAll(ScreenBuilderMapper.getMappedByColumns());
	}
	screenFields.forEach(filed -> {
	    if (filed.isVisibleontable()) {
		columns.add(ScreenBuilderMapper.getColumn(filed.getComponentId(), filed.getComponentHint(),filed.getComponentType()));
	    }
	    if (filed.isFilterable()) {
		filters.add(ScreenBuilderMapper.getFilter(filed));
	    }
	});
	filters.addAll(ScreenBuilderMapper.getCommonFilters());
	ColumnsAndFiltersResponse response = new ColumnsAndFiltersResponse();
	response.setColumns(columns);
	response.setFilters(filters);
	LOGGER.info("fetechColumnsAndFilters method ended");
	return response;
    }

    public FetchColumnsResponse fetchAllColumns(FetchColumnsRequest request) {
	screenBuilderService.getModule(request.getModuleId());
	List<ScreenFields> screenFields = new ArrayList<>();
	FetchColumnsResponse response = new FetchColumnsResponse();
	if (request.getSubmoduleIds() != null && !request.getSubmoduleIds().isEmpty()) {
	    request.getSubmoduleIds().forEach(subMod -> screenBuilderService.getSubModule(subMod));
	    screenFields = screenFieldsRepository.findByModuleIdAndSubModuleIdInAndDeleted(request.getModuleId(),
		    request.getSubmoduleIds(), false);
	}
	List<ReportColumnsResponse> columns = !screenFields.isEmpty() ? screenFields.stream()
		.map(screen -> ScreenBuilderMapper.getColumns(screen)).collect(Collectors.toList()) : new ArrayList<>();
	response.setColumns(columns);
	return response;
    }

}
