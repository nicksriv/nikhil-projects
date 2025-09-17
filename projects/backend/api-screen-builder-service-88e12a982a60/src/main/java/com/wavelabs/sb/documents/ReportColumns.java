package com.wavelabs.sb.documents;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import nonapi.io.github.classgraph.json.Id;

@Document(collection = "report-visible-columns")
public class ReportColumns extends ModifierDocument {

    @Id
    private String id;
    private String reportId;
    private List<String> columns;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getReportId() {
	return reportId;
    }

    public void setReportId(String reportId) {
	this.reportId = reportId;
    }

    public List<String> getColumns() {
	return columns;
    }

    public void setColumns(List<String> columns) {
	this.columns = columns;
    }

}
