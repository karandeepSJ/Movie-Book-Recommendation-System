import React from 'react';
import StarRatings from 'react-star-ratings';

function Star({newRating}){
      return (
        <StarRatings
          rating={newRating}
          starRatedColor="yellow"
          numberOfStars={5}
          name='rating'
        />
      );
}

export default Star;

