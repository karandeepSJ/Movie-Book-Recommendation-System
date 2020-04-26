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
/**
 *
 * @author alohamora
 */

public interface BookRepo extends MongoRepository<Books, String>{
    public Books findByBookId(String bookId);

    @Query("{'$text' : {'$search' : ?0}}")
    public List<Books> findMatchingBooks(String query, Sort sort);
}