/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.department;

import com.supervision.wms.app.master.department.model.Department;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/api/wms/master/department")
public class DepartmentController {
        
    @Autowired
    private DepartmentService departmentService;
    
    @RequestMapping(value = "/find-all-department" , method = RequestMethod.GET)
    public List<Department> getAllDepartment(){
        return departmentService.getAllDepartment();
    }
    @RequestMapping(value = "/save-department" , method = RequestMethod.POST)
    public Department saveDepartment(@RequestBody Department department){
        department.setBranch(1);
        return departmentService.saveDepartment(department);
    }
}
