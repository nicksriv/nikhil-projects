package com.wavelabs.sb.repositories;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.VendorUser;

public interface VendorUserRepository extends MongoRepository<VendorUser, String> {

    @Aggregation(pipeline = {"{$match: {\n"
        + "        vendorId: ?0,\n"
        + "        status:'ACTIVE'"
        + "    }}",
        "{$group: {\n"
        + "        _id: null,\n"
        + "        count: {$sum:1}\n"
        + "    }}"})
    Integer activeUsersByVendorIdAndUserType(String vendorId);
    
    @Aggregation(pipeline = {"{$match: {\n"
        + "        vendorId: ?0,\n"
        + "        status:'INACTIVE'"
        + "    }}",
        "{$group: {\n"
        + "        _id: null,\n"
        + "        count: {$sum:1}\n"
        + "    }}"})
    Integer inActiveUsersByVendorIdAndUserType(String vendorId);
    
}
