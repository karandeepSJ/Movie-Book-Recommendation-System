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
    public String id; 

    public Long movieId;
    
    @TextIndexed
    public String title;

    public String releaseYear;

    public ArrayList<String> genres;

    public String imdbId;

    public String tmdbId;

    public Long ratingCount;

    public Long ratingSum;

    public Float rating;

    public String originalTitle;

    public String tagline;

    public String overview;

    public String homepage;

    public String poster;

    public String releaseDate;

    public Long runtime;

    public Long revenue;

    public String backdrop;

    public ArrayList<Cast> cast;

    @TextScore
    public Float score;
}
