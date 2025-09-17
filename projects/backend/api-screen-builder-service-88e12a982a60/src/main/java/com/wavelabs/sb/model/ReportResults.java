package com.wavelabs.sb.model;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.wavelabs.sb.common.Constants;

public class ReportResults {
    private static final Logger LOGGER = LoggerFactory.getLogger(ReportResults.class);

    private Hashtable<String, List<Document>> records;

    private Hashtable<String, String> references;

    private List<Document> documents;

    private String numberRegex = "^[0-9]*$";

    private String decimalRegex = "^[0-9]*.[0-9]*$";

    public ReportResults() {
	records = new Hashtable<>();
	references = new Hashtable<>();
    }

    public Hashtable<String, String> getReferences() {
	return references;
    }

    public Hashtable<String, List<Document>> getRecords() {
	return records;
    }

    public List<Document> getDocuments() {
	return documents;
    }

    public void appendRecords(String subModuleId, List<Document> latestRecords) {
	List<Document> oldRecords = records.get(subModuleId);
	String referenceKey = references.get(subModuleId);
	if (oldRecords != null && !oldRecords.isEmpty()) {
	    oldRecords.forEach(oldRecord -> {
		String groupValue = oldRecord.get(referenceKey) != null ? oldRecord.get(referenceKey).toString() : null;
		List<Document> collect = latestRecords.stream().filter(record -> {
		    if (record.get(referenceKey) != null) {
			return record.get(referenceKey).toString().equalsIgnoreCase(groupValue);
		    } else {
			return false;
		    }
		}).collect(Collectors.toList());
		if (!collect.isEmpty()) {
		    Document document = collect.get(0);
		    document.keySet().forEach(key -> {
			if (!key.equalsIgnoreCase("_id")) {
			    oldRecord.put(key, document.get(key));
			}
		    });
		}
	    });
	} else {
	    records.put(subModuleId, latestRecords);
	}
    }

    public List<Hashtable<String, Object>> finalDocuments() {
	List<String> referenceGroupValues = new ArrayList<>();
	List<Hashtable<String, Object>> resultSet = new ArrayList<>();
	getReferences().keySet().forEach(key -> {
	    String groupId = getReferences().get(key);
	    List<Document> list = records.get(key);
	    if (list != null && !list.isEmpty()) {
		List<String> groupvalues = list.stream().map(document -> {
		    return document.get(groupId) != null ? document.get(groupId).toString() : null;
		}).collect(Collectors.toList());
		referenceGroupValues.addAll(groupvalues);
	    }
	});

	getReferences().keySet().forEach(key -> {
	    String groupId = getReferences().get(key);
	    referenceGroupValues.forEach(groupValue -> {
		List<Document> list = records.get(key);
		List<Document> innerSet = list.stream().filter(record -> {
		    return record.get(groupId) != null && record.get(groupId).toString().equalsIgnoreCase(groupValue);
		}).collect(Collectors.toList());
		if (!innerSet.isEmpty()) {
		    Hashtable<String, Object> find = find(groupValue, resultSet);
		    if (find != null) {
			Document document = innerSet.get(0);
			document.keySet().forEach(innerKey -> {
			    find.put(innerKey, document.get(innerKey));
			});
		    } else {
			System.out.println(groupValue);
		    }
		}
	    });
	});

	return resultSet;
    }

    private Hashtable<String, Object> find(String value, List<Hashtable<String, Object>> record) {
	if (!record.isEmpty()) {
	    for (String key : getReferences().keySet()) {
		String groupId = getReferences().get(key);
		List<Hashtable<String, Object>> collect = record.stream().filter(document -> {
		    return document.get(groupId) != null && document.get(groupId).toString().equalsIgnoreCase(value);
		}).collect(Collectors.toList());
		if (!collect.isEmpty()) {
		    return collect.get(0);
		} else {
		    continue;
		}
	    }
	}
	record.add(new Hashtable<String, Object>());
	return record.get(record.size() - 1);
    }

    public List<Hashtable<String, Object>> getResponseReport(List<Hashtable<String, Object>> finalDocuments) {
	List<Hashtable<String, Object>> response = new ArrayList<>();
	if (!finalDocuments.isEmpty()) {
	    finalDocuments.forEach(record -> {
		Hashtable<String, Object> data = new Hashtable<>();
		record.entrySet().forEach(keyVal -> {
		    try {
			if (keyVal.getValue() != null) {
			    String value = keyVal.getValue().toString();
			    if (value.matches(decimalRegex) && !value.matches(numberRegex)) {
				data.put(keyVal.getKey(), Double.valueOf(String.format("%.2f", Double.valueOf(value))));
			    } else {
				if (value.equalsIgnoreCase(Constants.INFINITY)) {
				    data.put(keyVal.getKey(), Constants.NA);
				} else {
				    data.put(keyVal.getKey(), keyVal.getValue());
				}
			    }
			}
		    } catch (Exception e) {
			data.put(keyVal.getKey(), keyVal.getValue());
		    }
		});
		if (data != null) {
		    response.add(data);
		}
	    });
	    return response;
	}
	return finalDocuments;
    }

}
