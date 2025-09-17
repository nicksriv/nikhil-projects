package com.wavelabs.sb.controllers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.command.CreateReportCommand;
import com.wavelabs.sb.command.DeleteReportCommand;
import com.wavelabs.sb.command.DownloadReportCommand;
import com.wavelabs.sb.command.FetchAllReportConfigurationsCommand;
import com.wavelabs.sb.command.FetchColumnsCommand;
import com.wavelabs.sb.command.FetchModuleReportsCommand;
import com.wavelabs.sb.command.FetchReportColumnsCommand;
import com.wavelabs.sb.command.FetchReportCommand;
import com.wavelabs.sb.command.SaveReportColumnsCommand;
import com.wavelabs.sb.command.UpdateReportCommand;
import com.wavelabs.sb.command.ViewReportCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.enums.request.FetchReportConfigurationsRequest;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.ReportMapper;
import com.wavelabs.sb.model.CreateReportModel;
import com.wavelabs.sb.model.DeleteReportModel;
import com.wavelabs.sb.model.FetchReportChartsByModuleIdModel;
import com.wavelabs.sb.model.FetchReportColumnsModel;
import com.wavelabs.sb.model.ReportColumnRequestModel;
import com.wavelabs.sb.model.ReportConfigurationModel;
import com.wavelabs.sb.model.ReportsRequestModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdateReportModel;
import com.wavelabs.sb.request.AddCustomVisibleColumn;
import com.wavelabs.sb.request.AddReportRequest;
import com.wavelabs.sb.request.CreateReportRequest;
import com.wavelabs.sb.request.CustomColumnsConfigurations;
import com.wavelabs.sb.request.FetchColumnsRequest;
import com.wavelabs.sb.request.ReportColumnRequest;
import com.wavelabs.sb.request.ReportsRequest;
import com.wavelabs.sb.request.UpdateReportRequest;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.CustomColumnsResponse;
import com.wavelabs.sb.response.CustomResponse;
import com.wavelabs.sb.response.FetchColumnsResponse;
import com.wavelabs.sb.response.FetchCustomAndVisibleColumns;
import com.wavelabs.sb.response.FetchFormResponse;
import com.wavelabs.sb.response.FetchReportResponse;
import com.wavelabs.sb.response.ModuleReportResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.DynamicReportsGenrationService;
import com.wavelabs.sb.services.ReportService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class ReportsController {

	@Autowired
	CreateReportCommand createReportCommand;

	@Autowired
	UpdateReportCommand updateReportCommand;

	@Autowired
	FetchReportCommand fetchReportCommand;

	@Autowired
	ViewReportCommand viewReportCommand;
	@Autowired
	DeleteReportCommand deleteReportCommand;

	@Autowired
	FetchAllReportConfigurationsCommand fetchAllReportConfigurationsCommand;

	@Autowired
	AuthenticationService authenticationService;

	@Autowired
	FetchColumnsCommand fetchColumnsCommand;

	@Autowired
	FetchReportColumnsCommand fetchReportColumnsCommand;

	@Autowired
	FetchModuleReportsCommand fetchModuleReportsCommand;

	@Autowired
	SaveReportColumnsCommand saveReportColumnsCommand;

	@Autowired
	DownloadReportCommand downloadReportCommand;

	@Autowired
	DynamicReportsGenrationService dynamicReportService;

	@Autowired
	private ReportService reportService;

	@ApiOperation(value = "This operation is used to save report")
	@ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
	@EnableTokenAuthorisation
	@PostMapping(value = "/reportconfigurations", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SuccessResponse> saveReportConfigurations(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			HttpServletRequest httpServletRequest, @Valid @RequestBody CreateReportRequest request) {
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		CreateReportModel model = new CreateReportModel();
		model.setDetails(tokenPayLoadDetails);
		model.setRequest(request);

		return createReportCommand.execute(model);
	}

	@ApiOperation(value = "This operation is used to update report")
	@ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
	@EnableTokenAuthorisation
	@PutMapping(value = "/dynamic/reportconfigurations/{reportId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SuccessResponse> updateReportConfigurations(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			HttpServletRequest httpServletRequest, @Valid @RequestBody UpdateReportRequest request,
			@PathVariable String reportId) {
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		request.setId(reportId);
		UpdateReportModel model = new UpdateReportModel();
		model.setDetails(tokenPayLoadDetails);
		model.setRequest(request);
		return updateReportCommand.execute(model);
	}

	@ApiOperation(value = "This operation is used to fetch report")
	@ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
	@GetMapping(value = "/reportconfigurations/{configurationsId}/report", produces = MediaType.APPLICATION_JSON_VALUE)
	@EnableTokenAuthorisation
	public ResponseEntity<List<LinkedHashMap<String, Object>>> getReport(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			@PathVariable String configurationsId, @RequestParam(required = false) Optional<String> to,
			@RequestParam(required = false) Optional<String> from,
			@RequestParam(required = false) Optional<String> sites, HttpServletRequest httpServletRequest) {
		ReportsRequest reportsRequest = ReportMapper.get(from, to, sites, configurationsId);

		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		ReportsRequestModel model = new ReportsRequestModel();
		model.setDetails(tokenPayLoadDetails);
		model.setRequest(reportsRequest);
		return ResponseEntity.ok(viewReportCommand.execute(model));
	}

	@ApiOperation(value = "This operation is used to fetch report")
	@ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
	@EnableTokenAuthorisation
	@GetMapping(value = "/reportconfigurations/{configurationsId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<FetchReportResponse> getReportConfigurations(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			HttpServletRequest httpServletRequest, @PathVariable String configurationsId,
			@RequestParam(required = false) Optional<String> to, @RequestParam(required = false) Optional<String> from,
			@RequestParam(required = false) Optional<String> sites) {
		ReportsRequest reportsRequest = ReportMapper.get(from, to, sites, configurationsId);
		return fetchReportCommand.execute(reportsRequest);
	}

	@ApiOperation(value = "This operation is used to delete report")
	@ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to save record on database due to database is down") })
	@EnableTokenAuthorisation
	@DeleteMapping(value = "/dynamic/reportconfigurations/{reportId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SuccessResponse> deleteReportConfigurations(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			@PathVariable String reportId, HttpServletRequest httpServletRequest) {
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		DeleteReportModel model = new DeleteReportModel();
		model.setReportId(reportId);
		model.setTokenPayLoadDetails(tokenPayLoadDetails);
		return ResponseEntity.status(HttpStatus.OK).body(deleteReportCommand.execute(model));
	}

	@ApiOperation(value = "This operation is used to fetch all report configurations")
	@ApiResponses({ @ApiResponse(code = 200, response = ReportConfigurationModel.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping(value = "/reportconfigurations", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PaginationResponse<ReportConfigurationModel>> fetchAllReportConfigurations(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			@ModelAttribute FetchReportConfigurationsRequest fetchAllReportConfigurationsRequest) {
		return fetchAllReportConfigurationsCommand.execute(fetchAllReportConfigurationsRequest);
	}

	@ApiOperation(value = "This operation is used to update report")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchColumnsResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
	@PostMapping(value = "/reportconfigurations/columns", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@EnableTokenAuthorisation
	public ResponseEntity<FetchColumnsResponse> fetchColumns(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			HttpServletRequest httpServletRequest, @Valid @RequestBody FetchColumnsRequest request) {
		return fetchColumnsCommand.execute(request);
	}

	@ApiOperation(value = "This operation is used to fetch all report configurations")
	@ApiResponses({ @ApiResponse(code = 200, response = ColumnsResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping(value = "/reportconfigurations/{reportId}/columns", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ColumnsResponse>> fetchAllReportConfigurations(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			@PathVariable String reportId, HttpServletRequest httpServletRequest) {
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		FetchReportColumnsModel model = new FetchReportColumnsModel();
		model.setDetails(tokenPayLoadDetails);
		model.setReportId(reportId);

		return fetchReportColumnsCommand.execute(model);
	}

	@ApiOperation(value = "This operation is used to fetch all report configurations")
	@ApiResponses({ @ApiResponse(code = 200, response = ModuleReportResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping(value = "/modules/{moduleId}/reports", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ModuleReportResponse> fetchModuleReports(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			@PathVariable String moduleId, @RequestParam(required = false) String sortOrder,
			HttpServletRequest httpServletRequest) {
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		FetchReportChartsByModuleIdModel model = new FetchReportChartsByModuleIdModel();
		model.setDetails(tokenPayLoadDetails);
		model.setModuleId(moduleId);
		model.setSortOrder(sortOrder);
		return fetchModuleReportsCommand.execute(model);
	}

	@ApiOperation(value = "This operation is used to fetch all report configurations")
	@ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@PostMapping(value = "/reportsconfigurations/{reportId}/visiblecolumns", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SuccessResponse> saveReportColumns(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			@PathVariable String reportId, @Valid @RequestBody ReportColumnRequest request,
			HttpServletRequest httpServletRequest) {
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		ReportColumnRequestModel model = new ReportColumnRequestModel();
		model.setDetails(tokenPayLoadDetails);
		model.setReportId(reportId);
		model.setRequest(request);
		return saveReportColumnsCommand.execute(model);
	}

	@ApiOperation(value = "This operation is used to fetch Screen by screen-id")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping(value = "/{reportId}/download-report")
	public ResponseEntity<Resource> bulkUploadTemplate(
			@RequestHeader(required = true, value = "Authorization") String authorization,
			@PathVariable(required = false, value = "reportId") String reportId,
			@RequestParam(required = false) Optional<String> to, @RequestParam(required = false) Optional<String> from,
			@RequestParam(required = false) Optional<String> sites, HttpServletRequest httpServletRequest) {
		ReportsRequest reportsRequest = ReportMapper.get(from, to, sites, reportId);
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpServletRequest);
		ReportsRequestModel model = new ReportsRequestModel();
		model.setDetails(tokenPayLoadDetails);
		model.setRequest(reportsRequest);
		return downloadReportCommand.execute(model);
	}

	@GetMapping("/report/genrate")
	public ResponseEntity<List<Hashtable<String, Object>>> reportGenration(@ModelAttribute ReportsRequest request) {
		List<Hashtable<String, Object>> fetchReport = dynamicReportService.fetchReport(request);
		return ResponseEntity.ok(fetchReport);
	}

	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@PostMapping("report/config/{reportId}")
	public SuccessResponse saveReports(@PathVariable String reportId,
			@Valid @RequestBody AddReportRequest addReportRequest, HttpServletRequest httpServletRequest) {

		try {
			authenticationService.getTokenPayLoadDetails(httpServletRequest);
			reportService.addReport(reportId, addReportRequest);
			return new SuccessResponse("Report config Added successfully");

		} catch (Exception e) {
			return new SuccessResponse("Failed to add Report config " + e.getMessage());

		}

	}

	@ApiOperation(value = "This operation is used to add custom columns by reportId")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@PostMapping("report/config/custom-columns/{reportId}")
	public SuccessResponse customColumnsConfigurations(@PathVariable String reportId,
			@Valid @RequestBody CustomColumnsConfigurations request, HttpServletRequest httpServletRequest) {

		try {
			authenticationService.getTokenPayLoadDetails(httpServletRequest);
			reportService.addCustomColumns(reportId, request);
			return new SuccessResponse("Report custom column has been added successfully");

		} catch (Exception e) {
			return new SuccessResponse("Failed to add Report custom column " + e.getMessage());
		}

	}

	@ApiOperation(value = "This operation is used to update custom columns with reportId")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@PutMapping("report/custom-columns/{reportId}")
	public SuccessResponse updateCustomColumnsConfigurations(@PathVariable String reportId,
			@Valid @RequestBody CustomColumnsConfigurations request, HttpServletRequest httpServletRequest) {

		try {
			authenticationService.getTokenPayLoadDetails(httpServletRequest);
			reportService.updateCustomColumns(reportId, request);
			return new SuccessResponse("Report custom column has been updated successfully");

		} catch (Exception e) {
			return new SuccessResponse("Failes to update Report custom column " + e.getMessage());
		}

	}

	@ApiOperation(value = "This operation is used to delete custom columns with reportId")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@DeleteMapping("report/{reportId}/custom-column/{customColumnId}")
	public SuccessResponse deleteCustomColumn(@PathVariable String reportId, @PathVariable String customColumnId,
			HttpServletRequest httpServletRequest) {

		try {

			authenticationService.getTokenPayLoadDetails(httpServletRequest);
			reportService.deleteCustomColumn(reportId, customColumnId);
			return new SuccessResponse("Report custom column has been deleted successfully");
		} catch (Exception e) {
			return new SuccessResponse("Failed to delete Report custom column " + e.getMessage());
		}

	}

	@ApiOperation(value = "This operation is used to fetch custom columns by report-id")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping("report/custom-column/{reportId}")
	public List<CustomColumnsResponse> fetchCustomColumns(@PathVariable String reportId,
			HttpServletRequest httpServletRequest) {
		authenticationService.getTokenPayLoadDetails(httpServletRequest);
		return reportService.getCustomColumns(reportId);

	}

	@ApiOperation(value = "This operation is used to fetch custom columns and visible columns by report-id")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping("report/all-columns/{reportId}")
	public FetchCustomAndVisibleColumns fetchCustomandVisibleColumns(@PathVariable String reportId,
			HttpServletRequest httpServletRequest) {
		authenticationService.getTokenPayLoadDetails(httpServletRequest);
		return reportService.getCustomandVisibleColumns(reportId);
	}

	@ApiOperation(value = "This operation is used to fetch selected columns by report-id")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping("report/selected-columns/{reportId}")
	public FetchCustomAndVisibleColumns getSelectedColumns(@PathVariable String reportId,
			HttpServletRequest httpServletRequest) {
		authenticationService.getTokenPayLoadDetails(httpServletRequest);
		return reportService.getSelectedColumns(reportId);
	}

	@ApiOperation(value = "This operation is used to fetch custom columns and visible columns by report-id")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@PostMapping("report/save/selected-columns/{reportId}")
	public SuccessResponse addCustomAndVisibleColumns(@PathVariable String reportId,
			@Valid @RequestBody AddCustomVisibleColumn addCustomVisibleColumn, HttpServletRequest httpServletRequest) {

		try {
			authenticationService.getTokenPayLoadDetails(httpServletRequest);
			reportService.addCustomandVisibleColumns(reportId, addCustomVisibleColumn);
			return new SuccessResponse("Report selected columns updated successfully");

		} catch (Exception e) {
			return new SuccessResponse("Failed to update Report selected columns " + e.getMessage());
		}

	}

	@ApiOperation(value = "This operation is used to fetch table data from custom columns and visible columns by report-id")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping("report/data/{reportId}")
	public Page<Document> getReportsCustomandVisibleColumns(Pageable pageable,
	@RequestParam(required = false, defaultValue = "0")int page,
			@PathVariable String reportId,
			@RequestParam(required = false) Map<String, Object> filter,
			@RequestParam(required = false) String search,
			HttpServletRequest httpServletRequest) {
		authenticationService.getTokenPayLoadDetails(httpServletRequest);

		return reportService.getReportsCustomandVisibleColumns(pageable , reportId , page, filter, search);
	}

	@ApiOperation(value = "This operation is used to export the data to excel")
	@ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
			@ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
			@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
			@ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
	@EnableTokenAuthorisation
	@GetMapping("report/data/excel/download/{reportId}")
	public ResponseEntity<byte[]> exportToExcel(
			@PathVariable String reportId,
			@RequestParam(required = false) Map<String, Object> filter,
			@RequestParam(required = false) String search,
			HttpServletRequest httpServletRequest) {

		try {
			Page<Document> documentPage = getReportsCustomandVisibleColumns(null , 0 ,reportId, filter, search,
					httpServletRequest);

			Map<String, String> headerNames = new HashMap<>();
			List<String> rowKeys = new ArrayList<>();

			List<Document> data = documentPage.getContent();

			for (Document doc : data) {
				FetchCustomAndVisibleColumns response = reportService.getCustomandVisibleColumns(reportId);
				for (CustomResponse custom : response.getCustomResponses()) {
					if (doc.containsKey(custom.getId())) {
						headerNames.put(custom.getId(), custom.getName());
					}
				}
                                break;
			}

			byte[] contents = reportService.getExcelSheet(data, headerNames, rowKeys);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(
					MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
			headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			headers.setContentDispositionFormData("Report Details", "Report.xlsx");
			ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);

			return response;

		} catch (Exception e) {
			throw new ResourceNotFoundException(Constants.FAILED_TO_GENERATE_EXCEL);
		}
	}
}
