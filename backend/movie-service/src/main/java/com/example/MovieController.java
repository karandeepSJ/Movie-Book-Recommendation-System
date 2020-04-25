/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author alohamora
 */
@RestController
@RequestMapping("/movies")
public class MovieController {
    
    @Autowired
    private MovieRepo movieRepo;

    @Autowired
    private MongoTemplate mongoTemplate;
    
    @RequestMapping(method = RequestMethod.GET, value = "/recommendations")
    public Collection<Movies> getAllMovies(){
        PageRequest pageRequest = new PageRequest(0, 10);
        return this.movieRepo.findAll(pageRequest)
                .getContent()
                .stream()
                .collect(Collectors.toList());
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/details/{movieId}")
    public Movies getMovie(@PathVariable(value = "movieId") Long movieId){
        return this.movieRepo.findByMovieId(movieId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/genres")
    public List<String> getMovie(){
        @SuppressWarnings("unchecked")
        List<String> distinctGenres = this.mongoTemplate.getCollection("movies").distinct("genres");
        return distinctGenres;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search")
    public List<Movies> searchMovies(@RequestParam(value = "query") String query, @RequestParam(value = "genre", required = false) String genre){
        Sort sort = new Sort(Sort.Direction.DESC, "score");
        if(genre == null)   return this.movieRepo.findMatchingMovies(query, sort);
        return this.movieRepo.findMatchingMoviesInGenre(query, genre, sort);
    }
}
