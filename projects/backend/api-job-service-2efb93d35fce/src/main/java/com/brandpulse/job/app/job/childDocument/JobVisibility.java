package com.brandpulse.job.app.job.childDocument;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.brandpulse.job.app.job.enums.JobVisibilityType;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Document
public class JobVisibility {
    
    private JobVisibilityType visibilityType;
    private List<String> visibilityValue;

    private Boolean isVisibleToFreelancer;
    private Boolean isVisibleToVendor;
}
