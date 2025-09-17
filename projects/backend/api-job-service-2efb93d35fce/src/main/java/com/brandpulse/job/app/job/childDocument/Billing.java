package com.brandpulse.job.app.job.childDocument;

import org.springframework.data.mongodb.core.mapping.Document;

import com.brandpulse.job.app.job.enums.BillingType;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Document
public class Billing {
    
    private int number;
    private BillingType type;
}
