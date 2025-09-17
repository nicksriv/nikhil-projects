package com.wavelabs.sb.mappers;

import java.time.Instant;

import com.wavelabs.sb.documents.StatesMaster;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.StatesRequest;
import com.wavelabs.sb.response.CityResponse;
import com.wavelabs.sb.response.StateResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

public class StatesMapper {

    private StatesMapper() {
    }
    
    public static StatesMaster getStatesMaster(StatesRequest request, TokenPayLoadDetails details) {
	StatesMaster statesMaster = new StatesMaster();
	statesMaster.setCreatedAt(Instant.now());
	statesMaster.setModifiedAt(Instant.now());
	statesMaster.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	statesMaster.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	statesMaster.setCreatedUserType(details.getTypeOfUser());
	statesMaster.setModifiedUserType(details.getTypeOfUser());
	statesMaster.setCity(request.getCity());
	statesMaster.setState(request.getState());
	statesMaster.setStatus(Status.ACTIVE);
	return statesMaster;
    }

    public static StateResponse getStateResponse(StatesMaster stateMaster) {
	StateResponse stateResponse= new StateResponse();
	stateResponse.setName(stateMaster.getState());
	return stateResponse;
    }
    public static StateResponse getStateResponse(String state) {
	StateResponse stateResponse= new StateResponse();
	stateResponse.setName(state);
	return stateResponse;
    }

    public static CityResponse getCityResponse(StatesMaster stateMaster) {
	CityResponse cityResponse= new CityResponse();
	cityResponse.setName(stateMaster.getCity());
	cityResponse.setId(stateMaster.getId());
	return cityResponse;
    }
}
