package com.wavelabs.sb.controllers;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.command.CreateChartCommand;
import com.wavelabs.sb.command.FetchAllChartsCommand;
import com.wavelabs.sb.command.FetchChartByModuleCommand;
import com.wavelabs.sb.command.FetchChartCommand;
import com.wavelabs.sb.command.UpdateChartCommand;
import com.wavelabs.sb.command.UpdateChartsPriorityCommand;
import com.wavelabs.sb.documents.ChartDetails;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.mappers.ReportMapper;
import com.wavelabs.sb.model.ChartsDataModel;
import com.wavelabs.sb.model.ChartsPriorityRequestModel;
import com.wavelabs.sb.model.CreateChartModel;
import com.wavelabs.sb.model.FetchAllChartsModel;
import com.wavelabs.sb.model.FetchReportChartsByModuleIdModel;
import com.wavelabs.sb.model.ReportsRequestModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdateChartModel;
import com.wavelabs.sb.request.ChartsPriorityRequest;
import com.wavelabs.sb.request.CreateChartRequest;
import com.wavelabs.sb.request.ReportsRequest;
import com.wavelabs.sb.request.UpdateChartRequest;
import com.wavelabs.sb.response.ChartsResponse;
import com.wavelabs.sb.response.FetchChartResponse;
import com.wavelabs.sb.response.ListResponse;
import com.wavelabs.sb.response.ModuleChartsResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.ChartService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class ChartsController {

    @Autowired
    CreateChartCommand createChartCommand;

    @Autowired
    UpdateChartCommand updateChartCommand;

    @Autowired
    FetchAllChartsCommand fetchAllChartsCommand;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    FetchChartCommand fetchChartCommand;

    @Autowired
    FetchChartByModuleCommand fetchChartByModuleCommand;

    @Autowired
    UpdateChartsPriorityCommand updateChartsPriorityCommand;

	@Autowired
	private ChartService chartService;
    

	@ApiOperation(value = "This operation is used to create chart")
	@ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to save record on database due to database is down") })
	@EnableTokenAuthorisation
	@PostMapping(value = "/charts", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SuccessResponse> createChart(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			@Valid @RequestBody CreateChartRequest request, HttpServletRequest httpServletRequest) {
		CreateChartModel model = new CreateChartModel();
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		model.setCreateChartRequest(request);
		model.setTokenPayLoadDetails(tokenPayLoadDetails);
		return ResponseEntity.status(HttpStatus.OK).body(createChartCommand.execute(model));
	}

	@ApiOperation(value = "This operation is used to update chart")
	@ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to save record on database due to database is down") })
	@EnableTokenAuthorisation
	@PutMapping(value = "/charts/{chartId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SuccessResponse> editChart(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			@Valid @RequestBody UpdateChartRequest request, @PathVariable String chartId,
			HttpServletRequest httpServletRequest) {
		UpdateChartModel model = new UpdateChartModel();
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		model.setId(chartId);
		model.setUpdateChartRequest(request);
		model.setTokenPayLoadDetails(tokenPayLoadDetails);
		return ResponseEntity.status(HttpStatus.OK).body(updateChartCommand.execute(model));
	}


    @ApiOperation(value = "This operation is used to fetch all charts based on report id")
    @ApiResponses({ @ApiResponse(code = 200, response = ChartsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/charts", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ListResponse<ChartsDataModel>> fetchAllCharts(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @RequestParam("reportConfigurationId") String reportConfigurationId,
	    HttpServletRequest httpServletRequest) {
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
	FetchAllChartsModel model = new FetchAllChartsModel();
	model.setDetails(tokenPayLoadDetails);
	model.setReportId(reportConfigurationId);
	return fetchAllChartsCommand.execute(model);
    }

    @ApiOperation(value = "This operation is used to fetch chart based on chartId")
    @ApiResponses({ @ApiResponse(code = 200, response = FetchChartResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/charts/{chartId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ModuleChartsResponse> getChartDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable String chartId, @RequestParam(required = false) Optional<String> to, @RequestParam(required = false) Optional<String> from,
	    @RequestParam(required = false) Optional<String> sites, HttpServletRequest httpServletRequest) {
	ReportsRequest reportsRequest = ReportMapper.get(from, to, sites, null);
	reportsRequest.setChartId(chartId);
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
	ReportsRequestModel model = new ReportsRequestModel();
	model.setDetails(tokenPayLoadDetails);
	model.setRequest(reportsRequest);
	return ResponseEntity.status(HttpStatus.OK).body(fetchChartCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to fetch chart based on chartId")
    @ApiResponses({ @ApiResponse(code = 200, response = ModuleChartsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/modules/{moduleId}/charts", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ListResponse<ModuleChartsResponse>> getModuleCharts(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable String moduleId, HttpServletRequest httpServletRequest) {
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
	FetchReportChartsByModuleIdModel model = new FetchReportChartsByModuleIdModel();
	model.setDetails(tokenPayLoadDetails);
	model.setModuleId(moduleId);
	return fetchChartByModuleCommand.execute(model);
    }

    @ApiOperation(value = "This operation is used to update charts priority based")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/charts", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateChartsPriority(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @RequestParam String reportId, @RequestBody List<ChartsPriorityRequest> request,
	    HttpServletRequest httpServletRequest) {
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
	ChartsPriorityRequestModel model = new ChartsPriorityRequestModel();
	model.setDetails(tokenPayLoadDetails);
	model.setRequest(request);
	model.setReportId(reportId);
	return updateChartsPriorityCommand.execute(model);
    }

	//Getting list of charts
	@ApiOperation(value = "This operation is used to get list of charts")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
		@EnableTokenAuthorisation
		@GetMapping("/charts/{reportId}")
	public List<ChartDetails> getChartsList(@PathVariable String reportId, HttpServletRequest httpServletRequest){
		authenticationService.getTokenPayLoadDetails(httpServletRequest);
		List<ChartDetails> list = chartService.getChartsByReportId(reportId);
		return list;
	}

	//Api to find specific chart details
	@ApiOperation(value = "This operation is used to get details of charts")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
		@EnableTokenAuthorisation
	@GetMapping("/charts-details/{chartId}")
	public ChartDetails getChartsDetails(@PathVariable String chartId, HttpServletRequest httpServletRequest){
		authenticationService.getTokenPayLoadDetails(httpServletRequest);
		return chartService.getChartsDetails(chartId);		
	}

	

}
