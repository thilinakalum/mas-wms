/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job_detail;

import com.supervision.wms.app.job.model.Job;
import com.supervision.wms.app.job_detail.model.JobDetail;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Thilina Kalum
 */
@RestController
@CrossOrigin
@RequestMapping("/api/wms/job-detail")
public class JobDetailController {

    @Autowired
    private JobDetailService jobDetailService;

    @RequestMapping(value = "/find-all-job-details", method = RequestMethod.GET)
    public List<JobDetail> getAllJobDetails() {
        return jobDetailService.getAllJobDetails();
    }

    @RequestMapping(value = "/find-all-job-details-by-job/{indexNo}", method = RequestMethod.GET)
    public List<JobDetail> getAllJobsDetailByjob(@PathVariable int indexNo) {
        return jobDetailService.getAllJobsDetailByjob(indexNo);
    }

    @RequestMapping(value = "/save-job-detail", method = RequestMethod.POST)
    public JobDetail saveJobDetail(@RequestBody JobDetail jobDetail) {
        return jobDetailService.saveJobDetail(jobDetail);
    }
    @RequestMapping(value = "/delete-job-detail/{indexNo}", method = RequestMethod.GET)
    public void deleteJobDetail(@PathVariable Integer indexNo) {
        jobDetailService.deleteJobDetail(indexNo);
    }

    @RequestMapping(value = "/get-all-job-detail-by-user-and-status/{user}/{status}" , method = RequestMethod.GET)
    public List<JobDetail> jobDetailService(@PathVariable int user , @PathVariable String status){
        return jobDetailService.jobDetailService(user,status);
    }
    
//    @RequestMapping(value = "/get-all-job-detail-by-employee-and-new/{user}", method = RequestMethod.GET)
//    public List<JobDetail> getAllJobsDetailByEmployeeAndNew(@PathVariable int user) {
//        return jobDetailService.getAllJobsDetailByEmployee(user);
//    }
//    @RequestMapping(value = "/get-all-job-detail-by-employee-and-running/{user}", method = RequestMethod.GET)
//    public List<JobDetail> getAllJobsDetailByEmployeeAndRunning(@PathVariable int user) {
//        return jobDetailService.getAllJobsDetailByEmployeeAndRunning(user);
//    }
//    @RequestMapping(value = "/get-all-job-detail-by-employee-and-finish/{user}", method = RequestMethod.GET)
//    public List<JobDetail> getAllJobsDetailByEmployeeAndFinish(@PathVariable int user) {
//        return jobDetailService.getAllJobsDetailByEmployeeAndFinish(user);
//    }

}
