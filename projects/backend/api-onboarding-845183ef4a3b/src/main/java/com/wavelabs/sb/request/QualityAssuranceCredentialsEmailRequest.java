package com.wavelabs.sb.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QualityAssuranceCredentialsEmailRequest {
  
  private String qualityAssuranceId;
    @NotBlank(message = "Subject is mandatory")
    private String subject;
    @Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
    @Email
    private String sendTo;
    @NotBlank(message = "Email Template is mandatory")
    private String template;

    private String[] cc;
    private String[] bcc;
}
