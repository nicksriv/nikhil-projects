package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.junit.ComparisonFailure;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.ReportMapper;
import com.wavelabs.sb.model.ChartsData;
import com.wavelabs.sb.model.CreateReportModel;
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.repository.ModuleRepository;
import com.wavelabs.sb.repository.ReportColumnsRepository;
import com.wavelabs.sb.repository.ReportConfigurationsRepository;
import com.wavelabs.sb.repository.RoleOnboardingRepository;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.repository.SubModuleRepository;
import com.wavelabs.sb.repository.UserOnboardingRepository;
import com.wavelabs.sb.request.CreateReportRequest;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.FetchReportResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

@RunWith(MockitoJUnitRunner.class)
public class ReportServiceTest {

    @Mock
    ScreenBuilderService screenBuilderService;

    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @Mock
    ReportConfigurationsRepository reportConfigurationsRepository;

    @Mock
    ReportColumnsRepository reportColumnsRepository;

    @Mock
    SubModuleRepository subModuleRepository;

    @Mock
    RoleOnboardingRepository roleOnboardingRepository;

    @Mock
    DynamicReportsGenrationService dynamicReportGenrattionService;
    @Mock
    MongoTemplate mongoTemplate;

    @Mock
    ModuleRepository moduleRepository;

    @Mock
    ScreenFieldsRepository screenFieldsRepository;

    @InjectMocks
    ReportService reportService;

    @Test
    @DisplayName("testing createReport With SuccsessResponse")
    public void createReportTest() {
	when(reportConfigurationsRepository.findByClientIdAndDeletedAndNameIgnoreCase(Mockito.anyString(),
		Mockito.anyBoolean(), Mockito.anyString())).thenReturn(null);
	when(reportConfigurationsRepository.save(Mockito.any()))
		.thenReturn(ChartsData.getNotRepeatedReportConfigurations());
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	SuccessResponse response = reportService.createReport(ReportsDataBuilder.reportModel());
	assertEquals(Constants.REPORT_HAS_BEEN_CREATED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("testing createReport With Exception")
    public void createReportExceptionTest() {
	when(reportConfigurationsRepository.findByClientIdAndDeletedAndNameIgnoreCase(Mockito.anyString(),
		Mockito.anyBoolean(), Mockito.anyString())).thenReturn(ChartsData.getReportConfigurations());
	Throwable response = assertThrows(BadRequestException.class, () -> {
	    reportService.createReport(ReportsDataBuilder.reportModel());
	});
	assertEquals(ErrorMessages.REPORT_ALREADY_EXISTS, response.getMessage());
    }

    @Test
    @DisplayName("testing updateReport With SuccsessResponse")
    public void updateReportWithSuccsessResponseTest() {
	when(reportConfigurationsRepository.save(Mockito.any())).thenReturn(ChartsData.getReportConfigurations());
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getReportConfigurations()));
	when(reportConfigurationsRepository.existsByClientIdAndDeletedAndNameIgnoreCaseAndIdNot(Mockito.anyString(),
		Mockito.anyBoolean(), Mockito.anyString(), Mockito.anyString())).thenReturn(false);
	SuccessResponse response = reportService.updateReport(ReportsDataBuilder.getUpdateReportModel());
	assertEquals(Constants.REPORT_HAS_BEEN_CREATED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("testing updateReport With no record found exception")
    public void updateReportWithExceptionTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());

	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    reportService.updateReport(ReportsDataBuilder.getUpdateReportModel());
	});
	assertEquals(ErrorMessages.NO_RECORD_FOUND, response.getMessage());
    }

    @Test
    @DisplayName("testing updateReport With SuccsessResponse")
    public void updateReportExceptionTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getReportConfigurationsWithNullModule()));
	when(reportConfigurationsRepository.existsByClientIdAndDeletedAndNameIgnoreCaseAndIdNot(Mockito.anyString(),
		Mockito.anyBoolean(), Mockito.anyString(), Mockito.anyString())).thenReturn(true);

	Throwable response = assertThrows(BadRequestException.class, () -> {
	    reportService.updateReport(ReportsDataBuilder.getUpdateReportModel());
	});
	assertEquals(ErrorMessages.REPORT_ALREADY_EXISTS, response.getMessage());
    }

    @Test
    @DisplayName("test fetchReport With SuccsessResponse")
    public void fetchReportTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getNotRepeatedReportConfigurations()));

	FetchReportResponse response = reportService.fetchReport(ReportsDataBuilder.giveReportRequest());

	assertEquals("ACTIVE", response.getStatus());

    }

    @Test
    @DisplayName("testing updateReport With SuccsessResponse")
    public void fetchReportSuccessTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());

	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    reportService.fetchReport(ReportsDataBuilder.giveReportRequest());
	});
	assertEquals(ErrorMessages.REPORT_ALREADY_EXISTS, response.getMessage());
    }

    @Test
    @DisplayName("testing deleteReportTest with SuccsessResponse")
    public void deleteReportTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getReportConfigurations()));

	ReportConfigurations reportConfigurations = ChartsData.getReportConfigurations();
	reportConfigurations.setModifiedAt(Instant.now());
	reportConfigurations
		.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(ReportsDataBuilder.getTokenPayLoadDetails()));
	reportConfigurations.setDeleted(Constants.TRUE);
	when(reportConfigurationsRepository.save(Mockito.any())).thenReturn(reportConfigurations);

	SuccessResponse response = reportService.deleteReport(ReportsDataBuilder.getDeleteReportModel());

	assertEquals(Constants.REPORT_HAS_BEEN_DELETED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("testing updateReport With SuccsessResponse")
    public void deleteReportExceptionTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());

	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    reportService.deleteReport(ReportsDataBuilder.getDeleteReportModel());
	});
	assertEquals(ErrorMessages.REPORT_DOES_NOT_EXISTS, response.getMessage());
    }

    @Test
    @DisplayName("testing fetchAllReportTest With SuccsessResponse")
    public void fetchAllReportTest() {

	when(screenBuilderService.getClientDetails(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(mongoTemplate.find(Mockito.any(Query.class), Mockito.any()))
		.thenReturn(ReportsDataBuilder.listOfReportConfigs());

	PaginationResponse<ReportConfigurations> response = reportService
		.fetchAll(ReportsDataBuilder.getFetchReportConfiguration());
	PaginationResponse<ReportConfigurations> response1 = reportService
		.fetchAll(ReportsDataBuilder.giveFetchReportConfiguration());
	PaginationResponse<ReportConfigurations> response2 = reportService
		.fetchAll(ReportsDataBuilder.giveFetchReportConfigurations());

	assertEquals("Records fetched successfully", response.getMessage());
	assertEquals("Records fetched successfully", response1.getMessage());
	assertEquals("Records fetched successfully", response2.getMessage());

    }

    @Test
    @DisplayName("testing client not found exception")
    public void fetchAllDateFormatExceptionTest() {

	Throwable response = assertThrows(BadRequestException.class, () -> {
	    reportService.fetchAll(ReportsDataBuilder.getFetchReportConfigurationWithDateUnformat());
	});
	assertEquals("Please provide date dd-mm-yyyy format", response.getMessage());
    }

    @Test
    @DisplayName("testing client not found exception")
    public void fetchAllReporExceptionTest() {

	Throwable response = assertThrows(BadRequestException.class, () -> {
	    reportService.fetchAll(ReportsDataBuilder.getFetchReportConfigurationWithNullClient());
	});
	assertEquals(Constants.ACTIVE_CLIENT_NOT_FOUND, response.getMessage());
    }

    @Test(expected = ComparisonFailure.class)
    @DisplayName("testing  fetchReportColumns With SuccessResponse ")
    public void fetchReportColumnsWithSuccessResponseTest() {

	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getReportConfigurations()));
	when(screenFieldsRepository.findByComponentIdInAndModuleId(Mockito.any(), Mockito.any()))
		.thenReturn(ScreenBuilderData.getScreenFields());

	List<ColumnsResponse> columnResponse = reportService
		.fetchReportColumns(ReportsDataBuilder.getFetchReportColumnsModelData());
	assertEquals("oneB", columnResponse.get(0).getComponentId());
    }

    @Test
    @DisplayName("testing  fetchReportColumns With AnotherSuccessResponse ")
    public void fetchReportColumnsWithAnotherSuccessResponseTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getReportConfigurations()));
	when(screenFieldsRepository.findByComponentIdInAndModuleId(Mockito.any(), Mockito.any()))
		.thenReturn(ChartsData.getScreenFields());

	when(reportColumnsRepository.findByReportIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ReportsDataBuilder.getColumnsData()));

	List<ColumnsResponse> columnResponse = reportService.fetchReportColumns(ReportsDataBuilder.giveTokenDetails());
	assertEquals("Firstcolumn", columnResponse.get(0).getComponentId());
    }

    @Test
    @DisplayName("test  fetchReportColumns With SuccessResponse ")
    public void saveReportColumnsWithSuccessResponseTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getReportConfigurations()));
	when(reportColumnsRepository.findByReportIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ReportsDataBuilder.getColumnsData()));
	when(reportColumnsRepository.save(Mockito.any())).thenReturn(ReportsDataBuilder.getColumnsData());
	SuccessResponse response = reportService.saveReportColumns(ReportsDataBuilder.getAllColumnModel());
	assertEquals(Constants.COLUMNS_INFORMATION_SAVED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("test  saveReportColumns With Exception ")
    public void saveReportColumnsWithExceptionTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());

	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    reportService.saveReportColumns(ReportsDataBuilder.getAllColumnModel());
	});
	assertEquals(ErrorMessages.REPORT_DOES_NOT_EXISTS, response.getMessage());

    }

    @Test
    @DisplayName("test  fetchReportColumns With SuccessResponse ")
    public void fetchReportColumnsWithExceptionTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    reportService.fetchReportColumns(ReportsDataBuilder.getFetchReportColumnsModelData());
	});
	assertEquals(ErrorMessages.NO_RECORD_FOUND, response.getMessage());

    }

    @Test
    @DisplayName("test  updateReports With SuccessResponse ")
    public void updateReportsWithExceptionTest() {
	Throwable response = assertThrows(BadRequestException.class, () -> {
	    reportService.updateReport(ReportsDataBuilder.getUpdateReportModelData());
	});
	assertEquals(ErrorMessages.REFERENCE_NAME_NOT_SAME_FOR_SUBMODULE_ID + ReportsDataBuilder.getUpdateReportModel()
		.getRequest().getCustomColumns().get(0).getSecond().getSubModule(), response.getMessage());

    }

    @Test
    @DisplayName("test  updateReportsWithExceptionThirdTest With else condition ")
    public void updateReportsWithExceptionThirdTest() {
	when(reportConfigurationsRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ChartsData.getDataOfReports()));
	when(reportColumnsRepository.findByReportIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.empty());
	SuccessResponse response = reportService.saveReportColumns(ReportsDataBuilder.getAllColumnModel());

	assertEquals(Constants.COLUMNS_INFORMATION_SAVED_SUCCESSFULLY, response.getMessage());

    }

}
