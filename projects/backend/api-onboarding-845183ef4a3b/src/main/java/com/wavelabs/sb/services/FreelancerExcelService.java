package com.wavelabs.sb.services;

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
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.response.FreelancerListResponse;

@Component
public class FreelancerExcelService {

    private FreelancerExcelService(){}

    static final String[] FREELANCER_HEADERS = {"Freelancer Name", "Freelancer id", "E-mail Id ", "Mobile No", "State", "Status", "Ratings"};

    public static byte[] getFreelancerExcel(List<FreelancerListResponse> freelancerListDtos) {

        try {
            try (Workbook workbook = new XSSFWorkbook()) {
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                Sheet sheet = workbook.createSheet("Freelancers");

                CellStyle style = null;
                XSSFFont font = (XSSFFont) workbook.createFont();
                font.setFontName(HSSFFont.FONT_ARIAL);
                font.setFontHeightInPoints((short) 10);
                font.setBold(true);

                // Header
                Row headerRow = sheet.createRow(0);
                for (int i = 0; i < FREELANCER_HEADERS.length; i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(FREELANCER_HEADERS[i]);
                    style = workbook.createCellStyle();

                    style.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
                    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                    style.setFont(font);
                    cell.setCellStyle(style);
                }

                int rowIdx = 1;
                for (FreelancerListResponse obj : freelancerListDtos) {

                    String name="";
                    if (obj.getFirstName() != null) {
                      name =  obj.getFirstName().toString()+ " " + obj.getLastName().toString();
                    }

                    if (obj.getFreelancerRefNo() != null) {
                        obj.getId().toString();
                    }

                    if (obj.getEmail() != null) {
                        obj.getEmail().toString();
                    }

                    if (obj.getMobile() != null) {
                        obj.getMobile().toString();
                    }

                    if (obj.getAddress() != null) {
                        obj.getAddress().getState();
                    }

                    
                    if (obj.getStatus() != null) {
                        obj.getStatus().toString();
                    }

                    Row row = sheet.createRow(rowIdx++);
                    row.createCell(0).setCellValue(name);
                    row.createCell(1).setCellValue(obj.getFreelancerRefNo());
                    row.createCell(2).setCellValue(obj.getEmail());
                    row.createCell(3).setCellValue(obj.getMobile());

                    if (obj.getAddress() != null) {
                        row.createCell(4).setCellValue(obj.getAddress().getState());
                    }

                    row.createCell(5).setCellValue(obj.getStatus().toString());
                    row.createCell(6).setCellValue(obj.getFreelancerRating());

                }

                workbook.write(out);

                return out.toByteArray();
            }
        } catch (Exception e) {
            throw new BadRequestException("Failed to generate excel file" + e.getMessage());
        }
    }

}
