package com.wavelabs.sb.response;

public class UserBankDetailsResponse {

    private String bankName;

    private String ifscCode;

    private String accountNumber;

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
