package com.wavelabs.sb.request;

import java.util.Optional;

import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.FetchUserColumnOrder;

public class FetchAllUsersRequest {

	private Optional<Integer> pageNumber;
	private Optional<Integer> size;
	private Optional<FetchUserColumnOrder> sortBy;
	private Optional<String> sortOrder;
	private String employeeId, area, from, to, employeeName, reportingManager, role, gender, contactNumber, mappedStore,
			ageFrom, ageTo;
	private Status status;

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

	public Optional<FetchUserColumnOrder> getSortBy() {
		return sortBy;
	}

	public void setSortBy(Optional<FetchUserColumnOrder> sortBy) {
		this.sortBy = sortBy;
	}

	public Optional<String> getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(Optional<String> sortOrder) {
		this.sortOrder = sortOrder;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
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

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getReportingManager() {
		return reportingManager;
	}

	public void setReportingManager(String reportingManager) {
		this.reportingManager = reportingManager;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getMappedStore() {
		return mappedStore;
	}

	public void setMappedStore(String mappedStore) {
		this.mappedStore = mappedStore;
	}

	public String getAgeFrom() {
		return ageFrom;
	}

	public void setAgeFrom(String ageFrom) {
		this.ageFrom = ageFrom;
	}

	public String getAgeTo() {
		return ageTo;
	}

	public void setAgeTo(String ageTo) {
		this.ageTo = ageTo;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
