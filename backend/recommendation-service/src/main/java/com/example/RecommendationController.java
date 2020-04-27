package com.example;

import com.mongodb.DBObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/recommend")
public class RecommendationController {
    
    @Autowired
    GetRecommendations getRecommendations;

    @RequestMapping(method = RequestMethod.GET)
    public DBObject getRecommendedMovies(@RequestParam(value = "bookDbId") String bookDbId, @RequestParam(value = "movieDbId") String movieDbId){
        ModelRunner model = new ModelRunner();
        model.runCommand(bookDbId, movieDbId);
        return getRecommendations.getDetailsForRecommendations(model.bookIds, model.movieIds);
    }
}