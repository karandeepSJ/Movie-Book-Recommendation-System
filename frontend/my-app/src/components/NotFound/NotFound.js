import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import { NavLink} from 'react-router-dom';

export default class NotFound extends React.Component {
	render() {
		return (
			<div>
				<div className='d-flex flex-column justify-content-center align-items-center' style={{height: "100vh"}}>
					<h1 className="h1-responsive"> Oops!</h1>
					<h1 className="h1-responsive"> Page Not Found</h1>
					<br/>
					<NavLink to="/home">
						<MDBBtn color="primary" outline> Home </MDBBtn>
					</NavLink>
				</div>
			</div>
		);
	}
}