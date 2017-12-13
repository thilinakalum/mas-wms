/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job_detail_transaction;

import com.supervision.wms.app.job_detail_transaction.model.JobDetailTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Thilina Kalum
 */
public interface JobDetailTransactionRepository extends JpaRepository<JobDetailTransaction, Integer>{
    
}
