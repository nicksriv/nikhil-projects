/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.job;

import com.brandpulse.fv.app.job.enums.JobCandidateStatus;
import com.brandpulse.fv.common.enums.UserType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ts
 */
@Repository
public interface JobCandidateRepository extends MongoRepository<JobCandidate, String> {

//    List<JobCandidate> findByJobIds(List<String> jobIds);

    Optional<JobCandidate> findByJobId(String jobId);

    @Aggregation(pipeline = {"{$match: {\n"
        + "        userId: ?0,\n"
        + "        userType: ?1\n"
        + "    }}",
        "{$group: {\n"
        + "        _id: {\n"
        + "            year: {\n"
        + "                $year: '$createdAt'\n"
        + "            },\n"
        + "            month: {\n"
        + "                $month: '$createdAt'\n"
        + "            }\n"
        + "        },\n"
        + "        count: {\n"
        + "            $sum: 1\n"
        + "        },\n"
        + "        month: {\n"
        + "            $first: '$createdAt'\n"
        + "        }\n"
        + "    }}",
        "{$match: {\n"
        + "        '_id.year': ?2\n"
        + "    }}",
        "{$project: {\n"
        + "        count: 1,\n"
        + "        month: {\n"
        + "            $dateToString: {\n"
        + "                format: '%Y-%m',\n"
        + "                date: '$month'\n"
        + "            }\n"
        + "        }\n"
        + "    }}"})
    List<JobCandidateStatMonthWise> countJobByMonthAndFilterByYear(String userId, UserType userType, Integer year);
    
    @Aggregation(pipeline = {"{$match: {\n"
        + "        userSubId: ?0,\n"
        + "        userType: ?1\n"
        + "    }}",
        "{$group: {\n"
        + "        _id: {\n"
        + "            year: {\n"
        + "                $year: '$createdAt'\n"
        + "            },\n"
        + "            month: {\n"
        + "                $month: '$createdAt'\n"
        + "            }\n"
        + "        },\n"
        + "        count: {\n"
        + "            $sum: 1\n"
        + "        },\n"
        + "        month: {\n"
        + "            $first: '$createdAt'\n"
        + "        }\n"
        + "    }}",
        "{$match: {\n"
        + "        '_id.year': ?2\n"
        + "    }}",
        "{$project: {\n"
        + "        count: 1,\n"
        + "        month: {\n"
        + "            $dateToString: {\n"
        + "                format: '%Y-%m',\n"
        + "                date: '$month'\n"
        + "            }\n"
        + "        }\n"
        + "    }}"})
    List<JobCandidateStatMonthWise> countJobByMonthAndFilterByYearForVendorUser(String userSubId, UserType userType, Integer year);

    @Aggregation(pipeline = {"{$match: {\n"
        + "        userId: ?0\n"
        + "        userType: ?1\n"
        + "    }}",
        "{$group: {\n"
        + "        _id: {\n"
        + "            year: {\n"
        + "                $year: '$createdAt'\n"
        + "            },\n"
        + "            month: {\n"
        + "                $month: '$createdAt'\n"
        + "            }\n"
        + "        },\n"
        + "        amount: {\n"
        + "            $sum: '$totalEarned'\n"
        + "        },\n"
        + "        month: {\n"
        + "            $first: '$createdAt'\n"
        + "        }\n"
        + "    }}",
        "{$match: {\n"
        + "        '_id.year': ?2\n"
        + "    }}",
        "{$project: {\n"
        + "        amount: 1,\n"
        + "        month: {\n"
        + "            $dateToString: {\n"
        + "                format: '%Y-%m',\n"
        + "                date: '$month'\n"
        + "            }\n"
        + "        }\n"
        + "    }}"})
    List<JobEarningStatMonthWise> sumEarningByMonth(String userId, UserType userType, Integer year);

    // total project worked
    Integer countByUserIdAndUserType(String userId, UserType userType);

    // total project worked for vendor user
    Integer countByUserSubIdAndUserType(String userSubId, UserType userType);

    // total money earned
    @Aggregation(pipeline = {"{$match: {\n"
        + "        userId: ?0,\n"
        + "        userType: ?1\n"
        + "    }}",
        "{$group: {\n"
        + "        _id: null,\n"
        + "        amount: {\n"
        + "            $sum: '$totalEarned'\n"
        + "        }\n"
        + "    }}"})
    float sumEarningByUserIdAndUserType(String userId, UserType userType);

    // total hours worked
    @Aggregation(pipeline = {"{$match: {\n"
        + "        userId: ?0,\n"
        + "        userType: ?1\n"
        + "    }}",
        "{$group: {\n"
        + "        _id: null,\n"
        + "        hours: {\n"
        + "            $sum: '$totalHoursWorked'\n"
        + "        }\n"
        + "    }}"})
    Integer sumHoursByUserIdAndUserType(String userId, UserType userType);

    // total hours worked for vendor user
    @Aggregation(pipeline = {"{$match: {\n"
        + "        userSubId: ?0,\n"
        + "        userType: ?1\n"
        + "    }}",
        "{$group: {\n"
        + "        _id: null,\n"
        + "        hours: {\n"
        + "            $sum: '$totalHoursWorked'\n"
        + "        }\n"
        + "    }}"})
    Integer sumHoursByUserSubIdAndUserType(String userSubId, UserType userType);

    // last project earning
    Optional<JobCandidate> findFirstByUserIdAndUserTypeAndJobStatusOrderByCreatedAtDesc(String userId, UserType userType, JobCandidateStatus jobStatus);

    Optional<JobCandidate> findByUserIdAndUserType(String userId, UserType userType);

    @Aggregation(pipeline = {"{$match: {\n"
        + "        userId: ?0,\n"
        + "        userType: ?1\n"
        + "        jobStatus: { $in: ['NEW', 'INPROGRESS', 'INREVIEW']}"
        + "    }}",
        "{$group: {\n"
        + "        _id: null,\n"
        + "        count: {$sum:1}\n"
        + "    }}"})
    Integer inprogressJobsByUserIdAndUserType(String userId, UserType userType);

    @Aggregation(pipeline = {"{$match: {\n"
        + "        userId: ?0,\n"
        + "        userType: ?1\n"
        + "        jobStatus: { $in: ['CLOSED', 'CANCEL']}"
        + "    }}",
        "{$group: {\n"
        + "        _id: null,\n"
        + "        count: {$sum:1}\n"
        + "        }\n"
        + "    }}"})
    Integer completedJobsByUserIdAndUserType(String userId, UserType userType);
}
