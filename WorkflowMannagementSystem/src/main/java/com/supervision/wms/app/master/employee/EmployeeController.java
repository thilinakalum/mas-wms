/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.employee;

import com.supervision.wms.app.master.employee.model.Employee;
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
@RequestMapping("/api/wms/master/employee")
public class EmployeeController {
   
    @Autowired
    private EmployeeService employeeService;
    
    @RequestMapping(value = "/find-all-employee" , method = RequestMethod.GET)
    public List<Employee> getAllEmployee(){
        return employeeService.getAllEmployee();
    }
    @RequestMapping(value = "/save-employee" , method = RequestMethod.POST)
    public Employee saveEmployee(@RequestBody Employee employee){
        employee.setBranch(1);
        return employeeService.saveEmployee(employee);
    }
}
