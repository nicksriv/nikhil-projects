package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Modules;
import com.wavelabs.sb.documents.StatesMaster;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.ModuleRequest;
import com.wavelabs.sb.request.StatesRequest;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.CityResponse;
import com.wavelabs.sb.response.ModulesResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.StateResponse;

public class MasterDataBuilder {

    public static StatesRequest getStatesRequest() {
	StatesRequest statesRequest = new StatesRequest();
	statesRequest.setState("Telangana");
	statesRequest.setCity("Hyderabad");
	return statesRequest;
    }

    public static BaseResponse getBaseResponse() {
	BaseResponse baseResponse = new BaseResponse();
	baseResponse.setMessage(Constants.STATES_DATA_CREATED);
	return baseResponse;
    }

    public static PaginationResponse<StateResponse> getPaginationStateResponse() {
	PaginationResponse<StateResponse> response = new PaginationResponse<>();
	List<StateResponse> list = new ArrayList<>();
	StateResponse stateResponse = new StateResponse();
	stateResponse.setName("Telangana");
	list.add(stateResponse);
	response.setData(list);
	response.setMessage("States fetched successfully..!");
	response.setSize(1L);
	return response;
    }

    public static PaginationResponse<CityResponse> getPaginationCityResponse() {
	PaginationResponse<CityResponse> response = new PaginationResponse<>();
	List<CityResponse> list = new ArrayList<>();
	CityResponse cityResponse = new CityResponse();
	cityResponse.setId("614d79f33f1d4026be53d232");
	cityResponse.setName("Hyderabad");
	list.add(cityResponse);
	response.setData(list);
	response.setMessage("Cities fetched successfully..!");
	response.setSize(1L);
	return response;
    }

    public static List<StatesMaster> getStatesMasters() {
	List<StatesMaster> statesMasters = new ArrayList<StatesMaster>();
	StatesMaster master = new StatesMaster();
	master.setCreatedAt(Instant.now());
	master.setModifiedAt(Instant.now());
	master.setId("614d79f33f1d4026be53d232");
	master.setState("Telangana");
	master.setCity("Hyderabad");
	master.setStatus(Status.ACTIVE);
	return statesMasters;
    }

    public static List<String> getStatesList() {
	List<String> statesMasters = new ArrayList<>();
	statesMasters.add("Telangana");
	statesMasters.add("Andhra Pradesh");
	statesMasters.add("Utter pradesh");
	statesMasters.add("Madhya pradesh");
	return statesMasters;
    }

    public static Query getstatesQuery() {
	Query query = new Query();
	Criteria andQuery = new Criteria();
	andQuery.andOperator(Criteria.where("status").regex(Status.ACTIVE.toString()));
	query.addCriteria(andQuery);
	return query;
    }

    public static List<ModulesResponse> getModulesResponseList() {
	List<ModulesResponse> list = new ArrayList<ModulesResponse>();
	ModulesResponse modulesResponse1 = new ModulesResponse();
	modulesResponse1.setId("test-id-1");
	modulesResponse1.setName("test-module1");
	modulesResponse1.setStatus(Status.ACTIVE);
	ModulesResponse modulesResponse2 = new ModulesResponse();
	modulesResponse2.setId("test-id-2");
	modulesResponse2.setName("test-module2");
	modulesResponse2.setStatus(Status.INACTIVE);

	list.add(modulesResponse1);
	list.add(modulesResponse2);
	return list;
    }

    public static List<String> getBanksReuest() {
	List<String> banks = new ArrayList<>();
	banks.add("Union Bank");
	banks.add("Indian Bank");
	return banks;
    }

    public static BaseResponse getBankBaseResponse() {
	BaseResponse baseResponse = new BaseResponse();
	baseResponse.setMessage(Constants.BANKS_CREATED);
	return baseResponse;
    }

    public static List<ModulesResponse> getModulesResponse() {
	List<ModulesResponse> modulesReponse = new ArrayList<>();
	ModulesResponse module1 = new ModulesResponse();
	ModulesResponse module2 = new ModulesResponse();
	module1.setId("id");
	module1.setName("Attendance Module");
	module1.setStatus(Status.ACTIVE);
	module2.setId("id");
	module2.setName("User Module");
	module2.setStatus(Status.ACTIVE);
	modulesReponse.add(module1);
	modulesReponse.add(module2);
	return modulesReponse;
    }

    public static Modules getModule() {
	Modules module = new Modules();
	module.setId("614d79f33f1d4026be53d232");
	module.setName("Attendance Module");
	module.setStatus(Status.ACTIVE);
	return module;
    }

    public static ModuleRequest getModuleRequest() {
	ModuleRequest module = new ModuleRequest();
	module.setName("Attendance Module");
	return module;
    }

}
