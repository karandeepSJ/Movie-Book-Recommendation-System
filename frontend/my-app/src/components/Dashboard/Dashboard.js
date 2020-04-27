import React, { Component } from 'react';
import Recommendation from '../Recommendation/Recommendation'

class Dashboard extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	loggedIn: false,
	    	loading:true,
	    	movieDbId: null,
	    	bookDbId: null,
	    };
	}

	componentDidMount() {
		if (localStorage.getItem("user"))
		{
			const user = JSON.parse(localStorage.getItem("user"));
			this.setState({movieDbId: user.movieDbId, bookDbId: user.bookDbId, loggedIn:true, loading:false})

		}
		else
		{
			this.setState({loggedIn:false,loading:false})
		}
		
	}

	renderLoggedIn() {
		var user = null
		if (localStorage.getItem("user"))
		{
		 	user = JSON.parse(localStorage.getItem("user"));

		}
		return (
			<div>
  			<h4 className="pt-5 h4-responsive">Recommended Movies:</h4>
  			<Recommendation movieDbId={user.movieDbId} bookDbId={user.bookDbId} />
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
  	if(this.state.loading) {
          return 'Loading...'
    } 
    
  	return (
  		<div className="container">
  		{loggedIn && this.renderLoggedIn()}
  		{!loggedIn && this.renderLoggedOut()}
  		</div>
  	)  	
  }
}

export default Dashboard;