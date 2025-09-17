package com.wavelabs.sb.utils;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Constraint(validatedBy = OptionalPatternValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface OptionalPattern {
    
    
    String regexp();
    
    String message() default "{OptionalPattern.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}