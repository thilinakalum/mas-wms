/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.ui_count;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Thilina Kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class CountService {

    private final static String NEW="NEW";
    private final static String UNAPPROVE="UNAPPROVE";
    private final static String APPROVE="APPROVE";
    private final static String REJECT="REJECT";
    private final static String CANSEL="CANSEL";
    
    private final static String ASSIGN="ASSIGN";
    private final static String FINISH="FINISH";
    
    private final static String UNCONFIRM="UNCONFIRM";
    private final static String COMPLETED="COMPLETED";
    
    private final static String WORKER_NEW="NEW";
    private final static String WORKER_ONGOING="ONGOING";
    private final static String WORKER_FINISH="FINISH";
    
    @Autowired
    private CountRepository countRepository;
    
    @Autowired
    private CountDetailRepository countDetailRepository;
    
    public HashMap<String, Integer> getAllAdminCount() {
        
        HashMap<String, Integer> map = new HashMap<>();
        
        Integer newCount = countRepository.findByStatus(NEW);
        map.put("NEW", newCount);
        
        Integer unApproveCount = countRepository.findByStatus(UNAPPROVE);
        map.put("UNAPPROVE", unApproveCount);
        
        Integer approveCount = countRepository.findByStatus(APPROVE);
        map.put("APPROVE", approveCount);
        
        Integer rejectCount = countRepository.findByStatus(REJECT);
        map.put("REJECT", rejectCount);
        
        Integer canselCount = countRepository.findByStatus(CANSEL);
        map.put("CANSEL", canselCount);
        
        Integer assignCount = countRepository.findByStatus(ASSIGN);
        map.put("ASSIGN", assignCount);
        
        Integer finishCount = countRepository.findByStatus(FINISH);
        map.put("FINISH", finishCount);
        
        Integer completedCount = countRepository.findByStatus(COMPLETED);
        map.put("COMPLETED", completedCount);

        Integer unconfirmCount = countRepository.findByStatus(UNCONFIRM);
        map.put("UNCONFIRM", unconfirmCount);
        
//        Integer workerNewCount = countRepository.findByStatus(WORKERNEW);
//        map.put("WORKERNEW", workerNewCount);
//        
//        Integer workerOngoingCount = countRepository.findByStatus(WORKERONGOING);
//        map.put("WORKERONGOING", workerOngoingCount);
//        
//        Integer workerFinishCount = countRepository.findByStatus(WORKERFINISH);
//        map.put("WORKERFINISH", workerFinishCount);
        
        return map;
    }
    public HashMap<String, Integer> getAllDepartmentCount(int user) {
        
        HashMap<String, Integer> map = new HashMap<>();
        
        Integer newCount = countRepository.findByStatusAndLoginUserDepartment(user ,NEW);
        map.put("DEPARTMENT_NEW", newCount);
        
        Integer unApproveCount = countRepository.findByStatusAndLoginUserDepartment(user ,UNAPPROVE);
        map.put("DEPARTMENT_UNAPPROVE", unApproveCount);
        
        Integer approveCount = countRepository.findByStatusAndLoginUserDepartment(user ,APPROVE);
        map.put("DEPARTMENT_APPROVE", approveCount);
        
        Integer rejectCount = countRepository.findByStatusAndLoginUserDepartment(user ,REJECT);
        map.put("DEPARTMENT_REJECT", rejectCount);
        
        Integer canselCount = countRepository.findByStatusAndLoginUserDepartment(user ,CANSEL);
        map.put("DEPARTMENT_CANSEL", canselCount);
        
        Integer assignCount = countRepository.findByStatusAndLoginUserDepartment(user ,ASSIGN);
        map.put("DEPARTMENT_ASSIGN", assignCount);
        
        Integer finishCount = countRepository.findByStatusAndLoginUserDepartment(user ,FINISH);
        map.put("DEPARTMENT_FINISH", finishCount);
        
        Integer completedCount = countRepository.findByStatusAndLoginUserDepartment(user ,COMPLETED);
        map.put("DEPARTMENT_COMPLETED", completedCount);

        Integer unconfirmCount = countRepository.findByStatusAndLoginUserDepartment(user ,UNCONFIRM);
        map.put("DEPARTMENT_UNCONFIRM", unconfirmCount);
        
        return map;
    }

    public HashMap<String, Integer> getAllWorkersCount(int user) {
        
        HashMap<String, Integer> map = new HashMap<>();
        
        Integer newCount = countDetailRepository.findByStatusAndLoginUserDepartment(user ,WORKER_NEW);
        map.put("WORKER_NEW", newCount);
        
        Integer unApproveCount = countDetailRepository.findByStatusAndLoginUserDepartment(user ,WORKER_ONGOING);
        map.put("WORKER_ONGOING", unApproveCount);
        
        Integer approveCount = countDetailRepository.findByStatusAndLoginUserDepartment(user ,WORKER_FINISH);
        map.put("WORKER_FINISH", approveCount);
        
        return map;
    }
}
