/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.job_detail_transaction.model;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Thilina Kalum
 */
@Entity
@Table(name = "job_detail_transaction")
public class JobDetailTransaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no", nullable = false)
    private Integer indexNo;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;
    
    @Column(length = 45)
    private String status;
    
    @Column(length = 45)
    private String description;
    
    @Column(name = "job_detail")
    private Integer jobDetail;
    
    @Column(name = "user")
    private Integer user;

    public JobDetailTransaction() {
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getJobDetail() {
        return jobDetail;
    }

    public void setJobDetail(Integer jobDetail) {
        this.jobDetail = jobDetail;
    }

    public Integer getUser() {
        return user;
    }

    public void setUser(Integer user) {
        this.user = user;
    }
    
    
}
