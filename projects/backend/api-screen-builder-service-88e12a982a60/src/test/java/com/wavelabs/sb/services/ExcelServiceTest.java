package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.model.FormDataBuilder;
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.response.ColumnsResponse;

@RunWith(MockitoJUnitRunner.class)
public class ExcelServiceTest {

    @InjectMocks
    ExcelService excelService;

    @Test
    @DisplayName("testing bulkUploadTemplateTest")
    public void bulkUploadTemplateTest() {
	ExcelService.bulkUploadTemplate();
    }

    @Test
    @DisplayName("testing getReportTest")
    public void getReportTest() {
	ExcelService.getReport(ReportsDataBuilder.getColumnsResponse(), ReportsDataBuilder.getFetchReports());
    }

    @Test
    @DisplayName("testing getFormDataExcelTest")
    public void getFormDataExcelTest() {
	ColumnsResponse response = new ColumnsResponse();
	response.setComponentId("ComponentId2");
	response.setHint("HintId");
	response.setType(CollectionConstants.CHECK_LIST);
	ColumnsResponse response2 = new ColumnsResponse();
	response2.setComponentId("ComponentId3");
	response2.setHint("HintId");
	response2.setType("Test");
	List<ColumnsResponse> request = ReportsDataBuilder.getColumnsResponse();
	request.add(response);
	request.add(response2);
	ExcelService.getFormDataExcel(request, FormDataBuilder.getFormsResponse());
    }

    @Test
    @DisplayName("testing getFormDataExcelTestWithException")
    public void getFormDataExcelTestWithException() {
	ColumnsResponse response = new ColumnsResponse();
	response.setComponentId("ComponentId2");
	response.setHint("HintId");
	ColumnsResponse response2 = new ColumnsResponse();
	response2.setComponentId("ComponentId3");
	response2.setHint("HintId");
	response2.setType("Test");
	List<ColumnsResponse> request = ReportsDataBuilder.getColumnsResponse();
	request.add(response);
	request.add(response2);
	ExcelService.getFormDataExcel(request, FormDataBuilder.getFormsResponse());

    }
}
