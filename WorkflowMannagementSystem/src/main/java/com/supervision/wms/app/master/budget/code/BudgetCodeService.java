/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.budget.code;

import com.supervision.wms.app.master.budget.code.model.BudgetCode;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Thilina Kalum
 */
@Service
public class BudgetCodeService {

    @Autowired
    private BudgetCodeRepository budgetCodeRepository; 
    
    public BudgetCode saveBudgetCode(BudgetCode budgetCode) {
        return budgetCodeRepository.save(budgetCode);
    }

    public List<BudgetCode> getAllBudgetCode() {
        return budgetCodeRepository.findAll();
    }
    
}
