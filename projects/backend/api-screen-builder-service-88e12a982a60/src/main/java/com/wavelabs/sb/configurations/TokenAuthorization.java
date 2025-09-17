package com.wavelabs.sb.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@CrossOrigin(origins = "*")
public class TokenAuthorization implements WebMvcConfigurer {

	private static final String[] AUTH_WHITELIST = { "/v2/api-docs", "/swagger-resources", "/swagger-resources/**",
			"/configuration/ui", "/configuration/security", "/swagger-ui.html", "/webjars/**", "/v3/api-docs/**",
			"/swagger-ui/**" };

	@Autowired
	RequestProcessingInterceptorAdapter RequestProcessingInterceptorAdapter;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(RequestProcessingInterceptorAdapter).addPathPatterns("/**").excludePathPatterns(AUTH_WHITELIST);
	}
}
