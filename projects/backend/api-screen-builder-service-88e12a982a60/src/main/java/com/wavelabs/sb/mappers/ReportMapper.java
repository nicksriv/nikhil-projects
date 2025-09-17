package com.wavelabs.sb.mappers;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.CustomColumns;
import com.wavelabs.sb.documents.CustomOperation;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.ReportColumns;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.ReportColumnRequestModel;
import com.wavelabs.sb.model.ReportConfigurationModel;
import com.wavelabs.sb.request.AddReportRequest;
import com.wavelabs.sb.request.CreateReportRequest;
import com.wavelabs.sb.request.ReportsRequest;
import com.wavelabs.sb.request.UpdateReportRequest;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.CustomColumnsInfo;
import com.wavelabs.sb.response.CustomOperationResponse;
import com.wavelabs.sb.response.FetchReportResponse;
import com.wavelabs.sb.response.ModuleReportResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.ReportResponse;
import com.wavelabs.sb.response.SubModulesInfo;

public class ReportMapper {

	public static ReportConfigurations getReportConfigurations(CreateReportRequest request, Module module,
			String createdBy) {
		ReportConfigurations configurations = new ReportConfigurations();
		BeanUtils.copyProperties(request, configurations);
		configurations.setCreatedAt(Instant.now());
		configurations.setModifiedAt(Instant.now());
		configurations.setModule(module);
		configurations.setDeleted(false);
		configurations.setStatus(Status.ACTIVE);
		configurations.setCreatedBy(createdBy);
		configurations.setModifiedBy(createdBy);
		return configurations;
	}

	public static ReportsRequest get(Optional<String> from, Optional<String> to, Optional<String> sites, String id) {
		ReportsRequest request = new ReportsRequest();
		request.setId(id);

		request.setFrom(from.isPresent() ? from.get() : null);
		request.setTo(to.isPresent() ? to.get() : null);
		sites.ifPresent(site -> {
			String[] split = site.split(",");
			List<String> collect = Arrays.asList(split).stream().filter(siteId -> !siteId.isEmpty())
					.collect(Collectors.toList());
			request.setSites(collect);
		});
		return request;
	}

	public static ReportConfigurations updateReportConfigurations(ReportConfigurations configurations,
			UpdateReportRequest request, Module module, List<SubModules> subModules, List<RoleOnboardingDetails> roles,
			String modifiedBy) {
		BeanUtils.copyProperties(request, configurations);
		configurations.setModifiedAt(Instant.now());
		configurations.setModule(module);
		configurations.setSubModules(subModules);
		configurations.setFilters(request.getFilter());
		configurations.setRoles(roles);
		configurations.setModifiedBy(modifiedBy);
		configurations
				.setStatus(request.getStatus() != null ? Status.valueOf(request.getStatus().toUpperCase()) : null);
		configurations.setCustomColumns(request.getCustomColumns() != null ? request.getCustomColumns().stream()
				.map(column -> getCustomColumns(column)).collect(Collectors.toList()) : new ArrayList<>());
		return configurations;
	}

	private static CustomColumns getCustomColumns(com.wavelabs.sb.request.CustomColumns column) {
		CustomColumns columns = new CustomColumns();
		BeanUtils.copyProperties(column, columns);
		CustomOperation first = new CustomOperation();
		BeanUtils.copyProperties(column.getFirst(), first);
		columns.setFirst(first);
		CustomOperation second = new CustomOperation();
		BeanUtils.copyProperties(column.getSecond(), second);
		columns.setSecond(second);
		return columns;
	}

	public static FetchReportResponse fetchReportResponse(ReportConfigurations reportConfigurations,
			List<Hashtable<String, Object>> fetchReport, List<String> visibleColumns, List<ColumnsResponse> columns) {
		FetchReportResponse response = new FetchReportResponse();
		BeanUtils.copyProperties(reportConfigurations, response);
		response.setRoles(reportConfigurations.getRoles() != null
				? reportConfigurations.getRoles().stream().filter(role -> role != null && !role.isDeleted())
						.map(roleDetails -> ScreenBuilderMapper.getRoleInfo(roleDetails)).collect(Collectors.toList())
				: new ArrayList<>());
		response.setSubmoduleIds(
				reportConfigurations.getSubModules() != null
						? reportConfigurations.getSubModules().stream()
								.filter(submodule -> submodule != null && !submodule.isDeleted())
								.map(submodule -> getSubmodule(submodule)).collect(Collectors.toList())
						: new ArrayList<>());
		response.setCustomColumns(
				reportConfigurations.getCustomColumns() != null
						? reportConfigurations.getCustomColumns().stream().map(column -> getCustomColumnsInfo(column))
								.collect(Collectors.toList())
						: new ArrayList<>());
		response.setParentModuleId(reportConfigurations.getModule().getId());
		response.setStatus(
				reportConfigurations.getStatus() != null ? reportConfigurations.getStatus().toString() : null);
		response.setFilter(
				reportConfigurations.getFilters() != null ? reportConfigurations.getFilters() : new ArrayList<>());
		response.setReport(getReport(fetchReport, columns));
		response.setVisibleColumns(visibleColumns);
		return response;
	}

	private static CustomColumnsInfo getCustomColumnsInfo(CustomColumns column) {
		CustomColumnsInfo columns = new CustomColumnsInfo();
		BeanUtils.copyProperties(column, columns);
		CustomOperationResponse first = new CustomOperationResponse();
		BeanUtils.copyProperties(column.getFirst(), first);
		columns.setFirst(first);
		CustomOperationResponse second = new CustomOperationResponse();
		BeanUtils.copyProperties(column.getSecond(), second);
		columns.setSecond(second);
		return columns;
	}

	private static SubModulesInfo getSubmodule(SubModules submodule) {
		SubModulesInfo info = new SubModulesInfo();
		info.setId(submodule.getId());
		info.setName(submodule.getName());
		return info;
	}

	public static PaginationResponse<ReportConfigurationModel> toFetchResponse(
			PaginationResponse<ReportConfigurations> fetchAllReports) {
		List<ReportConfigurations> allReports = fetchAllReports.getConfigurations();
		List<ReportConfigurationModel> responseList = allReports.stream()
				.map(report -> getReportConfigurationModel(report)).collect(Collectors.toList());
		PaginationResponse<ReportConfigurationModel> fetchAll = new PaginationResponse<>();
		fetchAll.setMessage(allReports.isEmpty() ? Constants.NO_RECORDS_FOUND : Constants.RECORDS_FETCHED_SUCCESSFULLY);
		fetchAll.setConfigurations(responseList);
		fetchAll.setTotal(fetchAllReports.getTotal());
		return fetchAll;
	}

	public static ReportConfigurationModel getReportConfigurationModel(ReportConfigurations report) {
		ReportConfigurationModel reportConfigurationModel = new ReportConfigurationModel();
		reportConfigurationModel.setId(report.getId());
		reportConfigurationModel.setName(report.getName());
		reportConfigurationModel.setStatus(report.getStatus().toString());
		reportConfigurationModel.setParentModuleName(report.getModule().getName());
		reportConfigurationModel.setIcon(report.getIcon());
		return reportConfigurationModel;
	}

	public static ModuleReportResponse getModuleReports(List<ReportConfigurations> reports) {
		ModuleReportResponse response = new ModuleReportResponse();
		List<ReportResponse> reportsList = new ArrayList<>();
		reports.forEach(report -> {
			ReportResponse reportResponse = new ReportResponse();
			reportResponse.setIcon(report.getIcon());
			reportResponse.setId(report.getId());
			reportResponse.setName(report.getName());
			reportResponse.setFilters(report.getFilters());
			reportsList.add(reportResponse);
		});
		response.setReports(reportsList);
		return response;
	}

	public static ReportColumns getReportColumns(ReportColumnRequestModel model, ReportColumns columns) {

		if (columns == null) {
			columns = new ReportColumns();
			columns.setCreatedAt(Instant.now());
			columns.setCreatedBy(model.getDetails().getId());
		}
		columns.setDeleted(false);
		columns.setModifiedAt(Instant.now());
		columns.setModifiedBy(model.getDetails().getId());
		columns.setReportId(model.getReportId());
		columns.setStatus(Status.ACTIVE);
		columns.setColumns(model.getRequest().getColumns());
		return columns;
	}

	public static List<LinkedHashMap<String, Object>> getReport(List<Hashtable<String, Object>> dataList,
			ReportColumns columns, List<ColumnsResponse> reColumns) {
		if (columns != null && columns.getColumns() != null && !columns.getColumns().isEmpty()) {
			List<LinkedHashMap<String, Object>> response = new ArrayList<>();
			if (!dataList.isEmpty()) {
				dataList.forEach(data -> {
					LinkedHashMap<String, Object> hashtable = new LinkedHashMap<>();
					data.entrySet().forEach(report -> {
						reColumns.forEach(column -> {
							boolean isMatched = columns.getColumns().stream()
									.anyMatch(column.getComponentId()::equalsIgnoreCase);
							if (isMatched && data.get(column.getComponentId()) != null) {
								hashtable.put(column.getComponentId(), data.get(column.getComponentId()));
							}
						});
					});
					if (hashtable != null) {
						response.add(hashtable);
					}
				});
			}
			return response;
		} else {
			List<LinkedHashMap<String, Object>> response = new ArrayList<>();
			if (!dataList.isEmpty()) {
				dataList.forEach(data -> {
					LinkedHashMap<String, Object> hashtable = new LinkedHashMap<>();
					data.entrySet().forEach(report -> {
						hashtable.put(report.getKey(), report.getValue());
					});
					if (hashtable != null) {
						response.add(hashtable);
					}
				});
			}
			return response;
		}
	}

	public static List<LinkedHashMap<String, Object>> getReport(List<Hashtable<String, Object>> dataList,
			List<ColumnsResponse> columns) {
		if (columns != null && !columns.isEmpty()) {
			List<LinkedHashMap<String, Object>> response = new ArrayList<>();
			if (!dataList.isEmpty()) {
				dataList.forEach(data -> {
					LinkedHashMap<String, Object> hashtable = new LinkedHashMap<>();
					columns.forEach(column -> {
						if (data.get(column.getComponentId()) != null) {
							hashtable.put(column.getComponentId(), data.get(column.getComponentId()));
						}
					});

					if (hashtable != null) {
						response.add(hashtable);
					}
				});
			}
			return response;
		} else {
			List<LinkedHashMap<String, Object>> response = new ArrayList<>();
			if (!dataList.isEmpty()) {
				dataList.forEach(data -> {
					LinkedHashMap<String, Object> hashtable = new LinkedHashMap<>();
					data.entrySet().forEach(report -> {
						hashtable.put(report.getKey(), report.getValue());
					});
					if (hashtable != null) {
						response.add(hashtable);
					}
				});
			}
			return response;
		}
	}

	public static ReportConfigurations addReportConfigurations(ReportConfigurations configurations,
			AddReportRequest request, Module module, List<SubModules> subModules, List<RoleOnboardingDetails> roles) {
		BeanUtils.copyProperties(request, configurations);
		configurations.setSubModules(subModules);
		configurations.setFilters(request.getFilter());
		configurations.setRoles(roles);
		configurations
				.setStatus(request.getStatus() != null ? Status.valueOf(request.getStatus().toUpperCase()) : null);
		return configurations;
	}

	public static ReportConfigurations addCustom(ReportConfigurations configurations,
			com.wavelabs.sb.request.CustomColumnsConfigurations request) {

		BeanUtils.copyProperties(request, configurations);

		configurations.setCustomColumns(request.getCustomColumns() != null ? request.getCustomColumns().stream()
				.map(column -> getCC(column)).collect(Collectors.toList()) : new ArrayList<>());

		return configurations;
	}

	public static ReportConfigurations updateCustom(ReportConfigurations configurations,
			com.wavelabs.sb.request.CustomColumnsConfigurations request) {
		configurations.setCustomColumns(request.getCustomColumns() != null ? request.getCustomColumns().stream()
				.map(column -> getCC(column)).collect(Collectors.toList()) : new ArrayList<>());
		return configurations;

	}

	private static CustomColumns getCC(CustomColumns column) {
		CustomColumns columns = new CustomColumns();
		BeanUtils.copyProperties(column, columns);
		CustomOperation first = new CustomOperation();
		BeanUtils.copyProperties(column.getFirst(), first);
		columns.setFirst(first);
		CustomOperation second = new CustomOperation();
		BeanUtils.copyProperties(column.getSecond(), second);
		columns.setSecond(second);
		return columns;
	}
}
