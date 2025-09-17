package com.wavelabs.sb.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.wavelabs.sb.documents.ReportColumns;

@Repository
public interface ReportColumnsRepository extends MongoRepository<ReportColumns, String>{

    Optional<ReportColumns> findByReportIdAndDeleted(String reportId, boolean b);


}
