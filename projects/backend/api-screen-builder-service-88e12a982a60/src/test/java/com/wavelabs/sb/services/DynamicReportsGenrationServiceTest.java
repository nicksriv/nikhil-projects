package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
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
import org.springframework.data.mongodb.core.MongoTemplate;

import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.DynamicReportDataBuilder;
import com.wavelabs.sb.repository.ReportConfigurationsRepository;
import com.wavelabs.sb.repository.UserOnboardingRepository;
import com.wavelabs.sb.request.ReportsRequest;

@RunWith(MockitoJUnitRunner.class)
public class DynamicReportsGenrationServiceTest {

    @InjectMocks
    DynamicReportsGenrationService dynamicReportsGenrationService;

    @Mock
    ReportConfigurationsRepository reportsRepository;

    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @Mock
    ReportConfigurations reportConfigurations;

    @Mock
    MongoTemplate mongoTemplate;

    @Test
    @DisplayName("test fetchReport")
    public void fetchReport() {
	Optional<ReportConfigurations> report=DynamicReportDataBuilder.getReportConfiguration();
	report.get().setCustomColumns(DynamicReportDataBuilder.getListOfCustomColumns());
	when(reportsRepository.findById(Mockito.anyString()))
		.thenReturn(report);
	when(userOnboardingRepository.findByLocationsInAndDeleted(Mockito.anyList(), Mockito.anyBoolean()))
		.thenReturn(DynamicReportDataBuilder.getUserList());
	when(userOnboardingRepository.findByLocationsInAndDeleted(Mockito.anyList(), Mockito.anyBoolean()))
		.thenReturn(DynamicReportDataBuilder.getUserList());
	/*
	 * when(mongoTemplate.aggregate(Mockito.any(), Mockito.anyString(),
	 * Mockito.any())).thenReturn(DynamicReportDataBuilder.getAggregationResults());
	 */
	List<Hashtable<String, Object>> response = dynamicReportsGenrationService
		.fetchReport(DynamicReportDataBuilder.reportsRequest());
	assertEquals(new ArrayList<>(), response);
    }
    

    @Test
    @DisplayName("test fetchReport2")
    public void fetchReport2() {
	Optional<ReportConfigurations> report=DynamicReportDataBuilder.getReportConfiguration();
	report.get().setCustomColumns(DynamicReportDataBuilder.getListOfCustomColumns());
	when(reportsRepository.findById(Mockito.anyString()))
		.thenReturn(report);
	when(userOnboardingRepository.findByLocationsInAndDeleted(Mockito.anyList(), Mockito.anyBoolean()))
		.thenReturn(DynamicReportDataBuilder.getUserList());
	when(userOnboardingRepository.findByLocationsInAndDeleted(Mockito.anyList(), Mockito.anyBoolean()))
		.thenReturn(DynamicReportDataBuilder.getUserList());
	ReportsRequest request=DynamicReportDataBuilder.reportsRequest();
	request.setFrom(null);
	List<Hashtable<String, Object>> response = dynamicReportsGenrationService
		.fetchReport(request);
	assertEquals(new ArrayList<>(), response);
    }

    @Test
    @DisplayName("test fetchReport3")
    public void fetchReport3() {
	Optional<ReportConfigurations> report=DynamicReportDataBuilder.getReportConfiguration();
	report.get().setCustomColumns(DynamicReportDataBuilder.getListOfCustomColumns());
	when(reportsRepository.findById(Mockito.anyString()))
		.thenReturn(report);
	when(userOnboardingRepository.findByLocationsInAndDeleted(Mockito.anyList(), Mockito.anyBoolean()))
		.thenReturn(DynamicReportDataBuilder.getUserList());
	when(userOnboardingRepository.findByLocationsInAndDeleted(Mockito.anyList(), Mockito.anyBoolean()))
		.thenReturn(DynamicReportDataBuilder.getUserList());
	ReportsRequest request=DynamicReportDataBuilder.reportsRequest();
	request.setTo(null);
	List<Hashtable<String, Object>> response = dynamicReportsGenrationService
		.fetchReport(request);
	assertEquals(new ArrayList<>(), response);
    }


    @Test
    @DisplayName("test fetchReportEmptySubModule")
    public void fetchReportEmptySubModule() {
	when(reportsRepository.findById(Mockito.anyString()))
		.thenReturn(DynamicReportDataBuilder.getReportConfigurationEmptySubmodule());
	List<String> siteIds = new ArrayList<>();
	siteIds.add("site1");
	siteIds.add("site2");
	siteIds.add("site3");
	when(userOnboardingRepository.findByLocationsInAndDeleted(Mockito.anyList(), Mockito.anyBoolean()))
		.thenReturn(DynamicReportDataBuilder.getUserList());
	List<Hashtable<String, Object>> response = dynamicReportsGenrationService
		.fetchReport(DynamicReportDataBuilder.reportsRequest());
	assertEquals(new ArrayList<>(), response);
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test fetchReportThrowsException")
    public void fetchReportThrowsException() {
	when(reportsRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
	List<String> siteIds = new ArrayList<>();
	siteIds.add("site1");
	siteIds.add("site2");
	siteIds.add("site3");
	List<Hashtable<String, Object>> response = dynamicReportsGenrationService
		.fetchReport(DynamicReportDataBuilder.reportsRequest());
    }
}
