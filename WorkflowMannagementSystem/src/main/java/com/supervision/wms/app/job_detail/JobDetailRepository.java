/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job_detail;

import com.supervision.wms.app.job.model.Job;
import com.supervision.wms.app.job_detail.model.JobDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Thilina Kalum
 */
public interface JobDetailRepository extends JpaRepository<JobDetail, Integer> {

    public List<JobDetail> findByJob(int indexNo);

//    @Query(value = "select job_detail.* from job_detail where job_detail.employee =:user and job_detail.`status` = 'NEW'", nativeQuery = true)
//    public List<JobDetail> getAllJobsDetailByEmployeeAndNew(@Param("user") int user);
//
//    @Query(value = "select job_detail.* from job_detail where job_detail.employee =:user and job_detail.`status` = 'ONGOING'", nativeQuery = true)
//    public List<JobDetail> getAllJobsDetailByEmployeeAndRunning(@Param("user") int user);
//
//    @Query(value = "select job_detail.* from job_detail where job_detail.employee =:user and job_detail.`status` = 'FINISH'", nativeQuery = true)
//    public List<JobDetail> getAllJobsDetailByEmployeeAndFinish(@Param("user") int user);
    @Query(value = "select * \n"
            + "from job_detail \n"
            + "where job_detail.`job` = :jobNo \n"
            + "and job_detail.`status` ='NEW' \n"
            + "or job_detail.`status` ='ONGOING' ", nativeQuery = true)
    public List<JobDetail> getAllJobsByJobNoAndStatus(@Param("jobNo") int jobNo);

    @Query(value = "select job_detail.*\n"
            + "from job_detail \n"
            + " where employee = :user \n"
            + " and `status` = :status ", nativeQuery = true)
    public List<JobDetail> jobDetailService(@Param("user") int user,@Param("status")  String status);
}
