/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wavelabs.sb.documents.childDocuments;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
public class SpocPerson {

    @NotBlank(message = "SpocPerson is mandatory")
    @Pattern(message = "SpocPerson  should contain alpha numeric only ", regexp = "^[a-zA-Z0-9\\s]*$")
    @Size(min = 2, message = "SpocPerson name must be more than 2 characters")
    private String name;

    @NotBlank(message = "Email should not be empty")
	@Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
    private String email;

    @NotBlank(message="Mobile number is mandatory")
	@Pattern(message = "Provide valid mobile number", regexp="^[1-9][0-9]{9}$")
    private String mobile;


    @NotBlank(message = "Designation is mandatory")
    @Pattern(message = "Designation   should contain alpha numeric only ", regexp = "^[a-zA-Z0-9\\s]*$")
    @Size(min = 2, message = "Designation  name must be more than 2 characters")
    private String designation;
}
