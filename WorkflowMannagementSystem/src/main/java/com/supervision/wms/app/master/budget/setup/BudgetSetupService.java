/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.budget.setup;

import com.supervision.wms.app.master.budget.code.model.BudgetCode;
import com.supervision.wms.app.master.budget.setup.model.BudgetSetup;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Thilina Kalum
 */
@Service
public class BudgetSetupService {

    @Autowired
    private BudgetSetupRepository budgetSetupRepository;

    public BudgetSetup saveBudgetSetup(BudgetSetup budgetSetup) {
        return budgetSetupRepository.save(budgetSetup);
    }

    public List<BudgetSetup> getAllBudgetSetup() {
        return budgetSetupRepository.findAll();
    }

    public void deleteBudgetSetup(Integer indexNo) {
        try {
            budgetSetupRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this budgetCode setup because there are details in other transaction");
        }
    }

}
