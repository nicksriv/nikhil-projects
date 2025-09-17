package com.wavelabs.sb.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.FormsResponse;

@Service
public class ExcelService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExcelService.class);

    static final String[] DROP_DOWN_VALUES_HEDDER = { "label" };

    static final String BULK_UPLOAD_SHEET = "OptionValues";

    static final String REPORT_DATA_SHEET = "Report Data";

    static final String FORM_DATA_SHEET = "Form Data";

    static int rowIdx;

    public static ByteArrayInputStream bulkUploadTemplate() {
	LOGGER.info("bulk Upload Template : begin");
	try (Workbook workbook = new XSSFWorkbook();

		ByteArrayOutputStream out = new ByteArrayOutputStream();) {

	    XSSFSheet sheet = (XSSFSheet) workbook.createSheet(BULK_UPLOAD_SHEET);
	    // Header
	    CellStyle style = workbook.createCellStyle();
	    style.setAlignment(HorizontalAlignment.CENTER);
	    Row row = sheet.createRow(0);

	    for (int col = 0; col < DROP_DOWN_VALUES_HEDDER.length; col++) {
		Cell cell = row.createCell(col);
		cell.setCellValue(DROP_DOWN_VALUES_HEDDER[col]);
		cell.setCellStyle(style);
		sheet.setColumnWidth(3, 25 * 256);
	    }
	    workbook.write(out);
	    LOGGER.info("bulk Upload Template : end");
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (IOException e) {
	    LOGGER.info("bulk Upload Template : Run Time Exception- File Import Failed");
	    throw new RuntimeException("fail to import template to Excel file: " + e.getMessage());
	}
    }

    public static ByteArrayInputStream getReport(List<ColumnsResponse> columnsResponses,
	    List<LinkedHashMap<String, Object>> data) {
	LOGGER.info("getReport : begin");
	try (Workbook workbook = new XSSFWorkbook();

		ByteArrayOutputStream out = new ByteArrayOutputStream();) {

	    XSSFSheet sheet = (XSSFSheet) workbook.createSheet(REPORT_DATA_SHEET);
	    // Header
	    CellStyle style = workbook.createCellStyle();
	    style.setAlignment(HorizontalAlignment.CENTER);
	    Row headerRow = sheet.createRow(0);
	    List<String> columnHeader = columnsResponses.stream().map(ColumnsResponse::getHint)
		    .collect(Collectors.toList());
	    for (int col = 0; col < columnHeader.size(); col++) {
		Cell cell = headerRow.createCell(col);
		cell.setCellValue(columnHeader.get(col));
		cell.setCellStyle(style);
		sheet.setColumnWidth(3, 25 * 256);
	    }
	    rowIdx = 1;
	    data.stream().forEach(record -> {
		Row row = sheet.createRow(rowIdx++);
		record.entrySet().forEach(entry -> {
		    Optional<ColumnsResponse> optional = columnsResponses.stream()
			    .filter(column -> entry.getKey().equalsIgnoreCase(column.getComponentId())).findFirst();
		    if (optional.isPresent()) {
			row.createCell(columnsResponses.indexOf(optional.get()))
				.setCellValue(entry.getValue().toString());
		    }
		});
	    });
	    workbook.write(out);
	    LOGGER.info("getReport: end");
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (IOException e) {
	    LOGGER.info("getReport: Run Time Exception- File Import Failed");
	    throw new RuntimeException("Failed to import template to Excel fi le: " + e.getMessage());
	}
    }

    public static InputStream getFormDataExcel(List<ColumnsResponse> columns, FormsResponse data) {

	LOGGER.info("getFormDataExcel : begin");
	try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
	    XSSFSheet sheet = (XSSFSheet) workbook.createSheet(FORM_DATA_SHEET);
	    CellStyle style = workbook.createCellStyle();
	    style.setAlignment(HorizontalAlignment.CENTER);
	    Row headerRow = sheet.createRow(0);
	    List<String> columnHeader = columns.stream().map(ColumnsResponse::getHint).collect(Collectors.toList());
	    for (int col = 0; col < columnHeader.size(); col++) {
		Cell cell = headerRow.createCell(col);
		cell.setCellValue(columnHeader.get(col));
		cell.setCellStyle(style);
		sheet.setColumnWidth(3, 25 * 256);
	    }
	    rowIdx = 1;
	    data.getRecords().forEach(record -> {
		Row row = sheet.createRow(rowIdx++);
		record.entrySet().forEach(entry -> {
		    Optional<ColumnsResponse> optional = columns.stream()
			    .filter(column -> entry.getKey().equalsIgnoreCase(column.getComponentId())).findFirst();
		    if (optional.isPresent()) {
			if (optional.get().getType() != null) {
			    switch (optional.get().getType()) {
			    case CollectionConstants.TIME:
				Document doc = (Document) entry.getValue();
				row.createCell(columns.indexOf(optional.get()))
					.setCellValue(doc.get(CollectionConstants.ID).toString());
				break;
			    case CollectionConstants.CHECK_LIST:
				String list = entry.getValue().toString();
				list = list.replaceAll("[^a-zA-Z0-9,]+", "");
				row.createCell(columns.indexOf(optional.get())).setCellValue(list);
				break;
			    default:
				row.createCell(columns.indexOf(optional.get()))
					.setCellValue(entry.getValue().toString());
			    }
			} else {
			    row.createCell(columns.indexOf(optional.get())).setCellValue(entry.getValue().toString());
			}
		    }
		});
	    });
	    workbook.write(out);
	    LOGGER.info("getFormDataExcel: end");
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (IOException e) {
	    LOGGER.info("getFormDataExcel: Run Time Exception- File Import Failed");
	    throw new RuntimeException("Failed to import template to Excel fi le: " + e.getMessage());
	}
    }

}
