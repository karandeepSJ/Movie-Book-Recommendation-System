/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserRepo userRepo;

    @RequestMapping(method = RequestMethod.GET, value = "/signup")
    public boolean userSignup(@RequestParam(value = "username") String username,
                          @RequestParams(value = "password") String password,
                          @RequestParams(value = "email") String email) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedpassword = passwordEncoder.encode(password);
        List<Pair<Movies, int>> ratings = new List<Pair<Movies, int>>;
        Users user = new Users(username, hashedpassword, email, ratings);
        this.userRepo.save(user);
        return true;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/login")
    public boolean userLogin(@RequestParam(value = "username") String username,
                             @RequestParams(value = "password") String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedpassword = passwordEncoder.encode(password);
        if (this.userRepo.findUsersByUsernameAndHashedpassword(username, hashedpassword) == null) {
            return false;
        }
        return true;
    }
}
