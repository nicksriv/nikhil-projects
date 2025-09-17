package com.wavelabs.sb.model;

import java.util.List;
import org.springframework.data.annotation.Id;
import com.wavelabs.sb.documents.Modules;

public class ModulesData {
    @Id
    private String id;
    private List<Modules> modules;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public List<Modules> getModules() {
	return modules;
    }

    public void setModules(List<Modules> modules) {
	this.modules = modules;
    }

}
