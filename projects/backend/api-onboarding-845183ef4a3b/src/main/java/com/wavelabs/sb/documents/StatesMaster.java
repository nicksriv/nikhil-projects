package com.wavelabs.sb.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "states-master")
public class StatesMaster extends ModifierDocument {

    @Id
    private String id;
    private String state;
    private String city;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getState() {
	return state;
    }

    public void setState(String state) {
	this.state = state;
    }

    public String getCity() {
	return city;
    }

    public void setCity(String city) {
	this.city = city;
    }

}
