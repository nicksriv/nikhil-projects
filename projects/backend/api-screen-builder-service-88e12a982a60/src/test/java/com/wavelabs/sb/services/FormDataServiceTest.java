package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MapReduceIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ScreenWorkFlow;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.model.DeleteFormDataModel;
import com.wavelabs.sb.model.FetchAllFormsModel;
import com.wavelabs.sb.model.FormDataBuilder;
import com.wavelabs.sb.model.SaveFormDataModel;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.model.UpdateFormDataModel;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.repository.UserOnboardingRepository;
import com.wavelabs.sb.request.FiltersRequest;
import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class FormDataServiceTest {

    @Mock
    MongoTemplate mongoTemplate;

    @InjectMocks
    FormDataService formDataService;

    @Mock
    ScreenBuilderService screenBuilderService;

    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @Mock
    WorkflowService workflowService;

    @Mock
    MongoCursor<Document> cursor;

    @Mock
    FindIterable<Document> findIterable;

    @Mock
    MapReduceIterable mapReduceIterable;

    @Mock
    ScreenFieldsRepository screenFieldsRepository;

    @Mock
    MongoDatabase database;

    Document commandResultDocument = new Document();

    @Mock
    MongoCollection<Document> mockCollection;

    @Test
    @DisplayName("test deleteFormDataTest with success response")
    public void deleteFormDataTest() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);
	Document document = new Document("_id", new ObjectId("61dc0d2819163b12aff9a3b2")).append("firstName", "Charan")
		.append("lastName", "Raj");
	when(mockCollection.find(Mockito.any(Bson.class))).thenReturn(findIterable);
	when(findIterable.first()).thenReturn(document);
	SuccessResponse response = formDataService.deleteFormData(FormDataBuilder.getDeleteFormDataModel());
	assertEquals(Constants.FORM_DATA_DELETED, response.getMessage());
    }

    @Test
    @DisplayName("test deleteFormDataTest with exception response")
    public void deleteFormDataTestWithException() {
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);
	when(mockCollection.find(Mockito.any(Bson.class))).thenReturn(findIterable);
	Throwable response = assertThrows(BadRequestException.class, () -> {
	    formDataService.deleteFormData(FormDataBuilder.getDeleteFormDataModel());
	});
	assertEquals(ErrorMessages.RECORD_NOT_FOUND, response.getMessage());
    }

    @Test
    @DisplayName("test deleteFormDataTest with exception response")
    public void deleteFormDataTestWithBadRequest() {
	Throwable response = assertThrows(BadRequestException.class, () -> {
	    DeleteFormDataModel request = FormDataBuilder.getDeleteFormDataModel();
	    request.getRequest().setFormId(null);
	    formDataService.deleteFormData(request);
	});
	assertEquals(ErrorMessages.INVALID_FORM_ID, response.getMessage());
    }

    @Test
    @DisplayName("test deleteFormDataTest with exception response")
    public void deleteFormDataTestWithBadRequest2() {
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);
	when(mockCollection.find(Mockito.any(Bson.class))).thenReturn(findIterable);
	Throwable response = assertThrows(BadRequestException.class, () -> {
	    DeleteFormDataModel request = FormDataBuilder.getDeleteFormDataModel();
	    request.getRequest().setSubmoduleId(null);
	    formDataService.deleteFormData(request);
	});
	assertEquals(ErrorMessages.RECORD_NOT_FOUND, response.getMessage());
    }

    @Test(expected = NullPointerException.class)
    @DisplayName("test saveFormDataTest with success response")
    public void saveFormDataTest() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(workflowService.getWorkflow(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	formDataService.saveFormData(FormDataBuilder.getSaveFormDataModel());
    }

    @Test
    @DisplayName("test saveFormDataTest with success response")
    public void saveFormDataTest2() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(workflowService.getWorkflow(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);
	SaveFormDataModel request = FormDataBuilder.getSaveFormDataModel();
	request.getRequest().setSubmoduleId(null);
	formDataService.saveFormData(request);

    }

    @Test
    @DisplayName("test saveFormDataTest with success response")
    public void saveFormDataTestException() {
	SaveFormDataModel request = FormDataBuilder.getSaveFormDataModel();
	request.getRequest().setForm(new HashMap<>());
	Throwable response = assertThrows(BadRequestException.class, () -> {
	    formDataService.saveFormData(request);
	});
	assertEquals(ErrorMessages.INVALID_FORM_DATA, response.getMessage());
    }

    @Test
    @DisplayName("test fetchAllFormsDataTest with success response")
    public void fetchAllFormsDataTest() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	FetchAllFormsModel request = FormDataBuilder.getFetchAllFormsRequest();
	request.getRequest().setSubModuleId(null);
	when(screenFieldsRepository.findAllByModuleIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(ScreenBuilderData.getScreenFields());
	when(mongoTemplate.find(Mockito.any(), Mockito.any(), Mockito.anyString()))
		.thenReturn(FormDataBuilder.getFetchAllFormsDataResponse());
	request.getRequest().setFrom("22-05-2022");
	request.getRequest().setTo("22-05-2022");
	request.getRequest().setPage(0);
	request.getRequest().setSize(2);
	List<FiltersRequest> list = new ArrayList<>();
	FiltersRequest fil = new FiltersRequest();
	fil.setComponentId("ComponentId");
	fil.setComponentId("ComponentId");
	list.add(fil);
	request.getRequest().setFilters(list);
	formDataService.fetchAllForms(request, false);
    }

    @Test
    @DisplayName("test fetchAllFormsDataTest with success response")
    public void fetchAllFormsDataTest2() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getSubModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	formDataService.fetchAllForms(FormDataBuilder.getFetchAllFormsRequest(), true);
    }

    @Test
    @DisplayName("test updateFormDataTest with success response")
    public void updateFormDataTest() {
	when(screenBuilderService.getSubModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(workflowService.getWorkflow(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);
	Document document = new Document("_id", new ObjectId("61dc0d2819163b12aff9a3b2")).append("firstName", "Charan")
		.append("lastName", "Raj");
	when(mockCollection.find(Mockito.any(Bson.class))).thenReturn(findIterable);
	when(findIterable.first()).thenReturn(document);
	formDataService.updateFormData(FormDataBuilder.getUpdateFormDataModel());
    }

    @Test
    @DisplayName("test updateFormDataTest2 with success response")
    public void updateFormDataTest2() {
	when(workflowService.getWorkflow(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);
	Document document = new Document("_id", new ObjectId("61dc0d2819163b12aff9a3b2")).append("firstName", "Charan")
		.append("lastName", "Raj");
	when(mockCollection.find(Mockito.any(Bson.class))).thenReturn(findIterable);
	when(findIterable.first()).thenReturn(document);
	UpdateFormDataModel request = FormDataBuilder.getUpdateFormDataModel();
	request.getRequest().setSubmoduleId(null);
	formDataService.updateFormData(request);
    }

    @Test
    @DisplayName("test fetchAllFormsDataTest3 with success response")
    public void updateFormDataTest3() {
	when(screenBuilderService.getSubModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	ScreenWorkFlow workflow = ScreenBuilderData.getScreenWorkFlow();
	workflow.setMappedBy("mappedBy");
	when(workflowService.getWorkflow(Mockito.anyString())).thenReturn(workflow);
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);
	Document document = new Document("_id", new ObjectId("61dc0d2819163b12aff9a3b2")).append("firstName", "Charan")
		.append("lastName", "Raj");
	when(mockCollection.find(Mockito.any(Bson.class))).thenReturn(findIterable);
	when(findIterable.first()).thenReturn(document);
	UpdateFormDataModel request = FormDataBuilder.getUpdateFormDataModel();
	request.getRequest().setMappedBy("mappedBy");
	formDataService.updateFormData(request);
    }

    @Test
    @DisplayName("test fetchAllFormsDataTest with success response")
    public void fetchAllFormsDataTest3() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getSubModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	FetchAllFormsModel request = FormDataBuilder.getFetchAllFormsRequest();
	request.getRequest().setMappedBy("id");
	request.getPayLoadDetails().setId("614d79f33f1d4026be53d232");
	request.getRequest().setEmployeeId("user");
	request.getRequest().setRoleId("614d79f33f1d4026be53d231");
	request.getRequest().setEmployeeId("userId");
	when(screenBuilderService.getSubModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	formDataService.fetchAllForms(request, true);
    }

    @Test
    @DisplayName("test fetchAllFormsDataTest with success response")
    public void fetchFormsDataTest() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getSubModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);

	Document document = new Document("_id", new ObjectId("61dc0d2819163b12aff9a3b2")).append("firstName", "Charan")
		.append("lastName", "Raj").append(CollectionConstants.USER_ID, "61dc0d2819163b12aff9a3b1");
	when(mockCollection.find(Mockito.any(Bson.class))).thenReturn(findIterable);
	when(findIterable.first()).thenReturn(document);
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getUsersData()));
	formDataService.fetctFormById(FormDataBuilder.getFormRequest());
    }

    @Test
    @DisplayName("test fetchAllFormsDataTest with success response")
    public void fetchFormsDataTest2() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getSubModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);
	Document document = new Document("_id", new ObjectId("61dc0d2819163b12aff9a3b2")).append("firstName", "Charan")
		.append("lastName", "Raj").append(CollectionConstants.USER_ID, "61dc0d2819163b12aff9a3b1");
	when(mockCollection.find(Mockito.any(Bson.class))).thenReturn(findIterable);
	when(findIterable.first()).thenReturn(document);
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getUsersData()));
	FormRequest request = FormDataBuilder.getFormRequest();
	request.setMappedBy("mappedBy");
	formDataService.fetctFormById(request);
    }

    @Test
    @DisplayName("test fetchAllFormsDataTest with success response")
    public void fetchFormsDataTest3() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(mongoTemplate.getCollection(Mockito.anyString())).thenReturn(mockCollection);
	Document document = new Document("_id", new ObjectId("61dc0d2819163b12aff9a3b2")).append("firstName", "Charan")
		.append("lastName", "Raj").append(CollectionConstants.USER_ID, "61dc0d2819163b12aff9a3b1");
	when(mockCollection.find(Mockito.any(Bson.class))).thenReturn(findIterable);
	when(findIterable.first()).thenReturn(document);
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getUsersData()));
	FormRequest request = FormDataBuilder.getFormRequest();
	request.setSubmoduleId(null);
	formDataService.fetctFormById(request);
    }

    @Test
    @DisplayName("test fetchAllFormsDataTest with success response")
    public void fetchFormsDataTest4() {
	FormRequest request = FormDataBuilder.getFormRequest();
	request.setFormId("id");

	Throwable response = assertThrows(BadRequestException.class, () -> {
	    formDataService.fetctFormById(request);
	});
	assertEquals(ErrorMessages.INVALID_FORM_ID, response.getMessage());
    }

}
