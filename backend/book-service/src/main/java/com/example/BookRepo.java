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

    public List<Books> findByGenres(String genre);

    @Query("{'$text' : {'$search' : ?0}}")
    public List<Books> findMatchingBooks(String query, Sort sort);

    @Query("{'$text' : {'$search' : ?0}, 'genres' : {'$in' : [?1]}}")
    public List<Books> findMatchingBooksInGenre(String query, String genre, Sort sort);
}