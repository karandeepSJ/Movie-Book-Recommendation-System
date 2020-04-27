/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;

/**
 *
 * @author alohamora
 */
@Document
public class Books {
    
    @Id
    public String id; 

    public String bookId;
    
    @TextIndexed
    public String title;

    public String author;

    public String releaseYear;

    public String publisher;

    public String poster;

    public Float rating;

    public Float ratingSum;

    public Long ratingCount;

    public Long num_pages;

    public String description;

    @TextScore
    public Float score;
}
