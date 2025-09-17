package com.wavelabs.sb.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.LocationMapping;
import com.wavelabs.sb.enums.LocationMappingFileType;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.SiteDetails;
import com.wavelabs.sb.response.ClientDetails;
import com.wavelabs.sb.response.RoleDetails;
import com.wavelabs.sb.response.UserDetails;
import com.wavelabs.sb.utils.ExcelReader;

@Service
public class ExcelService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExcelService.class);

    static final String[] USER_DETAILS_HEADERS = { "Emp Name", "Emp ID", "Role(Roles with comma Separator)",
	    "Reporting Manager", "Gender", "City", "Status", "Contact Number", "Age(Yrs)", "Mapped Store" };

    static final String[] CLIENT_DETAILS_HEADERS = { "Client ID", "Client Name", "Head Office Name", "Address", "Area",
	    "State", "City", "Country", "Pincode", "Mobile", "Email", "Admin Name", "Status" };

    static final String[] SITE_DETAILS_HEADERS = { "Site ID", "Site Name", "Site Type", "Contact Number", "Email",
	    "Address", "Country", "City", "Area", "State", "Pincode", "latitude", "longitude", "Client ID", "Managers",
	    "Status" };

    static final String[] USERS_BULK_UPLOAD_MAIN_HEADERS = { "Basic Details", "Employment Details", "Mapped Location",
	    "Bank Details" };
    static final String[] USERS_BULK_UPLOAD_SUB_HEADERS = { "First Name*", "Middle Name", "Last Name*",
	    "Date of Birth (DD-MM-YYYY)*", "Mobile Number*", "Personal Email", "Gender*", "PAN Number", "Aadhar Number",
	    "Address", "Country", "State", "City", "Area", "PIN", "Roles(Provide Roles with Comma Separator)",
	    "Type of Employment*", "EMP ID*", "Date of Joining (DD-MM-YYYY)*", "Email", "Status", "RM Emp ID",
	    "RM Employee's Name", "RD Emp ID", "RD Employee's Name", "Location ID*", "Store Address",
	    "Strore Manager Emp Id", "Store Head Emp Name", "Store Mobile Number", "Bank Name", "IFSC Code",
	    "Account Number", "Brach Name" };

    static final String[] SITES_BULK_UPLOAD_HEADERS = { "Name*", "Email", "Latitude", "Longitude", "Manager Ids",
	    "Address", "Phone*", "Site Id*", "Type", "Country*", "State*", "City*", "Area", "Pin", "Status" };

	static final String[] LOCATION_MAPPING_DAY_WISE_HEADERS = { "LoginID", "Store/Counter/Site ID", "Day" };
	static final String[] LOCATION_MAPPING_DATE_WISE_HEADERS = { "LoginID", "Store/Counter/Site ID", "Date" };
	static final String[] LOCATION_MAPPING_GENERIC_HEADERS = { "LoginID", "Store/Counter/Site ID" };

    static final String BULK_UPLOAD_SITES_SHEET = "SitesData";
    static final String BULK_UPLOAD_SHEET = "UsersData";

    static final String USER_DETAILS_SHEET = "UserDetails";
    static final String CLIENT_DETAILS_SHEET = "OnboardedClientDetails";
    static final String SITE_DETAILS_SHEET = "OnboardedSitesDetails";

    static int rowIdx;

    public static ByteArrayInputStream userDetailsToExcel(List<UserDetails> userDetails) {
	LOGGER.info("user Details To Excel method started..!");
	try (Workbook workbook = new XSSFWorkbook();

		ByteArrayOutputStream out = new ByteArrayOutputStream();) {
	    XSSFSheet sheet = (XSSFSheet) workbook.createSheet(USER_DETAILS_SHEET);
	    // Header
	    Row headerRow = sheet.createRow(0);
	    for (int col = 0; col < USER_DETAILS_HEADERS.length; col++) {
		Cell cell = headerRow.createCell(col);
		cell.setCellValue(USER_DETAILS_HEADERS[col]);
		sheet.setColumnWidth(3, 25 * 256);
	    }
	    rowIdx = 1;
	    userDetails.stream().forEach(user -> {
		Row row = sheet.createRow(rowIdx++);
		row.createCell(0).setCellValue(user.getEmployeeName());
		row.createCell(1).setCellValue(user.getEmployeeId());
		row.createCell(2).setCellValue(getRoles(user.getRoles()));
		row.createCell(3).setCellValue(user.getReportingManager());
		row.createCell(4).setCellValue(user.getGender());
		row.createCell(5).setCellValue(user.getCity());
		row.createCell(6).setCellValue(user.getStatus());
		row.createCell(7).setCellValue(user.getContactNumber());
		row.createCell(8).setCellValue(user.getAge());
		row.createCell(9).setCellValue(StringUtils.join(user.getMappedStores(), ","));
	    });
	    workbook.write(out);
	    LOGGER.info("user Details To Excel method ended..!");
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (IOException e) {
	    LOGGER.info("user Details To Excel : Resource Not Found - File Import Failed");
	    throw new ResourceNotFoundException(ErrorMessages.FILE_IMPORT_FAILED + e.getMessage());
	}
    }

    public static String getRoles(List<RoleDetails> roles) {
	LOGGER.info("in get Roles with List of Roles");
	return String.join(", ", roles.stream().map(RoleDetails::getName).collect(Collectors.toList()));
    }

    public static ByteArrayInputStream usersBulkUploadTemplate() {
	LOGGER.info("users Bulk Upload Template : Begin");
	try (Workbook workbook = new XSSFWorkbook();

		ByteArrayOutputStream out = new ByteArrayOutputStream();) {

	    XSSFSheet sheet = (XSSFSheet) workbook.createSheet(BULK_UPLOAD_SHEET);
	    // Header
	    CellStyle style = workbook.createCellStyle();
	    style.setAlignment(HorizontalAlignment.CENTER);
	    Row headerRow = sheet.createRow(0);
	    Cell cell = headerRow.createCell(0);
	    cell.setCellValue(USERS_BULK_UPLOAD_MAIN_HEADERS[0]);
	    cell.setCellStyle(style);
	    sheet.setColumnWidth(3, 25 * 256);
	    sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 14));
	    Cell cell1 = headerRow.createCell(15);
	    cell1.setCellValue(USERS_BULK_UPLOAD_MAIN_HEADERS[1]);
	    cell1.setCellStyle(style);
	    sheet.setColumnWidth(3, 25 * 256);
	    sheet.addMergedRegion(new CellRangeAddress(0, 0, 15, 24));
	    Cell cell2 = headerRow.createCell(25);
	    cell2.setCellValue(USERS_BULK_UPLOAD_MAIN_HEADERS[2]);
	    cell2.setCellStyle(style);
	    sheet.setColumnWidth(3, 25 * 256);
	    sheet.addMergedRegion(new CellRangeAddress(0, 0, 25, 29));
	    Cell cell3 = headerRow.createCell(30);
	    cell3.setCellValue(USERS_BULK_UPLOAD_MAIN_HEADERS[3]);
	    cell3.setCellStyle(style);
	    sheet.setColumnWidth(3, 25 * 256);
	    sheet.addMergedRegion(new CellRangeAddress(0, 0, 30, 33));

	    Row subRow = sheet.createRow(1);
	    for (int col = 0; col < USERS_BULK_UPLOAD_SUB_HEADERS.length; col++) {
		Cell cell4 = subRow.createCell(col);
		cell4.setCellValue(USERS_BULK_UPLOAD_SUB_HEADERS[col]);
		cell4.setCellStyle(style);
		sheet.setColumnWidth(3, 25 * 256);
	    }
	    workbook.write(out);
	    LOGGER.info("users Bulk Upload Template : end");
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (IOException e) {
	    LOGGER.info("users Bulk Upload Template : Resource Not Found - File Import Failed");
	    throw new ResourceNotFoundException(ErrorMessages.FILE_IMPORT_FAILED + e.getMessage());
	}
    }

    public static ByteArrayInputStream clientDetailsToExcel(List<ClientDetails> clientDetails) {
	LOGGER.info("client Details To Excel : begin");
	try (Workbook workbook = new XSSFWorkbook();

		ByteArrayOutputStream out = new ByteArrayOutputStream();) {
	    XSSFSheet sheet = (XSSFSheet) workbook.createSheet(CLIENT_DETAILS_SHEET);
	    // Header
	    Row headerRow = sheet.createRow(0);
	    for (int col = 0; col < CLIENT_DETAILS_HEADERS.length; col++) {
		Cell cell = headerRow.createCell(col);
		cell.setCellValue(CLIENT_DETAILS_HEADERS[col]);
		sheet.setColumnWidth(3, 25 * 256);
	    }
	    rowIdx = 1;
	    clientDetails.stream().forEach(client -> {
		Row row = sheet.createRow(rowIdx++);
		row.createCell(0).setCellValue(client.getClientId());
		row.createCell(1).setCellValue(client.getClientName());
		row.createCell(2).setCellValue(client.getHeadOfficeName());
		row.createCell(3).setCellValue(client.getAddress());
		row.createCell(4).setCellValue(client.getArea());
		row.createCell(5).setCellValue(client.getState());
		row.createCell(6).setCellValue(client.getCity());
		row.createCell(7).setCellValue(client.getCountry());
		row.createCell(8).setCellValue(client.getPinCode());
		row.createCell(9).setCellValue(client.getMobile());
		row.createCell(10).setCellValue(client.getEmail());
		row.createCell(11).setCellValue(client.getAdminName());
		row.createCell(12).setCellValue(client.getStatus().toString());
	    });
	    workbook.write(out);
	    LOGGER.info("client Details To Excel : end");
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (IOException e) {
	    LOGGER.info("client Details To Excel : Resource Not Found - File Import Failed");
	    throw new ResourceNotFoundException(ErrorMessages.FILE_IMPORT_FAILED + e.getMessage());
	}
    }

    public static ByteArrayInputStream sitesDetailsToExcel(List<SiteDetails> sitesDetails) {
	LOGGER.info("sites Details To Excel : begin");
	try (Workbook workbook = new XSSFWorkbook();

		ByteArrayOutputStream out = new ByteArrayOutputStream();) {
	    XSSFSheet sheet = (XSSFSheet) workbook.createSheet(SITE_DETAILS_SHEET);
	    // Header
	    Row headerRow = sheet.createRow(0);
	    for (int col = 0; col < SITE_DETAILS_HEADERS.length; col++) {
		Cell cell = headerRow.createCell(col);
		cell.setCellValue(SITE_DETAILS_HEADERS[col]);
		sheet.setColumnWidth(3, 25 * 256);
	    }
	    rowIdx = 1;
	    sitesDetails.stream().forEach(site -> {
		Row row = sheet.createRow(rowIdx++);
		row.createCell(0).setCellValue(site.getSiteId());
		row.createCell(1).setCellValue(site.getSiteName());
		if (site.getSiteType() != null) {
		    row.createCell(2).setCellValue(site.getSiteType().toString());
		} else {
		    row.createCell(2).setCellValue(Constants.EMPTY);
		}
		row.createCell(3).setCellValue(site.getContactNumber());
		row.createCell(4).setCellValue(site.getEmail());
		row.createCell(5).setCellValue(site.getAddress());
		row.createCell(6).setCellValue(site.getCountry());
		row.createCell(7).setCellValue(site.getCity());
		row.createCell(8).setCellValue(site.getArea());
		row.createCell(9).setCellValue(site.getState());
		row.createCell(10).setCellValue(site.getPin());
		row.createCell(11).setCellValue(site.getLatitude());
		row.createCell(12).setCellValue(site.getLongitude());
		row.createCell(13).setCellValue(site.getClientId());
		row.createCell(14).setCellValue(StringUtils.join(site.getManagers(), ","));
		row.createCell(15).setCellValue(site.getStatus().toString());
	    });
	    workbook.write(out);
	    LOGGER.info("sites Details To Excel : end");
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (IOException e) {
	    LOGGER.info("sites Details To Excel : Resource Not Found - File Import Failed");
	    throw new ResourceNotFoundException(ErrorMessages.FILE_IMPORT_FAILED + e.getMessage());
	}
    }

    public static ByteArrayInputStream sitesBulkUploadTemplate() {
	LOGGER.info("sites Bulk Upload Template : begin");
	try (Workbook workbook = new XSSFWorkbook();

		ByteArrayOutputStream out = new ByteArrayOutputStream();) {

	    XSSFSheet sheet = (XSSFSheet) workbook.createSheet(BULK_UPLOAD_SITES_SHEET);
	    // Header
	    CellStyle style = workbook.createCellStyle();
	    style.setAlignment(HorizontalAlignment.CENTER);
	    Row row = sheet.createRow(0);

	    for (int col = 0; col < SITES_BULK_UPLOAD_HEADERS.length; col++) {
		Cell cell = row.createCell(col);
		cell.setCellValue(SITES_BULK_UPLOAD_HEADERS[col]);
		cell.setCellStyle(style);
		sheet.setColumnWidth(3, 25 * 256);
	    }
	    workbook.write(out);
	    LOGGER.info("sites Bulk Upload Template : end");
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (IOException e) {
	    LOGGER.info("sites Bulk Upload Template : Run Time Exception- File Import Failed");
	    throw new ResourceNotFoundException("fail to import data to Excel file: " + e.getMessage());
	}
    }

	public static Map<String, List<LocationMapping>> excelToLocationMapping (MultipartFile file) {
		LOGGER.info("Excel to Location Mapping Upload : begin");
		try {
			ExcelReader er = new ExcelReader();
			Workbook workbook = new XSSFWorkbook(file.getInputStream());
			Sheet sheet = workbook.getSheetAt(0);
			Iterator<Row> rows = sheet.iterator();
			Map<String, List<LocationMapping>> locationMappings = new HashMap<>();
			LocationMappingFileType fileType = LocationMappingFileType.TEMPLATE_GENERIC;
			List<String> invalidDays = new ArrayList<>();
			List<String> invalidDates = new ArrayList<>();
			int rowNumber = 0;
			while (rows.hasNext()) {
				Row currentRow = rows.next();
				Iterator<Cell> cellsInRow = currentRow.iterator();
				if (!cellsInRow.hasNext()) {
					continue;
				}
				// skip header
				if (rowNumber == 0) {
					Cell thirdCell = currentRow.getCell(2);
					if (thirdCell != null) {
						String thirdCellValue = thirdCell.getStringCellValue();
						if (thirdCellValue.equals("Day")) {
							fileType = LocationMappingFileType.TEMPLATE_DAY_WISE;
						}
						if (thirdCellValue.equals("Date")) {
							fileType = LocationMappingFileType.TEMPLATE_DATE_WISE;
						}
					}
					rowNumber++;
					continue;
				}
				int cellIdx = 0;			
				LocationMapping locationMapping = new LocationMapping();
				List<LocationMapping> locationMappingsList =  new ArrayList<LocationMapping>();
				Cell userIdCell = currentRow.getCell(0);
				Cell locationCell = currentRow.getCell(1);				
				if (userIdCell == null || locationCell == null) {
					continue;
				}				
				String userId = userIdCell.getStringCellValue();
				String location = locationCell.getStringCellValue();
				if (locationMappings.get(userId) != null) {
					locationMappingsList = locationMappings.get(userId);
					List<LocationMapping> locationMappingsListF = locationMappingsList.stream().filter(lm -> lm.getLocation().equals(location))
							.collect(Collectors.toList());
					if (locationMappingsListF.size() > 0) {
						locationMapping = locationMappingsListF.get(0);
					}
				}
				while (cellsInRow.hasNext()) {
					Cell currentCell = cellsInRow.next();
					switch (cellIdx) {
						case 0:
							locationMapping.setUserId(currentCell.getStringCellValue());
							break;
						case 1:
							locationMapping.setLocation(currentCell.getStringCellValue());
							break;
						case 2:
							List<String> days = new ArrayList<>();
							if (locationMapping.getDays() != null) {
								days = locationMapping.getDays();
							}							
							List<String> dates = new ArrayList<>();
							if (locationMapping.getDates() != null) {
								dates = locationMapping.getDates();
							}
							if (fileType == LocationMappingFileType.TEMPLATE_DAY_WISE) {
								String[] cellDays = currentCell.getStringCellValue().split(",");
								for (String day: cellDays) {
									day = day.trim();
									if (!Constants.WEEK_DAYS.contains(day.toUpperCase())) {
										invalidDays.add(day);
									}

									if (!days.contains(day)) {
										days.add(day);
									}
								}
								locationMapping.setDays(days);
							}
							if (fileType == LocationMappingFileType.TEMPLATE_DATE_WISE) {
								String value = "";
								if (currentCell.getCellType() == CellType.STRING) {
									value = currentCell.getStringCellValue();
								}
								if (currentCell.getCellType() == CellType.NUMERIC) {
									Date date = currentCell.getDateCellValue();
									DateFormat DateFormat = new SimpleDateFormat("dd-MM-yyyy");
									value = DateFormat.format(date);
								}
								String[] cellDates = value.split(",");
								for (String date: cellDates) {
									date = date.trim();
									if (!er.isDateValid(date, "dd-MM-yyyy")) {
										invalidDates.add(date);
									}
									if (!dates.contains(date)) {
										dates.add(date.trim());
									}
								}
								locationMapping.setDates(dates);
							}
							break;
						default:
							break;
					}
					cellIdx++;
				}				
				locationMappingsList.add(locationMapping);
				locationMappings.put(userId, locationMappingsList);
			}
			workbook.close();
			if (!invalidDays.isEmpty()) {
				throw new BadRequestException(ErrorMessages.INVALID_DAYS + invalidDays);
			}
			if (!invalidDates.isEmpty()) {
				throw new BadRequestException(ErrorMessages.INVALID_DATES + invalidDates);
			}
			LOGGER.info("Excel to Location Mapping Upload : end");
			return locationMappings;
		} catch (IOException e) {
			LOGGER.info("Excel to Location Mapping Upload : Run Time Exception");
			throw new ResourceNotFoundException(ErrorMessages.FILE_IMPORT_FAILED + e.getMessage());
		}
	}

	public static ByteArrayInputStream locationMappingExcel(LocationMappingFileType fileType) {
		LOGGER.info("Location Mapping Excel: Begin");
		
		try (Workbook workbook = new XSSFWorkbook();
			ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			XSSFSheet sheet = (XSSFSheet) workbook.createSheet(USER_DETAILS_SHEET);

			String[] headers = LOCATION_MAPPING_GENERIC_HEADERS;
			switch (fileType) {
				case TEMPLATE_DAY_WISE:
					headers = LOCATION_MAPPING_DAY_WISE_HEADERS;
					break;
				
				case TEMPLATE_DATE_WISE:
					headers = LOCATION_MAPPING_DATE_WISE_HEADERS;
					break;

				default:
					headers = LOCATION_MAPPING_GENERIC_HEADERS;
					break;
			}

			// Headers
			Row headerRow = sheet.createRow(0);
			for (int col = 0; col < headers.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(headers[col]);
				sheet.setColumnWidth(3, 25 * 256);
			}

			String[] usersIds = { "ABC123", "XYZ123" };
			String[] locations = { "ABC", "XYZ" };
			String[] days = { "Monday, Friday, Sunday", "Wednesday" };
			String[] dates = { "01-11-2022", "05-11-2022, 28-12-2022," };

			rowIdx = 1;
			for (int i = 0; i < usersIds.length; i++) {
				Row row = sheet.createRow(rowIdx++);

				row.createCell(0).setCellValue(usersIds[i]);
				row.createCell(1).setCellValue(locations[i]);

				if (fileType == LocationMappingFileType.TEMPLATE_DAY_WISE) {
					row.createCell(2).setCellValue(days[i]);
				}
				if (fileType == LocationMappingFileType.TEMPLATE_DATE_WISE) {
					row.createCell(2).setCellValue(dates[i]);
				}
			}

			workbook.write(out);

			LOGGER.info("Location Mapping Excel: End");
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			LOGGER.info("Location Mapping Excel: Failed");
			throw new ResourceNotFoundException(ErrorMessages.FILE_IMPORT_FAILED + e.getMessage());
		}
	}
	
}
