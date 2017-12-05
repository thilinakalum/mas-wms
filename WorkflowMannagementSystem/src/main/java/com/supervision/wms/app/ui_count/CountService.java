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
    
    private final static String UNCOMFIRM="UNCOMFIRM";
    private final static String COMPLETED="COMPLETED";
    
    private final static String WORKERNEW="WORKERNEW";
    private final static String WORKERONGOING="WORKERONGOING";
    private final static String WORKERFINISH="WORKERFINISH";
    
    @Autowired
    private CountRepository countRepository;
    
    public HashMap<String, Integer> getAllCount() {
        
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

        Integer unconfirmCount = countRepository.findByStatus(UNCOMFIRM);
        map.put("UNCOMFIRM", unconfirmCount);
        
        Integer workerNewCount = countRepository.findByStatus(WORKERNEW);
        map.put("WORKERNEW", workerNewCount);
        
        Integer workerOngoingCount = countRepository.findByStatus(WORKERONGOING);
        map.put("WORKERONGOING", workerOngoingCount);
        
        Integer workerFinishCount = countRepository.findByStatus(WORKERFINISH);
        map.put("WORKERFINISH", workerFinishCount);
        
        return map;
    }
}
