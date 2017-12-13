/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job;

import com.supervision.wms.app.job.model.Job;
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
@RequestMapping("/api/wms/job")
public class JobController {
    
    @Autowired
    private JobService jobService;
    
    @RequestMapping(value = "/get-all-jobs" , method = RequestMethod.GET)
    public List<Job> getAllJobs(){
        return jobService.getAllJobs();
    }
    @RequestMapping(value = "/save-jobs" , method = RequestMethod.POST)
    public Job saveJobs(@RequestBody Job job){
        return jobService.saveJobs(job);
    }
    @RequestMapping(value = "/get-all-jobs-by-admin-and-status/{status}" , method = RequestMethod.GET)
    public List<Job> getAllJobsByAdminAndNew(@PathVariable String status){
        return jobService.getAllJobsByAdminAndStatus(status);
    }
    @RequestMapping(value = "/get-all-jobs-by-department-and-status/{user}/{status}" , method = RequestMethod.GET)
    public List<Job> getAllJobsByDepartmentAndStatus(@PathVariable int user , @PathVariable String status){
        return jobService.getAllJobsByDepartmentAndStatus(user,status);
    }
    
    
    
//    @RequestMapping(value = "/get-all-jobs-by-department-and-new/{user}" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByDepartmentAndNew(@PathVariable int user){
//        return jobService.getAllJobsByDepartmentAndNew(user);
//    }
//    @RequestMapping(value = "/get-all-jobs-by-department-and-unapprove/{user}" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByDepartmentAndUnapprove(@PathVariable int user){
//        return jobService.getAllJobsByDepartmentAndUnapprove(user);
//    }
//    @RequestMapping(value = "/get-all-jobs-by-department-and-approve/{user}" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByDepartmentAndApprove(@PathVariable int user){
//        return jobService.getAllJobsByDepartmentAndApprove(user);
//    }
//    @RequestMapping(value = "/get-all-jobs-by-department-and-reject/{user}" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByDepartmentAndReject(@PathVariable int user){
//        return jobService.getAllJobsByDepartmentAndReject(user);
//    }
//    @RequestMapping(value = "/get-all-jobs-by-department-and-assing/{user}" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByDepartmentAndAssign(@PathVariable int user){
//        return jobService.getAllJobsByDepartmentAndAssign(user);
//    }
//    @RequestMapping(value = "/get-all-jobs-if-finish-one-of-job-detail" , method = RequestMethod.GET)
//    public List<Job> getAllJobsIfFinishJobDetail(){
//        return jobService.getAllJobsIfFinishJobDetail();
//    }
//    @RequestMapping(value = "/get-all-jobs-by-department-and-completed" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByFinish(){
//        return jobService.getAllJobsByFinish();
//    }
//    @RequestMapping(value = "/get-all-jobs-by-department-and-completed/{user}" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByFinish(@PathVariable int user){
//        return jobService.getAllJobsByFinish(user);
//    }
//    @RequestMapping(value = "/get-all-jobs-department-send" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByDepatmentSend(){
//        return jobService.getAllJobsByDepatmentSend();
//    }
//    @RequestMapping(value = "/get-all-new-jobs" , method = RequestMethod.GET)
//    public List<Job> getAllNewJobs(){
//        return jobService.getAllNewJobs();
//    }
//    @RequestMapping(value = "/get-all-jobs-by-finish" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByStatsFinish(){
//        return jobService.getAllJobsByStatsFinish();
//    }
    
//    @RequestMapping(value = "/get-all-pending-jobs/by-loging-user-department/{logingUser}" , method = RequestMethod.GET)
//    public List<Job> getAllJobsByLogingUserDepartments(@PathVariable ("logingUser") String logingUser){
//        return jobService.getAllJobsByLogingUserDepartments(logingUser);
//    }
}
