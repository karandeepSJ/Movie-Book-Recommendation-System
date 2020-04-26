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

public interface MovieRepo extends MongoRepository<Movies, String>{
    public Movies findByMovieId(Long movieId);

    @Query("{'$text' : {'$search' : ?0}}")
    public List<Movies> findMatchingMovies(String query, Sort sort);

    @Query("{'$text' : {'$search' : ?0}, 'genres' : {'$in' : [?1]}}")
    public List<Movies> findMatchingMoviesInGenre(String query, String genre, Sort sort);
}