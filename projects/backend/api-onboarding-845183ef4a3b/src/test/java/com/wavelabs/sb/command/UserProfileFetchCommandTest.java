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
import com.wavelabs.sb.response.UserProfileDetails;
import com.wavelabs.sb.services.UserProfileService;

@RunWith(MockitoJUnitRunner.class)
public class UserProfileFetchCommandTest {
	
	@InjectMocks
	UserProfileFetchCommand userProfileFetchCommand;;
	
	@Mock
	UserProfileService userProfileService;
	
	@Test
	@DisplayName("test userProfileFetchCommand")
	public void userProfileFetchCommandTest() {
		when(userProfileService.fetchUserProfile(Mockito.any())).thenReturn(UserDataBuilder.getUserProfileDetails());
		UserProfileDetails response = userProfileFetchCommand.execute(UserDataBuilder.getTokenPayLoadRequest());
		assertEquals("test-first-name", response.getFirstName());
		assertEquals("test-98989", response.getPhone());
	}
	
}
