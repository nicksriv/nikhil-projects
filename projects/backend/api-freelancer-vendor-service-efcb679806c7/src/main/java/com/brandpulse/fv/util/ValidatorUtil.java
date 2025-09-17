/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.util;

import java.util.regex.Pattern;

/**
 *
 * @author TS
 */
public class ValidatorUtil {
    
    private ValidatorUtil(){}

    public static boolean isIfsc(String ifsc) {
        String regex = "^[A-Z]{4}0[A-Z0-9]{6}$";

        return ifsc.matches(regex);
    }

    public static boolean isEmail(String email) {
        String regex = "([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)";

        return email.matches(regex);
    }

    public static boolean isMobile(String mobile) {
        String regex = "[1-9][0-9]{9}";

        return mobile.matches(regex);
    }

    public static boolean isTelephone(String phone) {
        String regex = "[0-9]{3}\\-[0-9]{8}";
        return phone.matches(regex);
    }

    public static boolean isPan(String pan) {
        String regex = "[A-Z]{5}[0-9]{4}[A-Z]{1}";

        return pan.matches(regex);
    }

    public static boolean isBankAccount(String accountNumber) {
        String regex = "^\\d{9,18}$";

        return accountNumber.matches(regex);
    }

    public static boolean isUtilityCode(String utilityCode) {
        String regex = "^[A-Za-z0-9]{9,18}$";
        Pattern.compile(regex);

        return utilityCode.matches(regex);
    }

    public static boolean isPinCode(String pinCode) {
        String regex = "^\\d{6}$";

        return pinCode.matches(regex);
    }
   
}
