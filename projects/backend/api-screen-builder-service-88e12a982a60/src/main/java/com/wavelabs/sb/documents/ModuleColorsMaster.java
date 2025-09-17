package com.wavelabs.sb.documents;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "module-colors-master")
public class ModuleColorsMaster {

    @Id
    private String id;
    private String color;
    private int order;
    private Instant createdAt;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getColor() {
	return color;
    }

    public void setColor(String color) {
	this.color = color;
    }

    public int getOrder() {
	return order;
    }

    public void setOrder(int order) {
	this.order = order;
    }

    public Instant getCreatedAt() {
	return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
	this.createdAt = createdAt;
    }

}
