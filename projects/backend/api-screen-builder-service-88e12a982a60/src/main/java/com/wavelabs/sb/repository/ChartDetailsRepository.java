package com.wavelabs.sb.repository;

import com.wavelabs.sb.documents.ChartDetails;
import com.wavelabs.sb.enums.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChartDetailsRepository extends MongoRepository<ChartDetails, String> {

    Optional<ChartDetails> findByIdAndDeletedAndStatus(String Id, boolean b, Status active);

    List<ChartDetails> findByReportIdInAndStatusAndDeleted(List<String> reportIds, Status active, boolean b);

    List<ChartDetails> findByReportIdAndDeletedAndStatus(String reportConfigurationId, boolean b, Status active);

    List<ChartDetails> findByIdInAndStatusAndDeleted(List<String> chartIds, Status active, boolean b);

    Object findByReportIdAndStatusAndDeleted(String reportId, Status active, boolean anyBoolean);

    List<ChartDetails> findByReportId(String reportId);
}
