import React, { Component } from 'react';
import axios from 'axios';
import Results from '../Result'

class SearchPage extends Component {
  	constructor() {
		
		super();
	    this.state = {
	    	res:[],
	    	loading:true
	    };
	}
	
	
	componentDidMount(){
		const query = this.props.match.params.query
		console.log(query)
		axios.get('http://localhost:5050/api/m/movies/search?query=' + query)
		.then (response => {
			this.setState({res:response.data})
			this.setState({loading:false})
		})
		.catch(err => {
			console.log(err);
		})
	}

	
  render() {
  	if(this.state.loading) {
          return 'Loading...'
      } 
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