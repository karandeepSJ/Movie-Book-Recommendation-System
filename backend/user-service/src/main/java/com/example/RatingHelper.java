package com.example;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class RatingHelper {

    @Autowired
    private MongoTemplate mongoTemplate;

    public DBObject getMovieRatingForUser(Long userId, Long movieId){
        BasicDBObject query = new BasicDBObject();
        BasicDBObject projection = new BasicDBObject();
        query.append("userId", userId);
        query.append("movieId", movieId);
        projection.append("_id", 0);
        return mongoTemplate.getCollection("movieRatings").findOne(query, projection);
    }

    public DBObject getBookRatingForUser(Long userId, String bookId){
        BasicDBObject query = new BasicDBObject();
        BasicDBObject projection = new BasicDBObject();
        query.append("userId", userId);
        query.append("bookId", bookId);
        projection.append("_id", 0);
        return mongoTemplate.getCollection("bookRatings").findOne(query, projection);
    }
}