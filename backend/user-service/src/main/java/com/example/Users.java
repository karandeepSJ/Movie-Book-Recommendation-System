/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author dm
 */

@Document
public class Users {
    
    @Id
    public String id;

    public Long userId;

    public String name;

    public String email;

    public String password;

    public Long bookDbId;

    public Long movieDbId;

    public Map<String, String> toMap(){
        Map<String, String> mp = new HashMap<String, String>();
        mp.put("userId", userId.toString()); 
        mp.put("name", name); 
        mp.put("email", email); 
        mp.put("password", password);
        if(bookDbId != null)    mp.put("bookDbId", bookDbId.toString());
        else    mp.put("bookDbId", null);
        if(movieDbId != null)    mp.put("movieDbId", movieDbId.toString());
        else    mp.put("movieDbId", null); 
        return mp;
    }
}
