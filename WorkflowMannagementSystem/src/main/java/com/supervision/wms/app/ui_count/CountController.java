/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.ui_count;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Thilina Kalum
 */
@RestController
@CrossOrigin
@RequestMapping("/api/wms/count")
public class CountController {
    @Autowired
    private CountService countService;
    
    @RequestMapping(value = "/get-all-admin-count" , method = RequestMethod.GET)
    public HashMap<String, Integer> getAllAdminCount(){
        return countService.getAllAdminCount();
    }
    @RequestMapping(value = "/get-all-department-count/{user}" , method = RequestMethod.GET)
    public HashMap<String, Integer> getAllDepartmentCount(@PathVariable int user){
        return countService.getAllDepartmentCount(user);
    }
    @RequestMapping(value = "/get-all-workers-count/{user}" , method = RequestMethod.GET)
    public HashMap<String, Integer> getAllWorkersCount(@PathVariable int user){
        return countService.getAllWorkersCount(user);
    }

}
