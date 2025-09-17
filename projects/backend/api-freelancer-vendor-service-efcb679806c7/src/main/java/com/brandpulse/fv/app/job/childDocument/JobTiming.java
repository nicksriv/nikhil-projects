
package com.brandpulse.fv.app.job.childDocument;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

import com.brandpulse.fv.app.job.enums.DurationOfWorkType;
import com.brandpulse.fv.app.job.enums.HourRequiredPer;
import com.mongodb.internal.connection.Time;

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
