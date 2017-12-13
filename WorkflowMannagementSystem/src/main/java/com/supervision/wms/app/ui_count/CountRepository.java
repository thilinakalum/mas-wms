/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.ui_count;

import com.supervision.wms.app.job.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Thilina Kalum
 */
public interface CountRepository extends JpaRepository<Job, Integer> {

    @Query(value = "select count(job.index_no) as count\n"
            + "from job\n"
            + "where job.`status`=:status", nativeQuery = true)
    public Integer findByStatus(@Param("status")String NEW);
    
//    @Query(value = "select count(job.index_no) as count\n"
//            + "from job\n"
//            + "left join user on user.index_no=job.user\n"
//            + "left join department on department.index_no=user.department\n"
//            + "where department.index_no =(select user.department from user where user.index_no= :user )\n"
//            + "and job.`status`= :status ", nativeQuery = true)
//    public Integer findByStatusAndLoginUserDepartment(@Param("user")int user, @Param("status")String status);
    
    @Query(value = "select count(job.index_no) as count\n" 
            + "from job\n" 
            + "where job.department =(select user.department from user where user.index_no= :user )\n" 
            + "and job.`status`= :status", nativeQuery = true)
    public Integer findByStatusAndLoginUserDepartment(@Param("user")int user, @Param("status")String status);

}
