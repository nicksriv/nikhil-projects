package com.wavelabs.sb.mappers;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ChartDetails;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.ChartsDataModel;
import com.wavelabs.sb.model.CreateChartModel;
import com.wavelabs.sb.model.FetchReportColumnsModel;
import com.wavelabs.sb.model.UpdateChartModel;
import com.wavelabs.sb.response.AxisInfo;
import com.wavelabs.sb.response.ChartsResponse;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.ListResponse;
import com.wavelabs.sb.response.ModuleChartsResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

public class ChartMapper {

    public static ChartDetails getChartDetails(CreateChartModel createChartModel) {
	ChartDetails chartDetails = new ChartDetails();
	BeanUtils.copyProperties(createChartModel.getCreateChartRequest(), chartDetails);
	chartDetails.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(createChartModel.getTokenPayLoadDetails()));
	chartDetails.setCreatedAt(Instant.now());
	chartDetails.setModifiedAt(Instant.now());
	chartDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(createChartModel.getTokenPayLoadDetails()));
	chartDetails.setDesktop(createChartModel.getCreateChartRequest().isShowOnDesktop());
	chartDetails.setRowColumn(createChartModel.getCreateChartRequest().isSwitchRowsAndcolumns());
	chartDetails.setDeleted(false);
	chartDetails.setStatus(Status.ACTIVE);
	chartDetails.setReportId(createChartModel.getCreateChartRequest().getReportConfigurationId());
	return chartDetails;
    }

    public static ChartDetails updateChartDetails(UpdateChartModel updateChartModel,
	    ChartDetails existingChartDetails) {
	existingChartDetails.setName(updateChartModel.getUpdateChartRequest().getName());
	existingChartDetails.setType(updateChartModel.getUpdateChartRequest().getType());
	existingChartDetails.setxAxis(updateChartModel.getUpdateChartRequest().getxAxis());
	existingChartDetails.setyAxis(updateChartModel.getUpdateChartRequest().getyAxis());
	existingChartDetails.setFilters(updateChartModel.getUpdateChartRequest().getFilters());
	existingChartDetails.setDesktop(updateChartModel.getUpdateChartRequest().isShowOnDesktop());
	existingChartDetails.setRowColumn(updateChartModel.getUpdateChartRequest().isSwitchRowsAndcolumns());
	existingChartDetails.setModifiedAt(Instant.now());
	existingChartDetails
		.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(updateChartModel.getTokenPayLoadDetails()));
	return existingChartDetails;
    }

    public static ListResponse<ChartsDataModel> fetchAllChartsResponse(ChartsResponse allChartDetails,
	    List<ColumnsResponse> columns) {

	List<ChartDetails> allCharts = allChartDetails.getData();
	List<Hashtable<String, Object>> charts = allChartDetails.getCharts();
	List<ChartsDataModel> responseList = new ArrayList<>();
	allCharts.forEach(chartDetails -> {
	    ChartsDataModel model = new ChartsDataModel();
	    model.setName(chartDetails.getName());
	    model.setType(chartDetails.getType());
	    Optional<ColumnsResponse> xAxisOptional = columns.stream()
		    .filter(column -> column.getComponentId().equalsIgnoreCase(chartDetails.getxAxis())).findFirst();
	    if (xAxisOptional.isPresent()) {
		model.setxAxis(getAxisInfo(xAxisOptional.get()));
	    } else {
		model.setxAxis(new AxisInfo(chartDetails.getxAxis(), null));
	    }
	    Optional<ColumnsResponse> yAxisOptional = columns.stream()
		    .filter(column -> column.getComponentId().equalsIgnoreCase(chartDetails.getyAxis())).findFirst();
	    if (yAxisOptional.isPresent()) {
		model.setyAxis(getAxisInfo(yAxisOptional.get()));
	    } else {
		model.setyAxis(new AxisInfo(chartDetails.getyAxis(), null));
	    }
	    model.setFilters(chartDetails.getFilters() != null ? chartDetails.getFilters() : new ArrayList<>());
	    model.setSwitchRowsAndColumns(chartDetails.isRowColumn());
	    model.setShowOnDesktop(chartDetails.isDesktop());
	    model.setCharts(getChartData(charts, chartDetails));
	    model.setId(chartDetails.getId());
	    model.setPriority(chartDetails.getPriority());
	    responseList.add(model);
	});
	ListResponse<ChartsDataModel> fetchAll = new ListResponse<>();
	fetchAll.setMessage(
		responseList.isEmpty() ? Constants.NO_RECORDS_FOUND : Constants.RECORDS_FETCHED_SUCCESSFULLY);
	fetchAll.setData(responseList);
	fetchAll.setSize(responseList != null ? responseList.size() : 0);
	return fetchAll;
    }

    public static AxisInfo getAxisInfo(ColumnsResponse axisOptional) {
	AxisInfo info = new AxisInfo();
	info.setComponentId(axisOptional.getComponentId());
	info.setHint(axisOptional.getHint());
	return info;
    }

    public static List<Hashtable<String, Object>> getChartData(List<Hashtable<String, Object>> charts,
	    ChartDetails chartDetails) {
	List<Hashtable<String, Object>> chartsData = new ArrayList<>();
	if (charts != null && !StringUtils.isAllEmpty(chartDetails.getxAxis(), chartDetails.getyAxis())) {
	    charts.stream().forEach(chartInfo -> {
		Hashtable<String, Object> chart = new Hashtable<>();
		if (chartInfo.containsKey(chartDetails.getxAxis()) && chartInfo.containsKey(chartDetails.getyAxis())) {
		    chart.put(chartDetails.getxAxis(), chartInfo.get(chartDetails.getxAxis()));
		    chart.put(chartDetails.getyAxis(), chartInfo.get(chartDetails.getyAxis()));
		    chartsData.add(chart);
		}
	    });
	}
	return chartsData;
    }

    public static ListResponse<ModuleChartsResponse> fetchAllModuleChartsResponse(List<ChartDetails> allCharts,
	    Hashtable<String, List<Hashtable<String, Object>>> fetchAllReports, List<ColumnsResponse> columns) {
	List<ModuleChartsResponse> responseList = allCharts.stream()
		.map(chartDetails -> getModuleChartsResponse(chartDetails, fetchAllReports, columns))
		.collect(Collectors.toList());
	responseList = responseList.stream().sorted(Comparator.comparing(ModuleChartsResponse::getPriority))
		.collect(Collectors.toList());
	ListResponse<ModuleChartsResponse> fetchAll = new ListResponse<>();
	fetchAll.setData(responseList);
	return fetchAll;
    }

    private static ModuleChartsResponse getModuleChartsResponse(ChartDetails chartDetails,
	    Hashtable<String, List<Hashtable<String, Object>>> fetchAllReports, List<ColumnsResponse> columns) {
	ModuleChartsResponse model = new ModuleChartsResponse();
	model.setName(chartDetails.getName());
	model.setType(chartDetails.getType());
	Optional<ColumnsResponse> xAxisOptional = columns.stream()
		.filter(column -> column.getComponentId().equalsIgnoreCase(chartDetails.getxAxis())).findFirst();
	if (xAxisOptional.isPresent()) {
	    model.setxAxis(getAxisInfo(xAxisOptional.get()));
	} else {
	    model.setxAxis(new AxisInfo(chartDetails.getxAxis(), null));
	}
	Optional<ColumnsResponse> yAxisOptional = columns.stream()
		.filter(column -> column.getComponentId().equalsIgnoreCase(chartDetails.getyAxis())).findFirst();
	if (yAxisOptional.isPresent()) {
	    model.setyAxis(getAxisInfo(yAxisOptional.get()));
	} else {
	    model.setyAxis(new AxisInfo(chartDetails.getyAxis(), null));
	}
	model.setId(chartDetails.getId());
	model.setFilters(chartDetails.getFilters());
	model.setSwitchRowsAndColumns(chartDetails.isRowColumn());
	model.setShowOnDesktop(chartDetails.isDesktop());
	model.setPriority(chartDetails.getPriority());
	List<Hashtable<String, Object>> chartData = getChartData(fetchAllReports.get(chartDetails.getReportId()),
		chartDetails);
	model.setCharts(chartData);
	return model;
    }

    public static ModuleChartsResponse fetchChart(Optional<ChartDetails> fetchChart,
	    List<Hashtable<String, Object>> fetchReport, List<ColumnsResponse> columns) {
	ChartDetails chartDetails = fetchChart.get();
	ModuleChartsResponse chartResponse = new ModuleChartsResponse();
	chartResponse.setId(chartDetails.getId());
	chartResponse.setName(chartDetails.getName());
	chartResponse.setType(chartDetails.getType());
	Optional<ColumnsResponse> xAxisOptional = columns.stream()
		.filter(column -> column.getComponentId().equalsIgnoreCase(chartDetails.getxAxis())).findFirst();
	if (xAxisOptional.isPresent()) {
	    chartResponse.setxAxis(getAxisInfo(xAxisOptional.get()));
	} else {
	    chartResponse.setxAxis(new AxisInfo(chartDetails.getxAxis(), null));
	}
	Optional<ColumnsResponse> yAxisOptional = columns.stream()
		.filter(column -> column.getComponentId().equalsIgnoreCase(chartDetails.getyAxis())).findFirst();
	if (yAxisOptional.isPresent()) {
	    chartResponse.setyAxis(getAxisInfo(yAxisOptional.get()));
	} else {
	    chartResponse.setyAxis(new AxisInfo(chartDetails.getyAxis(), null));
	}
	chartResponse.setFilters(chartDetails.getFilters() != null ? chartDetails.getFilters() : new ArrayList<>());
	chartResponse.setSwitchRowsAndColumns(chartDetails.isRowColumn());
	chartResponse.setShowOnDesktop(chartDetails.isDesktop());
	chartResponse.setCharts(getChartData(fetchReport, chartDetails));
	return chartResponse;
    }

    public static FetchReportColumnsModel getReportColumnsRequest(String reportId) {
	FetchReportColumnsModel model = new FetchReportColumnsModel();
	model.setReportId(reportId);
	return model;
    }
}
