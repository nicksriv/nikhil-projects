package com.wavelabs.sb.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.response.ModulesResponse;
import com.wavelabs.sb.services.ModuleService;

@WebMvcTest(MasterDataController.class)
public class ModuleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    ModuleService moduleService;

   // @Test
    @DisplayName("Test create & fetchAll() modules apis response")
    public void getAllModules_() throws Exception {

	List<ModulesResponse> modulesReponse = new ArrayList<>();
	ModulesResponse module1 = new ModulesResponse();
	ModulesResponse module2 = new ModulesResponse();
	module1.setId("id");
	module1.setName("Attendance Module");
	module1.setStatus(Status.ACTIVE);

	module2.setId("id");
	module2.setName("User Module");
	module2.setStatus(Status.ACTIVE);

	// fetchAll
	Mockito.when(moduleService.fetchAllModules()).thenReturn(modulesReponse);

	MvcResult fetchResult = mockMvc
		.perform(MockMvcRequestBuilders.get("/api/v1/masters/modules").contentType(MediaType.APPLICATION_JSON))
		.andReturn();

	assertEquals(200, fetchResult.getResponse().getStatus());
	assertNotNull(fetchResult);

	// created Module
//        ModuleRequest moduleRequest = new ModuleRequest();
//        moduleRequest.setName("Module Name");
//
//        Module module = new Module();
//        module.setId("A Name");
//        module.setName("Module Name");
//         Mockito.when(moduleService.create(moduleRequest)).thenReturn(module);
//        MvcResult createModuleResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/masters/modules")
//            .content(objectMapper.writeValueAsString(moduleRequest)).contentType(MediaType.APPLICATION_JSON))
//            .andReturn();
//
//        assertEquals(500, createModuleResult.getResponse().getStatus());
//        assertNotNull(createModuleResult);

    }
    
    
}