package com.wavelabs.sb.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.wavelabs.sb.documents.StoreLocations;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.mappers.StoreMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.StoreRequest;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.StoreDetails;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.StoreService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

//@RestController
//@RequestMapping("/api/v1/clients")
//@CrossOrigin("*")
public class StoreController {

	@Autowired
	StoreService storeService;
	
	@Autowired
	AuthenticationService authenticationService;

	@ApiOperation(value = "This operation is responsible to save Store")
	@ApiResponses({ @ApiResponse(code = 200, response = BaseResponse.class, message = "Success"),
		@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
		@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
		@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@PostMapping(value = "/{client_id}/stores", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SuccessResponse> saveStore(
		@RequestHeader(required = true, value = "Authorization") String authorization,
		@PathVariable(required = true, value = "client_id") String clientId, @RequestBody StoreRequest request,
		HttpServletRequest httpRequest) {
	    	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
		storeService.isStoreIdMapped(request.getStoreId(), clientId);
		StoreLocations response = storeService.saveStoreDetails(request, clientId, details);
		return ResponseEntity.status(HttpStatus.OK).body(StoreMapper.toResponse(response));
	}
	
	@ApiOperation(value = "This operation is used to fetch Stroes of a Client")
	@ApiResponses({ @ApiResponse(code = 200, response = StoreDetails.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "UnAuthorized Access / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "You don’t have an access to this api"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping("/{client_id}/stores")
	public ResponseEntity<List<StoreDetails>> getStores(@PathVariable(required = true, value = "client_id") String clientId,
			@RequestHeader(required = true, value = "Authorization") String authorization) {
		return ResponseEntity.status(HttpStatus.OK).body(storeService.fetchStoresByClientId(clientId));
	}
	
	

}
