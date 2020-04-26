/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;
import

/**
 *
 * @author dm
 */

@Document
public class Users {
    
    @Id
    @GeneratedValue
    private Long id;

    @Email
    private String email;

    private String hashedpassword;
    private String username;

    List<Pair<Movies, int>> ratings;

    public Users() {
    }

    public Long getId() {
        return Id;
    }

    public String getUsername() {
        return username;
    }

    public void setName(String username) {
        this.username = username;
    }

    public List<Pair<Movies, int>> getRatings() {
        return ratings;
    }

    public void setRatings(List<Pair<Movies, int>> ratings) {
        this.ratings = ratings;
    }
}

public class Pair<L,R> {
    private L l;
    private R r;
    public Pair(L l, R r){
        this.l = l;
        this.r = r;
    }
    public L getL(){ return l; }
    public R getR(){ return r; }
    public void setL(L l){ this.l = l; }
    public void setR(R r){ this.r = r; }
}
