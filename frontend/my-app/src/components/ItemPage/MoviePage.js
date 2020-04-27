import React, { Component } from 'react';
import axios from "axios";
import Star from '../Star'
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
	color: "rgb(93,205,0)"
}

class MoviePage extends Component {
	constructor() {
		super();
	    this.state = {
	    };
	}
	componentDidMount() {
		const movieId = this.props.match.params.id
		axios.get(`http://localhost:5050/api/m/movies/details/${movieId}`)
		.then (response => {
			this.setState(response.data);
		})
		.catch(err => {
			console.log(err);
		})
	}

	renderCast() {
		if(!this.state.cast)
			return ""
		var cast = this.state.cast;
		var arr = []
		for (var c in cast) {
			arr.push(cast[c].name);
		}
		return arr.join(", ");
	}

	render() {
	  	return (
	  		<MDBView>
		  		<div
		  			style={{
		  				backgroundImage: `url(${this.state.backdrop})`,
		  				height: "100vh",
		  				backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover"
		  			}}
		  		>
		  		<MDBMask overlay="black-strong"
		  		className = "d-flex justify-content-center"
		  		>
		  			<MDBCard style = {{
		  				width: "60rem",
		  				background: "rgb(0,0,0,0.7)",
		  			}} className="mt-5">
		  				<MDBRow style={{height:"100%"}} className="mx-1">
		  					<MDBCol size="5" style = {{
		  						backgroundImage: `url(${this.state.poster})`,
		  						backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover"
		  					}}>
		  					</MDBCol>
		  					<MDBCol size="7" className="mt-4" style={{color: "#e0e0e0"}}>
		  						<MDBCardBody>
		  							<h2 className="h1-responsive font-weight-bold" style={{textTransform: "uppercase"}}>
		  								{this.state.title}
		  							</h2>
			  						<div className="h4-responsive" style={greenText}>
			  							{this.state.genres && this.state.genres.join(", ")}
			  						</div>
			  						<div className="py-3">
		  								{this.state.overview}
		  							</div>
		  							<MDBRow>
		  								<MDBCol size="6">
		  									Release Date:
			  								<div className="h4-responsive" style={greenText}>
			  								{this.state.releaseDate}
			  								</div>
		  								</MDBCol>
		  								<MDBCol size="6">
		  									Box Office:
			  								<div className="h4-responsive" style={greenText}>
			  								${this.state.revenue && this.state.revenue.toLocaleString()}
			  								</div>
		  								</MDBCol>
		  							</MDBRow>
		  							<MDBRow>
		  								<MDBCol size="6">
		  									Running Time:
			  								<div className="h4-responsive" style={greenText}>
			  								{this.state.runtime} minutes
			  								</div>
		  								</MDBCol>
		  								<MDBCol size="6">
		  									Rating:
			  								<div className="h4-responsive" style={greenText}>
			  								{this.state.rating && this.state.rating.toFixed(2)}/5
			  								</div>
		  								</MDBCol>
		  							</MDBRow>
		  							<div className="h4-responsive pt-3" style={greenText}> Cast:
		  							</div>
		  							<div className="h6-responsive white-text">
	  									{this.renderCast()}
	  								</div>
	  								<div className="d-flex justify-content-center">
			  							<Star/>
			  						</div>
		  						</MDBCardBody>
		  					</MDBCol>
		  				</MDBRow>
		  			</MDBCard>
		  		</MDBMask>
		  		</div>
	  		</MDBView>
	  	)
	}
}
export default MoviePage;
