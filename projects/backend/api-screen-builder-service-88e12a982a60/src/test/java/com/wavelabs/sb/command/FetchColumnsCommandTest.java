package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.response.FetchColumnsResponse;
import com.wavelabs.sb.services.ColumnsAndFiltersService;

@RunWith(MockitoJUnitRunner.class)
public class FetchColumnsCommandTest {
	
	@InjectMocks
	FetchColumnsCommand fetchColumnsCommand;
	
	@Mock
	ColumnsAndFiltersService columnsAndFiltersService;
	
	@Test
	@DisplayName("test fetchColumnsCommandCommandTest success response")
	public void fetchColumnsCommandCommandTest() {
		Mockito.when(columnsAndFiltersService.fetchAllColumns(Mockito.any()))
				.thenReturn(ReportsDataBuilder.giveFetchColumnResponse());
		ResponseEntity<FetchColumnsResponse> response = fetchColumnsCommand
				.execute(ReportsDataBuilder.giveFetchColumnsRequest());
		assertEquals("Column1", response.getBody().getColumns().get(0).getColumnId());
	}

}
