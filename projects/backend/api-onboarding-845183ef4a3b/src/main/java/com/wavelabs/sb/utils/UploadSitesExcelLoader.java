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
import com.wavelabs.sb.enums.SiteType;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.request.UploadSiteRequest;
import com.wavelabs.sb.response.ErrorRecord;
import com.wavelabs.sb.response.RowErrors;

public class UploadSitesExcelLoader extends ExcelReader {
    DataFormatter dataFormatter = new DataFormatter();

    private String nameRegex = "^[ A-Za-z0-9_#-/,]*$";
    private String mobileNumberRegex = "^[1-9][0-9]{9}$";
    private String emailRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    private String addressRegex = "^[ A-Za-z0-9_#-/,]*$";
    private String areaRegex = "^[ a-zA-Z_#-/,]*$";
    private String pinCodeRegex = "^[1-9][0-9]{5}$";

    public UploadSitesExcelLoader(MultipartFile multipartFile) {
	load(multipartFile);
    }

    /***
     * Get next agent record
     * 
     * @return
     */
    public Optional<UploadSiteRequest> next() {
	if (super.siteHasNext()) {
	    Row row = sheet.getRow(siteRowNumber);
	    siteRowNumber++;
	    if (row != null) {
		UploadSiteRequest userRequest = createSiteObject(row);
		return Optional.of(userRequest);
	    }
	}
	return Optional.empty();
    }

    /***
     * read data from excel sheet and set it to agent value object
     * 
     * @param row
     * @param uploadUserRequest
     * @return
     */
    private UploadSiteRequest createSiteObject(Row row) {
	UploadSiteRequest uploadSiteRequest = new UploadSiteRequest();
	List<RowErrors> rowErrors = new ArrayList<>();
	List<String> siteTypes = new ArrayList<>(Arrays.asList(getNames(SiteType.class)));
	IntStream.range(0, columnMainHeaders.size()).forEach(header -> {
	    try {

		switch (columnMainHeaders.get(header).toUpperCase()) {
		case "NAME*":
		    uploadSiteRequest.setName(getValueFromCell(row, header));
		    isEmpty(uploadSiteRequest.getName(), ErrorMessages.SITE_NAME_MANDATORY);
		    isValid(uploadSiteRequest.getName(), nameRegex, ErrorMessages.PROVIDE_VALID_SITE_NAME);
		    break;

		case "EMAIL":
		    uploadSiteRequest.setEmail(getValueFromCell(row, header));
		    isValid(uploadSiteRequest.getEmail(), emailRegex, ErrorMessages.PROVIDE_VALID_EMAIL);
		    break;
		case "LATITUDE":
		    String latitude = getValueFromCell(row, header);
		    uploadSiteRequest.setLatitude(
			    !StringUtils.isBlank(latitude) ? Double.valueOf(getValueFromCell(row, header)) : null);
		    break;
		case "LONGITUDE":
		    String longtitude = getValueFromCell(row, header);
		    uploadSiteRequest.setLongitude(
			    !StringUtils.isBlank(longtitude) ? Double.valueOf(getValueFromCell(row, header)) : null);
		    break;
		case "MANAGER IDS(PROVIDE IDS WITH COMMA SEPARATOR)":
		    String managers = getValueFromCell(row, header);
		    uploadSiteRequest
			    .setManagers(StringUtils.isBlank(managers) ? new ArrayList<>() : Arrays.asList(managers.split(",")));
		    break;
		case "ADDRESS":
		    uploadSiteRequest.setAddress(getValueFromCell(row, header));
		    isValid(uploadSiteRequest.getAddress(), addressRegex, ErrorMessages.PROVIDE_VALID_ADDRESS);
		    break;
		case "PHONE*":
		    uploadSiteRequest.setPhone(getValueFromCell(row, header));
		    isEmpty(uploadSiteRequest.getName(), ErrorMessages.PHONE_NUMBER_MANDATORY);
		    isValid(uploadSiteRequest.getPhone(), mobileNumberRegex, ErrorMessages.PROVIDE_VALID_PHONE_NUMBER);
		    break;
		case "SITE ID*":
		    uploadSiteRequest.setSiteId(getValueFromCell(row, header));
		    isEmpty(uploadSiteRequest.getSiteId(), ErrorMessages.SITE_ID_MANDATORY);
		    break;
		case "TYPE":
		    uploadSiteRequest.setType(getValueFromCell(row, header));
		    if (!StringUtils.isBlank(uploadSiteRequest.getType())
			    && !siteTypes.contains(uploadSiteRequest.getType().toUpperCase())) {
			throw new BadRequestException(
				ErrorMessages.PROVIDE_SITE_TYPE + StringUtils.join(siteTypes, ","));
		    }
		    break;

		case "COUNTRY*":
		    uploadSiteRequest.setCountry(getValueFromCell(row, header));
		    isEmpty(uploadSiteRequest.getCountry(), ErrorMessages.COUNTRY_MANDATORY);
		    isValid(uploadSiteRequest.getCountry(), areaRegex, ErrorMessages.PROVIDE_VALID_COUNTY);
		    break;
		case "STATE*":
		    uploadSiteRequest.setState(getValueFromCell(row, header));
		    isEmpty(uploadSiteRequest.getState(), ErrorMessages.STATE_MANDATORY);
		    isValid(uploadSiteRequest.getState(), areaRegex, ErrorMessages.PROVIDE_VALID_STATE);
		    break;
		case "CITY*":
		    uploadSiteRequest.setCity(getValueFromCell(row, header));
		    isEmpty(uploadSiteRequest.getCity(), ErrorMessages.CITY_MANDATORY);
		    isValid(uploadSiteRequest.getCity(), areaRegex, ErrorMessages.PROVIDE_VALID_CITY);
		    break;

		case "AREA":
		    uploadSiteRequest.setArea(getValueFromCell(row, header));
		    isValid(uploadSiteRequest.getArea(), areaRegex, ErrorMessages.PROVIDE_VALID_AREA);
		    break;
		case "PIN":
		    uploadSiteRequest.setPin(getValueFromCell(row, header));
		    isValid(uploadSiteRequest.getPin(), pinCodeRegex, ErrorMessages.PROVIDE_VALID_PINCODE);
		    break;

		case "STATUS":
		    uploadSiteRequest.setStatus(getStatus(getValueFromCell(row, header)));
		    break;
		}
	    } catch (Exception exception) {
		RowErrors error = new RowErrors();
		error.setColumnName(columnMainHeaders.get(header));
		error.setErrorMessage(exception.getMessage());
		rowErrors.add(error);
	    }
	    if (!rowErrors.isEmpty()) {
		uploadSiteRequest.setErrorRecord(new ErrorRecord(siteRowNumber, rowErrors));
	    }

	});

	return uploadSiteRequest;
    }

    private void isValid(String value, String regex, String message) {
	if (!StringUtils.isBlank(value) && !Pattern.matches(regex, value)) {
	    throw new BadRequestException(message);
	}
    }

    public static String[] getNames(Class<? extends Enum<?>> e) {
	return Arrays.stream(e.getEnumConstants()).map(Enum::name).toArray(String[]::new);
    }

    private void isEmpty(String value, String message) {
	if (StringUtils.isBlank(value)) {
	    throw new BadRequestException(message);
	}
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
