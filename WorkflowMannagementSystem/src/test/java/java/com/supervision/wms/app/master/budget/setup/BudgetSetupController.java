/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.budget.setup;

import com.supervision.wms.app.master.budget.setup.model.BudgetSetup;
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
@RequestMapping("/api/wms/master/budget-setup")
public class BudgetSetupController {
  
    @Autowired
    private BudgetSetupService budgetSetupService;
    
    @RequestMapping(value = "/find-all-budget-setup" , method = RequestMethod.GET)
    public List<BudgetSetup> getAllBudgetSetup(){
        return budgetSetupService.getAllBudgetSetup();
    }
    
    @RequestMapping(value = "/save-budget-setup" , method = RequestMethod.POST)
    public BudgetSetup saveBudgetSetup(@RequestBody BudgetSetup budgetSetup){
        return budgetSetupService.saveBudgetSetup(budgetSetup);
    }
}
