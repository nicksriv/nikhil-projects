package com.wavelabs.sb.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.Collections;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.ReportColumns;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.ScreenFields;
import com.wavelabs.sb.documents.SelectedColumns;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.enums.Operations;
import com.wavelabs.sb.enums.request.FetchReportConfigurationsRequest;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.ReportMapper;
import com.wavelabs.sb.mappers.ScreenBuilderMapper;
import com.wavelabs.sb.model.CreateReportModel;
import com.wavelabs.sb.model.DeleteReportModel;
import com.wavelabs.sb.model.FetchReportColumnOrder;
import com.wavelabs.sb.model.FetchReportColumnsModel;
import com.wavelabs.sb.model.ReportColumnRequestModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdateReportModel;
import com.wavelabs.sb.repository.ModuleRepository;
import com.wavelabs.sb.repository.ReportColumnsRepository;
import com.wavelabs.sb.repository.ReportConfigurationsRepository;
import com.wavelabs.sb.repository.RoleOnboardingRepository;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.repository.SubModuleRepository;
import com.wavelabs.sb.request.AddCustomVisibleColumn;
import com.wavelabs.sb.request.AddReportRequest;
import com.wavelabs.sb.request.CreateReportRequest;
import com.wavelabs.sb.request.CustomColumns;
import com.wavelabs.sb.request.CustomColumnsConfigurations;
import com.wavelabs.sb.request.ReportsRequest;
import com.wavelabs.sb.request.UpdateReportRequest;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.CustomColumnsResponse;
import com.wavelabs.sb.response.CustomResponse;
import com.wavelabs.sb.response.FetchCustomAndVisibleColumns;
import com.wavelabs.sb.response.FetchReportResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class ReportService {
	private static final Logger LOGGER = LoggerFactory.getLogger(ReportService.class);

	@Autowired
	ScreenBuilderService screenBuilderService;

	@Autowired
	ReportConfigurationsRepository reportConfigurationsRepository;

	@Autowired
	SubModuleRepository subModuleRepository;

	@Autowired
	RoleOnboardingRepository roleOnboardingRepository;

	@Autowired
	DynamicReportsGenrationService dynamicReportGenrattionService;
	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	ModuleRepository moduleRepository;

	@Autowired
	ScreenFieldsRepository screenFieldsRepository;

	@Autowired
	ReportColumnsRepository reportColumnsRepository;

	public SuccessResponse createReport(CreateReportModel model) {

		CreateReportRequest request = model.getRequest();
		LOGGER.info("Create Report method started");
		Module module = screenBuilderService.getModule(request.getParentModuleId());
		screenBuilderService.getClientDetails(request.getClientId());
		ReportConfigurations report = reportConfigurationsRepository
				.findByClientIdAndDeletedAndNameIgnoreCase(request.getClientId(), false, request.getName());
		if (report != null) {
			throw new BadRequestException(ErrorMessages.REPORT_ALREADY_EXISTS);
		}
		ReportConfigurations configurations = ReportMapper.getReportConfigurations(request, module,
				model.getDetails().getId());
		reportConfigurationsRepository.save(configurations);
		LOGGER.info("Create Report method ended");
		return new SuccessResponse(configurations.getId(), Constants.REPORT_HAS_BEEN_CREATED_SUCCESSFULLY);
	}

	public SuccessResponse updateReport(UpdateReportModel model) {

		UpdateReportRequest request = model.getRequest();
		LOGGER.info("Create Report method started");
		isValidRequest(request.getCustomColumns());
		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(request.getId());
		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.NO_RECORD_FOUND);
		}
		Module module = reportOptional.get().getModule();
		if ((module == null && StringUtils.isBlank(request.getParentModuleId()))
				|| (module != null && !module.getId().equalsIgnoreCase(request.getParentModuleId()))) {
			module = screenBuilderService.getModule(request.getParentModuleId());
		}
		if (reportConfigurationsRepository.existsByClientIdAndDeletedAndNameIgnoreCaseAndIdNot(
				reportOptional.get().getClientId(), false, request.getName(), reportOptional.get().getId())) {
			throw new BadRequestException(ErrorMessages.REPORT_ALREADY_EXISTS);
		}
		List<SubModules> subModules = new ArrayList<>();
		if (module != null) {
			subModules = subModuleRepository.findByIdInAndModuleId(request.getSubmoduleIds(), module.getId());
		} else {
			subModules = subModuleRepository.findByIdIn(request.getSubmoduleIds());
		}

		List<RoleOnboardingDetails> roles = new ArrayList<>();
		if (request.getRoleIds() != null) {
			roles = roleOnboardingRepository.findAllByIdIn(request.getRoleIds());
		}
		ReportConfigurations configurations = ReportMapper.updateReportConfigurations(reportOptional.get(), request,
				module, subModules, roles, model.getDetails().getId());
		reportConfigurationsRepository.save(configurations);
		LOGGER.info("Create Report method ended");
		return new SuccessResponse(configurations.getId(), Constants.REPORT_HAS_BEEN_CREATED_SUCCESSFULLY);
	}

	private void isValidRequest(List<CustomColumns> customColumns) {
		if (customColumns != null) {
			customColumns.forEach(column -> {
				if (column.getFirst() != null && column.getSecond() != null
						&& !StringUtils.isBlank(column.getFirst().getSubModule())
						&& column.getFirst().getSubModule().equalsIgnoreCase(column.getSecond().getSubModule())
						&& !StringUtils.isBlank(column.getFirst().getReference())
						&& !column.getFirst().getReference().equalsIgnoreCase(column.getSecond().getReference())) {
					throw new BadRequestException(
							ErrorMessages.REFERENCE_NAME_NOT_SAME_FOR_SUBMODULE_ID + column.getSecond().getSubModule());
				} else if (column.getFirst() == null || column.getSecond() == null) {
					throw new BadRequestException(ErrorMessages.OPERANDS_CAN_NOT_BE_NULL);
				}
			});
		}

	}

	public FetchReportResponse fetchReport(ReportsRequest request) {
		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(request.getId());
		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.REPORT_ALREADY_EXISTS);
		}
		List<Hashtable<String, Object>> fetchReport = new ArrayList<>();
		try {
			fetchReport = dynamicReportGenrattionService.fetchReport(request);
		} catch (Exception exception) {
			LOGGER.info("Exception occured while gerenerating report:: {}", exception.getMessage());
		}
		ReportColumns reportColumns = getReportColumns(request.getId());
		List<String> visibleColumns = reportColumns != null ? reportColumns.getColumns() : new ArrayList<>();
		FetchReportColumnsModel model = new FetchReportColumnsModel();
		model.setReportId(request.getId());
		List<ColumnsResponse> columns = fetchReportColumns(model);
		return ReportMapper.fetchReportResponse(reportOptional.get(), fetchReport, visibleColumns, columns);
	}

	public SuccessResponse deleteReport(DeleteReportModel model) {
		String reportId = model.getReportId();
		TokenPayLoadDetails payLoadDetails = model.getTokenPayLoadDetails();
		LOGGER.info("Delete Report method started");
		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);
		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.REPORT_DOES_NOT_EXISTS);
		}
		ReportConfigurations reportConfigurations = reportOptional.get();
		reportConfigurations.setModifiedAt(Instant.now());
		reportConfigurations.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(payLoadDetails));
		reportConfigurations.setDeleted(Constants.TRUE);
		reportConfigurationsRepository.save(reportConfigurations);
		LOGGER.info("Delete Report method ended");
		return new SuccessResponse(reportId, Constants.REPORT_HAS_BEEN_DELETED_SUCCESSFULLY);
	}

	public PaginationResponse<ReportConfigurations> fetchAll(FetchReportConfigurationsRequest fetchAllRequest) {
		LOGGER.info("enter into fetchAll");
		LOGGER.info("fetch reports with filters query for clientId {}", fetchAllRequest.getClientId());
		if (StringUtils.isBlank(fetchAllRequest.getClientId())) {
			throw new BadRequestException(Constants.ACTIVE_CLIENT_NOT_FOUND);
		}
		if (!StringUtils.isBlank(fetchAllRequest.getClientId())) {
			screenBuilderService.getClientDetails(fetchAllRequest.getClientId());
		}
		List<ReportConfigurations> fetchAllReports = mongoTemplate
				.find(getQuery(fetchAllRequest, fetchAllRequest.getClientId(), true), ReportConfigurations.class);
		LOGGER.info("fetched reports for clientId list size {}", fetchAllReports.size());
		PaginationResponse<ReportConfigurations> reportDetails = new PaginationResponse<>();
		reportDetails.setMessage("Records fetched successfully");
		reportDetails.setConfigurations(fetchAllReports);
		long count = mongoTemplate.count(getQuery(fetchAllRequest, fetchAllRequest.getClientId(), false),
				ReportConfigurations.class);
		reportDetails.setTotal((int) count);
		return reportDetails;

	}

	private Query getQuery(FetchReportConfigurationsRequest fetchAllRequest, String clientId, Boolean withPagination) {
		Query query = new Query();
		Sort.Order order = new Sort.Order(getSortOrder(fetchAllRequest.getSortOrder()),
				getColumn(fetchAllRequest.getSortBy()));
		query.with(Sort.by(order));
		// query.addCriteria(new Criteria("clientId").is(clientId));
		query.addCriteria(new Criteria("deleted").is(false));
		if (withPagination) {
			query.with(Pageable.ofSize(getValue(fetchAllRequest.getSize(), 10))
					.withPage(getValue(fetchAllRequest.getPageNumber(), 0)));
		}
		List<Criteria> filterQuery = getFilterQuery(fetchAllRequest);
		if (!filterQuery.isEmpty()) {
			Criteria andQuery = new Criteria();
			andQuery.andOperator(filterQuery);
			query.addCriteria(andQuery);
		}
		return query;
	}

	private List<Criteria> getFilterQuery(FetchReportConfigurationsRequest request) {
		ArrayList<Criteria> filters = new ArrayList<>();
		if (isValid(request.getClientId())) {
			filters.add(Criteria.where("clientId").is(request.getClientId()));
		}
		if (isValid(request.getName())) {
			filters.add(Criteria.where("name").regex(request.getName(), Constants.REGEX_CASE_INSENSITIVE));
		}
		if (isValid(request.getModuleId())) {
			filters.add(Criteria.where("module.$id").in(getModuleIds(request.getModuleId())));
		}

		if (isValid(request.getStatus())) {
			filters.add(Criteria.where("status").is(request.getStatus().toUpperCase()));
		}

		if (isValid(request.getFrom()) && !isValid(request.getTo())) {
			Date from = Date.valueOf(getDate(request.getFrom()));
			Date toDate = Date.valueOf(LocalDate.now().plusDays(1));
			filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
		}
		if (!isValid(request.getFrom()) && isValid(request.getTo())) {
			Date from = Date.valueOf(LocalDate.of(2021, 01, 01));
			Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
			filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
		}
		if (isValid(request.getFrom()) && isValid(request.getTo())) {
			Date from = Date.valueOf(getDate(request.getFrom()));
			Date toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
			filters.add(Criteria.where("createdAt").gte(from).lte(toDate));
		}

		return filters;

	}

	private Sort.Direction getSortOrder(Optional<String> sortOrder) {
		return sortOrder != null && sortOrder.isPresent() && sortOrder.get().equalsIgnoreCase("ASC")
				? Sort.Direction.ASC
				: Sort.Direction.DESC;
	}

	private String getColumn(Optional<FetchReportColumnOrder> optional) {
		return optional != null && optional.isPresent() ? optional.get().getValue() : "modifiedAt";
	}

	private Integer getValue(Optional<Integer> value, Integer defaultValue) {
		return value != null && value.isPresent() ? value.get() : defaultValue;
	}

	private boolean isValid(String text) {
		return text != null && !text.equalsIgnoreCase("null") && !text.isEmpty();
	}

	public LocalDate getDate(String date) {
		DateTimeFormatter outputDateFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		try {
			return LocalDate.parse(date, outputDateFormat);

		} catch (Exception e) {
			throw new BadRequestException("Please provide date dd-mm-yyyy format");
		}
	}

	private List<ObjectId> getModuleIds(String moduleId) {
		Optional<Module> modules = moduleRepository.findByIdAndDeleted(moduleId, false);
		List<ObjectId> moduleIds = new ArrayList<>();
		if (modules.isPresent()) {
			moduleIds.add(new ObjectId(modules.get().getId()));
		}
		return moduleIds;
	}

	public List<ColumnsResponse> fetchReportColumns(FetchReportColumnsModel model) {
		LOGGER.info("fetchReportColumns method started");
		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(model.getReportId());
		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.NO_RECORD_FOUND);
		}
		List<String> reportColumnsList = new ArrayList<>();
		if (model.getDetails() != null && Constants.USER.equalsIgnoreCase(model.getDetails().getTypeOfUser())
				&& !Constants.ADMIN.equalsIgnoreCase(model.getDetails().getUserRole())) {
			Optional<ReportColumns> reportColumnsOptional = reportColumnsRepository
					.findByReportIdAndDeleted(model.getReportId(), false);
			if (reportColumnsOptional.isPresent()) {
				reportColumnsList = reportColumnsOptional.get().getColumns();
			}
		}

		return getReportColumns(reportOptional.get(), reportColumnsList);
	}

	public List<ColumnsResponse> getReportColumns(ReportConfigurations report, List<String> reportColumnsList) {
		LOGGER.info("getReportColumns method ended");
		Map<String, ColumnsResponse> columns = reportColumnsList != null && reportColumnsList.isEmpty()
				? getComponentIds(report)
				: getComponentIds(report, reportColumnsList);
		List<String> componentIds = new ArrayList<>(columns.keySet());

		List<ScreenFields> screenFields = screenFieldsRepository.findByComponentIdInAndModuleId(componentIds,
				report.getModule().getId());

		List<ColumnsResponse> columnsList = new ArrayList<>();
		columns.entrySet().forEach(column -> {
			Optional<ScreenFields> fieldOptional = screenFields.stream()
					.filter(field -> field.getComponentId().equalsIgnoreCase(column.getKey())).findAny();
			ColumnsResponse columnsResponse = column.getValue();
			if (fieldOptional.isPresent()) {
				if (columnsResponse != null && StringUtils.isBlank(columnsResponse.getHint())) {
					columnsResponse.setHint(fieldOptional.get().getComponentHint());
				} else {
					columnsResponse.setHint(fieldOptional.get().getComponentHint());
				}
			}
			columnsList.add(columnsResponse);
		});
		LOGGER.info("getReportColumns method ended");
		/*
		 * return
		 * columnsList.stream().sorted(Comparator.comparing(ColumnsResponse::getOrder).
		 * reversed()) .collect(Collectors.toList());
		 */
		return columnsList;
	}

	private LinkedHashMap<String, ColumnsResponse> getComponentIds(ReportConfigurations report,
			List<String> reportColumnsList) {
		LinkedHashMap<String, ColumnsResponse> map = new LinkedHashMap<>();
		report.getCustomColumns().forEach(column -> {
			if (column.getFirst() != null && !StringUtils.isBlank(column.getFirst().getReference())
					&& !map.containsKey(column.getFirst().getReference())
					&& reportColumnsList.contains(column.getFirst().getReference())) {
				map.put(column.getFirst().getReference(),
						new ColumnsResponse(column.getFirst().getReference(), null, 1));
			}
			if (column.getSecond() != null && !StringUtils.isBlank(column.getSecond().getReference())
					&& !map.containsKey(column.getSecond().getReference())
					&& reportColumnsList.contains(column.getSecond().getReference())) {
				map.put(column.getSecond().getReference(),
						new ColumnsResponse(column.getSecond().getReference(), null, 1));
			}
			if (column.getFirst() != null && !StringUtils.isBlank(column.getFirst().getColumn())
					&& !map.containsKey(column.getFirst().getColumn())
					&& reportColumnsList.contains(column.getFirst().getColumn())) {
				map.put(column.getFirst().getColumn(), new ColumnsResponse(column.getFirst().getColumn(), null, 0));
			}
			if (column.getSecond() != null && !StringUtils.isBlank(column.getSecond().getColumn())
					&& !map.containsKey(column.getSecond().getColumn())
					&& reportColumnsList.contains(column.getSecond().getColumn())) {
				map.put(column.getSecond().getColumn(), new ColumnsResponse(column.getSecond().getColumn(), null, 0));
			}

			if (!StringUtils.isBlank(column.getId()) && reportColumnsList.contains(column.getId())) {
				if (map.containsKey(column.getId())) {
					ColumnsResponse columnResponse = map.get(column.getId());
					columnResponse.setHint(column.getName());
					columnResponse.setOrder(columnResponse.getOrder() + 1);
				} else {
					map.put(column.getId(), new ColumnsResponse(column.getId(), column.getName(), 1));
				}
			}
		});
		return map;
	}

	private LinkedHashMap<String, ColumnsResponse> getComponentIds(ReportConfigurations report) {
		LinkedHashMap<String, ColumnsResponse> map = new LinkedHashMap<>();
		if (report.getCustomColumns() != null) {
			report.getCustomColumns().forEach(column -> {

				if (column.getFirst() != null && !StringUtils.isBlank(column.getFirst().getReference())
						&& !map.containsKey(column.getFirst().getReference())) {
					map.put(column.getFirst().getReference(),
							new ColumnsResponse(column.getFirst().getReference(), null, 1));
				}
				if (column.getSecond() != null && !StringUtils.isBlank(column.getSecond().getReference())
						&& !map.containsKey(column.getSecond().getReference())) {
					map.put(column.getSecond().getReference(),
							new ColumnsResponse(column.getSecond().getReference(), null, 1));
				}
				if (column.getFirst() != null && !StringUtils.isBlank(column.getFirst().getColumn())
						&& !map.containsKey(column.getFirst().getColumn())) {
					map.put(column.getFirst().getColumn(), new ColumnsResponse(column.getFirst().getColumn(), null, 0));
				}
				if (column.getSecond() != null && !StringUtils.isBlank(column.getSecond().getColumn())
						&& !map.containsKey(column.getSecond().getColumn())) {
					map.put(column.getSecond().getColumn(),
							new ColumnsResponse(column.getSecond().getColumn(), null, 0));
				}
				if (!StringUtils.isBlank(column.getId())) {
					if (map.containsKey(column.getId())) {
						ColumnsResponse columnResponse = map.get(column.getId());
						columnResponse.setHint(column.getName());
					} else {
						map.put(column.getId(), new ColumnsResponse(column.getId(), column.getName(), 1));
					}
				}
			});
		}
		return map;
	}

	public SuccessResponse saveReportColumns(ReportColumnRequestModel model) {
		LOGGER.info("saveReportColumns method started");

		String reportId = model.getReportId();
		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);
		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.REPORT_DOES_NOT_EXISTS);
		}

		Optional<ReportColumns> reportColumnsOptional = reportColumnsRepository.findByReportIdAndDeleted(reportId,
				false);
		ReportColumns reportColumns = null;
		if (reportColumnsOptional.isPresent()) {
			reportColumns = ReportMapper.getReportColumns(model, reportColumnsOptional.get());
		} else {
			reportColumns = ReportMapper.getReportColumns(model, null);
		}
		reportColumnsRepository.save(reportColumns);
		LOGGER.info("saveReportColumns method ended");
		return new SuccessResponse(Constants.COLUMNS_INFORMATION_SAVED_SUCCESSFULLY);
	}

	public ReportColumns getReportColumns(String reportId) {
		Optional<ReportColumns> reportColumns = reportColumnsRepository.findByReportIdAndDeleted(reportId, false);
		return reportColumns.isPresent() ? reportColumns.get() : null;
	}

	public List<ColumnsResponse> getReportColumns(ReportColumns reportColumns, List<ColumnsResponse> columns) {
		if (reportColumns != null) {
			return columns.stream().filter(column -> reportColumns.getColumns().contains(column.getComponentId()))
					.collect(Collectors.toList());
		}
		return columns;
	}

	public List<ColumnsResponse> fetchAllChartColumns(List<String> reportIds) {
		List<ColumnsResponse> reportColumns = new ArrayList<>();
		reportIds.forEach(reportId -> {
			LOGGER.info("fetchReportColumns method started");
			Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findByIdAndDeleted(reportId,
					false);
			if (reportOptional.isPresent()) {
				List<String> reportColumnsList = new ArrayList<>();
				reportColumns.addAll(getReportColumns(reportOptional.get(), reportColumnsList));
			}
		});

		return reportColumns;
	}

	public String getReportName(String reportId) {
		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);
		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.NO_RECORD_FOUND);
		}
		return reportOptional.isPresent() ? reportOptional.get().getName() : null;
	}

	public SuccessResponse addReport(String reportId, AddReportRequest addReportRequest) {

		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);

		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.NO_RECORD_FOUND);
		}

		Module module = reportOptional.get().getModule();
		if ((module == null && StringUtils.isBlank(addReportRequest.getParentModuleId()))
				|| (module != null && !module.getId().equalsIgnoreCase(addReportRequest.getParentModuleId()))) {
			module = screenBuilderService.getModule(addReportRequest.getParentModuleId());
		}

		List<SubModules> subModules = new ArrayList<>();
		if (module != null) {
			subModules = subModuleRepository.findByIdInAndModuleId(addReportRequest.getSubmoduleIds(), module.getId());
		} else {
			subModules = subModuleRepository.findByIdIn(addReportRequest.getSubmoduleIds());
		}

		List<RoleOnboardingDetails> roles = roleOnboardingRepository.findAllByIdIn(addReportRequest.getRoleIds());

		ReportConfigurations reportConfigurations = ReportMapper.addReportConfigurations(reportOptional.get(),
				addReportRequest, module, subModules, roles);
		reportConfigurationsRepository.save(reportConfigurations);

		LOGGER.info("Create Report method ended");
		return new SuccessResponse(reportConfigurations.getId(), Constants.REPORT_HAS_BEEN_CREATED_SUCCESSFULLY);
	}

	public List<CustomColumnsResponse> getCustomColumns(String reportId) {
		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);

		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.NO_RECORD_FOUND);
		}

		List<com.wavelabs.sb.documents.CustomColumns> customColumns = reportOptional.get().getCustomColumns();

		List<CustomColumnsResponse> customColumnsResponses = new ArrayList<>();

		CustomColumnsResponse response = new CustomColumnsResponse(customColumns);
		customColumnsResponses.add(response);

		return customColumnsResponses;
	}

	public FetchCustomAndVisibleColumns getCustomandVisibleColumns(String reportId) {
		FetchCustomAndVisibleColumns response = new FetchCustomAndVisibleColumns();
		List<CustomResponse> customColumnsResponses = new ArrayList<>();

		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);

		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.NO_RECORD_FOUND);
		}

		ReportConfigurations reportConfigurations = reportOptional.get();

		// Handling Custom Columns
		if (reportConfigurations.getCustomColumns() != null && !reportConfigurations.getCustomColumns().isEmpty()) {
			List<CustomResponse> customResponses = reportConfigurations.getCustomColumns().stream()
					.map(customColumn -> new CustomResponse(customColumn.getId(), customColumn.getName(), "CUSTOM"))
					.collect(Collectors.toList());
			customColumnsResponses.addAll(customResponses);
		}

		// Handling SubModules and ScreenFields
		List<String> subModuleIds = new ArrayList<>();

		if (reportConfigurations.getSubModules() == null && customColumnsResponses.isEmpty()) {
			throw new ResourceNotFoundException(Constants.SELECT_SUB_MODULE);
		}

		if (reportConfigurations.getSubModules() != null && !reportConfigurations.getSubModules().isEmpty()) {

			for (SubModules sub : reportConfigurations.getSubModules()) {
				String id = sub.getId();
				subModuleIds.add(id);
			}

			Module module = reportConfigurations.getModule();
			List<ScreenFields> screenFields = new ArrayList<>();

			if (!subModuleIds.isEmpty()) {
				subModuleIds.forEach(subMod -> screenBuilderService.getSubModule(subMod));
				screenFields = screenFieldsRepository.findByModuleIdAndSubModuleIdInAndDeleted(module.getId(),
						subModuleIds, false);
			}

			List<CustomResponse> columns = !screenFields.isEmpty()
					? screenFields.stream().map(ScreenBuilderMapper::getCustomColumnsResponse)
							.collect(Collectors.toList())
					: new ArrayList<>();

			customColumnsResponses.addAll(columns);

		}

		response.setCustomResponses(customColumnsResponses);
		return response;
	}

	// public SuccessResponse addCustomColumns(String reportId,
	// CustomColumnsConfigurations request) {

	// List<com.wavelabs.sb.documents.CustomColumns> customColumns =
	// request.getCustomColumns();

	// Optional<ReportConfigurations> reportOptional =
	// reportConfigurationsRepository.findById(reportId);

	// if (!reportOptional.isPresent()) {
	// throw new ResourceNotFoundException(ErrorMessages.NO_RECORD_FOUND);
	// }

	// ReportConfigurations configurations = reportOptional.get();
	// List<com.wavelabs.sb.documents.CustomColumns> existingCustomColumns =
	// configurations.getCustomColumns();
	// existingCustomColumns.addAll(customColumns);
	// configurations.setCustomColumns(existingCustomColumns);

	// ReportConfigurations reportConfigurations =
	// ReportMapper.addCustom(reportOptional.get(), request);
	// reportConfigurationsRepository.save(reportConfigurations);
	// LOGGER.info("Create Report method ended");

	// return new SuccessResponse(Constants.COLUMNS_INFORMATION_SAVED_SUCCESSFULLY);
	// }

	public SuccessResponse addCustomColumns(String reportId, CustomColumnsConfigurations request) {
		LOGGER.info("Add custom columns method started");

		validateCustomColumns(request);

		if (!request.getCustomColumns().isEmpty()) {

			List<com.wavelabs.sb.documents.CustomColumns> customColumns = request.getCustomColumns();

			customColumns.forEach(cc -> {
				cc.setId(UUID.randomUUID().toString());
			});

			Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);

			ReportConfigurations configurations = reportOptional.get();

			if (!reportOptional.isPresent()) {
				throw new ResourceNotFoundException(Constants.REPORT_NOT_FOUND);
			}

			List<com.wavelabs.sb.documents.CustomColumns> existingCustomColumns = configurations.getCustomColumns();

			if (existingCustomColumns == null) {
				existingCustomColumns = new ArrayList<>();
			}

			existingCustomColumns.addAll(customColumns);

			configurations.setCustomColumns(existingCustomColumns);
			reportConfigurationsRepository.save(configurations);

			LOGGER.info("Add custom columns method ended");
			return new SuccessResponse(Constants.COLUMNS_INFORMATION_SAVED_SUCCESSFULLY);
		}

		return new SuccessResponse(Constants.DATA_EMPTY);
	}

	public SuccessResponse updateCustomColumns(String reportId, CustomColumnsConfigurations request) {
		LOGGER.info("Update custom columns method started");
		validateCustomColumns(request);
		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);

		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(ErrorMessages.NO_RECORD_FOUND);
		}

		ReportConfigurations existingReport = reportOptional.get();
		List<com.wavelabs.sb.documents.CustomColumns> customColumns = existingReport.getCustomColumns();

		String requestedId = request.getCustomColumns().get(0).getId();

		if (!customColumns.isEmpty() && customColumns != null) {

			for (com.wavelabs.sb.documents.CustomColumns column : customColumns) {
				if (column.getId().equalsIgnoreCase(requestedId)) {
					int index = customColumns.indexOf(column);
					customColumns.set(index, request.getCustomColumns().get(0));
					break;
				}
			}

			existingReport.setCustomColumns(customColumns);
			reportConfigurationsRepository.save(existingReport);
			LOGGER.info("Update custom columns method ended");
			return new SuccessResponse(Constants.CUSTOM_COLUMNS_ADDED);
		}
		return new SuccessResponse(Constants.FAILED_TO_UPDATE_CUSTOM_COLUMNS);
	}

	public SuccessResponse deleteCustomColumn(String reportId, String customColumnId) {
		LOGGER.info("Delete custom columns method started");
		try {
			Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);
			if (reportOptional.isPresent()) {
				ReportConfigurations configurations = reportOptional.get();
				List<com.wavelabs.sb.documents.CustomColumns> columns = configurations.getCustomColumns();
				if (!columns.isEmpty() && columns.size() > 0) {
					Iterator<com.wavelabs.sb.documents.CustomColumns> iterator = columns.iterator();
					while (iterator.hasNext()) {
						com.wavelabs.sb.documents.CustomColumns customColumns = iterator.next();
						if (customColumns.getId().equalsIgnoreCase(customColumnId)) {
							iterator.remove();
						}
					}
					configurations.setCustomColumns(columns);
					reportConfigurationsRepository.save(configurations);
					LOGGER.info("Delete custom coluns method ended");
				}
			} else {
				throw new ResourceNotFoundException(ErrorMessages.REPORT_DOES_NOT_EXISTS);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new SuccessResponse(Constants.CUSTOM_COLUMNS_DELETED);
	}

	public SuccessResponse addCustomandVisibleColumns(String reportId, AddCustomVisibleColumn addCustomVisibleColumn) {
		LOGGER.info("Add custom and visible columns method started");

		List<SelectedColumns> selectedColumns = addCustomVisibleColumn.getSelectedColumns();

		Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);

		if (!reportOptional.isPresent()) {
			throw new ResourceNotFoundException(Constants.REPORT_NOT_FOUND);
		}

		ReportConfigurations configurations = reportOptional.get();

		if (!selectedColumns.isEmpty() && selectedColumns != null) {

			configurations.setSelectedColumns(selectedColumns);
			reportConfigurationsRepository.save(configurations);
		}

		LOGGER.info("Add custom and visible columns method ended");
		return new SuccessResponse("Columns Added Successfully");

	}

	private static boolean isNumeric(String str) {
		try {
			Double.parseDouble(str);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}

	public Page<Document> getReportsCustomandVisibleColumns(Pageable pageable, String reportId, int page,
			Map<String, Object> filter, String search) {
            LOGGER.info("Get Report Custom and visible columns method started");

            Page<Document> reportData = null;
            String dataTableName = "";

            Optional<ReportConfigurations> reportOptional = reportConfigurationsRepository.findById(reportId);

            if (!reportOptional.isPresent()) {
                    throw new ResourceNotFoundException(Constants.REPORT_NOT_FOUND);
            }

            ReportConfigurations reportConfigurations = reportOptional.get();
            Module module = reportConfigurations.getModule();
            List<SubModules> subModules = reportConfigurations.getSubModules();

            if (subModules == null || subModules.isEmpty()) {
                    throw new ResourceNotFoundException(Constants.SUBMODULE_NOT_FOUND);
            }
            dataTableName = module.getId() + CollectionConstants.HYPHEN + subModules.get(0).getId()
                            + CollectionConstants.TABLE_ENDING;

            List<String> customColumnRefs = new ArrayList<String>();

            if (reportConfigurations.getCustomColumns() != null) {
                    reportConfigurations.getCustomColumns().forEach(cc -> {
                            customColumnRefs.add(cc.getFirst().getReference());
                    });
            }

            List<ScreenFields> screens = screenFieldsRepository.findAllByModuleIdAndSubModuleIdAndDeleted(module.getId(),
                            subModules.get(0).getId(), false);

            List<String> includedList = screens.stream().map(ScreenFields::getComponentId).collect(Collectors.toList());

            reportData = getCustomColumnsList(dataTableName, customColumnRefs, pageable, filter, search, includedList);

            try {

                if(reportConfigurations.getCustomColumns() != null) {
                reportData = reportData.map(d -> {

                    double result = 0.0;
                    for (com.wavelabs.sb.documents.CustomColumns custom : reportConfigurations.getCustomColumns()) {
                        String firstValueStr = custom.getFirst().getColumn();
                        String secondValueStr = custom.getSecond().getColumn();

                        if (!(d.containsKey(firstValueStr) && d.containsKey(secondValueStr))) {
                            d.put(custom.getId(), result);
                            continue;
                        }

                        Object object1 = d.get(firstValueStr);
                        Object object2 = d.get(secondValueStr);

                        if (isNumeric(object1.toString()) && isNumeric(object2.toString())) {
                            d.put(custom.getId(), result);
                            continue;
                        }

                        double value1 = Double.valueOf(object1.toString());
                        double value2 = Double.valueOf(object2.toString());

                        switch (custom.getOperation()) {
                            case ADDITION:
                                result = value1 + value2;
                                break;
                            case SUBSTRACTION:
                                result = value1 - value2;
                                break;
                            case MULTIPLICATION:
                                result = value1 * value2;
                                break;
                            case DIVISION:
                                if (value2 != 0) {
                                    result = value1 / value2;
                                } else {
                                    result = 0;
                                }
                                break;
                            default:
                                break;
                        }

                        d.put(custom.getId(), result);
                    }
                    return d;
                });
                }
                
                
                // keep only asked headers
                List<SelectedColumns> selectedColumns = reportConfigurations.getSelectedColumns();
                List<String> excelColumns = Arrays.asList(
                        "workflowId", "createdAt", "createdBy", "modifiedAt", "modifiedBy", "userType", "status"
                    );
                reportData = reportData.map(d -> {
                    Document newD = new Document();
                    newD.append("_id", d.getObjectId(newD));
                    for(SelectedColumns sc: selectedColumns){
                        newD.append(sc.getId(), d.get(sc.getId()));
                    }
                    for(String ec: excelColumns){
                        newD.append(ec, d.get(ec));
                    }
                    
                    return newD;
                });
                
                LOGGER.info("Get Report Custom and visible columns method ended");
                return reportData;
            } catch (Exception e) {
                e.printStackTrace();
                throw new ResourceNotFoundException(Constants.STRING_IS_PRESENT);
            }

	}

	private Page<Document> getCustomColumnsList(String dataTable, List<String> customColumnRefs, Pageable pageable,
			Map<String, Object> filter, String search, List<String> includedList) {
		Aggregation aggregation = null;

		if (!customColumnRefs.isEmpty()) {
			GroupOperation groupOperation = Aggregation.group(customColumnRefs.toArray(new String[0]));
			aggregation = Aggregation.newAggregation(groupOperation);
		}

		Query query = new Query();

		for (Map.Entry<String, Object> map : filter.entrySet()) {

			if (!map.getKey().equals("page") || !map.getKey().equals("search") ||
					pageable == null) {
				continue;
			}

			if (isNumeric(map.getValue().toString())) {
				query.addCriteria(Criteria.where(map.getKey()).is(convertToNumeric(map.getValue())));
			} else {
				query.addCriteria(Criteria.where(map.getKey()).is(map.getValue().toString()));
			}
		}

		if (search != null && !includedList.isEmpty() && search != "") {
			Criteria searchCriteria = new Criteria();
			List<Criteria> orCriteria = new ArrayList<>();
		
			for (String field : includedList) {
				orCriteria.add(Criteria.where(field).regex(search, "i"));
			}
		
			searchCriteria.orOperator(orCriteria.toArray(new Criteria[0]));
			query.addCriteria(searchCriteria);
		}

		long count;

		if (aggregation != null) {
			count = mongoTemplate.aggregate(aggregation, dataTable,
					Document.class).getMappedResults().size();
		} else {
			count = mongoTemplate.count(query, dataTable);
		}

                if(pageable != null) {
                    query = query.with(pageable);
                }
		List<Document> result = mongoTemplate.find(query,
				Document.class, dataTable);

                List<Document> doc = result;
                Page<Document> data = null;
                if (pageable != null) {
                    int startIndex = pageable.getPageNumber() * pageable.getPageSize();
                    int endIndex = Math.min(startIndex + pageable.getPageSize(), result.size());
                    doc = result.subList(startIndex, endIndex);
                    data = new PageImpl<>(doc, PageRequest.of(pageable.getPageNumber(),
                                    pageable.getPageSize()), result.size());
                } else {
                    data = new PageImpl<>(doc, PageRequest.of(0,doc.size()), doc.size());
                }
                

		return data;
	}

	private Object convertToNumeric(Object value) {
		if (value instanceof String) {
			return Double.parseDouble((String) value);
		}
		return value;
	}

	public FetchCustomAndVisibleColumns getSelectedColumns(String reportId) {
		LOGGER.info("Get selected columns method started");

		FetchCustomAndVisibleColumns response = new FetchCustomAndVisibleColumns();
		Optional<ReportConfigurations> reportConfigurationOptional = reportConfigurationsRepository.findById(reportId);

		if (!reportConfigurationOptional.isPresent()) {
			throw new ResourceNotFoundException(Constants.REPORT_NOT_FOUND);
		}

		ReportConfigurations reportConfiguration = reportConfigurationOptional.get();
		List<CustomResponse> customResponses = new ArrayList<>();

		if (reportConfiguration.getSelectedColumns() == null) {
			throw new ResourceNotFoundException(Constants.SELECTED_COLUMNS);
		}

		if (!reportConfiguration.getSelectedColumns().isEmpty()
				&& reportConfiguration.getSelectedColumns().size() > 0) {

			for (SelectedColumns selected : reportConfiguration.getSelectedColumns()) {
				CustomResponse data = new CustomResponse();
				data.setId(selected.getId());
				data.setName(selected.getName());
				data.setType(selected.getType());
				customResponses.add(data);
			}
			response.setCustomResponses(customResponses);
			return response;
		}
		LOGGER.info("Get selected columns method ended");
		return response;

	}

	public void validateCustomColumns(CustomColumnsConfigurations request) {

		LOGGER.info("Validate custom columns method started");
		for (com.wavelabs.sb.documents.CustomColumns custom : request.getCustomColumns()) {
			if (custom.getName().isEmpty() || custom.getName() == null) {
				throw new ResourceNotFoundException(Constants.MISSING_NAME);
			}
			if (custom.getOperation() == null) {
				throw new ResourceNotFoundException(Constants.MISSING_OPERATION);
			}
			if (custom.getFirst().getReference() == null || custom.getFirst().getReference().isEmpty()) {
				throw new ResourceNotFoundException(Constants.MISSING_FIRST_REFERENCE);
			}
			if (custom.getFirst().getColumn() == null || custom.getFirst().getColumn().isEmpty()) {
				throw new ResourceNotFoundException(Constants.MISSING_FIRST_COLUMN);
			}
			if (custom.getFirst().getSubModule() == null || custom.getFirst().getSubModule().isEmpty()) {
				throw new ResourceNotFoundException(Constants.MISSING_FIRST_SUBMODULE);
			}
			if (custom.getSecond().getReference() == null || custom.getSecond().getReference().isEmpty()) {
				throw new ResourceNotFoundException(Constants.MISSING_SECOND_REFERENCE);
			}
			if (custom.getSecond().getColumn() == null || custom.getSecond().getColumn().isEmpty()) {
				throw new ResourceNotFoundException(Constants.MISSING_SECOND_COLUMN);
			}
			if (custom.getSecond().getSubModule() == null || custom.getSecond().getSubModule().isEmpty()) {
				throw new ResourceNotFoundException(Constants.MISSING_SECOND_SUBMODULE);
			}
		}
		LOGGER.info("Validate custom columns method ended");
	}

	public byte[] getExcelSheet(List<Document> data, Map<String, String> headerNames, List<String> rowKeys) {

		LOGGER.info("Get excel sheet method started");
		try {
			Workbook workbook = new XSSFWorkbook();
			Sheet sheet = workbook.createSheet("Report Data");

			Row headerRow = sheet.createRow(0);
			int cellNum = 0;

			Cell cell = headerRow.createCell(cellNum++);
			cell.setCellValue("_id");
			rowKeys.add("_id");

			for (Map.Entry<String, String> name : headerNames.entrySet()) {
				int col = cellNum++;

				cell = headerRow.createCell(col);
				cell.setCellValue(name.getValue());
				rowKeys.add(name.getKey());

				sheet.autoSizeColumn(col);
			}

			headerRow.createCell(cellNum++).setCellValue("workflowId");
			headerRow.createCell(cellNum++).setCellValue("createdAt");
			headerRow.createCell(cellNum++).setCellValue("createdBy");
			headerRow.createCell(cellNum++).setCellValue("modifiedAt");
			headerRow.createCell(cellNum++).setCellValue("modifiedBy");
			headerRow.createCell(cellNum++).setCellValue("userType");
			headerRow.createCell(cellNum++).setCellValue("status");

			rowKeys.add("workflowId");
			rowKeys.add("createdAt");
			rowKeys.add("createdBy");
			rowKeys.add("modifiedAt");
			rowKeys.add("modifiedBy");
			rowKeys.add("userType");
			rowKeys.add("status");

			int rowNum = 1;
			for (Document document : data) {
				Row row = sheet.createRow(rowNum++);
				int colNum = 0;

				for (String key : rowKeys) {
					Object value = document.get(key);
					Cell dataCell = row.createCell(colNum++);
					if (value instanceof Number) {
						dataCell.setCellValue(((Number) value).doubleValue());
					} else if (value instanceof Document) {
                                            dataCell.setCellValue(value != null ? ((Document) value).toJson() : "");
                                        } else {
						dataCell.setCellValue(value != null ? value.toString() : "");
					}
				}
			}

			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			workbook.write(outputStream);
			workbook.close();
			LOGGER.info("Get excel sheet method ended");
			return outputStream.toByteArray();

		} catch (IOException e) {
			LOGGER.info(Constants.FAILED_TO_GENERATE_EXCEL + e.getMessage());
			throw new ResourceNotFoundException(Constants.FAILED_TO_GENERATE_EXCEL);
		}

	}

}