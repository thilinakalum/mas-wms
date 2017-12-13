/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.employee;

import com.supervision.wms.app.master.employee.model.Employee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Thilina Kalum
 */
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

    public List<Employee> findByType(String worker);

}
