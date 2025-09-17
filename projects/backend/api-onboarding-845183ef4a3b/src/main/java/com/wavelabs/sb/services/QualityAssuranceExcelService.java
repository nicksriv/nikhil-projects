package com.wavelabs.sb.services;

import com.wavelabs.sb.exceptions.BadRequestException;

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

import com.wavelabs.sb.response.QualityAssuranceListResponse;

@Component
public class QualityAssuranceExcelService {

    private QualityAssuranceExcelService(){}

  static final String[] QUALITY_ASSURANCE_HEADERS = {"QA Name", "qualityAssuranceRefNo", "E-mail Id ", "Mobile No", "Status" , "Clients"};

  public static byte[] getQaExcel(List<QualityAssuranceListResponse> qaListResponse) {

      try {
          try (Workbook workbook = new XSSFWorkbook()) {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
              Sheet sheet = workbook.createSheet("Quality_Assurance");

              CellStyle style = null;
              XSSFFont font = (XSSFFont) workbook.createFont();
              font.setFontName(HSSFFont.FONT_ARIAL);
              font.setFontHeightInPoints((short) 10);
              font.setBold(true);

              // Header
              Row headerRow = sheet.createRow(0);
              for (int i = 0; i < QUALITY_ASSURANCE_HEADERS.length; i++) {
                  Cell cell = headerRow.createCell(i);
                  cell.setCellValue(QUALITY_ASSURANCE_HEADERS[i]);
                  style = workbook.createCellStyle();

                  style.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
                  style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                  style.setFont(font);
                  cell.setCellStyle(style);
              }

              int rowIdx = 1;
              for (QualityAssuranceListResponse obj : qaListResponse) {

                  if (obj.getFirstName() != null) {
                      obj.getFirstName().toString();
                  }

                  if (obj.getQualityAssuranceRefNo() != null) {
                    obj.getQualityAssuranceRefNo().toString();
                  }

                  if (obj.getEmail() != null) {
                      obj.getEmail().toString();
                  }

                  if (obj.getMobile() != null) {
                      obj.getMobile().toString();
                  }


                  if (obj.getQualityControllerStatus() != null) {
                      obj.getQualityControllerStatus().toString();
                  }

                  if(obj.getClients() != null){
                    for (String client : obj.getClients()) {
                        Row row = sheet.createRow(rowIdx++);
                        row.createCell(0).setCellValue(obj.getFirstName());
                        row.createCell(1).setCellValue(obj.getQualityAssuranceRefNo());
                        row.createCell(2).setCellValue(obj.getEmail());
                        row.createCell(3).setCellValue(obj.getMobile());
                        row.createCell(4).setCellValue(obj.getQualityControllerStatus().toString());
                        row.createCell(5).setCellValue(client);
                    }
                  }
              }

              workbook.write(out);

              return out.toByteArray();
        }
      } catch (Exception e) {
          throw new BadRequestException("Failed to generate excel file" + e.getMessage());
      }
  }
}
