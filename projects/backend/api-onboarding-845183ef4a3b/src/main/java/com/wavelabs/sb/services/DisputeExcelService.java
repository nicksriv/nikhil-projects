package com.wavelabs.sb.services;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.response.DisputeListResponse;

@Component
public class DisputeExcelService {

  static final String[] DISPUTE_HEADERS = {"Dispute Code", "Dispute Title", "Client Name" ,"Raised By", "RaisedAt" , "Dispute Status", "Dispute UserType"};

    public static byte[] getDisputeExcel(List<DisputeListResponse> disputeListDtos) {

        try {
            try (Workbook workbook = new XSSFWorkbook()) {
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                Sheet sheet = workbook.createSheet("Disputes");

                CellStyle style = null;
                XSSFFont font = (XSSFFont) workbook.createFont();
                font.setFontName(HSSFFont.FONT_ARIAL);
                font.setFontHeightInPoints((short) 10);
                font.setBold(true);

                // Header
                Row headerRow = sheet.createRow(0);
                for (int i = 0; i < DISPUTE_HEADERS.length; i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(DISPUTE_HEADERS[i]);
                    style = workbook.createCellStyle();

                    style.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
                    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                    style.setFont(font);
                    cell.setCellStyle(style);
                }

                int rowIdx = 1;
                for (DisputeListResponse obj : disputeListDtos) {

                    
                    Row row = sheet.createRow(rowIdx++);
                    row.createCell(0).setCellValue(obj.getDisputeRefNo());
                    row.createCell(1).setCellValue(obj.getDisputeTitle());
                    row.createCell(2).setCellValue(obj.getClientName());
                    row.createCell(3).setCellValue(obj.getRaisedBy());
                    row.createCell(4).setCellValue(obj.getRaisedAt() != null ? obj.getRaisedAt().toString() : "");
                    row.createCell(5).setCellValue(obj.getDisputeStatus() != null ? obj.getDisputeStatus().toString() : "");
                    row.createCell(6).setCellValue(obj.getUserType() != null ? obj.getUserType().toString() : "");
                    
                }
                
                workbook.write(out);
            
                return out.toByteArray();
            }
        } catch (Exception e) {

            throw new BadRequestException("Failed to generate excel file " + e.getMessage());
        }
    }
}
