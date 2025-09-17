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

import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.FetchFormResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@RunWith(MockitoJUnitRunner.class)
public class GetFormBuilderCommandTest {

	@InjectMocks
	GetFormBuilderCommand getFormBuilderCommand;

	@Mock
	ScreenBuilderService screenBuilderService;

	@Test
	@DisplayName("test fetchFormBuilder success response")
	public void fetchFormBuilderTest() {
		Mockito.when(screenBuilderService.fetchFormWithScreenId(Mockito.anyString()))
				.thenReturn(ScreenBuilderData.getFormBuilderResponse());
		ResponseEntity<FetchFormResponse> responseEntity = getFormBuilderCommand.execute("sub-module-id");
		assertEquals("test-clientId", responseEntity.getBody().getClientId());
	}

}
