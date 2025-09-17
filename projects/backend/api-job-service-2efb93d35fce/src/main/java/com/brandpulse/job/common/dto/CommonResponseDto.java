/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Suhail Tamboli
 */
@Getter
@Setter
@NoArgsConstructor
public class CommonResponseDto {
private String message;
    private Object data;
    
    public CommonResponseDto(String message) {
        this.message = message;
    }
    
    public CommonResponseDto(String message, Object data) {
        this.message = message;
        this.data = data;
    }    
}
