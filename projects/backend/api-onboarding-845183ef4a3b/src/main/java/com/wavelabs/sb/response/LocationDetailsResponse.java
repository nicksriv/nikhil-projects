package com.wavelabs.sb.response;

import java.util.List;

public class LocationDetailsResponse {

	private List<LocationDetails> locations;
	private int total;

	public List<LocationDetails> getLocations() {
		return locations;
	}

	public void setLocations(List<LocationDetails> locations) {
		this.locations = locations;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

}
