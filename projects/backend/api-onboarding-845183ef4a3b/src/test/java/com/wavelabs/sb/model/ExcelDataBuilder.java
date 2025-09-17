package com.wavelabs.sb.model;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.wavelabs.sb.services.ExcelService;

public class ExcelDataBuilder {

    public static ByteArrayInputStream usersBulkUploadTemplate() {
	

	InputStream data = ExcelService.usersBulkUploadTemplate();
	try {
	    Workbook book = WorkbookFactory.create(data);

	    ByteArrayOutputStream out = new ByteArrayOutputStream();
	    Sheet sheet = book.getSheetAt(0);
	    Row dataRow = sheet.createRow(2);
	    CellStyle style = book.createCellStyle();
	    style.setAlignment(HorizontalAlignment.CENTER);
	    addCell(dataRow, sheet, 0, "Charan", style);
	    addCell(dataRow, sheet, 2, "Raj", style);
	    addCell(dataRow, sheet, 3, "2021-02-12", style);
	    addCell(dataRow, sheet, 4, "9876543210", style);
	    addCell(dataRow, sheet, 6, "Male", style);
	    addCell(dataRow, sheet, 16, "Full", style);
	    addCell(dataRow, sheet, 17, "Emp0001", style);
	    addCell(dataRow, sheet, 18,"2021-02-12" , style);
	    addCell(dataRow, sheet, 25,"Site001" , style);
	    Row dataRow2 = sheet.createRow(3);
	    addCell(dataRow2, sheet, 3, "Char", style);
	    book.write(out);
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (EncryptedDocumentException | IOException e) {

	}
	return null;

    }

    private static void addCell(Row dataRow, Sheet sheet, int index, String value, CellStyle style) {
	Cell cell2 = dataRow.createCell(index);
	cell2.setCellValue(value);
	cell2.setCellStyle(style);
	sheet.setColumnWidth(3, 25 * 256);
    }
    
    
public static ByteArrayInputStream sitesBulkUploadTemplate() {

	InputStream data = ExcelService.sitesBulkUploadTemplate();
	try {
	    Workbook book = WorkbookFactory.create(data);

	    ByteArrayOutputStream out = new ByteArrayOutputStream();
	    Sheet sheet = book.getSheetAt(0);
	    Row dataRow = sheet.createRow(1);
	    CellStyle style = book.createCellStyle();
	    style.setAlignment(HorizontalAlignment.CENTER);
	    addCell(dataRow, sheet, 0, "Charan", style);
	    addCell(dataRow, sheet, 6, "9876543210", style);
	    addCell(dataRow, sheet, 7,"Site001" , style);
	    addCell(dataRow, sheet, 9, "India", style);
	    addCell(dataRow, sheet, 10,"Telangana" , style);
	    addCell(dataRow, sheet, 11,"Hyderabad" , style);
	    Row dataRow2 = sheet.createRow(3);
	    addCell(dataRow2, sheet, 6, "Char", style);
	    book.write(out);
	    return new ByteArrayInputStream(out.toByteArray());
	} catch (EncryptedDocumentException | IOException e) {

	}
	return null;

    }

}
