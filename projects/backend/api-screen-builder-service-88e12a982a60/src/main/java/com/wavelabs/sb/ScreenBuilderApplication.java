package com.wavelabs.sb;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.blueconic.browscap.ParseException;
import com.blueconic.browscap.UserAgentParser;
import com.blueconic.browscap.UserAgentService;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
public class ScreenBuilderApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScreenBuilderApplication.class, args);
	}

	@Bean
	public UserAgentParser getUserAgentParser() throws IOException, ParseException {
		return new UserAgentService().loadParser();
	}
}
