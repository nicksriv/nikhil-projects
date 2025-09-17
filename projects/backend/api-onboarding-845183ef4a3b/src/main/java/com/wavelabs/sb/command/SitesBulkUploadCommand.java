package com.wavelabs.sb.command;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UploadSitesModel;
import com.wavelabs.sb.request.UploadSiteRequest;
import com.wavelabs.sb.response.ErrorRecord;
import com.wavelabs.sb.response.ViewBulkUploadResponse;
import com.wavelabs.sb.services.ClientOnboardingService;
import com.wavelabs.sb.services.SiteUploadService;
import com.wavelabs.sb.utils.UploadSitesExcelLoader;

@Component
public class SitesBulkUploadCommand
	implements Command<UploadSitesModel, ViewBulkUploadResponse> {

    private static final Logger LOGGER = LoggerFactory.getLogger(SitesBulkUploadCommand.class);

    @Autowired
    SiteUploadService siteUploadService;

    @Autowired
    ClientOnboardingService clientOnboardingService;

    /**
     * This method used to process sites file
     * 
     * @param UploadFileRequest request
     * @return ViewBulkUploadResponse
     */
    @Override
    public ViewBulkUploadResponse execute(UploadSitesModel model) {
	TokenPayLoadDetails details = model.getTokenPayLoadDetails();
	long startTime = System.currentTimeMillis();
	Optional<ClientOnboardingDetails> client = clientOnboardingService
		.getClientDetailsForModulesAndRoles(model.getClientId());
	if (!client.isPresent()) {
	    throw new ResourceNotFoundException(
		    model.getClientId() + " " + Constants.CLENT_OR_ACTIVE_CLIENT_NOT_FOUND);
	}
	ViewBulkUploadResponse censusUploadResponse = new ViewBulkUploadResponse();
	UploadSitesExcelLoader usersExcelLoader = new UploadSitesExcelLoader(model.getFile());
	// check whether the given sheet is valid sheet or not.
	usersExcelLoader.isValidSitesSheet();
	List<ErrorRecord> errors = new ArrayList<>();
	List<UploadSiteRequest> requests = new ArrayList<>();

	IntStream.range(1, usersExcelLoader.totalNumberOfRows()).forEach(userIndex -> {
	    LOGGER.info("Started processing row ------> {}", (userIndex + 1));
	    // read row of the sheet from row 2
	    Optional<UploadSiteRequest> uploadSiteRequestOptional = usersExcelLoader.next();
	    // if row is empty read next row
	    if (!uploadSiteRequestOptional.isPresent()) {
		LOGGER.info("Data not present in row ------> {}", (userIndex + 1));
		return;
	    }
	    // if row is not empty process the data.
	    UploadSiteRequest uploadSiteRequest = uploadSiteRequestOptional.get();
	    // If any exception is thrown while reading data save the error to the list
	    if (uploadSiteRequest != null) {
		if (uploadSiteRequest.getErrorRecord() != null
			&& !uploadSiteRequest.getErrorRecord().getRowErrors().isEmpty()) {
		    errors.add(uploadSiteRequest.getErrorRecord());
		    censusUploadResponse.setFailedRecordsCount(censusUploadResponse.getFailedRecordsCount() + 1);
		} else {
		    uploadSiteRequest.setRowId(userIndex + 1);
		    requests.add(uploadSiteRequest);
		}
	    }
	    LOGGER.info("Finished processing row ------> {}", (userIndex + 1));
	    censusUploadResponse.setTotalRecordsCount(userIndex + 1l);
	});

	requests.forEach(uploadSiteRequest -> {
	    try {
		ErrorRecord insertData = siteUploadService.saveSite(uploadSiteRequest, client.get().getClientId(), details);
		if (insertData != null) {
		    insertData.setRowId(uploadSiteRequest.getRowId());
		    errors.add(insertData);
		    censusUploadResponse.setFailedRecordsCount(censusUploadResponse.getFailedRecordsCount() + 1);
		    return;
		} else {
		    censusUploadResponse.setSuccessRecordsCount(censusUploadResponse.getSuccessRecordsCount() + 1);
		}
	    } catch (Exception exception) {
		ErrorRecord insertData = new ErrorRecord();
		insertData.setRowId(uploadSiteRequest.getRowId());
		insertData.setMessage(getMessage(exception.getMessage()));
		errors.add(insertData);
	    }
	});

	LOGGER.info("Total rows ------> {}", requests.size() - 1);
	LOGGER.info("Number of rows with errors ------> {}", errors.size());
	LOGGER.info("Total rows uploaded successfully ------> {}", censusUploadResponse.getSuccessRecordsCount());
	LOGGER.info("Total time to upload the sheet ------> {} milliseconds", (System.currentTimeMillis() - startTime));
	censusUploadResponse.setErrors(
		errors.stream().sorted(Comparator.comparingInt(ErrorRecord::getRowId)).collect(Collectors.toList()));
	censusUploadResponse.setFailedRecordsCount(errors.size());
	censusUploadResponse.setMessage(Constants.USERS_DATA_UPLOADED);
	return censusUploadResponse;
    }

    private String getMessage(String message) {
	if (!StringUtils.isBlank(message) && message.contains(Constants.COLON)) {
	    String messages[] = message.split(Constants.COLON);
	    return messages[messages.length - 1].trim();
	}
	return message;
    }

}