package com.example;

import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class GetRecommendations {

    @Autowired
    private MongoTemplate mongoTemplate;

    public DBObject getDetailsForRecommendations(String[] bookIds, Long[] movieIds){
        BasicDBObject result = new BasicDBObject();
        result.append("movies", getDetailsForMovies(movieIds));
        result.append("books", getDetailsForBooks(bookIds));
        return result;
    }

    public List<DBObject> getDetailsForMovies(Long[] movieIds){
        BasicDBObject baseQuery = new BasicDBObject();
        BasicDBObject inQuery = new BasicDBObject();
        BasicDBObject projection = new BasicDBObject();
        inQuery.append("$in", movieIds);
        baseQuery.append("movieId", inQuery);
        projection.append("_id", 0);
        projection.append("title", 1);
        projection.append("poster", 1);
        projection.append("backdrop", 1);
        projection.append("rating", 1);
        projection.append("movieId", 1);
        return mongoTemplate.getCollection("movies").find(baseQuery, projection).toArray();
    }

    public List<DBObject> getDetailsForBooks(String[] bookIds){
        BasicDBObject baseQuery = new BasicDBObject();
        BasicDBObject inQuery = new BasicDBObject();
        BasicDBObject projection = new BasicDBObject();
        inQuery.append("$in", bookIds);
        baseQuery.append("bookId", inQuery);
        projection.append("_id", 0);
        projection.append("title", 1);
        projection.append("poster", 1);
        projection.append("rating", 1);
        projection.append("bookId", 1);
        return mongoTemplate.getCollection("books").find(baseQuery, projection).toArray();
    }
}