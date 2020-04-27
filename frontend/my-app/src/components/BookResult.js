import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';

function BookResult({result}) {
	console.log(result)
	return (
		<div>
			<Link to={`/book/${result.bookId}`}>
			<MDBCol>
		      <MDBCard style={{ width: "20rem" }}>
		        <MDBCardImage className="img-fluid" src={result.poster} waves />
		        <MDBCardBody>
		          <MDBCardTitle><center>{result.title}</center></MDBCardTitle>
		          <MDBCardText><center>
		            <h3>{result.rating}</h3></center>
		          </MDBCardText>
		        </MDBCardBody>
		      </MDBCard>
		    </MDBCol>
		    </Link>
		</div>
	)
}

export default BookResult
