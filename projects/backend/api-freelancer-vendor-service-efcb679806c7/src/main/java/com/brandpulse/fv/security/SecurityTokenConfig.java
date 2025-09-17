package com.brandpulse.fv.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;

@EnableWebSecurity    // Enable security config. This annotation denotes config for spring security.
public class SecurityTokenConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    AuthenticationService tokenService;
   

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().disable();
        
        http
                .csrf().disable()
                // make sure we use stateless session; session won't be used to store user's state.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // handle an authorized attempts
                .exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                .and()
                // Add a filter to validate the tokens with every request
                .addFilterAfter(new JwtTokenAuthenticationFilter(tokenService), UsernamePasswordAuthenticationFilter.class)
                // authorization requests config
                .authorizeRequests()
                // allow all who are accessing "auth" service
                .antMatchers(tokenService.getAuthUrl()).permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/**/v2/api-docs/**").permitAll()
                .antMatchers("/**/swagger-ui/**").permitAll()
                .antMatchers("/**/swagger-resources/**").permitAll()
                .antMatchers("/**/webjars/**").permitAll()
                // must be an admin if trying to access admin area (authentication is also required here)
                //.antMatchers("/gallery" + "/admin/**").hasRole("ADMIN")
                .antMatchers(
                        "/**/test/**"
                )
                .permitAll()
                // Any other request must be authenticated
                .anyRequest().authenticated();
        
    }
    
}
