package com.wavelabs.sb.utils;

import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.apache.commons.lang3.StringUtils;

public class OptionalPatternValidator implements ConstraintValidator<OptionalPattern, String> {

    private String regex;

    @Override
    public void initialize(OptionalPattern value) {
	regex = value.regexp();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext cxt) {
	if (StringUtils.isBlank(value)) {
	    return true;
	}
	return Pattern.matches(regex,value);
    }

}
