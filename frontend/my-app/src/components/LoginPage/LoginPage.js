import React from "react";

export default class LoginPage extends React.Component {
constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      toggle: false,
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)
    // if(!this.props.show){
    //       return null;
    //   }

    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
        <div className={this.state.toggle ? "login login-closed" : ""} >

          <h1>Log In</h1>
          <label>User Name</label>
          <br/>
          <input className="input" type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
          <br/>
          <label>Password</label>
          <br/>
          <input className="input" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

          <input className="submit-button" type="submit" value="Log In" data-test="submit"/>
          <p className="in-out"> 
            Don't have an account? {" "}
            <a href="#" onClick={()=>this.setState({
              toggle: true
            })}>Sign Up Here</a>
          </p>
          {
            this.state.error &&
            <h4 data-test="error" onClick={this.dismissError}>
              <button className="button-error" onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h4>
          }
        </div>
        <div className={!this.state.toggle ? "sign-up sign-up-closed" : ""}> 
          <h1>Sign Up</h1>
          <label>User Name</label>
          <br/>
          <input className="input" type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
          <br/>
          <label>Password</label>
          <br/>
          <input className="input" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

          <input className="submit-button" type="submit" value="Sign Up" data-test="submit"/>
          
          <p className="in-out"> 
            Login after Sign up{" "}
            <a href="#" onClick={()=>this.setState({
              toggle: false
            })}>Log In Here</a>
          </p>
          {
            this.state.error &&
            <h4 data-test="error" onClick={this.dismissError}>
              <button className="button-error" onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h4>
          }
        </div>
        </form>
      </div>

    );
  }
}

