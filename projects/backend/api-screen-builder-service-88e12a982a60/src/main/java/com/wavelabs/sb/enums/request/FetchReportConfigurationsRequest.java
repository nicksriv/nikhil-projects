package com.wavelabs.sb.enums.request;

import java.util.Optional;

import com.wavelabs.sb.model.FetchReportColumnOrder;

public class FetchReportConfigurationsRequest {

    private String clientId;
    private Optional<Integer> pageNumber;
    private Optional<Integer> size;
    private String from;
    private String to;
    private String status;
    private String moduleId;
    private String name;
    private Optional<FetchReportColumnOrder> sortBy;
    private Optional<String> sortOrder;

    public Optional<String> getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Optional<String> sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Optional<FetchReportColumnOrder> getSortBy() {
        return sortBy;
    }

    public void setSortBy(Optional<FetchReportColumnOrder> sortBy) {
        this.sortBy = sortBy;
    }

    public Optional<Integer> getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Optional<Integer> pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Optional<Integer> getSize() {
        return size;
    }

    public void setSize(Optional<Integer> size) {
        this.size = size;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
