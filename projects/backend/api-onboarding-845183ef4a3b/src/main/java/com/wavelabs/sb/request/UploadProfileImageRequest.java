package com.wavelabs.sb.request;

import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.model.TokenPayLoadDetails;

public class UploadProfileImageRequest {

    private MultipartFile file;
    private TokenPayLoadDetails details;

    public MultipartFile getFile() {
	return file;
    }

    public void setFile(MultipartFile file) {
	this.file = file;
    }

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

}
