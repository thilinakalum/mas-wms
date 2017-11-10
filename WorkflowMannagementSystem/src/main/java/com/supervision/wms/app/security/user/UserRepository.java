/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.security.user;

import com.supervision.wms.app.security.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Thilina Kalum
 */
public interface UserRepository extends JpaRepository<User, Integer>{

    public User findByUserNameAndPassword(String userName, String password);
    
}
