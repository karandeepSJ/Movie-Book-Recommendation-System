package com.example;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class BookRatingUtils {

    @Autowired
    private MongoTemplate mongoTemplate;

    public DBObject getRatingForUser(Long userId, String bookId){
        BasicDBObject query = new BasicDBObject();
        BasicDBObject projection = new BasicDBObject();
        query.append("userId", userId);
        query.append("bookId", bookId);
        projection.append("_id", 0);
        return mongoTemplate.getCollection("bookRatings").findOne(query, projection);
    }

    public DBObject getRating(String bookId){
        BasicDBObject bookQuery = new BasicDBObject();
        BasicDBObject bookProjection = new BasicDBObject();
        bookQuery.append("bookId", bookId);
        bookProjection.append("_id", 0);
        bookProjection.append("bookId", 1);
        bookProjection.append("rating", 1);
        bookProjection.append("ratingSum", 1);
        bookProjection.append("ratingCount", 1);
        return mongoTemplate.getCollection("books").findOne(bookQuery, bookProjection);
    }

    public void updateRating(String bookId, Double newUserRating, DBObject prevRatingObj){
        DBObject book = getRating(bookId);
        RatingDTO bookRatingObj = new RatingDTO(book);
        bookRatingObj.updateRating(prevRatingObj, newUserRating);
        updateCollection(bookId, bookRatingObj);
    }

    public void updateCollection(String bookId, RatingDTO bookRatingObj) {
        BasicDBObject bookQuery = new BasicDBObject();
        BasicDBObject updateFields = new BasicDBObject();
        BasicDBObject setQuery = new BasicDBObject();
        bookQuery.append("bookId", bookId);
        updateFields.append("ratingSum", bookRatingObj.ratingSum);
        updateFields.append("ratingCount", bookRatingObj.ratingCount);
        updateFields.append("rating", bookRatingObj.rating);
        setQuery.append("$set", updateFields);
        mongoTemplate.getCollection("books").update(bookQuery, setQuery);
    }

    public void updateUserRating(String bookId, Long userId, DBObject prevRatingObj, Double newUserRating){
        BasicDBObject query = new BasicDBObject();
        BasicDBObject updateFields = new BasicDBObject();
        BasicDBObject setQuery = new BasicDBObject();
        query.append("userId", userId);
        query.append("bookId", bookId);
        if(prevRatingObj == null){
            query.append("rating", newUserRating);
            mongoTemplate.getCollection("bookRatings").insert(query);
        }
        else{
            updateFields.append("rating", newUserRating);
            setQuery.append("$set", updateFields);
            mongoTemplate.getCollection("bookRatings").update(query, setQuery);
        }
    }
}