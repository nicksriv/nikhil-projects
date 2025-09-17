package com.wavelabs.sb.command;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.UserProfileService;

@RunWith(MockitoJUnitRunner.class)
public class UpdatePasswordCommandTest {
	
	@InjectMocks
	UpdatePasswordCommand updatePasswordCommand;
	
	@Mock
	UserProfileService userProfileService;
	
	@Test
	@DisplayName("test updatePasswordCommand")
	public void updatePasswordCommandTest() {
		when(userProfileService.updatePassword(Mockito.any(),Mockito.any())).thenReturn(UserDataBuilder.getSuccessResponse());
		ResponseEntity<SuccessResponse> response = updatePasswordCommand.execute(UserDataBuilder.getUpdatePasswordRequest());
		assertEquals(Constants.PASSWORD_CHANGED_SUCCESSFULLY, response.getBody().getMessage());
	}
	
}
