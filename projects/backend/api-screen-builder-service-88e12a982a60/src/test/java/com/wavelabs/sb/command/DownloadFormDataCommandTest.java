package com.wavelabs.sb.command;

import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.FormDataBuilder;
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.ColumnsAndFiltersResponse;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.services.ColumnsAndFiltersService;
import com.wavelabs.sb.services.FormDataService;

@RunWith(MockitoJUnitRunner.class)
public class DownloadFormDataCommandTest {

    @InjectMocks
    DownloadFormDataCommand downloadFormDataCommand;

    @Mock
    FormDataService formDataService;

    @Mock
    ColumnsAndFiltersService columnsAndFiltersService;

    @Test
    @DisplayName("test downloadFormDataCommandTest success response")
    public void downloadFormDataCommandTest() {
	ColumnsAndFiltersResponse response = new ColumnsAndFiltersResponse();
	List<ColumnsResponse> columns = ReportsDataBuilder.getColumnsResponse();
	response.setColumns(columns);
	when(columnsAndFiltersService.fetechColumnsAndFilters(Mockito.any())).thenReturn(response);
	when(formDataService.fetchAllForms(Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(FormDataBuilder.getFormsResponse());
	downloadFormDataCommand.execute(FormDataBuilder.getFetchAllFormsRequest());
    }

}
