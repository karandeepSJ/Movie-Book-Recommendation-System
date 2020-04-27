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
@RequestMapping("/rate")
public class RatingController {

    @Autowired
    private MovieRatingUtils movieRatingUtils;

    @Autowired
    private BookRatingUtils bookRatingUtils;

    @RequestMapping(method = RequestMethod.GET, value = "/movie")
    public DBObject updateMovieRating(@RequestParam(value = "userId") Long userId,
                              @RequestParam(value = "movieId") Long movieId,
                              @RequestParam(value = "rating") Double rating) {
        DBObject prevRatingObj = movieRatingUtils.getRatingForUser(userId, movieId);
        movieRatingUtils.updateRating(movieId, rating, prevRatingObj);
        movieRatingUtils.updateUserRating(movieId, userId, prevRatingObj, rating);
        return movieRatingUtils.getRating(movieId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/book")
    public DBObject updateBookRating(@RequestParam(value = "userId") Long userId,
                              @RequestParam(value = "bookId") String bookId,
                              @RequestParam(value = "rating") Double rating) {
        DBObject prevRatingObj = bookRatingUtils.getRatingForUser(userId, bookId);
        bookRatingUtils.updateRating(bookId, rating, prevRatingObj);
        bookRatingUtils.updateUserRating(bookId, userId, prevRatingObj, rating);
        return bookRatingUtils.getRating(bookId);
    }
}