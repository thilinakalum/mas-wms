/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job_items;

import com.supervision.wms.app.job_items.model.JobItems;
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
@RequestMapping("/api/wms/job-items")
public class JobItemsController {
    
    @Autowired
    private JobItemsService jobItemsService;
    
    @RequestMapping(value = "/save-job-items" , method = RequestMethod.POST)
    public JobItems saveJobItems(@RequestBody JobItems jobItems){
        System.out.println("___________________");
        System.out.println(jobItems.getItem());
        System.out.println("___________________");
        return jobItemsService.saveJobItems(jobItems);
    }
    @RequestMapping(value = "/get-all-item-by-job-detail/{indexNo}" , method = RequestMethod.GET)
    public List<JobItems> getAllJobItemByJobDetail(@PathVariable int indexNo){
        return jobItemsService.getAllJobItemByJobDetail(indexNo);
    }
}
