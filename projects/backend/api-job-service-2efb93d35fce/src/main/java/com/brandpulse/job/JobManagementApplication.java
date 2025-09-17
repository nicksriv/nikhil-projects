package com.brandpulse.job;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableMongoAuditing
public class JobManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobManagementApplication.class, args);
	}

}
