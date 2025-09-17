/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.app.job;

import com.brandpulse.job.api.dto.JobListDto;
import com.brandpulse.job.app.skill.SkillService;
import com.brandpulse.job.common.service.LoggerService;
import com.brandpulse.job.exception.ErrorCodeConstant;
import com.brandpulse.job.exception.ServiceException;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

/**
 *
 * @author dell
 */
@Component
public class JobExcelService {

    @Autowired
    private JobService jobService;

    @Autowired
    private SkillService skillService;

    @Autowired
    private LoggerService loggerService;

    static final String[] JOB_HEADERS = {"Job Id", "JobRefNo", "Job Title", "Job Status", "Job Type", "Skills", "State"};

    public byte[] getJobExcel(Page<JobListDto> jobPageDtos) {

        List<JobListDto> jobList = jobPageDtos.getContent();

        try {
            try (Workbook workbook = new XSSFWorkbook()) {
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                Sheet sheet = workbook.createSheet("Jobs");

                CellStyle style = null;
                XSSFFont font = (XSSFFont) workbook.createFont();
                font.setFontName(HSSFFont.FONT_ARIAL);
                font.setFontHeightInPoints((short) 10);
                font.setBold(true);

                // Header
                Row headerRow = sheet.createRow(0);
                for (int i = 0; i < JOB_HEADERS.length; i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(JOB_HEADERS[i]);
                    style = workbook.createCellStyle();

                    style.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
                    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                    style.setFont(font);
                    cell.setCellStyle(style);
                }

                int rowIdx = 1;
                for (JobListDto obj : jobList) {
                    
                    String jobStatus = "";
                    if (obj.getJobStatus() != null) {
                        jobStatus = obj.getJobStatus().toString();
                    }
                    
                    String jobType = "";
                    if (obj.getJobType() != null) {
                        jobType = obj.getJobType().toString();
                    }
                    
                    Row row = sheet.createRow(rowIdx++);
                    row.createCell(0).setCellValue(obj.getId());
                    row.createCell(1).setCellValue(obj.getJobRefNo());
                    row.createCell(2).setCellValue(obj.getJobTitle());
                    row.createCell(3).setCellValue(jobStatus);
                    row.createCell(4).setCellValue(jobType);

                    List<String> skillNames = obj.getSkills().stream().map(s -> s.getName()).collect(Collectors.toList());
                    row.createCell(5).setCellValue(String.join(", ", skillNames));

                    row.createCell(6).setCellValue(obj.getAddress().getState());

                }

                workbook.write(out);

                return out.toByteArray();
            }
        } catch (Exception e) {
            loggerService.info("Failed to generate excel file: " + e.getMessage());
            throw new ServiceException(ErrorCodeConstant.JC009);
        }
    }
}
