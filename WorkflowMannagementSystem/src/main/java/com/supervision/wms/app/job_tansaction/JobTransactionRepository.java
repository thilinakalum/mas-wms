/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job_tansaction;

import com.supervision.wms.app.job_tansaction.model.JobTransaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Thilina Kalum
 */
public interface JobTransactionRepository extends JpaRepository<JobTransaction, Integer>{

    public List<JobTransaction> findByJob(Integer indexNo);
    
}
