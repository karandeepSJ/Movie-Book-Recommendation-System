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

/**
 *
 * @author alohamora
 */
@Document
public class Movies {
    
    @Id
    private String id; 
    
    private Long movieId;
    
    @TextIndexed
    private String title;

    private ArrayList<String> genres;

    private String poster;

    @TextScore
    private Float score;

    public Movies() {
    }
    
    public Movies(String name, Long movieId) {
        this.title = name;
        this.movieId = movieId;
    }

    public String getTitle(){
        return title;
    }

    public ArrayList<String> getGenres(){
        return genres;
    }

    public Long getMovieId(){
        return movieId;
    }

    public String getPoster(){
        return poster;
    }
}
