package com.wavelabs.sb.request;

import org.springframework.web.multipart.MultipartFile;

public class UploadFileRequest {

    private String clientId;
    private MultipartFile file;

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

}
