/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.common.enums;

/**
 *
 * @author Suhail Tamboli
 */
public enum UserType {

    /**
     * old usertype will be as per old system, new will be all cap
     */
    FREELANCER, VENDOR, VENDOR_USER, QUALITY_ASSURANCE,
    
    CLIENT {
        @Override
        public String toString() {
            return "Client";
        }
    },
    USER {
        @Override
        public String toString() {
            return "User";
        }
    }, 
    ADMIN {
        @Override
        public String toString() {
            return "Admin";
        }
    }
}
