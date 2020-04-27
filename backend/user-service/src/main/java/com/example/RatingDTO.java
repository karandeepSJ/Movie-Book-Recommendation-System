package com.example;

import com.mongodb.DBObject;

public class RatingDTO {

    public Double rating;
    public Double ratingSum;
    public Integer ratingCount;

    public RatingDTO(DBObject obj){
        ratingCount = (Integer) obj.get("ratingCount");
        try{
            ratingSum = (Double) obj.get("ratingSum");
        } catch(ClassCastException e){
            ratingSum = Double.valueOf((Integer) obj.get("ratingSum"));
        }
        try{
            rating = (Double) obj.get("rating");
        } catch(ClassCastException e){
            rating = Double.valueOf((Integer) obj.get("rating"));
        }
    }

    public void updateRating(DBObject prevRatingObj, Double newUserRating){
        System.out.println(prevRatingObj);
        System.out.println(newUserRating);
        if(prevRatingObj == null){
            ratingSum += newUserRating;
            ratingCount++;
            rating = (Double)ratingSum / ratingCount;
        }
        else{
            ratingSum += (newUserRating - (Double) prevRatingObj.get("rating"));
            rating = (Double)ratingSum / ratingCount;
        }
    }
}