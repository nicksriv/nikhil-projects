package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Hashtable;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ChartDetails;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.ChartMapper;
import com.wavelabs.sb.model.ChartsData;
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.repository.ChartDetailsRepository;
import com.wavelabs.sb.repository.ReportConfigurationsRepository;
import com.wavelabs.sb.repository.UserOnboardingRepository;
import com.wavelabs.sb.response.ChartsResponse;
import com.wavelabs.sb.response.ModuleChartsResponse;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class ChartServiceTest {

    @Mock
    ChartDetailsRepository chartDetailsRepository;

    @Mock
    ReportConfigurationsRepository reportConfigurationsRepository;

    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @InjectMocks
    ChartService chartService;

    @Mock
    ScreenBuilderService screenBuilderService;

    @Mock
    DynamicReportsGenrationService dynamicReportGenrationService;

    @Mock
    ReportService reportService;

    @Test
    @DisplayName("testing createChartTest")
    public void createChartTest() {

	when(chartDetailsRepository.save(Mockito.any()))
		.thenReturn(ChartMapper.getChartDetails(ChartsData.getChartData()));
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getReportConfigurations()));
	SuccessResponse response = chartService.createChart(ChartsData.getChartData());
	assertEquals("Chart has been created Successfully", response.getMessage());
    }

    @Test
    @DisplayName("testing createChartWithExceptionTest")
    public void createChartWithExceptionTest() {

	when(reportConfigurationsRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
	Throwable exception = assertThrows(ResourceNotFoundException.class, () -> {
	    chartService.createChart(ChartsData.getChartData());
	});
	assertEquals(ErrorMessages.REPORT_DOES_NOT_EXISTS, exception.getMessage());
    }

    @Test
    @DisplayName("testing createChartTest")
    public void updateChartWithSuccessResponse() {

	when(chartDetailsRepository.findByIdAndDeletedAndStatus(Mockito.anyString(), Mockito.anyBoolean(),
		Mockito.any())).thenReturn(Optional.of(ChartsData.getChartDetails()));
	when(chartDetailsRepository.save(Mockito.any())).thenReturn(
		ChartMapper.updateChartDetails(ChartsData.getUpdateChartModel(), ChartsData.getChartDetails()));
	SuccessResponse response = chartService.updateChart(ChartsData.getUpdateChartModel());
	assertEquals(Constants.CHART_HAS_BEEN_UPDATED_SUCCESSFULLY, response.getMessage());

    }

    @Test
    @DisplayName("testing updateChartWithException")
    public void updateChartWithException() {

	ChartDetails c = ChartMapper.updateChartDetails(ChartsData.getUpdateChartModel(), ChartsData.getChartDetails());

	when(chartDetailsRepository.findByIdAndDeletedAndStatus(Mockito.anyString(), Mockito.anyBoolean(),
		Mockito.any())).thenReturn(Optional.empty());

	when(chartDetailsRepository.findByIdAndDeletedAndStatus(Mockito.anyString(), Mockito.anyBoolean(),
		Mockito.any())).thenReturn(Optional.empty());
	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    chartService.updateChart(ChartsData.getUpdateChartModel());
	});
	assertEquals(ErrorMessages.CHART_DOES_NOT_EXIST, response.getMessage());

    }

    @Test
    @DisplayName("testing fetchAllTest")
    public void fetchAllTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getReportConfigurations()));
	when(chartDetailsRepository.findByReportIdAndDeletedAndStatus(Mockito.anyString(), Mockito.anyBoolean(),
		Mockito.any())).thenReturn(ChartsData.listOfChartDetails());
	List<Hashtable<String, Object>> response1 = dynamicReportGenrationService
		.fetchReport(ReportsDataBuilder.giveReportRequest());
	ChartsResponse response = chartService.fetchAllCharts("ReportId1");
	assertEquals("Records fetched successfully", response.getMessage());

    }

    @Test
    @DisplayName("testing fetchAllTestReturnNull")
    public void fetchAllTestReturnNull() {
	when(reportConfigurationsRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
	assertEquals(null, chartService.fetchAllCharts("a"));

    }

    @Test
    @DisplayName("testing fetchChartTest")
    public void fetchChartTest() {
	when(chartDetailsRepository.findByIdAndDeletedAndStatus(Mockito.anyString(), Mockito.anyBoolean(),
		Mockito.any())).thenReturn(Optional.of(ChartsData.getChartDetails()));

	ModuleChartsResponse chartsDetails = chartService.fetchChart(ReportsDataBuilder.giveReportRequest());
	assertEquals("Ram", chartsDetails.getName());

    }

    @Test
    @DisplayName("testing fetchChartTestWithException")
    public void fetchChartTestWithException() {
	when(chartDetailsRepository.findByIdAndDeletedAndStatus(Mockito.anyString(), Mockito.anyBoolean(),
		Mockito.any())).thenReturn(Optional.empty());
	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    chartService.fetchChart(ReportsDataBuilder.giveReportRequest());
	});
	assertEquals(ErrorMessages.CHART_DOES_NOT_EXIST, response.getMessage());

    }

    @Test
    @DisplayName("testing fecthModuleChartsTest")
    public void fecthModuleChartsTest() {
	when(reportConfigurationsRepository.findByModuleIdAndStatusAndDeletedAndRolesIn(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean(), Mockito.any())).thenReturn(ChartsData.listOfgetReportConfigurations());

	when(screenBuilderService.getUser(Mockito.anyString())).thenReturn(ChartsData.getUsers());

	when(chartDetailsRepository.findByReportIdInAndStatusAndDeleted(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean())).thenReturn(ChartsData.listOfChartDetails());
	when(screenBuilderService.getRoleObjIds(Mockito.any())).thenReturn(ChartsData.getRoleObjectIds());

	List<ChartDetails> chartsDetails = chartService
		.fecthModuleCharts(ChartsData.getFetchReportChartsByModuleIdModel());
	assertEquals("ClientId", chartsDetails.get(0).getClientId());

    }

    @Test
    @DisplayName("testing fecthAllReportTest")
    public void fecthAllReportTest() {

	when(dynamicReportGenrationService.fetchReport(Mockito.any())).thenReturn(ChartsData.getFetchReports());

	Hashtable<String, List<Hashtable<String, Object>>> response = chartService
		.fetchAllReports(ChartsData.listOfChartDetails());
	assertEquals(1, response.size());

    }

    @Test
    @DisplayName("testing updateChartPriorityTest")
    public void updateChartPriorityTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getNotRepeatedReportConfigurations()));
	when(chartDetailsRepository.findByIdInAndStatusAndDeleted(Mockito.any(), Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(ChartsData.getChartsDetailsList());
	SuccessResponse chartDetails = chartService.updateChartPriority(ChartsData.getChartsPriorityRequestModel());
	assertEquals(Constants.CHARTS_PRIORITY_UPDATED, chartDetails.getMessage());

    }

    @Test
    @DisplayName("testing updateChartPriority with report doest exist Exception")
    public void updateChartPriorityTestWithException() {
	when(reportConfigurationsRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    chartService.updateChartPriority(ChartsData.getChartsPriorityRequestModel());
	});
	assertEquals(ErrorMessages.REPORT_DOES_NOT_EXISTS, response.getMessage());

    }

    @Test
    @DisplayName("testing updateChartPriority with please provide valid request Exception")
    public void updateChartPriorityTestWithAnotherException() {
	Throwable response = assertThrows(BadRequestException.class, () -> {
	    chartService.updateChartPriority(ChartsData.getChartsPriorityRequestModelWithRequestNull());
	});
	assertEquals(ErrorMessages.PLEASE_PROIVED_VALID_REQUEST, response.getMessage());

    }

    @Test
    @DisplayName("testing updateChartPriority with chart ids not found exception")
    public void updateChartPriorityTestWithThirdException() {
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getNotRepeatedReportConfigurations()));
	when(chartDetailsRepository.findByIdInAndStatusAndDeleted(Mockito.any(), Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(ChartsData.getChartsDetailsList());
	String error = "IdB2,null";
	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    chartService.updateChartPriority(ChartsData.getChartsPriorityRequestModelWithRequestWithUnmatchedIds());
	});
	assertEquals(ErrorMessages.CHARTS_NOT_FOUND_WITH_THESE_IDS + error, response.getMessage());

    }

}
