import React, { Component } from 'react';
import axios from 'axios';
import BookResults from '../BookResults'
import BookSideNav from '../BookSideBar'
import StickyBox from "react-sticky-box/dist/esnext";


class BookSearchPage extends Component {
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
		axios.get('http://localhost:5050/api/b/books/search?query=' + query)
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
	      <main>
	      	<BookSideNav />
	        <BookResults results={this.state.res}/>
	      </main>
    	</div>
  	)
  }
	
}
export default BookSearchPage;