package com.wavelabs.sb.command;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.services.UserOnboardingService;

@RunWith(MockitoJUnitRunner.class)
public class UserCommandTest {
	
	@InjectMocks
	UsersCommand usersCommand;
	@Mock
	UserOnboardingService userOnboardingService;
	
	@Test
	public void executeTest() {
		when(userOnboardingService.getUser(Mockito.anyString())).thenReturn(UserDataBuilder.getUser());
		Users response = usersCommand.execute("6151a665fc1b08043f03a70e");
		assertEquals("vijayp@wavelabs.ai", response.getOfficialEmail());
	}
	

}
