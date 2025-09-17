package com.wavelabs.sb.model;

import org.springframework.web.multipart.MultipartFile;

public class UploadUsersModel {

    private String clientId;
    private MultipartFile file;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public MultipartFile getFile() {
	return file;
    }

    public void setFile(MultipartFile file) {
	this.file = file;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
