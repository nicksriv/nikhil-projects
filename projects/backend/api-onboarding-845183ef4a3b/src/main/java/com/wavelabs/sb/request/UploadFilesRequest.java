package com.wavelabs.sb.request;

import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.model.TokenPayLoadDetails;

public class UploadFilesRequest {

    private MultipartFile file;
    private TokenPayLoadDetails details;
    private FileType filetype;

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

    public FileType getFiletype() {
	return filetype;
    }

    public void setFiletype(FileType filetype) {
	this.filetype = filetype;
    }

}
