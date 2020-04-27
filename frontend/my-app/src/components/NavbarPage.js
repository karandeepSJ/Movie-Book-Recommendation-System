import React, { Component } from "react";
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBBtn, MDBFormInline, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,MDBCol } from "mdbreact";
import { NavLink} from 'react-router-dom';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

function LoginButton(props) {
  return (
    <MDBNavbarNav right>
    <MDBNavItem>
        <MDBDropdown dropleft>
          <MDBDropdownToggle nav caret>
            <MDBIcon icon="user" />
          </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default">
            <MDBDropdownItem onClick={props.onClick}>Login</MDBDropdownItem>
            <MDBDropdownItem onClick={props.onClick}>Signup</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavItem>
    </MDBNavbarNav>
  );
}

function LogoutButton(props) {
  return (
    <MDBNavbarNav right>
      <MDBNavItem>
        <MDBNavLink to="/home">{props.name}</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBDropdown dropleft>
          <MDBDropdownToggle nav caret>
            <MDBIcon icon="user"/>
          </MDBDropdownToggle>
          <MDBDropdownMenu className="dropdown-default">
            <MDBDropdownItem onClick={props.onClick}>Logout</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavItem>
    </MDBNavbarNav>
  );
}

class NavbarPage extends Component {

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLoggedIn: props.isLoggedIn,
      isOpen: false,
      value: 'Search',
      name: props.name,
      modal: false,
      inputValue: ''
    };
  }
  toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

  handleLoginClick() {
    this.setState({isLoggedIn: true});
    this.toggle()
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
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
  const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button =<LogoutButton onClick={this.handleLogoutClick} name={this.state.name}/>
          
    } else {
      button = <LoginButton onClick={this.handleLoginClick} name={this.state.name}/>;    
    }
  return (
    <Router>
      <MDBNavbar color="default-color" dark expand="md">
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>

            <MDBNavItem>
            <img src="Movie-Book-icon.png" alt="" style={{ width: "40px" }} />
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
              
                <MDBDropdownItem onClick={this.selectbook}><NavLink to={{
                          pathname: '/search',
                          state: {
                            query: this.state.inputValue
                          }
                          }} >Book</NavLink></MDBDropdownItem>
                <MDBDropdownItem onClick={this.selectmovie}><NavLink to={{
                          pathname: '/search',
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
          <MDBModalBody>
            <NavLink to="/login"></NavLink>
          </MDBModalBody>
          </MDBModal>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavbarPage;
