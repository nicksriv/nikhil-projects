package com.wavelabs.sb;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;

public class Main {

	public static void main(String[] args) {

		String date = "24-03-2021T00:00:00";
		DateTimeFormatter ofPattern = DateTimeFormatter.ofPattern("dd-MM-yyyy'T'HH:mm:ss");
		TemporalAccessor parse = ofPattern.parse(date);
		LocalDateTime localDateTime = LocalDateTime.from(parse);
		ZonedDateTime of = ZonedDateTime.of(localDateTime, ZoneId.systemDefault());
		System.out.println(of);
System.out.println(isValid(null));
		
	}
	
	public static boolean isValid(String text) {
		return text!=null && !text.equalsIgnoreCase("null") && !text.isEmpty();
	}
}
