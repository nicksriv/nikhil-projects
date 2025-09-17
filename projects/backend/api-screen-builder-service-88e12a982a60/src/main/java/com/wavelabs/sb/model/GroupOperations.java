package com.wavelabs.sb.model;

import java.util.Hashtable;

import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;

public class GroupOperations {

	private Aggregation aggregation;

	private Hashtable<String, String> maskingKeys;

	private AggregationOperation groupOperations;

	public AggregationOperation getGroupOperations() {
		return groupOperations;
	}

	public void setGroupOperations(AggregationOperation groupOperations) {
		this.groupOperations = groupOperations;
	}

	public GroupOperations() {
		maskingKeys = new Hashtable<>();
	}

	public Aggregation getAggregation() {
		return aggregation;
	}

	public void setAggregation(Aggregation aggregation) {
		this.aggregation = aggregation;
	}

	public Hashtable<String, String> getMaskingKeys() {
		return maskingKeys;
	}

	public void setMaskingKeys(Hashtable<String, String> maskingKeys) {
		this.maskingKeys = maskingKeys;
	}

}
