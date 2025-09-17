package com.brandpulse.job.app.qualityAssurance;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualityAssuranceRepository extends MongoRepository<QualityAssurance , String> {

  @Aggregation(pipeline = { "{$match: {\n" +
      "    }}",
      "{$group: {\n" +
          "        _id: null,\n" +
          "        count: {$sum:1} \n" +
          "        }\n" +
          "    }}" })
  Integer countTotalQualityAssurances();
  
}
