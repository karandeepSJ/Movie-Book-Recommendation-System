import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

function Result({result}) {
	return (
		<div>
			<MDBCol>
		      <MDBCard style={{ width: "20rem" }}>
		        <MDBCardImage className="img-fluid" src={result.poster} waves />
		        <MDBCardBody>
		          <MDBCardTitle>{result.title}</MDBCardTitle>
		          <MDBCardText>
		            {result.rating}
		          </MDBCardText>
		        </MDBCardBody>
		      </MDBCard>
		    </MDBCol>
		</div>
	)
}

export default Result
