package com.wavelabs.sb.model;

import java.time.Instant;

import javax.validation.Valid;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.UserBankDetails;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.UserBankRequest;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.UserBankDetailsResponse;

public class UserBankDetailsDataBuilder {

    public static UserBankRequest getUserBankRequest() {
	UserBankRequest userBankRequest = new UserBankRequest();
	userBankRequest.setAccountNumber("012345678990");
	userBankRequest.setBankName("State Bank Of India");
	userBankRequest.setIfscCode("SBI0002345");
	userBankRequest.setBranchName("Hyderabad");
	return userBankRequest;
    }

    public static @Valid UserBankRequest getUserBankRequestWithInvalidData() {
	UserBankRequest userRequest = new UserBankRequest();
	return userRequest;
    }

    public static BaseResponse saveUserBankResponse() {
	BaseResponse baseResponse = new BaseResponse();
	baseResponse.setMessage(Constants.USER_BANK_DETAILS_SAVED);
	return baseResponse;
    }

    public static UserBankDetails getUserBankDetails() {
	UserBankDetails userBankDetails = new UserBankDetails();
	userBankDetails.setAccountNumber("012345678990");
	userBankDetails.setName("State Bank Of India");
	userBankDetails.setIfscCode("SBI0002345");
	userBankDetails.setBranch("Hyderabad");
	userBankDetails.setStatus(Status.ACTIVE);
	userBankDetails.setId("6151c3127c846c695d2ecb9b");
	userBankDetails.setClientId(null);
	userBankDetails.setCreatedAt(Instant.now());
	userBankDetails.setModifiedAt(Instant.now());
	return userBankDetails;
    }

    public static UserBankDetailsResponse getUserBankDetailsResponse() {
	UserBankDetailsResponse userBankDetails = new UserBankDetailsResponse();
	userBankDetails.setAccountNumber("012345678990");
	userBankDetails.setBankName("State Bank Of India");
	userBankDetails.setIfscCode("SBI0002345");
	userBankDetails.setBranchName("Hyderabad");
	return userBankDetails;
    }

}
