package com.wavelabs.sb.services;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.CustomColumns;
import com.wavelabs.sb.documents.CustomOperation;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Operations;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.GroupOperations;
import com.wavelabs.sb.model.ReportResults;
import com.wavelabs.sb.repository.ReportColumnsRepository;
import com.wavelabs.sb.repository.ReportConfigurationsRepository;
import com.wavelabs.sb.repository.UserOnboardingRepository;
import com.wavelabs.sb.request.ReportsRequest;

@Service
public class DynamicReportsGenrationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DynamicReportsGenrationService.class);
    @Autowired
    private ReportConfigurationsRepository reportsRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    @Autowired
    ReportColumnsRepository reportColumnsRepository;

    private static final String NO_SMS = "NO_SMS";
    private static final String COMBINED = "COMBINED";

    /*
     * private List<Hashtable<String, Object>> fetchReport(String
     * reportConfigurationId) { Optional<ReportConfigurations> findById =
     * reportsRepository.findById(reportConfigurationId); if (findById.isPresent())
     * { ReportConfigurations reportConfigurations = findById.get();
     * List<CustomColumns> customColumns = reportConfigurations.getCustomColumns();
     * return customColumns != null ? filterAndFindTheData(customColumns,
     * reportConfigurations, null) : filterAndFindTheData(new ArrayList<>(),
     * reportConfigurations, null);
     * 
     * } else { throw new
     * ResourceNotFoundException(ErrorMessages.REPORT_NOT_EXISTS); } }
     */

    public List<Hashtable<String, Object>> fetchReport(ReportsRequest request) {
	Optional<ReportConfigurations> findById = reportsRepository.findById(request.getId());
	if (findById.isPresent()) {
	    ReportConfigurations reportConfigurations = findById.get();
	    List<CustomColumns> customColumns = reportConfigurations.getCustomColumns();
	    if (!request.getSites().isEmpty()) {
		List<Users> usersBySites = getUsersBySites(request.getSites());
		if (usersBySites.isEmpty()) {
		    return new ArrayList<>();
		}
		List<String> collect = usersBySites.stream().map(user -> user.getUserId()).collect(Collectors.toList());
		request.setUserIds(collect);
	    }
	    try {
		return customColumns != null ? filterAndFindTheData(customColumns, reportConfigurations, request)
			: Collections.emptyList();
	    } catch (Exception exception) {
		LOGGER.info("Exception occured while gerenerating report:: {}", exception.getMessage());
		return new ArrayList<>();
	    }

	} else {
	    throw new ResourceNotFoundException(ErrorMessages.REPORT_NOT_EXISTS);
	}
    }

    private List<Hashtable<String, Object>> filterAndFindTheData(List<CustomColumns> customColumns,
	    ReportConfigurations reportConfigurations, ReportsRequest request) {
	ReportResults results = new ReportResults();
	Hashtable<String, List<CustomColumns>> individualSM = new Hashtable<>();
	Hashtable<String, List<CustomColumns>> combinationSM = new Hashtable<>();
	Hashtable<String, List<CustomColumns>> noSMs = new Hashtable<>();

	customColumns.stream().forEach(customColumn -> {
	    if (customColumn.getFirst().getSubModule().isEmpty() && customColumn.getSecond().getSubModule().isEmpty()) {
		List<CustomColumns> list = noSMs.get(NO_SMS);
		if (list == null) {
		    list = new ArrayList<>();
		}
		list.add(customColumn);
		noSMs.put(NO_SMS, list);
	    } else if (customColumn.getFirst().getSubModule()
		    .equalsIgnoreCase(customColumn.getSecond().getSubModule())) {
		List<CustomColumns> list = individualSM.get(customColumn.getFirst().getSubModule());
		if (list == null) {
		    list = new ArrayList<>();
		}
		customColumn.getFirst().setUuid(UUID.randomUUID().toString());
		customColumn.getSecond().setUuid(UUID.randomUUID().toString());
		results.getReferences().put(customColumn.getFirst().getSubModule(),
			customColumn.getFirst().getReference());
		list.add(customColumn);
		individualSM.put(customColumn.getFirst().getSubModule(), list);
	    } else {
		List<CustomColumns> list = combinationSM.get(COMBINED);
		if (list == null) {
		    list = new ArrayList<>();
		}
		list.add(customColumn);
		combinationSM.put(COMBINED, list);
		if (!customColumn.getFirst().getSubModule().isEmpty()) {
		    results.getReferences().put(customColumn.getFirst().getSubModule(),
			    customColumn.getFirst().getReference());
		}
		if (!customColumn.getSecond().getSubModule().isEmpty()) {
		    results.getReferences().put(customColumn.getSecond().getSubModule(),
			    customColumn.getSecond().getReference());
		}
	    }
	});
	return formAQueryAndReturnData(individualSM, combinationSM, noSMs, results, reportConfigurations, request);
    }

    private List<Hashtable<String, Object>> formAQueryAndReturnData(Hashtable<String, List<CustomColumns>> individualSM,
	    Hashtable<String, List<CustomColumns>> combinationSM, Hashtable<String, List<CustomColumns>> noSMs,
	    ReportResults resultsAll, ReportConfigurations reportConfigurations, ReportsRequest request) {
	List<AggregationResults<Document>> results = new ArrayList<>();
	List<String> groupReferenceValues = new ArrayList<>();

	if (!individualSM.keySet().isEmpty()) {
	    individualSM.keySet().forEach(key -> {
		List<CustomColumns> customColumns = individualSM.get(key);
		if (!customColumns.isEmpty()) {
		    String groupingReference = resultsAll.getReferences().get(key);
		    ProjectionOperation project = Aggregation.project(groupingReference).andInclude(groupingReference);
		    GroupOperation group = Aggregation.group(groupingReference);
		    GroupOperation groupselection = Aggregation.group(groupingReference);
		    Hashtable<String, AggregationOperation> operations = new Hashtable<>();
		    operations.put("PROJECTION", project);
		    operations.put("GROUP", group);
		    operations.put("GROUP_SELECTION", groupselection);
		    Hashtable<String, String> selectionColumns = new Hashtable<>();
		    customColumns.stream().forEach(customColumn -> {
			ProjectionOperation projectionOperation = get(
				(ProjectionOperation) operations.get("PROJECTION"), customColumn,
				customColumn.getOperation());
			operations.put("PROJECTION", projectionOperation);
			selectionColumns.put(customColumn.getFirst().getUuid(), customColumn.getFirst().getColumn());
			selectionColumns.put(customColumn.getSecond().getUuid(), customColumn.getSecond().getColumn());
			GroupOperation groupOperation = getGroup((GroupOperation) operations.get("GROUP"),
				customColumn);
			operations.put("GROUP", groupOperation);
			GroupOperation groupSelectionOperation = getGroupSelections(
				(GroupOperation) operations.get("GROUP_SELECTION"), customColumn);
			operations.put("GROUP_SELECTION", groupSelectionOperation);
		    });
		    List<AggregationOperation> allOperations = new ArrayList<>();
		    List<AggregationOperation> dateConditionQuery = getDateConditionQuery(request);
		    if (!dateConditionQuery.isEmpty()) {
			allOperations.addAll(dateConditionQuery);
		    }
		    allOperations.add(operations.get("PROJECTION"));
		    allOperations.add(operations.get("GROUP"));

		    Aggregation newAggregation = Aggregation.newAggregation(allOperations);
		    String tableName = reportConfigurations.getModule().getId() + "-" + key
			    + CollectionConstants.TABLE_ENDING;
		    AggregationResults<Document> aggregate = mongoTemplate.aggregate(newAggregation, tableName,
			    Document.class);
		    results.add(aggregate);
		    List<Document> mappedResults = aggregate.getMappedResults();

		    List<AggregationOperation> selectionSumOperations = new ArrayList<>();
		    if (!dateConditionQuery.isEmpty()) {
			selectionSumOperations.addAll(dateConditionQuery);
		    }
		    selectionSumOperations.add(operations.get("GROUP_SELECTION"));
		    Aggregation selectAggregation = Aggregation.newAggregation(selectionSumOperations);
		    AggregationResults<Document> selectionAggregation = mongoTemplate.aggregate(selectAggregation,
			    tableName, Document.class);

		    List<Document> selectionResults = selectionAggregation.getMappedResults();

		    mappedResults.forEach(document -> {
			final Object refValue = document.get("_id");
			document.put(groupingReference, document.get("_id"));
			selectionResults.forEach(selectionDoc -> {
			    Object value = selectionDoc.get("_id");
			    if (refValue != null && value != null
				    && refValue.toString().equals(selectionDoc.get("_id").toString())) {
				selectionDoc.keySet().forEach(keyString -> {
				    if (selectionColumns.get(keyString) != null) {
					document.put(selectionColumns.get(keyString), selectionDoc.get(keyString));
				    }
				});
			    }
			});
			document.remove("_id");
		    });
		    resultsAll.getRecords().put(key, mappedResults);
		}
	    });
	}

	List<CustomColumns> outerLinked = new ArrayList<>(); 
	List<CustomColumns> innerLinked = new ArrayList<>();

	if (!combinationSM.keySet().isEmpty()) {
	    List<CustomColumns> list = combinationSM.get(COMBINED);
	    Hashtable<String, List<CustomOperation>> customOperations = new Hashtable<>();
	    list.forEach(customColumn -> {
		if (!customColumn.getFirst().getSubModule().isEmpty()
			&& !customColumn.getSecond().getSubModule().isEmpty()) {
		    innerLinked.add(customColumn);
		} else {
		    outerLinked.add(customColumn);
		}

		if (!customColumn.getFirst().getSubModule().isEmpty()) {
		    List<CustomOperation> firstOperation = customOperations.get(customColumn.getFirst().getSubModule());
		    if (firstOperation == null) {
			firstOperation = new ArrayList<>();
		    }
		    if (!isDuplicate(firstOperation, customColumn.getFirst())) {
			firstOperation.add(customColumn.getFirst());
		    }
		    customOperations.put(customColumn.getFirst().getSubModule(), firstOperation);
		}
		if (!customColumn.getSecond().getSubModule().isEmpty()) {
		    List<CustomOperation> secOperation = customOperations.get(customColumn.getSecond().getSubModule());
		    if (secOperation == null) {
			secOperation = new ArrayList<>();
		    }
		    if (!isDuplicate(secOperation, customColumn.getSecond())) {
			secOperation.add(customColumn.getSecond());
		    }
		    customOperations.put(customColumn.getSecond().getSubModule(), secOperation);
		}
	    });
	    List<AggregationResults<Document>> fetchCustomColumnsData = fetchCustomColumnsData(reportConfigurations,
		    customOperations, resultsAll, groupReferenceValues, request);
	    results.addAll(fetchCustomColumnsData);
	}

	List<Hashtable<String, Object>> finalDocuments = resultsAll.finalDocuments();

	innerLinked.stream().forEach(customColumn -> {
	    performOperations(customColumn, finalDocuments);
	});

	outerLinked.stream().forEach(customColumn -> {
	    performOperations(customColumn, finalDocuments);
	});
	try {
	    String mapper = new ObjectMapper().writeValueAsString(finalDocuments);
	    System.out.println(mapper);
	} catch (JsonProcessingException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();

	}
	return resultsAll.getResponseReport(finalDocuments);
    }

    private List<Hashtable<String, Object>> performOperations(CustomColumns customColumn,
	    List<Hashtable<String, Object>> finalDocuments) {

	String firstColumn = customColumn.getFirst().getColumn();
	String secoundColumn = customColumn.getSecond().getColumn();
	finalDocuments.stream().forEach(result -> {
	    double firstValue = 0;
	    if (result.containsKey(firstColumn)) {
		firstValue = Double.valueOf(result.get(firstColumn).toString());
	    }
	    double secounValue = 0;
	    if (result.containsKey(secoundColumn)) {
		secounValue = Double.valueOf(result.get(secoundColumn).toString());
	    }
	    result.put(customColumn.getId(), get(firstValue, secounValue, customColumn.getOperation()));
	});
	return finalDocuments;
    }

    public double get(double first, double secound, Operations operation) {
	if (operation == Operations.ADDITION) {
	    return first + secound;
	} else if (operation == Operations.SUBSTRACTION) {
	    return first - secound;
	} else if (operation == Operations.MULTIPLICATION) {
	    return first * secound;
	} else if (operation == Operations.DIVISION) {
	    return first / secound;
	}
	return 0;
    }

    public boolean isDuplicate(List<CustomOperation> secOperation, CustomOperation operation) {
	List<CustomOperation> collect = secOperation.stream().filter(custom -> {
	    return custom.getColumn().equalsIgnoreCase(operation.getColumn());
	}).collect(Collectors.toList());
	return !collect.isEmpty();
    }

    private List<AggregationResults<Document>> fetchCustomColumnsData(ReportConfigurations reportConfigurations,
	    Hashtable<String, List<CustomOperation>> operations, ReportResults reportsAll,
	    List<String> groupReferenceValues, ReportsRequest request) {
	List<AggregationResults<Document>> results = new ArrayList<>();
	operations.keySet().forEach(subModule -> {
	    List<CustomOperation> groupOperations = operations.get(subModule);
	    if (!groupOperations.isEmpty()) {
		final GroupOperations grouping = getGrouping(groupOperations);
		String tableName = reportConfigurations.getModule().getId() + CollectionConstants.HYPHEN + subModule
			+ CollectionConstants.TABLE_ENDING;
		List<AggregationOperation> dateConditionQuery = getDateConditionQuery(request);
		dateConditionQuery.add(grouping.getGroupOperations());
		AggregationResults<Document> aggregate = mongoTemplate
			.aggregate(Aggregation.newAggregation(dateConditionQuery), tableName, Document.class);
		results.add(aggregate);
		List<Document> mappedResults = aggregate.getMappedResults();
		String groupingReference = reportsAll.getReferences().get(subModule);
		mappedResults.forEach(document -> {
		    document.put(groupingReference, document.get("_id"));
		    grouping.getMaskingKeys().keySet().forEach(key -> {
			String object = document.get(key).toString();
			document.put(grouping.getMaskingKeys().get(key), object);
			document.remove(key);
		    });
		});
		reportsAll.appendRecords(subModule, mappedResults);
	    }
	});
	return results;
    }

    private GroupOperations getGrouping(List<CustomOperation> operations) {
	GroupOperations groupOperationsObj = new GroupOperations();
	GroupOperation groupOperations = Aggregation.group(operations.get(0).getReference());
	Hashtable<String, AggregationOperation> groups = new Hashtable<>();
	groups.put("GROUP", groupOperations);
	operations.forEach(operation -> {
	    operation.setUuid(UUID.randomUUID().toString());
	    groupOperationsObj.getMaskingKeys().put(operation.getUuid(), operation.getColumn());
	    GroupOperation groupOperation = (GroupOperation) groups.get("GROUP");
	    GroupOperation as = groupOperation.sum(operation.getColumn()).as(operation.getUuid());
	    groups.put("GROUP", as);
	});
	groupOperationsObj.setGroupOperations(groups.get("GROUP"));
	if (groups.get("GROUP") != null) {
	    groupOperationsObj.setAggregation(Aggregation.newAggregation(groups.get("GROUP")));
	}
	return groupOperationsObj;
    }

    private GroupOperation getGroup(GroupOperation group, CustomColumns customColumn) {
	return group.sum(customColumn.getFirst().getUuid()).as(customColumn.getId());
    }

    private GroupOperation getGroupSelections(GroupOperation group, CustomColumns customColumn) {
	return group.sum(customColumn.getFirst().getColumn()).as(customColumn.getFirst().getUuid())
		.sum(customColumn.getSecond().getColumn()).as(customColumn.getSecond().getUuid());
    }

    private ProjectionOperation get(ProjectionOperation project, CustomColumns customColumn, Operations operation) {
	if (operation == Operations.ADDITION) {
	    return project.and(customColumn.getFirst().getColumn()).plus(customColumn.getSecond().getColumn())
		    .as(customColumn.getFirst().getUuid());
	} else if (operation == Operations.SUBSTRACTION) {
	    return project.and(customColumn.getFirst().getColumn()).minus(customColumn.getSecond().getColumn())
		    .as(customColumn.getFirst().getUuid());
	} else if (operation == Operations.MULTIPLICATION) {
	    return project.and(customColumn.getFirst().getColumn()).multiply(customColumn.getSecond().getColumn())
		    .as(customColumn.getFirst().getUuid());
	} else if (operation == Operations.DIVISION) {
	    return project.and(customColumn.getFirst().getColumn()).divide(customColumn.getSecond().getColumn())
		    .as(customColumn.getFirst().getUuid());
	}
	return null;
    }

    private List<AggregationOperation> getDateConditionQuery(ReportsRequest request) {
	Date fromDate, toDate;
	List<AggregationOperation> operations = new ArrayList<>();
	if (request.getUserIds() != null && !request.getUserIds().isEmpty()) {
	    Criteria userIdsCriteria = Criteria.where(CollectionConstants.CREATED_BY).in(request.getUserIds());
	    operations.add(Aggregation.match(userIdsCriteria));
	}
	if (isValid(request.getFrom()) && !isValid(request.getTo())) {
	    fromDate = Date.valueOf(getDate(request.getFrom()));
	    toDate = Date.valueOf(LocalDate.now().plusDays(1));
	    operations.add(Aggregation.match(Criteria.where(CollectionConstants.CREATED_AT).gte(fromDate).lte(toDate)));
	} else if (!isValid(request.getFrom()) && isValid(request.getTo())) {
	    fromDate = Date.valueOf(LocalDate.of(2021, 01, 01));
	    toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
	    operations.add(Aggregation.match(Criteria.where(CollectionConstants.CREATED_AT).gte(fromDate).lte(toDate)));
	} else if (isValid(request.getFrom()) && isValid(request.getTo())) {
	    fromDate = Date.valueOf(getDate(request.getFrom()));
	    toDate = Date.valueOf(getDate(request.getTo()).plusDays(1));
	    operations.add(Aggregation.match(Criteria.where(CollectionConstants.CREATED_AT).gte(fromDate).lte(toDate)));
	}
	return operations;
    }

    private boolean isValid(String text) {
	return text != null && !text.equalsIgnoreCase("null") && !text.isEmpty() && !text.equalsIgnoreCase("undefined");
    }

    public LocalDate getDate(String date) {
	DateTimeFormatter outputDateFormat = DateTimeFormatter.ofPattern(Constants.DATE_PATTERN);
	try {
	    return LocalDate.parse(date, outputDateFormat);

	} catch (Exception e) {
	    throw new BadRequestException("Please provide date dd-mm-yyyy format");
	}
    }

    public List<Users> getUsersBySites(List<String> siteIds) {
	return userOnboardingRepository.findByLocationsInAndDeleted(siteIds, false);
    }

}
