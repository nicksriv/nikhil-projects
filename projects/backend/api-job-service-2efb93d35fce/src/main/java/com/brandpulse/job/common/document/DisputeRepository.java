package com.brandpulse.job.common.document;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.brandpulse.job.common.enums.UserType;

@Repository
public interface DisputeRepository extends MongoRepository<Dispute, String> {

  @Aggregation(pipeline = { "{$match: {\n" +
  "    }}",
      "{$group: {\n" +
          "        _id: null,\n" +
          "        count: {$sum:1} \n" +
          "        }\n" +
          "    }}" })

  Integer countDisputes();

  @Aggregation(pipeline = { "{$match: {\n" +
      "        userId: ?0,\n" +
      "        userType: ?1\n" +
      "    }}",
      "{$group: {\n" +
          "        _id: null,\n" +
          "        count: {$sum:1} \n" +
          "        }\n" +
          "    }}" })

  Integer countDisputesByUserIdAndUserType(String userId, UserType userType);

  @Aggregation(pipeline = { "{$match: {\n" +
      "    }}",
      "{$group: {\n" +
          "        _id: null,\n" +
          "        count: {$sum:1} \n" +
          "        }\n" +
          "    }}" })
  Integer countTotalDisputes();
  @Aggregation(pipeline = { "{$match: {\n" +
                                "   clientId: ?0,\n" +
      "    }}",
      "{$group: {\n" +
          "        _id: null,\n" +
          "        count: {$sum:1} \n" +
          "    }}" })
  Integer countTotalDisputesByClientId(String clientId);
}
