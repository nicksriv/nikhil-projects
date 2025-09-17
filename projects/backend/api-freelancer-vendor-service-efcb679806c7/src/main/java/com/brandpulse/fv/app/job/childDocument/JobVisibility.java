package com.brandpulse.fv.app.job.childDocument;

import org.springframework.data.mongodb.core.mapping.Document;

import com.brandpulse.fv.app.job.enums.JobVisibilityType;
import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Document
public class JobVisibility {
    
    private JobVisibilityType visibilityType;
    private ArrayList<String> visibilityValue;

    private boolean isVisibleToFreelancer;
    private boolean isVisibleToVendor;
}
