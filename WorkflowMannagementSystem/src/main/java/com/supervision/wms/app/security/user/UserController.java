/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.wms.app.security.user;

import com.supervision.wms.app.security.user.model.User;
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
@RequestMapping("/api/wms/master/user")
public class UserController {

    @Autowired
    private UserService userService;

//    @Autowired
//    private UserRepository userRepository;

    @RequestMapping(value = "/find-all-user", method = RequestMethod.GET)
    public List<User> getAllDepartment() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/save-user", method = RequestMethod.POST)
    public User saveDepartment(@RequestBody User user) {
        user.setBranch(1);
        return userService.saveDepartment(user);
    }

//    @RequestMapping(path = "/user/login", method = RequestMethod.POST)
//    public User getUser(@RequestBody User user) {
//        return userRepository.findByUserNameAndPassword(user.getUserName(), user.getPassword());
//    }
}
