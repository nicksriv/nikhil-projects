package com.wavelabs.sb.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.IntStream;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.request.ReferralRequest;
import com.wavelabs.sb.request.ReportingManagerRequest;
import com.wavelabs.sb.request.UploadUserRequest;
import com.wavelabs.sb.response.ErrorRecord;
import com.wavelabs.sb.response.RowErrors;

public class UploadUsersExcelLoader extends ExcelReader {
    DataFormatter dataFormatter = new DataFormatter();

    private String nameRegex = "^[ A-Za-z]*$";
    private String mobileNumberRegex = "^[1-9][0-9]{9}$";
    private String emailRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    private String genderRegex = "Male|Female|Others|male|female|others";
    private String panNumberRegex = "[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}";
    private String aadharNumberRegex = "^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$";
    private String addressRegex = "^[ A-Za-z0-9_#-/,]*$";
    private String areaRegex = "^[ a-zA-Z_#-/,]*$";
    private String pinCodeRegex = "^[1-9][0-9]{5}$";
    private String bankTextRegex = "^[ A-Za-z_#/,]*$";
    private String ifscCodeRegex = "[A-Za-z]{4}[0-9]*$";
    private String accountNumberRegex = "^[0-9]*$";
    private String dateRegex = "^(3[01]|[1-2][0-9]|0[1-9])-(1[0-2]|0[1-9])-[0-9]{4}$";

    public UploadUsersExcelLoader(MultipartFile multipartFile) {
	load(multipartFile);
    }

    /***
     * Get next agent record
     * 
     * @return
     */
    public Optional<UploadUserRequest> next() {
	if (super.userHasNext()) {
	    Row row = sheet.getRow(userRowNumber);
	    userRowNumber++;
	    if (row != null) {
		UploadUserRequest userRequest = createUserObject(row);
		return Optional.of(userRequest);
	    }
	}
	return Optional.empty();
    }

    /***
     * read data from excel sheet and set it to agent value object
     * 
     * @param row
     * @return
     */
    private UploadUserRequest createUserObject(Row row) {
	UploadUserRequest uploadUserRequest = new UploadUserRequest();
	ReportingManagerRequest reportingManager = new ReportingManagerRequest();
	ReferralRequest referral = new ReferralRequest();
	List<RowErrors> rowErrors = new ArrayList<>();

	IntStream.range(0, columnSubHeaders.size()).forEach(header -> {
	    try {

		switch (columnSubHeaders.get(header).toUpperCase()) {
		case "FIRST NAME*":
		    uploadUserRequest.setFirstName(getValueFromCell(row, header));
		    isEmpty(uploadUserRequest.getFirstName(), ErrorMessages.FIRST_NAME_MANDATORY);
		    isValid(uploadUserRequest.getFirstName(), nameRegex, ErrorMessages.PROVIDE_VALID_FIRST_NAME);
		    break;
		case "MIDDLE NAME":
		    uploadUserRequest.setMiddleName(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getMiddleName(), nameRegex, ErrorMessages.PROVIDE_VALID_MIDDLE_NAME);
		    break;

		case "LAST NAME*":
		    uploadUserRequest.setLastName(getValueFromCell(row, header));
		    isEmpty(uploadUserRequest.getLastName(), ErrorMessages.LAST_NAME_MANDATORY);
		    isValid(uploadUserRequest.getLastName(), nameRegex, ErrorMessages.PROVIDE_VALID_LAST_NAME);
		    break;

		case "DATE OF BIRTH (DD-MM-YYYY)*":
		    uploadUserRequest.setDob(readDateValues(row, header));
		    isEmpty(uploadUserRequest.getDob(), ErrorMessages.DATE_OF_BIRTH_MANDATORY);
		    isValid(uploadUserRequest.getDob(), dateRegex, ErrorMessages.DATE_FORMAT);
		    break;
		case "MOBILE NUMBER*":
		    uploadUserRequest.setContactNumber(getValueFromCell(row, header));
		    isEmpty(uploadUserRequest.getContactNumber(), ErrorMessages.MOBILE_NUMBER_MANDATORY);
		    isValid(uploadUserRequest.getContactNumber(), mobileNumberRegex,
			    ErrorMessages.PROVIDE_VALID_MOBILE_NUMBER);
		    break;

		case "PERSONAL EMAIL":
		    uploadUserRequest.setPersonalEmail(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getPersonalEmail(), emailRegex, ErrorMessages.PROVIDE_VALID_EMAIL);
		    break;

		case "GENDER*":
		    uploadUserRequest.setGender(StringUtils.capitalize(getValueFromCell(row, header)));
		    isEmpty(uploadUserRequest.getGender(), ErrorMessages.GENDER_MANDATORY);
		    isValid(uploadUserRequest.getGender(), genderRegex, ErrorMessages.PROVIDE_VALID_GENDER);
		    break;
		case "PAN NUMBER":
		    uploadUserRequest.setPan(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getPan(), panNumberRegex, ErrorMessages.PROVIDE_VALID_PAN_NUMBER);
		    break;
		case "AADHAR NUMBER":
		    uploadUserRequest.setAadharNumber(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getAadharNumber(), aadharNumberRegex,
			    ErrorMessages.PROVIDE_VALID_AADHAR_NUMBER);
		    break;

		case "ADDRESS":
		    uploadUserRequest.setAddress(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getAddress(), addressRegex, ErrorMessages.PROVIDE_VALID_ADDRESS);
		    break;
		case "COUNTRY":
		    uploadUserRequest.setCountry(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getCountry(), areaRegex, ErrorMessages.PROVIDE_VALID_COUNTY);
		    break;
		case "STATE":
		    uploadUserRequest.setState(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getState(), areaRegex, ErrorMessages.PROVIDE_VALID_STATE);
		    break;
		case "CITY":
		    uploadUserRequest.setCity(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getCity(), areaRegex, ErrorMessages.PROVIDE_VALID_CITY);
		    break;

		case "AREA":
		    uploadUserRequest.setArea(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getArea(), areaRegex, ErrorMessages.PROVIDE_VALID_AREA);
		    break;
		case "PIN":
		    uploadUserRequest.setPinCode(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getPinCode(), pinCodeRegex, ErrorMessages.PROVIDE_VALID_PINCODE);
		    break;

		case "TYPE OF EMPLOYMENT*":
		    uploadUserRequest.setTypeOfEmployment(getValueFromCell(row, header));
		    isEmpty(uploadUserRequest.getTypeOfEmployment(), ErrorMessages.TYPE_OF_EMPLOYMENT_MANDATORY);
		    break;
		case "EMP ID*":
		    uploadUserRequest.setEmployeeId(getValueFromCell(row, header));
		    isEmpty(uploadUserRequest.getTypeOfEmployment(), ErrorMessages.EMPLOYEE_ID_MANDATORY);

		    break;
		case "DATE OF JOINING (DD-MM-YYYY)*":
		    uploadUserRequest.setJoiningDate(readDateValues(row, header));
		    isEmpty(uploadUserRequest.getJoiningDate(), ErrorMessages.JOINING_DATE_MANDATORY);
		    isValid(uploadUserRequest.getJoiningDate(), dateRegex, ErrorMessages.DATE_FORMAT);

		    break;
		case "EMAIL":
		    uploadUserRequest.setEmployeeEmail(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getEmployeeEmail(), emailRegex, ErrorMessages.PROVIDE_VALID_EMAIL);
		    break;
		case "STATUS":
		    uploadUserRequest.setStatus(getStatus(getValueFromCell(row, header)));
		    break;
		case "RM EMP ID":
		    reportingManager.setId((getValueFromCell(row, header)));
		    break;
		case "RM EMPLOYEE'S NAME":
		    reportingManager.setName(getValueFromCell(row, header));
		    isValid(reportingManager.getName(), nameRegex, ErrorMessages.PROVIDE_VALID_NAME);
		    break;
		case "RD EMP ID":
		    referral.setId(getValueFromCell(row, header));
		    break;

		case "RD EMPLOYEE'S NAME":
		    referral.setName(getValueFromCell(row, header));
		    isValid(referral.getName(), nameRegex, ErrorMessages.PROVIDE_VALID_NAME);
		    break;
		case "LOCATION ID*":
		    uploadUserRequest.setLocation(getValueFromCell(row, header));
		    isEmpty(uploadUserRequest.getLocation(), ErrorMessages.STORE_LOCATION_MANDATORY);
		    break;
		case "STORE ADDRESS":
		    uploadUserRequest.setStoreAddress(getValueFromCell(row, header));
		    break;
		case "STRORE MANAGER EMP ID":
		    uploadUserRequest.setStroreManagerEmpId(getValueFromCell(row, header));
		    break;
		case "STORE HEAD EMP NAME":
		    uploadUserRequest.setStroreHeadEmpName(getValueFromCell(row, header));
		    break;
		case "STORE MOBILE NUMBER":
		    uploadUserRequest.setStoreMobileNumber(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getStoreMobileNumber(), mobileNumberRegex,
			    ErrorMessages.PROVIDE_VALID_STORE_MOBILE_NUMBER);
		    break;
		case "BANK NAME":
		    uploadUserRequest.setBankName(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getBankName(), bankTextRegex, ErrorMessages.PROVIDE_VALID_BANK_NAME);
		    break;
		case "IFSC CODE":
		    uploadUserRequest.setIfscCode(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getIfscCode(), ifscCodeRegex, ErrorMessages.PROVIDE_VALID_IFSC_CODE);
		    break;
		case "ACCOUNT NUMBER":
		    uploadUserRequest.setAccountNumber(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getAccountNumber(), accountNumberRegex,
			    ErrorMessages.PROVIDE_VALID_ACCOUNT_NUMBER);
		    break;
		case "BRACH NAME":
		    uploadUserRequest.setBranchName(getValueFromCell(row, header));
		    isValid(uploadUserRequest.getBranchName(), bankTextRegex, ErrorMessages.PROVIDE_VALID_BRANCH_NAME);
		    break;
		case "ROLES(PROVIDE ROLES WITH COMMA SEPARATOR)":
		    String roles = getValueFromCell(row, header);
		    uploadUserRequest.setRoles(roles != null ? Arrays.asList(getValueFromCell(row, header).split(","))
			    : new ArrayList<>());
		    // isEmpty(uploadUserRequest.getRoles(), ErrorMessages.ROLE_MANDATORY);
		    break;
		}
	    } catch (Exception exception) {
		// uploadUserRequest.setErrorRecord(new ErrorRecord(rowNumber,
		// getErrorMessage(message, exception.getMessage())));
		RowErrors error = new RowErrors();
		error.setColumnName(columnSubHeaders.get(header));
		error.setErrorMessage(exception.getMessage());
		rowErrors.add(error);
	    }
	    if (!rowErrors.isEmpty()) {
		uploadUserRequest.setErrorRecord(new ErrorRecord(userRowNumber, rowErrors));
	    }

	});
	uploadUserRequest.setReferral(referral);
	uploadUserRequest.setReportingManager(reportingManager);
	return uploadUserRequest;
    }

    private void isValid(String value, String regex, String message) {
	if (!StringUtils.isBlank(value) && !Pattern.matches(regex, value)) {
	    throw new BadRequestException(message);
	}
    }

    private void isEmpty(String value, String message) {
	if (StringUtils.isBlank(value)) {
	    throw new BadRequestException(message);
	}
    }

    private void isEmpty(List<String> value, String message) {
	if (value.isEmpty()) {
	    throw new BadRequestException(message);
	}
    }

    private String getErrorMessage(String message, String error) {
	if (!StringUtils.isBlank(message)) {
	    message = message + ", " + error;
	} else {
	    message = error;
	}
	return message;
    }

    private Status getStatus(String status) {
	if (!StringUtils.isBlank(status) && !status.equalsIgnoreCase(Status.ACTIVE.toString())) {
	    return Status.INACTIVE;
	}
	return Status.ACTIVE;
    }

    /**
     * Read date value from the row with a given column number.
     * 
     * @param row
     * @param columnType
     * @return
     * @throws ParseException
     */
    private String readDateValues(Row row, int position) throws ParseException {
	try {
	    if (!StringUtils.isBlank(dataFormatter.formatCellValue(row.getCell(position)))) {
		SimpleDateFormat outputDateFormat = new SimpleDateFormat("dd-MM-yyyy");
		SimpleDateFormat inputDateFormat = new SimpleDateFormat("dd-MM-yyyy");
		Cell cellValue = row.getCell(position);
		if (cellValue.getCellType().equals(CellType.STRING)) {
		    String data = dataFormatter.formatCellValue(cellValue);
		    Date date = inputDateFormat.parse(data);
		    return outputDateFormat.format(date);
		} else {
		    return outputDateFormat.format(row.getCell(position).getDateCellValue());
		}
	    }
	} catch (Exception e) {
	    throw new BadRequestException(ErrorMessages.DATE_FORMAT);
	}
	return null;
    }

    /**
     * Read value from the row with a given column number.
     * 
     * @param row
     * @param columnType
     * @return
     */
    private String getValueFromCell(Row row, int position) {
	Cell cellValue = row.getCell(position);

	String value = (cellValue != null && cellValue.getCellType() == CellType.NUMERIC)
		? NumberToTextConverter.toText(cellValue.getNumericCellValue())
		: dataFormatter.formatCellValue(cellValue);
	return StringUtils.isBlank(value) ? null : value.trim();
    }

}
