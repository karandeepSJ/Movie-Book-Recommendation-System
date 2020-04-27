import React, { Component } from 'react';
import axios from 'axios';
import Results from '../Result'

class SearchPage extends Component {
  	constructor() {
		
		super();
	    this.state = {
	    	res:[],
	    };
	}
	
	
	componentDidMount(){
		const query = this.props.match.params.query
		console.log(query)
		axios.get('http://localhost:5050/api/m/movies/search?query=' + query)
		.then (response => {
			console.log(response.data);
			this.setState({res:response.data})
			console.log(this.state.res)
		})
		.catch(err => {
			console.log(err);
		})
		
	}
	
  render() {
  	return(
  		<div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Results results={this.state.res}  />

      </main>
    </div>
  	)
  }
	
}
export default SearchPage;