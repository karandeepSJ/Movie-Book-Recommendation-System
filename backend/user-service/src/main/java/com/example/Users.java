/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

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
}
