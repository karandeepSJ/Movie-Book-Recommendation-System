/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.util.Map;
import com.mongodb.DBObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MovieRatingUtils movieRatingUtils;

    @Autowired
    private BookRatingUtils bookRatingUtils;

    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public ResponseEntity<Map<String, String>> userLogin(@RequestParam(value = "email") String email,
                @RequestParam(value = "password") String password) {
        Users user = this.userRepo.findByEmail(email);
        if(user == null || (!PasswordHelper.encryptPassword(password).equals(user.password)))
            return new ResponseEntity<Map<String,String>>(HttpStatus.FORBIDDEN);
        return new ResponseEntity<Map<String,String>>(user.toMap(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/movieRating")
    public DBObject getMovieRating(@RequestParam(value = "userId") Long userId,
                @RequestParam(value = "movieId") Long movieId) {
        return movieRatingUtils.getRatingForUser(userId, movieId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/bookRating")
    public DBObject getbookRating(@RequestParam(value = "userId") Long userId,
                @RequestParam(value = "bookId") String bookId) {
        return bookRatingUtils.getRatingForUser(userId, bookId);
    }
}
