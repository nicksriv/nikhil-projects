package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.model.RoleOnboardingDataBuilder;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.ModuleRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.SubModuleRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class RoleOnboardingServiceTest {

    @InjectMocks
    private RoleOnboardingService roleOnboardingService;

	@Mock
	MongoTemplate mongoTemplate;

	@Mock
	ClientOnboardingRepository clientOnboardingRepository;

    @Mock
    ModuleRepository moduleRepository;
    @Mock
    SubModuleRepository subModuleRepository;

    @Mock
    RoleOnboardingRepository roleOnboardingRepository;

    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @Test
    @DisplayName("test fetchAllRoles")
    public void fetchAllRoles() {
	when(clientOnboardingRepository.findById(Mockito.any())).thenReturn(Optional.of(RoleOnboardingDataBuilder.getClientOnboardDetails()));
	when(mongoTemplate.find(Mockito.any(), Mockito.any())).thenReturn(Collections.singletonList(RoleOnboardingDataBuilder.getRoleOnboardingDetailsWithOutResponseList()));
	//when(mongoTemplate.count(Mockito.any(),Mockito.anyString())).thenReturn(10l);
    PaginationResponse<RoleOnboardingDetails> response=roleOnboardingService.fetchAllRoles(RoleOnboardingDataBuilder.getFetchAllRequest(),"clientId");
    assertEquals(Constants.RECORDS_FETCHED_SUCCESSFULLY,response.getMessage());
    }

    @Test
    @DisplayName("test fetchAllRoles")
    public void deleteRole() {
        when(roleOnboardingRepository.findById(Mockito.any())).thenReturn(Optional.of(RoleOnboardingDataBuilder.getRoleOnboardingDetailsWithOutResponse()));
        when(roleOnboardingRepository.save(Mockito.any())).thenReturn(null);
        SuccessResponse response=roleOnboardingService.deleteRole(RoleOnboardingDataBuilder.deleteRoleModel());
        assertEquals(Constants.ROLE_DELETED_SUCCESSFULLY,response.getMessage());
    }

    @Test
    @DisplayName("test getUserCount")
    public void getUserCount() {
        Map<String, Integer> response=roleOnboardingService.getUserCount(RoleOnboardingDataBuilder.getRoles());
        assertEquals(RoleOnboardingDataBuilder.getRoles().size(),response.size());
    }

    @Test
    @DisplayName("test getModules")
    public void getModules() {
        Map<String, List<Module>> response=roleOnboardingService.getModules(RoleOnboardingDataBuilder.getRoles());
        assertEquals(RoleOnboardingDataBuilder.getRoles().size(),response.size());
    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test fetchRoleById")
    public void fetchRoleByIdThrewException() {
        RoleOnboardingDetails response=roleOnboardingService.fetchRoleById("test-id");
    }

   /* @Test()
    @DisplayName("test fetchRoleById")
    public void fetchRoleById() {
        when(roleOnboardingRepository.findByIdAndDeleted(Mockito.anyString(),Mockito.any())).thenReturn(Optional.of(RoleOnboardingDataBuilder.getRoleOnboardingDetailsWithOutResponse()));
        RoleOnboardingDetails response=roleOnboardingService.fetchRoleById("test-id");
        //assertEquals(RoleOnboardingDataBuilder.getRoles().size(),response.size());
    }*/
}
