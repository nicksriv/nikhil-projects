/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.vendor;

import java.util.Optional;
import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.brandpulse.fv.api.dto.VendorUserStatMonthWiseDto;
/**
 *
 * @author ts
 */
@Repository
public interface VendorUserRepository extends MongoRepository<VendorUser, String> {

    Optional<VendorUser> findByVendorUserRefNo(String refNo);

    Optional<VendorUser> findByEmail(String email);

    @Aggregation(pipeline = { "{$match: {\n" +
            "        vendorId: ?0,\n" +
            "        status:'ACTIVE'" +
            "    }}",
            "{$group: {\n" +
                    "        _id: null,\n" +
                    "        count: {$sum:1}\n" +
                    "    }}" })
    Integer activeUsersByVendorId(String vendorId);

    @Aggregation(pipeline = { "{$match: {\n" +
            "        vendorId: ?0,\n" +
            "    }}",
            "{$group: {\n" +
                    "        _id: null,\n" +
                    "        count: {$sum:1}\n" +
                    "    }}" })
    Integer totalUsersByVendorId(String vendorId);


     
    @Aggregation( pipeline = {"{$match: {\n" +
                                "        vendorId: ?0,\n" +
                                "    }}", 
                                "{$group: {\n" +
                                "        _id: {\n" +
                                "            year: {\n" +
                                "                $year: '$createdAt'\n" +
                                "            },\n" +
                                "            month: {\n" +
                                "                $month: '$createdAt'\n" +
                                "            }\n" +
                                "        },\n" +
                                "        count: {\n" +
                                "            $sum: 1\n" +
                                "        },\n" +
                                "        month: {\n" +
                                "            $first: '$createdAt'\n" +
                                "        }\n" +
                                "    }}", 
                                "{$match: {\n" +
                                "        '_id.year': ?1\n" +
                                "    }}", 
                                "{$project: {\n" +
                                "        count: 1,\n" +
                                "        month: {\n" +
                                "            $dateToString: {\n" +
                                "                format: '%Y-%m',\n" +
                                "                date: '$month'\n" +
                                "            }\n" +
                                "        }\n" +
                                "    }}"})
    List<VendorUserStatMonthWiseDto> countVendorUserByMonthAndFilterByYear(String userId, Integer year);

    public Optional<VendorUser> findByVendorId(String vendorUserId);

}
