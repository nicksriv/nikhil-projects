package com.wavelabs.sb.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "theme-details")
public class ThemeDetails extends ModifierDocument {
    
    @Id
    private String id;
    private String clientId;
    private String primaryColor;
    private String secondaryColor;
    private String fontName;
    private boolean deleted;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getPrimaryColor() {
	return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
	this.primaryColor = primaryColor;
    }

    public String getSecondaryColor() {
	return secondaryColor;
    }

    public void setSecondaryColor(String secondaryColor) {
	this.secondaryColor = secondaryColor;
    }

    public String getFontName() {
	return fontName;
    }

    public void setFontName(String fontName) {
	this.fontName = fontName;
    }

    public boolean isDeleted() {
	return deleted;
    }

    public void setDeleted(boolean deleted) {
	this.deleted = deleted;
    }

}
