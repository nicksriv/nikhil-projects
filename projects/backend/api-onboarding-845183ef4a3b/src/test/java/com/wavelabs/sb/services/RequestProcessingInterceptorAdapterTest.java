package com.wavelabs.sb.services;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.web.method.HandlerMethod;

import com.wavelabs.sb.configurations.RequestProcessingInterceptorAdapter;
import com.wavelabs.sb.exceptions.AuthTokenMissingException;
import com.wavelabs.sb.model.AuthDetailsDataBuilder;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

@RunWith(MockitoJUnitRunner.Silent.class)
public class RequestProcessingInterceptorAdapterTest {

    @Mock
    private JwtAuthenticationService jwtAuthenticationService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private HandlerMethod handler;

    @Mock
    private EnableTokenAuthorisation enableTokenAuthorisation;

    @InjectMocks
    private RequestProcessingInterceptorAdapter requestProcessingInterceptorAdapter;


//    @Test(expected = AuthTokenMissingException.class)
//    @DisplayName("test testPreHandle_threw_Exception")
//    public void testPreHandle_threw_Exception() throws Exception {
//    when(handler.getMethodAnnotation(Mockito.any())).thenReturn(enableTokenAuthorisation);
//    when(jwtAuthenticationService.validateToken(Mockito.anyString())).thenReturn(true);
//    when(jwtAuthenticationService.getUserNameFromToken(Mockito.anyString())).thenReturn(AuthDetailsDataBuilder.getTokenPayLoadDetails());
//	boolean token = requestProcessingInterceptorAdapter.preHandle(request,response,handler);
//    }


    @Test
    @DisplayName("test preHandle")
    public void testPreHandle() throws Exception {
    String jwt="Bearer abcdefghi";
    when(request.getHeader(Mockito.any())).thenReturn(jwt);
    when(handler.getMethodAnnotation(Mockito.any())).thenReturn(enableTokenAuthorisation);
    when(jwtAuthenticationService.validateToken(Mockito.anyString())).thenReturn(true);
    when(jwtAuthenticationService.getUserNameFromToken(Mockito.anyString())).thenReturn(AuthDetailsDataBuilder.getTokenPayLoadDetails());
    boolean token = requestProcessingInterceptorAdapter.preHandle(request,response,handler);
    assertTrue("true",token);
    }

}