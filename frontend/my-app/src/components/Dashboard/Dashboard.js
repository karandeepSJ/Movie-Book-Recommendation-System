import React, { Component } from 'react';

class Dashboard extends Component {
	constructor() {
		super();
	    this.state = {
	    	loggedIn: false,
	    };
	}

	componentDidMount() {
		if (localStorage.getItem("user"))
		{
			const user = JSON.parse(localStorage.getItem("user"));
			this.setState({movieDBId: user.movieDBId, bookDBId: user.bookDBId, loggedIn:true})
		}
		else
		{
			this.setState({loggedIn:false})
		}
		// const movieId = this.props.match.params.id
		// axios.get(`http://localhost:5050/api/m/movies/details/${movieId}`)
		// .then (response => {
		// 	if(!response.data)
		// 	{
		// 		this.props.history.push('/error')
		// 	}
		// 	else	
		// 	{
		// 		this.setState(response.data);
		// 		this.setState({validMovie: true});
		// 	}
		// })
		// .catch(err => {
		// 	console.log(err);
		// })
	}

	renderLoggedIn() {
		return (
			<div>
  			<h4 className="pt-5 h4-responsive">Recommended Movies:</h4>
  			<h4 className="pt-5 h4-responsive">Recommended Books:</h4>
			</div>
  	) 
	}

	renderLoggedOut() {
		return (
			<div className="d-flex justify-content-center align-items-center">
  			<h4 className="pt-5 h4-responsive">Please Login to get recommendations</h4>
			</div>
  	) 
	}

  render() {
  	var loggedIn = this.state.loggedIn; 
  	return (
  		<div className="container">
  		{loggedIn && this.renderLoggedIn()}
  		{!loggedIn && this.renderLoggedOut()}
  		</div>
  	)  	
  }
}

export default Dashboard;