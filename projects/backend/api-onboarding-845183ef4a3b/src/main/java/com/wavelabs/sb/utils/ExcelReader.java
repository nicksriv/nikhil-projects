package com.wavelabs.sb.utils;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.exceptions.BadRequestException;

public class ExcelReader {

    public static final Logger LOGGER = LoggerFactory.getLogger(ExcelReader.class);

    protected int userRowNumber = 2;
    protected int siteRowNumber = 1;
    protected int totalNumberOfRows = 0;
    protected InputStream inputStream;
    protected List<String> columnMainHeaders = new ArrayList<>();
    protected List<String> columnSubHeaders = new ArrayList<>();

    private Workbook workbook = null;
    protected Sheet sheet = null;
    private Row row = null;
    private String fileName;

    /***
     * read the excel sheet
     * 
     * @param multipartFile
     */

    public void close(int sheetNum) {
	try {
	    if (inputStream != null) {
		inputStream.close();
	    }
	    if (workbook != null) {
		workbook.cloneSheet(sheetNum);
	    }
	} catch (IOException e) {
	    LOGGER.error(
		    String.format(ErrorMessages.UNABLE_TO_CLOSE_FILE, Constants.SPECIFIER, e.getLocalizedMessage()));
	}
    }

    /***
     * get Total Number of rows
     * 
     * @return
     */
    public int totalNumberOfRows() {
	return totalNumberOfRows;
    }

    /***
     * get file name
     * 
     * @return
     */
    public String getFileName() {
	return fileName;
    }

    /***
     * Checks if there are next rows are not
     * 
     * @return
     */
    public boolean userHasNext() {

	return userRowNumber < totalNumberOfRows;
    }
    
    public boolean siteHasNext() {

	return siteRowNumber < totalNumberOfRows;
    }

    public void load(MultipartFile multipartFile) {
	if (multipartFile == null) {
	    LOGGER.error(ErrorMessages.FILE_CANNOT_BE_NULL);
	    throw new BadRequestException(ErrorMessages.FILE_CANNOT_BE_NULL);
	}
	try {
	    inputStream = multipartFile.getInputStream();
	    workbook = WorkbookFactory.create(inputStream);
	    sheet = workbook.getSheetAt(0);
	    totalNumberOfRows = getRowCount(sheet.getSheetName());
	    fileName = multipartFile.getOriginalFilename();
	    inputStream.close();
	} catch (Exception e) {
	    LOGGER.error(String.format(ErrorMessages.UNABLE_TO_READ, Constants.SPECIFIER, e.getLocalizedMessage()));
	    throw new BadRequestException(ErrorMessages.FILE_CANNOT_BE_EMPTY);
	}
    }

    // returns the row count in a sheet
    public int getRowCount(String sheetName) {
	int index = workbook.getSheetIndex(sheetName);
	if (index == -1)
	    return 0;
	else {
	    sheet = workbook.getSheetAt(index);
	    return sheet.getLastRowNum() + 1;
	}
    }

    public void isValidSheet() {
	Row mainRow = sheet.getRow(0);
	Row subRow = sheet.getRow(1);
	int columnCount = getColumnCount(sheet.getSheetName());
	DataFormatter dataFormatter = new DataFormatter();
	for (int cellIndex = mainRow.getFirstCellNum(); cellIndex < columnCount; cellIndex++) {
	    Cell cell = mainRow.getCell(cellIndex);
	    String value = (cell != null && cell.getCellType() == CellType.NUMERIC)
		    ? NumberToTextConverter.toText(cell.getNumericCellValue())
		    : dataFormatter.formatCellValue(cell);
	    columnMainHeaders.add(value);
	}
	if (totalNumberOfRows <= 2) {
	    LOGGER.error(ErrorMessages.FILE_CANNOT_BE_EMPTY);
	    throw new BadRequestException(ErrorMessages.FILE_CANNOT_BE_EMPTY);
	}
	for (int cellIndex = subRow.getFirstCellNum(); cellIndex < columnCount; cellIndex++) {
	    Cell cell = subRow.getCell(cellIndex);
	    String value = (cell != null && cell.getCellType() == CellType.NUMERIC)
		    ? NumberToTextConverter.toText(cell.getNumericCellValue())
		    : dataFormatter.formatCellValue(cell);
	    columnSubHeaders.add(value);
	}

	/*
	 * if (!columnHeaders.contains("Email") ||
	 * !columnHeaders.contains("Product Type") ||
	 * !columnHeaders.contains("First Name") || !columnHeaders.contains("Last Name")
	 * || !columnHeaders.contains("Contact Number")) { throw new
	 * BadRequestException(ErrorMessages.FILE_COLUMNS); }
	 */
    }

    public void isValidSitesSheet() {
	Row mainRow = sheet.getRow(0);
	int columnCount = getColumnCount(sheet.getSheetName());
	DataFormatter dataFormatter = new DataFormatter();
	for (int cellIndex = mainRow.getFirstCellNum(); cellIndex < columnCount; cellIndex++) {
	    Cell cell = mainRow.getCell(cellIndex);
	    String value = (cell != null && cell.getCellType() == CellType.NUMERIC)
		    ? NumberToTextConverter.toText(cell.getNumericCellValue())
		    : dataFormatter.formatCellValue(cell);
	    columnMainHeaders.add(value);
	}
	if (totalNumberOfRows <= 1) {
	    LOGGER.error(ErrorMessages.FILE_CANNOT_BE_EMPTY);
	    throw new BadRequestException(ErrorMessages.FILE_CANNOT_BE_EMPTY);
	}

    }

    // find whether sheets exists
    public boolean isSheetExist(String sheetName) {
	int index = workbook.getSheetIndex(sheetName);
	if (index == -1) {
	    index = workbook.getSheetIndex(sheetName.toUpperCase());
	    if (index == -1)
		return false;
	    else
		return true;
	} else
	    return true;
    }

    // returns number of columns in a sheet
    public int getColumnCount(String sheetName) {
	// check if sheet exists
	if (!isSheetExist(sheetName))
	    return -1;

	sheet = workbook.getSheet(sheetName);
	row = sheet.getRow(0);

	if (row == null)
	    return -1;

	return row.getLastCellNum();

    }

	public boolean isDateValid(String dateStr, String pattern) {
        try {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
            LocalDate.parse(dateStr, formatter);
        } catch (DateTimeParseException e) {
            return false;
        }
        return true;
    }
}
