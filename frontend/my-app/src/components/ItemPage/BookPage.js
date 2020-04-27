import React, { Component } from 'react';
import axios from "axios";
import {
	MDBMask,
	MDBView,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCardText
} from "mdbreact";

const greenText = {
	color: "rgb(205,93,0)"
}

class BookPage extends Component {
	constructor() {
		super();
	    this.state = {
	    };
	}
	componentDidMount() {
		const bookId = this.props.match.params.isbn
		axios.get(`http://localhost:5050/api/b/books/details/${bookId}`)
		.then (response => {
			this.setState(response.data);
		})
		.catch(err => {
			console.log(err);
		})
	}

	render() {
	  	return (
	  		<MDBView>
		  		<div className = "d-flex justify-content-center"
		  		>
		  			<MDBCard style = {{
		  				width: "60rem",
		  			}} className="mt-5">
		  				<MDBRow style={{height:"100%"}} className="mx-1">
		  					<MDBCol size="5" style = {{
		  						backgroundImage: `url(${this.state.poster})`,
		  						backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover"
		  					}}>
		  					</MDBCol>
		  					<MDBCol size="7" className="mt-4" style={{color: "#0e0e0e"}}>
		  						<MDBCardBody>
		  							<h2 className="h1-responsive font-weight-bold" style={{textTransform: "uppercase"}}>
		  								{this.state.title}
		  							</h2>
			  						<div className="h4-responsive" style={greenText}>
			  							{this.state.author}
			  						</div>
			  						<div className="py-3">
		  								<span dangerouslySetInnerHTML={{__html: this.state.description}}/>
		  							</div>
		  							<MDBRow>
		  								<MDBCol size="6">
		  									Publisher:
			  								<div className="h4-responsive" style={greenText}>
			  								{this.state.publisher}
			  								</div>
		  								</MDBCol>
		  								<MDBCol size="6">
		  									Year of Release:
			  								<div className="h4-responsive" style={greenText}>
			  								{this.state.releaseYear}
			  								</div>
		  								</MDBCol>
		  							</MDBRow>
		  							<MDBRow>
		  								<MDBCol size="6">
		  									Pages:
			  								<div className="h4-responsive" style={greenText}>
			  								{this.state.num_pages}
			  								</div>
		  								</MDBCol>
		  								<MDBCol size="6">
		  									Rating:
			  								<div className="h4-responsive" style={greenText}>
			  								{this.state.rating && this.state.rating.toFixed(2)}/5
			  								</div>
		  								</MDBCol>
		  							</MDBRow>
		  						</MDBCardBody>
		  					</MDBCol>
		  				</MDBRow>
		  			</MDBCard>
		  		</div>
	  		</MDBView>
	  	)
	}
}
export default BookPage;