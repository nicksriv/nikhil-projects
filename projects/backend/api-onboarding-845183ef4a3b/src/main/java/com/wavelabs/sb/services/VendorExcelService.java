package com.wavelabs.sb.services;

import com.wavelabs.sb.exceptions.BadRequestException;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Collectors;

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


import com.wavelabs.sb.response.VendorListResponse;
import com.wavelabs.sb.utils.JsonUtil;

@Component
public class VendorExcelService {

    static final String[] VENDOR_HEADERS = { "Vendor id", "Vendor Name", "Vendor Reference_No", "Vendor State",
            "Skills", "Status", "Date OF Joining" };

    public static byte[] getVendorExcel(List<VendorListResponse> vendorListResponse) {

        try {
            try (Workbook workbook = new XSSFWorkbook()) {
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                Sheet sheet = workbook.createSheet("Vendors");

                CellStyle style = null;
                XSSFFont font = (XSSFFont) workbook.createFont();
                font.setFontName(HSSFFont.FONT_ARIAL);
                font.setFontHeightInPoints((short) 10);
                font.setBold(true);

                // header

                Row headerRow = sheet.createRow(0);
                for (int i = 0; i < VENDOR_HEADERS.length; i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(VENDOR_HEADERS[i]);
                    style = workbook.createCellStyle();

                    style.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
                    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                    style.setFont(font);
                    cell.setCellStyle(style);
                }

                int rowIdx = 1;
                for (VendorListResponse obj : vendorListResponse) {

                    if (obj.getId() != null) {
                        obj.getId();
                    }

                    if (obj.getVendorName() != null) {
                        obj.getVendorName();
                    }

                    if (obj.getVendorRefNo() != null) {
                        obj.getVendorRefNo();
                    }

                    String address = "";
                    if (obj.getAddress() != null) {
                        address = obj.getAddress().getState();
                    }

                    if (obj.getSkills() != null) {
                        obj.getSkills();
                    }

                    String status = "";
                    if (obj.getStatus() != null) {
                        status = obj.getStatus().toString();
                    }

                    String createdAt = "";
                    if (obj.getCreatedAt() != null) {
                        createdAt = obj.getCreatedAt().toString();
                    }

                    Row row = sheet.createRow(rowIdx++);
                    row.createCell(0).setCellValue(obj.getId());
                    row.createCell(1).setCellValue(obj.getVendorName());
                    row.createCell(2).setCellValue(obj.getVendorRefNo());

                    row.createCell(3).setCellValue(address);

                    List<String> skillName = obj.getSkills().stream().map(s -> s.getName()).collect(Collectors.toList());
                    row.createCell(4).setCellValue(JsonUtil.toString(skillName));

                    row.createCell(5).setCellValue(status);
                    row.createCell(6).setCellValue(createdAt);

                }

                workbook.write(out);

                return out.toByteArray();
            }

        } catch (Exception e) {
            throw new BadRequestException("Failed to generate excel file " + e.getMessage());
        }

    }

}
