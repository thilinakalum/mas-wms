/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.security.user;

import com.supervision.wms.app.security.user.model.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Thilina Kalum
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer indexNo) {
        try {
            userRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this User because there are details in other transaction");
        }
    }

    public User findByName(String userName) {
        return userRepository.findByUserName(userName);
    }

}
