package com.wavelabs.sb.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.wavelabs.sb.enums.FileType;

@Document(collection = "files")
public class Files extends ModifierDocument {

    @Id
    private String id;
    private String name;
    private FileType fileType;
    private String fileUUID;
    private String filePath;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public FileType getFileType() {
	return fileType;
    }

    public void setFileType(FileType fileType) {
	this.fileType = fileType;
    }

    public String getFileUUID() {
	return fileUUID;
    }

    public void setFileUUID(String fileUUID) {
	this.fileUUID = fileUUID;
    }

    public String getFilePath() {
	return filePath;
    }

    public void setFilePath(String filePath) {
	this.filePath = filePath;
    }

}
