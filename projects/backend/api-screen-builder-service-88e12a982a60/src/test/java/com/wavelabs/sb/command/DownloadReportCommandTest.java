package com.wavelabs.sb.command;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.FormDataBuilder;
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.model.ReportsRequestModel;
import com.wavelabs.sb.services.DynamicReportsGenrationService;
import com.wavelabs.sb.services.ReportService;

@RunWith(MockitoJUnitRunner.class)
public class DownloadReportCommandTest {

    @InjectMocks
    DownloadReportCommand downloadReportCommand;
    
    @Mock
    DynamicReportsGenrationService reportsGenrationService;

    @Mock
    ReportService reportService;

    @Test
    @DisplayName("test downloadReportCommandTest success response")
    public void downloadReportCommandTest() {
	downloadReportCommand
		.execute(ReportsDataBuilder.giveReportsRequestModel());
    }
    
    @Test
    @DisplayName("test downloadReportCommandTest success response")
    public void downloadReportCommandTest2() {
	ReportsRequestModel request=ReportsDataBuilder.giveReportsRequestModel();
	request.setDetails(ReportsDataBuilder.tokenDetails());
	request.getDetails().setTypeOfUser(Constants.USER);
	downloadReportCommand
		.execute(request);
    }


}
