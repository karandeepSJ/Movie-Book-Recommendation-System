package com.example;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class RatingUtils {

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

    public DBObject getMovieRating(Long movieId){
        BasicDBObject movieQuery = new BasicDBObject();
        BasicDBObject movieProjection = new BasicDBObject();
        movieQuery.append("movieId", movieId);
        movieProjection.append("_id", 0);
        movieProjection.append("movieId", 1);
        movieProjection.append("rating", 1);
        movieProjection.append("ratingSum", 1);
        movieProjection.append("ratingCount", 1);
        return mongoTemplate.getCollection("movies").findOne(movieQuery, movieProjection);
    }

    public void updateMovieRating(Long movieId, Double newUserRating, DBObject prevRatingObj){
        DBObject movie = getMovieRating(movieId);
        RatingDTO movieRatingObj = new RatingDTO(movie);
        movieRatingObj.updateRating(prevRatingObj, newUserRating);
        updateMovieCollection(movieId, movieRatingObj);
    }

    public void updateMovieCollection(Long movieId, RatingDTO movieRatingObj) {
        BasicDBObject movieQuery = new BasicDBObject();
        BasicDBObject updateFields = new BasicDBObject();
        BasicDBObject setQuery = new BasicDBObject();
        movieQuery.append("movieId", movieId);
        updateFields.append("ratingSum", movieRatingObj.ratingSum);
        updateFields.append("ratingCount", movieRatingObj.ratingCount);
        updateFields.append("rating", movieRatingObj.rating);
        setQuery.append("$set", updateFields);
        mongoTemplate.getCollection("movies").update(movieQuery, setQuery);
    }

    public void updateUserRatingForMovie(Long movieId, Long userId, DBObject prevRatingObj, Double newUserRating){
        BasicDBObject query = new BasicDBObject();
        BasicDBObject updateFields = new BasicDBObject();
        BasicDBObject setQuery = new BasicDBObject();
        query.append("userId", userId);
        query.append("movieId", movieId);
        if(prevRatingObj == null){
            query.append("rating", newUserRating);
            mongoTemplate.getCollection("movieRatings").insert(query);
        }
        else{
            updateFields.append("rating", newUserRating);
            setQuery.append("$set", updateFields);
            mongoTemplate.getCollection("movieRatings").update(query, setQuery);
        }
    }
}