package com.wavelabs.sb.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.command.CreateReportCommand;
import com.wavelabs.sb.command.DeleteReportCommand;
import com.wavelabs.sb.command.FetchAllReportConfigurationsCommand;
import com.wavelabs.sb.command.FetchColumnsCommand;
import com.wavelabs.sb.command.FetchModuleReportsCommand;
import com.wavelabs.sb.command.FetchReportColumnsCommand;
import com.wavelabs.sb.command.FetchReportCommand;
import com.wavelabs.sb.command.SaveReportColumnsCommand;
import com.wavelabs.sb.command.UpdateReportCommand;
import com.wavelabs.sb.command.ViewReportCommand;
import com.wavelabs.sb.model.ReportConfigurationModel;
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.FetchColumnsResponse;
import com.wavelabs.sb.response.FetchReportResponse;
import com.wavelabs.sb.response.ModuleReportResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;

@RunWith(MockitoJUnitRunner.class)
public class ReportsControllerTest {

    @Mock
    CreateReportCommand createReportCommand;

    @Mock
    UpdateReportCommand updateReportCommand;

    @Mock
    FetchReportCommand fetchReportCommand;

    @Mock
    ViewReportCommand viewReportCommand;
    @Mock
    DeleteReportCommand deleteReportCommand;

    @Mock
    FetchAllReportConfigurationsCommand fetchAllReportConfigurationsCommand;

    @Mock
    AuthenticationService authenticationService;

    @Mock
    FetchColumnsCommand fetchColumnsCommand;

    @Mock
    FetchReportColumnsCommand fetchReportColumnsCommand;

    @Mock
    FetchModuleReportsCommand fetchModuleReportsCommand;

    @Mock
    SaveReportColumnsCommand saveReportColumnsCommand;

    @InjectMocks
    ReportsController reportsController;

    @Mock
    HttpServletRequest httpServletRequest;

    @Test
    @DisplayName("test saveReportConfigurationsTest with success response")
    public void saveReportConfigurationsTest() {
	when(createReportCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getSuccessResponse()));
	ResponseEntity<SuccessResponse> responseEntity = reportsController.saveReportConfigurations("Authorization",
		httpServletRequest, ReportsDataBuilder.createReportRequest());
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test updateReportConfigurationsTest with success response")
    public void updateReportConfigurationsTest() {
	when(updateReportCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getSuccessResponse()));
	ResponseEntity<SuccessResponse> responseEntity = reportsController.updateReportConfigurations("Authorization",
		httpServletRequest, ReportsDataBuilder.updateReportRequest(), "1A");
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test getReportTest with success response")
    public void getReportTest() {
	when(viewReportCommand.execute(Mockito.any())).thenReturn(ReportsDataBuilder.getFetchReports());
	ResponseEntity<List<LinkedHashMap<String, Object>>> responseEntity = reportsController.getReport("Authorization",
		"ReportId", Optional.of("12-01-2022"), Optional.of("12-01-2022"), Optional.of("Java T Point"),
		httpServletRequest);
	assertEquals("value1", responseEntity.getBody().get(0).get("a"));
    }

    @Test
    @DisplayName("test getReportConfigurationsTest with success response")
    public void getReportConfigurationsTest() {
	when(fetchReportCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ReportsDataBuilder.getFetchChatResponses()));
	ResponseEntity<FetchReportResponse> responseEntity = reportsController.getReportConfigurations("Authorization",
		httpServletRequest, "ReportId", Optional.of("12-01-2022"), Optional.of("12-01-2022"),
		Optional.of("Java T Point"));
	assertEquals("1A", responseEntity.getBody().getId());
    }

    @Test
    @DisplayName("test deleteReportConfigurationsTest with success response")
    public void deleteReportConfigurationsTest() {
	when(deleteReportCommand.execute(Mockito.any())).thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> responseEntity = reportsController.deleteReportConfigurations("Authorization",
		"ReportId", httpServletRequest);
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test fetchAllReportConfigurationsTest with success response")
    public void fetchAllReportConfigurationsTest() {
	when(fetchAllReportConfigurationsCommand.execute(Mockito.any())).thenReturn(ResponseEntity.status(HttpStatus.OK)
		.body(ReportsDataBuilder.getpaginationnResponseOfReportConfigurationModel()));
	ResponseEntity<PaginationResponse<ReportConfigurationModel>> responseEntity = reportsController
		.fetchAllReportConfigurations("Authorization", ReportsDataBuilder.getFetchReportConfiguration());
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test fetchAllReportConfigurationsTest with success response")
    public void fetchColumnsTest() {
	when(fetchColumnsCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ReportsDataBuilder.giveFetchColumnResponse()));
	ResponseEntity<FetchColumnsResponse> responseEntity = reportsController.fetchColumns("Authorization",
		httpServletRequest, ReportsDataBuilder.giveFetchColumnsRequest());
	assertEquals("Column1", responseEntity.getBody().getColumns().get(0).getColumnId());
    }

    @Test
    @DisplayName("test fetchAllReportConfigurationsTest with success response")
    public void fetchAllReportConfigurationsTestWithSuccess() {
	when(fetchReportColumnsCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ReportsDataBuilder.getColumnsResponse()));
	ResponseEntity<List<ColumnsResponse>> responseEntity = reportsController
		.fetchAllReportConfigurations("Authorization", "ReportId", httpServletRequest);
	assertEquals("ComponentId", responseEntity.getBody().get(0).getComponentId());
    }

    @Test
    @DisplayName("test fetchModuleReportsTest with success response")
    public void fetchModuleReportsTest() {
	when(fetchModuleReportsCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ReportsDataBuilder.getModuleReportResponse()));
	ResponseEntity<ModuleReportResponse> responseEntity = reportsController.fetchModuleReports("Authorization",
		"ReportId", "ASC", httpServletRequest);
	assertEquals("Star Icon", responseEntity.getBody().getReports().get(0).getIcon());
    }

    @Test
    @DisplayName("test saveReportColumnsTest with success response")
    public void saveReportColumnsTest() {
	when(saveReportColumnsCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getSuccessResponse()));
	ResponseEntity<SuccessResponse> responseEntity = reportsController.saveReportColumns("Authorization",
		"ReportId", ReportsDataBuilder.getAllColumnRequest(), httpServletRequest);
	assertEquals("message", responseEntity.getBody().getMessage());
    }
}
