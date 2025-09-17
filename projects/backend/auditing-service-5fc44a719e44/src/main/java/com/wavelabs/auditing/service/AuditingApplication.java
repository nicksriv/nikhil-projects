package com.wavelabs.auditing.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.wavelabs.auditing.service.auditing.MultipleConnectionAuidtingService;

@SpringBootApplication()
public class AuditingApplication {

	@Autowired
	MultipleConnectionAuidtingService auditingService;

	public static void main(String[] args) {
		SpringApplication.run(AuditingApplication.class, args);
	}

	@PostConstruct
	public void onStart() {
		auditingService.startAuditing();
	}
}
