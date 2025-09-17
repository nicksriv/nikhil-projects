package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.FetchFormsRequest;
import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.response.FormsResponse;

public class FormDataBuilder {

    public static FormRequest getFormRequest() {
	FormRequest request = new FormRequest();
	request.setFormId("61dc0d2819163b12aff9a3b2");
	request.setModuleId("moduleId");
	request.setSubmoduleId("submoduleId");
	request.setWorlflowId("workflowId");
	request.setForm(getDocumentData());
	return request;
    }

    public static DeleteFormDataModel getDeleteFormDataModel() {
	DeleteFormDataModel model = new DeleteFormDataModel();
	model.setRequest(getFormRequest());
	model.setTokenPayLoadDetails(ScreenBuilderData.getTokenPayLoadDetails());
	return model;
    }

    public static Document getDocumentData() {
	Document request = new Document();
	request.put("_id", new ObjectId("61dc0d2819163b12aff9a3b2"));
	request.put("name", "Charan");
	request.put("age", 25);
	return request;
    }

    public static SaveFormDataModel getSaveFormDataModel() {
	SaveFormDataModel model = new SaveFormDataModel();
	model.setTokenPayLoadDetails(tokenDetails());
	model.setRequest(getFormRequest());
	return model;
    }

    private static TokenPayLoadDetails tokenDetails() {
	TokenPayLoadDetails details = new TokenPayLoadDetails();
	details.setId("id");
	details.setUserId("userId");
	details.setTypeOfUser(Constants.USER);
	return details;
    }

    public static FetchAllFormsModel getFetchAllFormsRequest() {
	FetchAllFormsModel model = new FetchAllFormsModel();
	model.setPayLoadDetails(tokenDetails());
	model.setRequest(getFetchFormsRequest());
	return model;
    }

    private static FetchFormsRequest getFetchFormsRequest() {
	FetchFormsRequest request = new FetchFormsRequest();
	request.setModuleId("moduleId");
	request.setSubModuleId("submoduleId");
	return request;
    }

    public static List<Object> getFetchAllFormsDataResponse() {
	List<Object> records = new ArrayList<>();
	Document document = new Document();
	document.put(CollectionConstants.CREATED_AT, Instant.now());
	document.put(CollectionConstants.CREATED_BY, "UserId");
	document.put(CollectionConstants.MODIFIED_AT, Instant.now());
	document.put(CollectionConstants.MODIFIED_BY, "UserId");
	document.put(CollectionConstants.USER_TYPE, "User");
	document.put(CollectionConstants.STATUS, Status.ACTIVE.toString());
	document.put(CollectionConstants.DELETED, false);
	document.put(CollectionConstants.USER_ID, "userId");
	document.put("componentId", "componentId");
	document.put(CollectionConstants.EMPLOYEE_ID, CollectionConstants.EMPLOYEE_ID);
	document.put(CollectionConstants.USER_NAME, CollectionConstants.USER_NAME);
	document.put(CollectionConstants.ROLES, CollectionConstants.ROLES);

	records.add(document);
	return records;
    }

    public static UpdateFormDataModel getUpdateFormDataModel() {
	UpdateFormDataModel model = new UpdateFormDataModel();
	model.setRequest(getFormRequest());
	model.setTokenPayLoadDetails(ScreenBuilderData.getTokenPayLoadDetails());
	return model;
    }

    public static FormRequest getFetctFormByIdRequest() {
	return getFormRequest();
    }

    public static FormsResponse getFormsResponse() {
	List<Map<String, Object>> records = new ArrayList<>();
	Document document = new Document();
	document.put(CollectionConstants.CREATED_AT, Instant.now());
	document.put(CollectionConstants.CREATED_BY, "UserId");
	document.put(CollectionConstants.MODIFIED_AT, Instant.now());
	document.put(CollectionConstants.MODIFIED_BY, "UserId");
	document.put(CollectionConstants.USER_TYPE, "User");
	document.put(CollectionConstants.STATUS, Status.ACTIVE.toString());
	document.put(CollectionConstants.DELETED, false);
	document.put(CollectionConstants.USER_ID, "userId");
	document.put(CollectionConstants.EMPLOYEE_ID, CollectionConstants.EMPLOYEE_ID);
	document.put(CollectionConstants.USER_NAME, CollectionConstants.USER_NAME);
	document.put(CollectionConstants.ROLES, CollectionConstants.ROLES);
	Document document2 = new Document();
	document2.put(CollectionConstants.ID, Instant.now());
	document.put("ComponentId", document2);
	document.put("ComponentId2", "[Option1,Option2]");
	document.put("ComponentId3", "[Option1,Option2]");
	
	records.add(document);
	FormsResponse response = new FormsResponse(1, records, Constants.RECORDS_FETCHED_SUCCESSFULLY);

	return response;
    }

}
