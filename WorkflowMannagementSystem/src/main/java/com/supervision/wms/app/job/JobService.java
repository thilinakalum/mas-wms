/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job;

import com.supervision.wms.app.job.model.Job;
import com.supervision.wms.app.job_tansaction.JobTransactionRepository;
import com.supervision.wms.app.job_tansaction.JobTransactionService;
import com.supervision.wms.app.job_tansaction.model.JobTransaction;
import com.supervision.wms.app.security.user.UserRepository;
import com.supervision.wms.app.security.user.model.User;
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
    @Autowired
    private UserRepository userRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Transactional
    public Job saveJobs(Job job) {
        JobTransaction jobTransaction = new JobTransaction();
        if (job.getIndexNo() == null) {
            if (job.getDepartment() == null) {
                Integer userId = job.getUser();
                User user = userRepository.findOne(userId);
                Integer department = user.getDepartment();
                job.setDepartment(department);
            }

            Job newSaveJobData = jobRepository.save(job);

            jobTransaction.setUser(newSaveJobData.getUser());
            jobTransaction.setStatus(newSaveJobData.getStatus());
            jobTransaction.setDescription(newSaveJobData.getClientDescription());
            jobTransaction.setEstimateBudget(newSaveJobData.getEstimateBudget());
            jobTransaction.setJob(newSaveJobData.getIndexNo());
            jobTransaction.setDate(new Date());
            jobTransaction.setTime(new Date());

            jobTransactionRepository.save(jobTransaction);

            return newSaveJobData;
        } else {
            Integer oldJobUser = jobRepository.getOne(job.getIndexNo()).getUser();
            Job getSaveJobData = jobRepository.save(job);

            jobTransaction.setUser(getSaveJobData.getUser());
            jobTransaction.setStatus(getSaveJobData.getStatus());
            jobTransaction.setDescription(getSaveJobData.getClientDescription());
            jobTransaction.setEstimateBudget(getSaveJobData.getEstimateBudget());
            jobTransaction.setJob(getSaveJobData.getIndexNo());
            jobTransaction.setDate(new Date());
            jobTransaction.setTime(new Date());

            jobTransactionRepository.save(jobTransaction);

            //change old user repeat
            getSaveJobData.setUser(oldJobUser);
            return jobRepository.save(getSaveJobData);
        }
    }

    public List<Job> getAllJobsByDepartmentAndStatus(int user, String status) {
        return jobRepository.findAllJobsByUserDepartmentAndStatus(user, status);
    }

    public List<Job> getAllJobsByAdminAndStatus(String status) {
        return jobRepository.findAllJobByStatus(status);
    }

//    public List<Job> getAllNewJobs() {
//        return jobRepository.getAllNewJobs();
//    }
//    public List<Job> getAllJobsByDepartmentAndNew(Integer user) {
//        return jobRepository.getAllJobsByDepartmentAndNew(user);
//    }
//
//    public List<Job> getAllJobsByDepartmentAndUnapprove(int user) {
//        return jobRepository.getAllJobsByDepartmentAndUnapprove(user);
//    }
//
//    public List<Job> getAllJobsByDepartmentAndApprove(int user) {
//        return jobRepository.getAllJobsByDepartmentAndApprove(user);
//    }
//
//    public List<Job> getAllJobsByDepartmentAndReject(int user) {
//        return jobRepository.getAllJobsByDepartmentAndReject(user);
//    }
//
//    public List<Job> getAllJobsByDepartmentAndAssign(int user) {
//        return jobRepository.getAllJobsByDepartmentAndAssign(user);
//    }
//
//    public List<Job> getAllJobsIfFinishJobDetail() {
//        return jobRepository.getAllJobsIfFinishJobDetail();
//    }
//
//    public List<Job> getAllJobsByDepatmentSend() {
//        return jobRepository.getAllJobsByDepatmentSend();
//    }
//
//    public List<Job> getAllJobsByFinish() {
//        return jobRepository.getAllJobsByFinish();
//    }
//
//    public List<Job> getAllJobsByFinish(int user) {
//        return jobRepository.getAllJobsByFinish(user);
//    }
//
//    public List<Job> getAllJobsByStatsFinish() {
//        return jobRepository.getAllJobsByStatus("FINISH");
//    }
}
