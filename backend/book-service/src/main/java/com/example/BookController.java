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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author alohamora
 */
@CrossOrigin
@RestController
@RequestMapping("/books")
public class BookController {
    
    @Autowired
    private BookRepo bookRepo;
    
    @RequestMapping(method = RequestMethod.GET, value = "/recommendations")
    public Collection<Books> getRecommendedBooks(){
        PageRequest pageRequest = new PageRequest(0, 10);
        return this.bookRepo.findAll(pageRequest)
                .getContent()
                .stream()
                .collect(Collectors.toList());
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/details/{bookId}")
    public Books getMovie(@PathVariable(value = "bookId") String bookId){
        return this.bookRepo.findByBookId(bookId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search")
    public List<Books> searchMovies(@RequestParam(value = "query") String query){
        Sort sort = new Sort(Sort.Direction.DESC, "score");
        return this.bookRepo.findMatchingBooks(query, sort);
    }
}
