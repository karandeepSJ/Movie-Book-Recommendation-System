import React, { Component } from "react";
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBBtn, MDBFormInline, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { NavLink} from 'react-router-dom';
import LoginPage from "./LoginPage/LoginPage";
import SignUp from "./LoginPage/SignUp"
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

const modalBG = {
  background: "-webkit-linear-gradient(left,rgba(47,100,90,1) 0%,rgba(111,161,123,1) 100%)",
}

function LoginButton(props) {
  return (
    <MDBNavbarNav right>
    <MDBNavItem>
       <MDBBtn rounded size="sm" onClick={props.onClick}>Login</MDBBtn>
      </MDBNavItem>
    <MDBNavItem>
       <MDBBtn rounded size="sm" onClick={props.signupclick}>Signup</MDBBtn>
      </MDBNavItem>
    </MDBNavbarNav>

  );
}

function LogoutButton(props) {
  return (
    <MDBNavbarNav right>
      <MDBNavItem>
       <MDBBtn rounded size="sm" onClick={props.onClick}>Logout</MDBBtn>
      </MDBNavItem>
    </MDBNavbarNav>
  );
}

class NavbarPage extends Component {

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.state = {
      isOpen: false,
      value: 'Search',
      name: '',
      modal: false,
      signupmodal:false,
      inputValue: ''
    };
  }
  toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}
signuptoggle = () => {
  this.setState({
    signupmodal: !this.state.signupmodal
  });
}

  handleLoginClick() {
    this.toggle()
  }

  handleLogoutClick() {
    localStorage.clear()
    window.location.reload(true);
  }

  handleSignupClick(){
    this.signuptoggle()
  }
toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
selectbook = () => {
  this.setState({value: 'Book'})
}
selectmovie = () => {
  this.setState({value: 'Movie'})
}
updateInputValue = (evt)=>{
    this.setState({
      inputValue: evt.target.value
    });
  }

render() {
    const check = JSON.parse(localStorage.getItem("user"))
    let button;
    if (check) {
      button = <LogoutButton onClick={this.handleLogoutClick}/>
    } else {
      button = <LoginButton onClick={this.handleLoginClick} signupclick={this.handleSignupClick}/>;    
    }
  return (
    <Router>
      <MDBNavbar color="default-color" dark expand="md">
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>

            <MDBNavItem>
            <img src={process.env.PUBLIC_URL + "Movie-Book-icon.png"} alt="" style={{ width: "40px" }} />
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/home">
                
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem >
              <MDBNavLink to="/home">Home</MDBNavLink>
            </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
            <MDBNavItem>
            
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control my-0 py-1" placeholder="Search" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
            <MDBNavItem>
            <MDBDropdown rounded size="sm"> 
            <MDBDropdownToggle rounded color="default" placeholder="Search">
                {this.state.value }
              </MDBDropdownToggle>
              <MDBDropdownMenu color="default" basic>
                <MDBDropdownItem onClick={this.selectbook}>
                <NavLink to={{
                          pathname: '/booksearch/' + this.state.inputValue,
                          state: {
                            query: this.state.inputValue
                          }
                          }} >Book</NavLink></MDBDropdownItem>
                <MDBDropdownItem onClick={this.selectmovie}>
                <NavLink to={{
                          pathname: '/search/' + this.state.inputValue,
                          state: {
                            query: this.state.inputValue
                          }
                          }}>Movie</NavLink></MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav left>
          <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/home">           
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
           {button}


          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Login</MDBModalHeader>
          <MDBModalBody style={modalBG}>
            <LoginPage modalclose={this.toggle} changename={this.changename}/>
          </MDBModalBody>
          </MDBModal>
          <MDBModal isOpen={this.state.signupmodal} toggle={this.signuptoggle} >
          <MDBModalHeader toggle={this.signuptoggle}>Register</MDBModalHeader>
          <MDBModalBody style={modalBG}>
            <SignUp modalclose={this.signuptoggle} changename={this.changename}/>
          </MDBModalBody>
          </MDBModal>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavbarPage;

