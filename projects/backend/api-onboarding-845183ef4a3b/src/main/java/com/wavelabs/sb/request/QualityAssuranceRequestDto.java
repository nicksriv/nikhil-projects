package com.wavelabs.sb.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QualityAssuranceRequestDto {
  
  @NotNull
	private String firstName;
	
	@NotNull
	private String middleName;
	
	@NotNull
	private String lastName;
	
	@NotNull
	@Email
	private String email;

	@NotNull
	private String qualityAssuranceRefNo;
	
	@NotBlank
  @Pattern(message = "Please provide valid mobile", regexp = "^[0-9]+\\d{1,14}$")
	private String mobile;
}
