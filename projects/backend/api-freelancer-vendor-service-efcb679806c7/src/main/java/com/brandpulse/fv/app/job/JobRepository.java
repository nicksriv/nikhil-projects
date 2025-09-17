package com.brandpulse.fv.app.job;

import com.brandpulse.fv.app.job.enums.JobStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends MongoRepository<Job, String> {

    public Page<Job> findAll(Pageable pageable);

    Optional<Job> findByJobRefNo(String jobRefNo);

    List<Job> findByIdIn(List<String> jobIds);

    List<Job> findBySkills(String skillId);

    List<Job> findByClientId(String clientId);

    List<Job> findByIdAndJobStatus(String jobId, JobStatus jobStatus);

    public List<Job> findTop2ById(List<String> jobLists);
}
