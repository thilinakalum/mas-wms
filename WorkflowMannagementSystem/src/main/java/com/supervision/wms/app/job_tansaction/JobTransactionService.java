/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job_tansaction;

import com.supervision.wms.app.job.model.Job;
import com.supervision.wms.app.job_tansaction.model.JobTransaction;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Thilina Kalum
 */
@Service
public class JobTransactionService {
    
    @Autowired
    private JobTransactionRepository jobTransactionRepository;
    
    public JobTransaction saveTransAction(JobTransaction jobTransaction){
        return jobTransactionRepository.save(jobTransaction);
    }

    public List<JobTransaction> getAllJobTransactionByJobNo(Integer indexNo) {
        return jobTransactionRepository.findByJob(indexNo);
    }
}
