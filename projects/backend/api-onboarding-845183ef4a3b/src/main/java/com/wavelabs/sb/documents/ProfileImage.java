package com.wavelabs.sb.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "profile-images")
public class ProfileImage {

    @Id
    private String id;
    private String name;
    private byte[] imageBytes;

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

    public ProfileImage(byte[] imageBytes,String name) {
	super();
	this.imageBytes = imageBytes;
	this.name = name;
    }

    public byte[] getImageBytes() {
	return imageBytes;
    }

    public void setImageBytes(byte[] imageBytes) {
	this.imageBytes = imageBytes;
    }

    public ProfileImage() {
    }
}
