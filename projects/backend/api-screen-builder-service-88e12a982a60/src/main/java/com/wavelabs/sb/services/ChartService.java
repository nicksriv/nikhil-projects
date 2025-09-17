package com.wavelabs.sb.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ChartDetails;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.DataBaseDownException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.ChartMapper;
import com.wavelabs.sb.model.ChartsPriorityRequestModel;
import com.wavelabs.sb.model.CreateChartModel;
import com.wavelabs.sb.model.FetchReportChartsByModuleIdModel;
import com.wavelabs.sb.model.UpdateChartModel;
import com.wavelabs.sb.repository.ChartDetailsRepository;
import com.wavelabs.sb.repository.ReportConfigurationsRepository;
import com.wavelabs.sb.request.ChartsPriorityRequest;
import com.wavelabs.sb.request.ReportsRequest;
import com.wavelabs.sb.response.ChartsResponse;
import com.wavelabs.sb.response.ModuleChartsResponse;
import com.wavelabs.sb.response.SuccessResponse;

@Service
public class ChartService {
	private static final Logger LOGGER = LoggerFactory.getLogger(ChartService.class);

	@Autowired
	ChartDetailsRepository chartDetailsRepository;

	@Autowired
	ReportConfigurationsRepository reportConfigurationsRepository;
	@Autowired
	ScreenBuilderService screenBuilderService;

	@Autowired
	DynamicReportsGenrationService dynamicReportGenration;

	@Autowired
	ReportService reportService;

	public SuccessResponse createChart(CreateChartModel createChartModel) {
		LOGGER.info("Create Chart method started");
		ChartDetails chartDetails = ChartMapper.getChartDetails(createChartModel);
		Optional<ReportConfigurations> reportConfigurations = reportConfigurationsRepository
				.findById(createChartModel.getCreateChartRequest().getReportConfigurationId());
		if (!reportConfigurations.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.REPORT_DOES_NOT_EXISTS);
		}
		chartDetails.setReportId(reportConfigurations.get().getId());
		try {
			chartDetailsRepository.save(chartDetails);
		} catch (Exception e) {
			throw new DataBaseDownException(ErrorMessages.DATA_BASE_DOWN);
		}
		LOGGER.info("Create Chart method ended");
		return new SuccessResponse(chartDetails.getId(), Constants.CHART_HAS_BEEN_CREATED_SUCCESSFULLY);
	}

	public SuccessResponse updateChart(UpdateChartModel updateChartModel) {
		LOGGER.info("update chart method started");
		Optional<ChartDetails> chartOptional = chartDetailsRepository
				.findByIdAndDeletedAndStatus(updateChartModel.getId(), false, Status.ACTIVE);
		if (!chartOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.CHART_DOES_NOT_EXIST);
		}
		ChartDetails existingChartDetails = chartOptional.get();
		try {
			chartDetailsRepository.save(ChartMapper.updateChartDetails(updateChartModel, existingChartDetails));
		} catch (Exception e) {
			throw new DataBaseDownException(ErrorMessages.DATA_BASE_DOWN);
		}
		LOGGER.info("update chart method ended");
		return new SuccessResponse(existingChartDetails.getId(), Constants.CHART_HAS_BEEN_UPDATED_SUCCESSFULLY);
	}

	public ChartsResponse fetchAllCharts(String reportConfigurationId) {
		LOGGER.info("fetchAllCharts method started");
		Optional<ReportConfigurations> reportConfigurations = reportConfigurationsRepository
				.findById(reportConfigurationId);
		if (reportConfigurations.isPresent()) {
			ReportConfigurations reportConfiguration = reportConfigurations.get();
			ChartsResponse chartDetails = new ChartsResponse();
			if (reportConfiguration.getSubModules() != null && !reportConfiguration.getSubModules().isEmpty()
			// commented for future reference		
			// && !reportConfiguration.getCustomColumns().isEmpty()
					) {
				// TODO fetch reports information.
				ReportsRequest reportsRequest = new ReportsRequest();
				reportsRequest.setId(reportConfigurationId);
				List<Hashtable<String, Object>> fetchReport = new ArrayList<>();
				try {
					fetchReport = dynamicReportGenration.fetchReport(reportsRequest);
				} catch (Exception exception) {
					LOGGER.info("Exception occured while gerenerating report:: {}", exception.getMessage());
				}
				chartDetails.setCharts(fetchReport);
			} else {
				chartDetails.setCharts(Collections.emptyList());
			}
			List<ChartDetails> allCharts = chartDetailsRepository
					.findByReportIdAndDeletedAndStatus(reportConfigurationId, false, Status.ACTIVE);
			chartDetails.setMessage("Records fetched successfully");
			chartDetails.setData(allCharts.stream().sorted(Comparator.comparing(ChartDetails::getPriority))
					.collect(Collectors.toList()));
			LOGGER.info("fetchAllCharts method ended");
			return chartDetails;
		} else {
			return null;
		}
	}

	public ModuleChartsResponse fetchChart(ReportsRequest chartRequest) {
		LOGGER.info("fetchChart method started");
		Optional<ChartDetails> chartOptional = chartDetailsRepository
				.findByIdAndDeletedAndStatus(chartRequest.getChartId(), false, Status.ACTIVE);
		if (!chartOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.CHART_DOES_NOT_EXIST);
		}
		chartRequest.setId(chartOptional.get().getReportId());
		List<Hashtable<String, Object>> fetchReport = new ArrayList<>();
		try {
			fetchReport = dynamicReportGenration.fetchReport(chartRequest);
		} catch (Exception exception) {
			LOGGER.info("Exception occured while gerenerating report:: {}", exception.getMessage());
		}
		ModuleChartsResponse fetchChart = ChartMapper.fetchChart(chartOptional, fetchReport, reportService
				.fetchReportColumns(ChartMapper.getReportColumnsRequest(chartOptional.get().getReportId())));
		LOGGER.info("fetchChart method ended");
		return fetchChart;
	}

	public List<ChartDetails> fecthModuleCharts(FetchReportChartsByModuleIdModel model) {
		LOGGER.info("fecthModuleCharts method started");
		screenBuilderService.getModule(model.getModuleId());
		Users user = screenBuilderService.getUser(model.getDetails().getId());
		List<ObjectId> rolesObjIdsList = screenBuilderService.getRoleObjIds(user.getRoles());
		List<ReportConfigurations> reports = reportConfigurationsRepository.findByModuleIdAndStatusAndDeletedAndRolesIn(
				new ObjectId(model.getModuleId()), Status.ACTIVE, false, rolesObjIdsList);
		List<String> reportIds = reports.stream().map(ReportConfigurations::getId).collect(Collectors.toList());
		List<ChartDetails> charts = chartDetailsRepository.findByReportIdInAndStatusAndDeleted(reportIds, Status.ACTIVE,
				false);
		LOGGER.info("fecthModuleCharts method ended");
		return charts;
	}

	public Hashtable<String, List<Hashtable<String, Object>>> fetchAllReports(List<ChartDetails> charts) {
		Hashtable<String, List<Hashtable<String, Object>>> allReportsByModuleId = new Hashtable<>();
		charts.forEach(chart -> {
			if (!StringUtils.isAllEmpty(chart.getxAxis(), chart.getyAxis())) {
				List<Hashtable<String, Object>> hashtable = allReportsByModuleId.get(chart.getReportId());
				if (hashtable == null) {
					ReportsRequest reportsRequest = new ReportsRequest();
					reportsRequest.setId(chart.getReportId());
					List<Hashtable<String, Object>> fetchReport = new ArrayList<>();
					try {
						fetchReport = dynamicReportGenration.fetchReport(reportsRequest);
					} catch (Exception exception) {
						LOGGER.info("Exception occured while gerenerating report:: {}", exception.getMessage());
					}
					allReportsByModuleId.put(chart.getReportId(), fetchReport);
				}
			}
		});
		return allReportsByModuleId;
	}

	public SuccessResponse updateChartPriority(ChartsPriorityRequestModel model) {
		LOGGER.info("updateChartPriority method started");
		if (model.getRequest() == null || model.getRequest().isEmpty()) {
			throw new BadRequestException(ErrorMessages.PLEASE_PROIVED_VALID_REQUEST);
		}

		Optional<ReportConfigurations> reportConfigurations = reportConfigurationsRepository
				.findById(model.getReportId());
		if (!reportConfigurations.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.REPORT_DOES_NOT_EXISTS);
		}

		List<String> requestedChartIds = model.getRequest().stream().map(ChartsPriorityRequest::getChartId)
				.collect(Collectors.toList());
		List<ChartDetails> charts = chartDetailsRepository.findByIdInAndStatusAndDeleted(requestedChartIds,
				Status.ACTIVE, false);
		if (!charts.isEmpty() && requestedChartIds.size() != charts.size()) {
			List<String> chartIds = charts.stream().map(ChartDetails::getId).collect(Collectors.toList());
			String error = String.join(",",
					requestedChartIds.stream().filter(id -> !chartIds.contains(id)).collect(Collectors.toList()));
			if (!StringUtils.isBlank(error)) {
				LOGGER.info("get Charts :: Resource Not Found - Charts Not Found with these ids");
				throw new ResourceNotFoundException(ErrorMessages.CHARTS_NOT_FOUND_WITH_THESE_IDS + error);
			}
		}
		charts.forEach(chart -> {
			Optional<ChartsPriorityRequest> request = model.getRequest().stream()
					.filter(id -> id.getChartId().equals(chart.getId())).findFirst();
			if (request.isPresent()) {
				chart.setPriority(request.get().getPriority());
			}
		});
		chartDetailsRepository.saveAll(charts);
		LOGGER.info("updateChartPriority method ended");
		return new SuccessResponse(Constants.CHARTS_PRIORITY_UPDATED);
	}

	public List<ChartDetails> getChartsByReportId(String reportId) {
		List<ChartDetails> charts = chartDetailsRepository.findByReportId(reportId);
		if (charts.isEmpty() && charts.size() == 0) {
			throw new ResourceNotFoundException(ErrorMessages.CHARTS_NOT_FOUND_WITH_THE_REPORT_ID);
		}
		return charts;
	}

	public ChartDetails getChartsDetails(String chartId) {
		Optional<ChartDetails> chartsDetails = chartDetailsRepository.findById(chartId);

		if (!chartsDetails.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.CHARTS_NOT_FOUND_WITH_THE_REPORT_ID);
		}
		return chartsDetails.get();
	}

}
