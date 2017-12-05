/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job;

import com.supervision.wms.app.job.model.Job;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Thilina Kalum
 */
public interface JobRepository extends JpaRepository<Job, Integer> {

    @Query(value = "select \n"
            + "job.*\n"
            + "from job\n"
            + "left join user on user.index_no=job.user\n"
            + "left join department on department.index_no=user.department\n"
            + "where department.index_no =(select user.department from user where user.index_no= :user )\n"
            + "and job.`status`='NEW'", nativeQuery = true)
    public List<Job> getAllJobsByDepartmentAndNew(@Param("user") Integer user);

    @Query(value = "select \n"
            + "job.*\n"
            + "from job\n"
            + "where job.`status`='NEW' ", nativeQuery = true)
    public List<Job> getAllNewJobs();

    @Query(value = "select \n"
            + "job.*\n"
            + "from job\n"
            + "left join user on user.index_no=job.user\n"
            + "left join department on department.index_no=user.department\n"
            + "where department.index_no =(select user.department from user where user.index_no= :user )\n"
            + "and job.`status`='UNAPPROVE' ", nativeQuery = true)
    public List<Job> getAllJobsByDepartmentAndUnapprove(@Param("user") Integer user);

    @Query(value = "select \n"
            + "job.*\n"
            + "from job\n"
            + "left join user on user.index_no=job.user\n"
            + "left join department on department.index_no=user.department\n"
            + "where department.index_no =(select user.department from user where user.index_no= :user )\n"
            + "and job.`status`='APPROVE' ", nativeQuery = true)
    public List<Job> getAllJobsByDepartmentAndApprove(@Param("user") Integer user);

    @Query(value = "select \n"
            + "job.*\n"
            + "from job\n"
            + "left join user on user.index_no=job.user\n"
            + "left join department on department.index_no=user.department\n"
            + "where department.index_no =(select user.department from user where user.index_no= :user )\n"
            + "and job.`status`='REJECT' ", nativeQuery = true)
    public List<Job> getAllJobsByDepartmentAndReject(@Param("user") Integer user);

    @Query(value = "select \n"
            + "job.*\n"
            + "from job\n"
            + "left join user on user.index_no=job.user\n"
            + "left join department on department.index_no=user.department\n"
            + "where department.index_no =(select user.department from user where user.index_no= :user )\n"
            + "and job.`status`='ASSIGN' ", nativeQuery = true)
    public List<Job> getAllJobsByDepartmentAndAssign(@Param("user") Integer user);

    @Query(value = "select \n"
            + "job.* \n"
            + "from \n"
            + "job left join job_detail on job_detail.job = job.index_no\n"
            + "where job_detail.`status` = 'FINISH' and job.`status` = 'ASSIGN'", nativeQuery = true)
    public List<Job> getAllJobsIfFinishJobDetail();

    @Query(value = "select \n"
            + "job.* \n"
            + "from \n"
            + "job \n"
            + "where job.`status`= 'UNCOMFIRM' ", nativeQuery = true)
    public List<Job> getAllJobsByDepatmentSend();

    @Query(value = "select \n"
            + "job.* \n"
            + "from \n"
            + "job \n"
            + "where job.`status`= 'COMPLETED' limit 10 ", nativeQuery = true)
    public List<Job> getAllJobsByFinish();

    
    @Query(value = "select \n"
            + "job.*\n"
            + "from job\n"
            + "left join user on user.index_no=job.user\n"
            + "left join department on department.index_no=user.department\n"
            + "where department.index_no =(select user.department from user where user.index_no= :user )\n"
            + "and job.`status`='COMPLETED' ", nativeQuery = true)
    public List<Job> getAllJobsByFinish(@Param("user") Integer user);

    public List<Job> getAllJobsByStatus(String finish);

}
