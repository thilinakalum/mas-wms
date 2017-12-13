/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.ui_count;

import com.supervision.wms.app.job_detail.model.JobDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Thilina Kalum
 */
public interface CountDetailRepository extends JpaRepository<JobDetail, Integer> {

    @Query(value = "select\n"
            + " count(job_detail.index_no) as count \n"
            + " from job_detail \n"
            + " where employee = :user \n"
            + " and `status` = :status ", nativeQuery = true)
    public Integer findByStatusAndLoginUserDepartment(@Param("user") int user, @Param("status") String status);

}
