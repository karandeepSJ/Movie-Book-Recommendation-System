package com.example;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/rate")
public class RatingController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @RequestMapping(method = RequestMethod.GET, value = "/movie")
    public DBObject updateMovieRating(@RequestParam(value = "userId") Long userId,
                              @RequestParam(value = "movieId") Long movieId,
                              @RequestParam(value = "rating") Double rating) {
        BasicDBObject query = new BasicDBObject();
        BasicDBObject projection = new BasicDBObject();
        projection.append("_id", 0);
        query.append("userId", userId);
        query.append("movieId", movieId);
        DBObject userRating = mongoTemplate.getCollection("movieRatings").findOne(query, projection);
        BasicDBObject movieQuery = new BasicDBObject();
        movieQuery.append("movieId", movieId);
        BasicDBObject movieProjection = new BasicDBObject();
        movieProjection.append("_id", 0);
        movieProjection.append("movieId", 1);
        movieProjection.append("rating", 1);
        movieProjection.append("ratingSum", 1);
        movieProjection.append("ratingCount", 1);
        DBObject movie = mongoTemplate.getCollection("movies").findOne(movieQuery, movieProjection);
        Double ratingSum;
        Double movieRating;
        try{
            ratingSum = (Double) movie.get("ratingSum");
        } catch(ClassCastException e){
            ratingSum = Double.valueOf((Integer) movie.get("ratingSum"));
        }
        try{
            movieRating = (Double) movie.get("rating");
        } catch(ClassCastException e){
            movieRating = Double.valueOf((Integer) movie.get("rating"));
        }
        Integer ratingCount = (Integer) movie.get("ratingCount");
        if(userRating == null){
            ratingSum += rating;
            ratingCount++;
            movieRating = (Double)ratingSum / ratingCount;
            query.append("rating", rating);
            mongoTemplate.getCollection("movieRatings").insert(query);
        }
        else{
            ratingSum += (rating - (Double) userRating.get("rating"));
            movieRating = (Double)ratingSum / ratingCount;
            BasicDBObject updateFields = new BasicDBObject();
            updateFields.append("rating", rating);
            BasicDBObject setQuery = new BasicDBObject();
            setQuery.append("$set", updateFields);
            mongoTemplate.getCollection("movieRatings").update(query, setQuery);
        }
        BasicDBObject updateFields = new BasicDBObject();
        updateFields.append("ratingSum", ratingSum);
        updateFields.append("ratingCount", ratingCount);
        updateFields.append("rating", movieRating);
        BasicDBObject setQuery = new BasicDBObject();
        setQuery.append("$set", updateFields);
        mongoTemplate.getCollection("movies").update(movieQuery, setQuery);
        return mongoTemplate.getCollection("movies").findOne(movieQuery, movieProjection);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/book")
    public DBObject updateBookRating(@RequestParam(value = "userId") Long userId,
                              @RequestParam(value = "bookId") String bookId,
                              @RequestParam(value = "rating") Double rating) {
        BasicDBObject query = new BasicDBObject();
        BasicDBObject projection = new BasicDBObject();
        projection.append("_id", 0);
        query.append("userId", userId);
        query.append("bookId", bookId);
        DBObject userRating = mongoTemplate.getCollection("bookRatings").findOne(query, projection);
        BasicDBObject bookQuery = new BasicDBObject();
        bookQuery.append("bookId", bookId);
        BasicDBObject bookProjection = new BasicDBObject();
        bookProjection.append("_id", 0);
        bookProjection.append("bookId", 1);
        bookProjection.append("rating", 1);
        bookProjection.append("ratingSum", 1);
        bookProjection.append("ratingCount", 1);
        DBObject book = mongoTemplate.getCollection("books").findOne(bookQuery, bookProjection);
        Double ratingSum;
        Double bookRating;
        try{
            ratingSum = (Double) book.get("ratingSum");
        } catch(ClassCastException e){
            ratingSum = Double.valueOf((Integer) book.get("ratingSum"));
        }
        try{
            bookRating = (Double) book.get("rating");
        } catch(ClassCastException e){
            bookRating = Double.valueOf((Integer) book.get("rating"));
        }
        Integer ratingCount = (Integer) book.get("ratingCount");
        if(userRating == null){
            ratingSum += rating;
            ratingCount++;
            bookRating = (Double)ratingSum / ratingCount;
            query.append("rating", rating);
            mongoTemplate.getCollection("bookRatings").insert(query);
        }
        else{
            ratingSum += (rating - (Double) userRating.get("rating"));
            bookRating = (Double)ratingSum / ratingCount;
            BasicDBObject updateFields = new BasicDBObject();
            updateFields.append("rating", rating);
            BasicDBObject setQuery = new BasicDBObject();
            setQuery.append("$set", updateFields);
            mongoTemplate.getCollection("bookRatings").update(query, setQuery);
        }
        BasicDBObject updateFields = new BasicDBObject();
        updateFields.append("ratingSum", ratingSum);
        updateFields.append("ratingCount", ratingCount);
        updateFields.append("rating", bookRating);
        BasicDBObject setQuery = new BasicDBObject();
        setQuery.append("$set", updateFields);
        mongoTemplate.getCollection("books").update(bookQuery, setQuery);
        return mongoTemplate.getCollection("books").findOne(bookQuery, bookProjection);
    }
}