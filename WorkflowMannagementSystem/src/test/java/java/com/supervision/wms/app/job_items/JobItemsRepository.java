/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job_items;

import com.supervision.wms.app.job_items.model.JobItems;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Thilina Kalum
 */
public interface JobItemsRepository extends JpaRepository<JobItems, Integer>{

    public List<JobItems> findByJobDetail(int indexNo);
    
}
