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

    @Query(value = "select count(job.index_no) as cuont\n"
            + "from job\n"
            + "where job.`status`=:status", nativeQuery = true)
    public Integer findByStatus(@Param("status")String NEW);

}
