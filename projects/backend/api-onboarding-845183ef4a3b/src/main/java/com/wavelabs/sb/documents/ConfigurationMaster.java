package com.wavelabs.sb.documents;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "configuration-master")
public class ConfigurationMaster {

    @Id
    private String id;

    private String name;
    private String value;
    private Instant createdAt;

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

    public String getValue() {
	return value;
    }

    public void setValue(String value) {
	this.value = value;
    }

    public Instant getCreatedAt() {
	return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
	this.createdAt = createdAt;
    }

}
