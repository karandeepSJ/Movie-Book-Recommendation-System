import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from "axios";

class Star extends Component{
	constructor() {
		super();
	    this.state = {
	    	editable: true,
	    	currentRating: 0
	    };
	    this.changeRating = this.changeRating.bind(this);
	}
	componentDidMount() {
		const user_id = JSON.parse(localStorage.getItem("user")).userId;
		const path = window.location.pathname.split('/');
		if(path[1]==="movie")
			var api_url = `http://localhost:5050/api/u/user/movieRating?userId=${user_id}&movieId=${path[2]}`
		else
			var api_url = `http://localhost:5050/api/u/user/bookRating?userId=${user_id}&bookId=${path[2]}`
		axios.get(api_url)
		.then (response => {
			if(response.data)
				this.setState({currentRating: response.data.rating, editable: false})
			else
				this.setState({currentRating: 0, editable: true})
		})
		.catch(err => {
			console.log(err);
		})	
	}

	changeRating(newRating, name) {
		this.setState({
			currentRating: newRating,
		});
		const user_id = JSON.parse(localStorage.getItem("user")).userId;
		const path = window.location.pathname.split('/');
		if(path[1]==="movie")
			var api_url = `http://localhost:5050/api/u/rate/movie?userId=${user_id}&movieId=${path[2]}&rating=${newRating}`
		else
			var api_url = `http://localhost:5050/api/u/rate/book?userId=${user_id}&bookId=${path[2]}&rating=${newRating}`
		axios.get(api_url)
		.then (response => {
			window.location.reload()
		})
		.catch(err => {
			console.log(err);
		})
	}

	render() {
	  if(!localStorage.getItem("user"))
	  	return ("")
    if (!this.state.editable)
      return (
        <StarRatings
          rating={this.state.currentRating}
          starRatedColor="yellow"
          numberOfStars={5}
          name='rating'
          starDimension="30px"
          starSpacing="2px"
        />
      );
    else
    	return (
    		<StarRatings
          rating={this.state.currentRating}
          starRatedColor="yellow"
          starHoverColor="yellow"
          numberOfStars={5}
          name='rating'
          starDimension="30px"
          starSpacing="2px"
          changeRating={this.changeRating}
        />
    	);
    }
}

export default Star;

