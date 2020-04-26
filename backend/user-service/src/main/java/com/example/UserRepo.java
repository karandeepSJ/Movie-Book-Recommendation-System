/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepo extends MongoRepository<Users, String>{
    public Users findUserById(Long userId);

    @Query("{'username' : ?0 , 'hashedpassword' : ?1}")
    public Users findUsersByUsernameAndHashedpassword(String username, String password);
}