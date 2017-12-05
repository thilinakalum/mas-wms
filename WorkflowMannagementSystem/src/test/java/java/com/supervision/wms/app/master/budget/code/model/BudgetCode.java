/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.master.budget.code.model;

import com.supervision.wms.app.job.model.Job;
import com.supervision.wms.app.master.budget.setup.model.BudgetSetup;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Thilina Kalum
 */
@Entity
@Table(name = "budget_code")
public class BudgetCode implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no", nullable = false)
    private Integer indexNo;
    
    @Column(length = 45)
    private String code;
    
    @Column(length = 45)
    private String description;
    
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "budgetCode", fetch = FetchType.EAGER)
//    private List<BudgetSetup> budgetSetupList;
//    
//    @OneToMany(mappedBy = "budgetCode", fetch = FetchType.EAGER)
//    private List<Job> jobList;

    public BudgetCode() {
    }

    public BudgetCode(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    @XmlTransient
//    public List<BudgetSetup> getBudgetSetupList() {
//        return budgetSetupList;
//    }
//
//    public void setBudgetSetupList(List<BudgetSetup> budgetSetupList) {
//        this.budgetSetupList = budgetSetupList;
//    }
//
//    @XmlTransient
//    public List<Job> getJobList() {
//        return jobList;
//    }
//
//    public void setJobList(List<Job> jobList) {
//        this.jobList = jobList;
//    }
    
}
