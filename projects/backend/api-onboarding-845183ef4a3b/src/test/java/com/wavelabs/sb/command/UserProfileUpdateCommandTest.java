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

import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.UserProfileService;

@RunWith(MockitoJUnitRunner.class)
public class UserProfileUpdateCommandTest {
	
	@InjectMocks
	UserProfileUpdateCommand userProfileUpdateCommand;;
	
	@Mock
	UserProfileService userProfileService;
	
	@Test
	@DisplayName("test userProfileUpdateCommand")
	public void userProfileUpdateCommandTest() {
		when(userProfileService.updateUserProfile(Mockito.any(), Mockito.any())).thenReturn(UserDataBuilder.getTestSuccessResponse());
		SuccessResponse response = userProfileUpdateCommand.execute(UserDataBuilder.getUserProfileUpdateModel());
		assertEquals("test-id", response.getId());
	}
	
}
