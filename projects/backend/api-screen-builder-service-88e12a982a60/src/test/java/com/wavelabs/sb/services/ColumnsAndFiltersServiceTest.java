package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.ChartsData;
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.repository.ModuleRepository;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.repository.SubModuleRepository;
import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.response.ColumnsAndFiltersResponse;
import com.wavelabs.sb.response.FetchColumnsResponse;

@RunWith(MockitoJUnitRunner.class)
public class ColumnsAndFiltersServiceTest {

    @Mock
    ModuleRepository moduleRepository;
    @Mock
    ScreenFieldsRepository screenFieldsRepository;

    @InjectMocks
    ColumnsAndFiltersService columnsAndFiltersService;

    @Mock
    ScreenBuilderService screenBuilderService;

    @Mock
    SubModuleRepository subModuleRepository;

    @Test
    @DisplayName("test fetech Columns And Filters by module id with success response")
    public void fetechColumnsAndFiltersTest() {
	when(screenBuilderService.getModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getModuleDataForUpdeteModule());
	when(screenFieldsRepository.findAllByModuleIdAndSubModuleIdAndDeleted(Mockito.anyString(),Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(ScreenBuilderData.getScreenFieldsData());
	FormRequest request = ScreenBuilderData.getFormRequestData();
	ColumnsAndFiltersResponse response = columnsAndFiltersService.fetechColumnsAndFilters(request);
	assertEquals("componentId", response.getColumns().get(0).getComponentId());
    }

    @Test
    @DisplayName("test fetech Columns And Filters by submodule id with success response")
    public void fetechColumnsAndFiltersBySubmoduleTest() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getSubModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(screenFieldsRepository.findAllByModuleIdAndSubModuleIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getScreenFields());
	FormRequest request = ScreenBuilderData.getFormRequest();
	ColumnsAndFiltersResponse response = columnsAndFiltersService.fetechColumnsAndFilters(request);
	assertEquals("componentId", response.getColumns().get(0).getComponentId());
    }
    /*
     * @Test
     * 
     * @DisplayName("test fetech Columns And Filters by module id with success response"
     * ) public void fetechColumnsAndFiltersWithException() { Throwable exception =
     * assertThrows(Nu.class, () -> {
     * columnsAndFiltersService.fetechColumnsAndFilters(null); });
     * assertEquals(ErrorMessages.MODULE_NOT_FOUND_WITH_ID + "moduleId1",
     * exception.getMessage()); }
     */

    /*
     * @Test
     * 
     * @DisplayName("test fetech Columns And Filters by submodule id with success response"
     * ) public void fetechColumnsAndFiltersBySubmoduleWithException() {
     * //when(screenBuilderService.getSubModule(Mockito.anyString())).thenReturn(
     * null);
     * 
     * FormRequest request = ScreenBuilderData.getFormRequest();
     * request.setSubmoduleId(null); Throwable exception =
     * assertThrows(ResourceNotFoundException.class, () -> {
     * columnsAndFiltersService.fetechColumnsAndFilters(request); });
     * assertEquals(ErrorMessages.SUB_MODULE_NOT_FOUND_WITH_ID + "subModuleId",
     * exception.getMessage()); }
     */
    @Test
    @DisplayName("test fetech Columns And Filters by submodule id with success response")
    public void fetchAllColumnsTest() {	
	when(screenFieldsRepository.findByModuleIdAndSubModuleIdInAndDeleted(Mockito.anyString(), Mockito.any(),
		Mockito.anyBoolean())).thenReturn(ChartsData.getScreenFields());
	FetchColumnsResponse resonse = columnsAndFiltersService
		.fetchAllColumns(ReportsDataBuilder.giveFetchColumnsRequest());
	assertEquals("Secondcolumn", resonse.getColumns().get(0).getColumnId());

    }
}
