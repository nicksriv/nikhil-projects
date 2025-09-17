package com.brandpulse.job.common.document;

import com.brandpulse.job.common.childDocument.ModifierDocument;
import com.brandpulse.job.common.enums.FileType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


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
