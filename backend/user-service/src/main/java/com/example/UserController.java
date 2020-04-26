/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
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
    private MongoTemplate mongoTemplate;

    @RequestMapping(method = RequestMethod.POST, value = "/login")
    public ResponseEntity<Map<String, String>> userLogin(@RequestParam(value = "email") String email,
                @RequestParam(value = "password") String password) {
        Users user = this.userRepo.findByEmail(email);
        if(user == null || (!encryptThisString(password).equals(user.password)))
            return new ResponseEntity<Map<String,String>>(HttpStatus.FORBIDDEN);
        return new ResponseEntity<Map<String,String>>(user.toMap(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/movieRating")
    public DBObject getMovieRating(@RequestParam(value = "userId") Long userId,
                @RequestParam(value = "movieId") Long movieId) {
        BasicDBObject query = new BasicDBObject();
        query.append("userId", userId);
        query.append("movieId", movieId);
        return mongoTemplate.getCollection("movieRatings").findOne(query);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/bookRating")
    public DBObject getbookRating(@RequestParam(value = "userId") Long userId,
                @RequestParam(value = "bookId") String bookId) {
        BasicDBObject query = new BasicDBObject();
        query.append("userId", userId);
        query.append("bookId", bookId);
        return mongoTemplate.getCollection("bookRatings").findOne(query);
    }

    public static String encryptThisString(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512"); 
            byte[] messageDigest = md.digest(input.getBytes()); 
            BigInteger no = new BigInteger(1, messageDigest); 
            String hashtext = no.toString(16); 
            while (hashtext.length() < 32) { 
                hashtext = "0" + hashtext; 
            }
            return hashtext; 
        }
        catch (NoSuchAlgorithmException e) { 
            throw new RuntimeException(e); 
        }
    }
}
