package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddRemarkRequest {
    
    @NotBlank
    private String closedRemark;
}
