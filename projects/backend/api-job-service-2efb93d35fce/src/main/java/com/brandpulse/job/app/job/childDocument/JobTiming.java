
package com.brandpulse.job.app.job.childDocument;

import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.Document;

import com.brandpulse.job.app.job.enums.DurationOfWorkType;
import com.brandpulse.job.app.job.enums.HourRequiredPer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Document
public class JobTiming {
    
    private int hourRequired;
    private HourRequiredPer hourRequiredPer;

    private int durationOfWork;
    private DurationOfWorkType durationOfWorkType;

    private ArrayList<String> jobDays;

    private String shiftStartTime;
    private String shiftEndTime;
}
