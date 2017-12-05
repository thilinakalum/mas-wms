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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Thilina Kalum
 */
@RestController
@CrossOrigin
@RequestMapping("/api/wms/job-transaction")
public class JobTransactionController {

    @Autowired
    private JobTransactionService jobTransactionService;
    
    @RequestMapping(value = "/get-all-job-transaction/{indexNo}", method = RequestMethod.GET)
    public List<JobTransaction> getAllJobs(@PathVariable Integer indexNo) {
        return jobTransactionService.getAllJobTransactionByJobNo(indexNo); 
    }
}
