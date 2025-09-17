package com.wavelabs.sb.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.documents.Modules;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.mappers.ModuleMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.ModuleRequest;
import com.wavelabs.sb.request.StatesRequest;
import com.wavelabs.sb.response.BanksResponse;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.CityResponse;
import com.wavelabs.sb.response.ModulesResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.StateResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.BankService;
import com.wavelabs.sb.services.ModuleService;
import com.wavelabs.sb.services.StatesMasterService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@RestController
@Validated
@RequestMapping("/api/v1/masters")
@CrossOrigin("*")
public class MasterDataController {

	@Autowired
	BankService bankService;

	@Autowired
	ModuleService moduleService;
	
	@Autowired
	StatesMasterService statesMasterService;
	
	@Autowired
	AuthenticationService authenticationService;

	@ApiOperation(value = "This operation is responsible to save banks master data")
	@ApiResponses({ @ApiResponse(code = 200, response = BaseResponse.class, message = "Success"),
		@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
		@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
		@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@PostMapping(value = "/banks", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BaseResponse> saveBanks(
		@RequestHeader(required = true, value = "Authorization") String authorization,
		@Valid @RequestBody List<String> banks, HttpServletRequest httpRequest)
		throws IllegalArgumentException {
	    	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
		return ResponseEntity.status(HttpStatus.OK).body(bankService.saveBanks(banks, details));

	}

	@ApiOperation(value = "This operation is responsible to fetch banks master data")
	@ApiResponses({ @ApiResponse(code = 200, response = BanksResponse.class, message = "Success"),
		@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
		@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
		@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping(value = "/banks", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BaseResponse> fetchAllBanks(
		@RequestHeader(required = true, value = "Authorization") String authorization) {

		return ResponseEntity.status(HttpStatus.OK).body(bankService.fetchAllBanks());

	}

	@ApiOperation(value = "This operation is responsible to save Modules master data")
	@ApiResponses({ @ApiResponse(code = 200, response = BaseResponse.class, message = "Success"),
		@ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
		@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
		@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@PostMapping(value = "/modules", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SuccessResponse> saveModule(
		@RequestHeader(required = true, value = "Authorization") String authorization,
		@RequestBody ModuleRequest request, HttpServletRequest httpRequest) {
	    TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	    Modules response = moduleService.saveModuleDetails(request, details);
	    return ResponseEntity.status(HttpStatus.OK).body(ModuleMapper.toResponse(response));
	}

	@ApiOperation(value = "This operation is responsible to fetch All Modules master data")
	@ApiResponses({ @ApiResponse(code = 200, response = BaseResponse.class, message = "Success"),
		@ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
		@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
		@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping(value = "/modules")
	public ResponseEntity<List<ModulesResponse>> fetchAllModules(
		@RequestHeader(required = true, value = "Authorization") String authorization) {
	    return ResponseEntity.ok(moduleService.fetchAllModules());
	}
	
	@ApiOperation(value = "This operation is responsible to save States master data")
	@ApiResponses({ @ApiResponse(code = 200, response = BaseResponse.class, message = "Success"),
		@ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
		@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
		@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@PostMapping(value = "/states", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BaseResponse> saveStatesMaster(
		@RequestHeader(required = true, value = "Authorization") String authorization,
		@Valid @RequestBody List<StatesRequest> statesRequest,
		HttpServletRequest httpRequest) throws IllegalArgumentException {
	    	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
		return ResponseEntity.status(HttpStatus.OK).body(statesMasterService.saveStates(statesRequest, details));

	}

	@ApiOperation(value = "This operation is responsible to fetch states master data")
	@ApiResponses({ @ApiResponse(code = 200, response = BanksResponse.class, message = "Success"),
		@ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
		@ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
		@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
		@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping(value = "/states", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PaginationResponse<StateResponse>> fetchAllStates(
		@RequestHeader(required = true, value = "Authorization") String authorization) {

		return ResponseEntity.status(HttpStatus.OK).body(statesMasterService.fetchAllStates());

	}

	@ApiOperation(value = "This operation is responsible to fetch cities master data")
	@ApiResponses({ @ApiResponse(code = 200, response = BanksResponse.class, message = "Success"),
		@ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
		@ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
		@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
		@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping(value = "/cities", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PaginationResponse<CityResponse>> fetchAllCitiesByState(
		@RequestHeader(required = true, value = "Authorization") String authorization,
		@RequestParam(required = true, value = "stateName") String stateName) {

		return ResponseEntity.status(HttpStatus.OK).body(statesMasterService.fetchAllCitiesByState(stateName));

	}

}
