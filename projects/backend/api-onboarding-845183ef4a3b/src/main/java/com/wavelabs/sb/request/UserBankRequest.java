package com.wavelabs.sb.request;

import javax.validation.constraints.Pattern;

import com.wavelabs.sb.utils.OptionalPattern;

public class UserBankRequest {

    @Pattern(message = "Provide valid bank name", regexp = "^[ A-Za-z_#/,]*$")
    private String bankName;

    @OptionalPattern(message = "Provide valid Ifsc code", regexp = "[A-Za-z]{4}[0-9]*$")
    private String ifscCode;

    @OptionalPattern(message = "Provide valid Account number", regexp = "^[0-9]*$")
    private String accountNumber;

    @OptionalPattern(message = "Provide valid branch name", regexp = "^[ A-Za-z_#/,]*$")
    private String branchName;

    public String getBankName() {
	return bankName;
    }

    public void setBankName(String bankName) {
	this.bankName = bankName;
    }

    public String getIfscCode() {
	return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
	this.ifscCode = ifscCode;
    }

    public String getAccountNumber() {
	return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
	this.accountNumber = accountNumber;
    }

    public String getBranchName() {
	return branchName;
    }

    public void setBranchName(String branchName) {
	this.branchName = branchName;
    }

}
