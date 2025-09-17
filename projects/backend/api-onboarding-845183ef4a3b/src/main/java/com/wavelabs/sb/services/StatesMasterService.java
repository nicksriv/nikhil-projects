package com.wavelabs.sb.services;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.StatesMaster;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.mappers.StatesMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.StatesMasterRepository;
import com.wavelabs.sb.request.StatesRequest;
import com.wavelabs.sb.response.BanksResponse;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.CityResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.StateResponse;

@Service
public class StatesMasterService {

    private Logger LOGGER = LoggerFactory.getLogger(StatesMasterService.class);
    
    @Autowired
    StatesMasterRepository statesMasterRepository;
    
    @Autowired
    MongoTemplate mongoTemplate;

    /**
     * This method used to save states
     * 
     * @param statesRequest
     * @return BaseResponse
     */
    public BaseResponse saveStates(List<StatesRequest> statesRequest, TokenPayLoadDetails details) {
	LOGGER.info("Save States method started");
	List<StatesMaster> statesMasters = statesRequest.stream()
		.map(request -> StatesMapper.getStatesMaster(request, details))
		.collect(Collectors.toList());
	LOGGER.info("Saving States list into database");
	statesMasterRepository.saveAll(statesMasters);
	BanksResponse banksResponse = new BanksResponse();
	banksResponse.setMessage(Constants.STATES_DATA_CREATED);
	LOGGER.info("Save States method ended");
	return banksResponse;
    }

    /**
     * this method used to fetch all states
     * 
     * @return PaginationResponse<StateResponse>
     */
    public PaginationResponse<StateResponse> fetchAllStates() {
	LOGGER.info("Fetch all States method started");
	Query query = new Query();
	Criteria andQuery = new Criteria();
	andQuery.andOperator(Criteria.where("status").regex(Status.ACTIVE.toString()));
	query.addCriteria(andQuery);
	List<String> states = mongoTemplate.findDistinct(query, "state", StatesMaster.class, String.class);
	states = states.stream().sorted(String::compareToIgnoreCase).collect(Collectors.toList());
	PaginationResponse<StateResponse> statesResponse = new PaginationResponse<>();
	statesResponse.setMessage(Constants.STATES_DATA_FETCHED);
	statesResponse.setData(
		states.stream().map(state -> StatesMapper.getStateResponse(state)).collect(Collectors.toList()));
	LOGGER.info("Fetch all States method ended");
	return statesResponse;
    }

    public PaginationResponse<CityResponse> fetchAllCitiesByState(String state) {
	LOGGER.info("Fetch all Cities by state name method started");
	List<StatesMaster> cities = statesMasterRepository.findByStateAndStatus(state, Status.ACTIVE.toString());
	List<CityResponse> cityResponseList = cities.stream().map(request -> StatesMapper.getCityResponse(request))
		.collect(Collectors.toList());
	PaginationResponse<CityResponse> paginationResponse = new PaginationResponse<>();
	paginationResponse.setMessage(Constants.CITIES_DATA_FETCHED);
	paginationResponse.setData(cityResponseList.stream().sorted(Comparator.comparing(CityResponse::getName))
		.collect(Collectors.toList()));
	paginationResponse.setSize(cityResponseList.isEmpty() ? 0 : Long.valueOf(cityResponseList.size()));
	LOGGER.info("Fetch all Cities by state name method ended");
	return paginationResponse;
    }

}
