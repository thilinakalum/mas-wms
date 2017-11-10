/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.budget.code;

import com.supervision.wms.app.master.budget.code.model.BudgetCode;
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
@RequestMapping("/api/wms/master/budget-code")
public class BudgetCodeController {
    
    @Autowired
    private BudgetCodeService budgetCodeService;
    
    @RequestMapping(value = "find-all-budget-code", method = RequestMethod.GET)
    public List<BudgetCode> getAllBudgetCode(){
        return budgetCodeService.getAllBudgetCode();
    }
    
    @RequestMapping(value = "/save-budget-code" , method = RequestMethod.POST)
    public BudgetCode saveBudgetCode(@RequestBody BudgetCode budgetCode){
        return budgetCodeService.saveBudgetCode(budgetCode);
    }
    
}
