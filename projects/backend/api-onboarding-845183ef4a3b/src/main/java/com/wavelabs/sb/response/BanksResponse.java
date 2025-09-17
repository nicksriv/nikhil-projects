package com.wavelabs.sb.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class BanksResponse extends BaseResponse {

    private String message;
    private List<String> banks;

    public List<String> getBanks() {
	return banks;
    }

    public void setBanks(List<String> banks) {
	this.banks = banks;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
