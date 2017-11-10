/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job;

import com.supervision.wms.app.job.model.Job;
import com.supervision.wms.app.job_tansaction.JobTransactionRepository;
import com.supervision.wms.app.job_tansaction.model.JobTransaction;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Thilina Kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class JobService {

    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private JobTransactionRepository jobTransactionRepository;
    
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
    
    @Transactional
    public Job saveJobs(Job job) {
        JobTransaction jobTransaction = new JobTransaction();
        
        Job job1 = jobRepository.save(job);
        
        jobTransaction.setUser(job1.getUser());
        jobTransaction.setStatus(job1.getStatus());
        jobTransaction.setDescription(job1.getClientDescription());
        jobTransaction.setEstimateBudget(job1.getEstimateBudget());
        jobTransaction.setJob(job1.getIndexNo());
        jobTransaction.setDate(new Date());
        jobTransaction.setTime(new Date());

        jobTransactionRepository.save(jobTransaction);

        return job1;
    }

    public List<Job> getAllNewJobs() {
        return jobRepository.getAllNewJobs();
    }
    
    public List<Job> getAllJobsByDepartmentAndNew(Integer user) {
        return jobRepository.getAllJobsByDepartmentAndNew(user);
    }

    public List<Job> getAllJobsByDepartmentAndUnapprove(int user) {
        return jobRepository.getAllJobsByDepartmentAndUnapprove(user);
    }

    public List<Job> getAllJobsByDepartmentAndApprove(int user) {
        return jobRepository.getAllJobsByDepartmentAndApprove(user);
    }

    public List<Job> getAllJobsByDepartmentAndReject(int user) {
        return jobRepository.getAllJobsByDepartmentAndReject(user);
    }

    public List<Job> getAllJobsByDepartmentAndAssign(int user) {
        return jobRepository.getAllJobsByDepartmentAndAssign(user);
    }
    
    public List<Job> getAllJobsIfFinishJobDetail() {
        return jobRepository.getAllJobsIfFinishJobDetail();
    }

    public List<Job> getAllJobsByDepatmentSend() {
        return jobRepository.getAllJobsByDepatmentSend();
    }

    public List<Job> getAllJobsByFinish() {
        return jobRepository.getAllJobsByFinish();
    }

    public List<Job> getAllJobsByFinish(int user) {
         return jobRepository.getAllJobsByFinish(user);
    }
    
}
