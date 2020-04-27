import React, { Component } from 'react';
import axios from 'axios';
import BookResults from './BookResults'
import BookSideNav from './BookSideBar'


class BookGenrePage extends Component {
  	constructor() {
		
		super();
	    this.state = {
	    	res:[],
	    	loading:true
	    };
	}
	
	componentDidMount(){
		const query = this.props.match.params.genre
		console.log(query)
		axios.get('http://localhost:5050/api/b/books/genre/' + query)
		.then (response => {
			this.setState({res:response.data})
			this.setState({loading:false})
			console.log(this.state.res)
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
	      <main>
	      	<BookSideNav />
	        <BookResults results={this.state.res}/>
	      </main>
    	</div>
  	)
  }
	
}
export default BookGenrePage;