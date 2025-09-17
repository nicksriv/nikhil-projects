package com.wavelabs.sb.services;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.documents.Modules;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.ClientDetailsDataBuilder;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.repositories.ModulesRepository;
import com.wavelabs.sb.response.ModulesResponse;

@RunWith(MockitoJUnitRunner.class)
public class ModuleServiceTest {

    @InjectMocks
    private ModuleService moduleService;

    @Mock
    private ModulesRepository moduleRepository;

    @Test
    @DisplayName("test saveModuleDetails")
    public void testSaveModuleDetails() {
	when(moduleRepository.save(Mockito.any())).thenReturn(ClientDetailsDataBuilder.getDummyModule());
	Modules saveModuleDetails = moduleService.saveModuleDetails(ClientDetailsDataBuilder.getDummyModuleRequest(),
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals(Status.ACTIVE, saveModuleDetails.getStatus());
	assertEquals("test-id", saveModuleDetails.getId());
    }

    @Test
    public void fetchAllModules() {
	List<Modules> modulesList = new ArrayList<Modules>();
	modulesList.add(ClientDetailsDataBuilder.getDummyModule());
	when(moduleRepository.findAll()).thenReturn(modulesList);
	List<ModulesResponse> resultModules = moduleService.fetchAllModules();
	assertNotNull(resultModules);
	assertEquals(1, resultModules.size());
	assertEquals("test-id", resultModules.get(0).getId());
	assertEquals(Status.ACTIVE, resultModules.get(0).getStatus());
    }

}
