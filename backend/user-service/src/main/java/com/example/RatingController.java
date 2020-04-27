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

    @Autowired
    private RatingUtils ratingUtils;

    @RequestMapping(method = RequestMethod.GET, value = "/movie")
    public DBObject updateMovieRating(@RequestParam(value = "userId") Long userId,
                              @RequestParam(value = "movieId") Long movieId,
                              @RequestParam(value = "rating") Double rating) {
        DBObject prevRatingObj = ratingUtils.getMovieRatingForUser(userId, movieId);
        ratingUtils.updateMovieRating(movieId, rating, prevRatingObj);
        ratingUtils.updateUserRatingForMovie(movieId, userId, prevRatingObj, rating);
        return ratingUtils.getMovieRating(movieId);
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