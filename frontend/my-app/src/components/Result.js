import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';

function Result({result}) {
	console.log(result)
	return (
		<div>
			<Link to={`/movie/${result.movieId}`}>
			<MDBCol>
		      <MDBCard style={{ width: "20rem" }}>
		        <MDBCardImage className="img-fluid" src={result.poster} waves />
		        <MDBCardBody>
		          <MDBCardTitle><center>{result.title}</center></MDBCardTitle>
		          <MDBCardText><center>
		            <h3>Rating: {result.rating.toFixed(2)}</h3></center>
		          </MDBCardText>
		        </MDBCardBody>
		      </MDBCard>
		    </MDBCol>
		    </Link>
		</div>
	)
}

export default Result
