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
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.UploadUsersModel;
import com.wavelabs.sb.request.UploadFileRequest;
import com.wavelabs.sb.request.UploadUserRequest;
import com.wavelabs.sb.response.ErrorRecord;
import com.wavelabs.sb.response.ViewBulkUploadResponse;
import com.wavelabs.sb.services.ClientOnboardingService;
import com.wavelabs.sb.services.UsersUploadService;
import com.wavelabs.sb.utils.UploadUsersExcelLoader;

@Service
public class UploadUsersCommand implements Command<UploadUsersModel, ViewBulkUploadResponse> {

    private static final Logger LOGGER = LoggerFactory.getLogger(UploadUsersCommand.class);

    @Autowired
    UsersUploadService usersUploadService;

    @Autowired
    ClientOnboardingService clientOnboardingService;

    /**
     * This method used to process users file
     * 
     * @param clientId
     * @param request
     * @return ViewBulkUploadResponse
     */
    public ViewBulkUploadResponse execute(UploadUsersModel model) {
	UploadFileRequest request = new UploadFileRequest();
	request.setClientId(model.getClientId());
	request.setFile(model.getFile());
	long startTime = System.currentTimeMillis();
	Optional<ClientOnboardingDetails> client = clientOnboardingService.getClientDetailsForModulesAndRoles(request.getClientId());
	if (!client.isPresent()) {
	    throw new ResourceNotFoundException(request.getClientId() + " " + Constants.CLENT_OR_ACTIVE_CLIENT_NOT_FOUND);
	}
	ViewBulkUploadResponse censusUploadResponse = new ViewBulkUploadResponse();
	UploadUsersExcelLoader usersExcelLoader = new UploadUsersExcelLoader(request.getFile());
	// check whether the given sheet is valid sheet or not.
	usersExcelLoader.isValidSheet();
	List<ErrorRecord> errors = new ArrayList<>();
	List<UploadUserRequest> requests = new ArrayList<>();

	IntStream.range(2, usersExcelLoader.totalNumberOfRows()).forEach(userIndex -> {
	    LOGGER.info("Started processing row ------> {}", (userIndex + 1));
	    // read row of the sheet from row 3
	    Optional<UploadUserRequest> uploadUserRequestOptional = usersExcelLoader.next();
	    // if row is empty read next row
	    if (!uploadUserRequestOptional.isPresent()) {
		LOGGER.info("Data not present in row ------> {}", (userIndex + 1));
		return;
	    }
	    // if row is not empty process the data.
	    UploadUserRequest uploadUserRequest = uploadUserRequestOptional.get();
	    // If any exception is thrown while reading data save the error to the list
	    if (uploadUserRequest != null) {
		if (uploadUserRequest.getErrorRecord() != null
			&& !uploadUserRequest.getErrorRecord().getRowErrors().isEmpty()) {
		    errors.add(uploadUserRequest.getErrorRecord());
		    censusUploadResponse.setFailedRecordsCount(censusUploadResponse.getFailedRecordsCount() + 1);
		} else {
		    uploadUserRequest.setRowId(userIndex + 1);
		    requests.add(uploadUserRequest);
		}
	    }
	    LOGGER.info("Finished processing row ------> {}", (userIndex + 1));
	    censusUploadResponse.setTotalRecordsCount(userIndex + 1l);
	});

	requests.forEach(uploadUserRequest -> {
	    try {
		ErrorRecord insertData = usersUploadService.saveUser(uploadUserRequest, client.get().getClientId(),
			client.get().getId(), model.getTokenPayLoadDetails());
		if (insertData != null) {
		    insertData.setRowId(uploadUserRequest.getRowId());
		    errors.add(insertData);
		    censusUploadResponse.setFailedRecordsCount(censusUploadResponse.getFailedRecordsCount() + 1);
		    return;
		} else {
		    censusUploadResponse.setSuccessRecordsCount(censusUploadResponse.getSuccessRecordsCount() + 1);
		}
	    } catch (Exception exception) {
		ErrorRecord insertData = new ErrorRecord();
		insertData.setRowId(uploadUserRequest.getRowId());
		insertData.setMessage(getMessage(exception.getMessage()));
		errors.add(insertData);
	    }
	});

	LOGGER.info("Total rows ------> {}", requests.size() - 2);
	LOGGER.info("Number of rows with errors ------> {}", errors.size());
	LOGGER.info("Total rows uploaded successfully ------> {}", censusUploadResponse.getSuccessRecordsCount());
	LOGGER.info("Total time to upload the sheet ------> {} milliseconds", (System.currentTimeMillis() - startTime));
	censusUploadResponse.setErrors(
		errors.stream().sorted(Comparator.comparingInt(ErrorRecord::getRowId)).collect(Collectors.toList()));
	censusUploadResponse.setFailedRecordsCount(errors.size());
	// censusUploadResponse.setSuccessRecordsCount(censusUploadResponse.getTotalRecordsCount()-
	// errors.size()-2);
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