package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.StatesMaster;
import com.wavelabs.sb.model.MasterDataBuilder;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.repositories.StatesMasterRepository;
import com.wavelabs.sb.request.StatesRequest;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.CityResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.StateResponse;

@RunWith(MockitoJUnitRunner.class)
public class StatesMasterServiceTest {

    @InjectMocks
    private StatesMasterService statesMasterService;

    @Mock
    private StatesMasterRepository statesMasterRepository;
    
    @Mock
    private MongoTemplate mongoTemplate;
    

    @Test
    @DisplayName("test saveStatesTest success response")
    public void saveStatesTest() throws ParseException {
	List<StatesRequest> requests= new ArrayList<>();
	requests.add(MasterDataBuilder.getStatesRequest());
	BaseResponse response = statesMasterService.saveStates(requests, ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals(Constants.STATES_DATA_CREATED, response.getMessage());
    }


    @Test
    @DisplayName("test fetchAllStatesTest success response")
    public void fetchAllStatesTest()  {
	when(mongoTemplate.findDistinct(MasterDataBuilder.getstatesQuery(), "state", StatesMaster.class, String.class)).thenReturn(MasterDataBuilder.getStatesList());
	PaginationResponse<StateResponse> response = statesMasterService.fetchAllStates();
	assertEquals(Constants.STATES_DATA_FETCHED, response.getMessage());
    }


    @Test
    @DisplayName("test fetchAllCitiesByStateTest success response")
    public void fetchAllCitiesByStateTest()  {
	when(statesMasterRepository.findByStateAndStatus(Mockito.anyString(),Mockito.anyString())).thenReturn(MasterDataBuilder.getStatesMasters());
	PaginationResponse<CityResponse> response = statesMasterService.fetchAllCitiesByState("Telangana");
	assertEquals(Constants.CITIES_DATA_FETCHED, response.getMessage());
    }
}
