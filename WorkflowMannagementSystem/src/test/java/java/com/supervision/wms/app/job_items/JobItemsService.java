/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job_items;

import com.supervision.wms.app.job_items.model.JobItems;
import java.math.BigDecimal;
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
@Transactional(propagation = Propagation.SUPPORTS , readOnly = true)
public class JobItemsService {

    @Autowired
    private JobItemsRepository jobItemsRepository;
    
    public JobItems saveJobItems(JobItems jobItems) {
        int qty = jobItems.getQty();
//        BigDecimal bigQty = new BigDecimal(qty);
        BigDecimal unitPrice = jobItems.getUnitPrice();
        BigDecimal multiply = unitPrice.multiply(new BigDecimal(qty));
        jobItems.setTotalPrice(multiply);
        return jobItemsRepository.save(jobItems);
    }

    public List<JobItems> getAllJobItemByJobDetail(int indexNo) {
        return jobItemsRepository.findByJobDetail(indexNo);
    }
    
}
