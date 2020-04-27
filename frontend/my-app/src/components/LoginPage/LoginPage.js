import React from "react";
import VerifyLogin from "./VerifyLogin";
import "../../style.css"

export default class LoginPage extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      submit: false,
      name: '',
      failure: ''
    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
    this.againsubmit = this.againsubmit.bind(this);
  }

  againsubmit(){
    this.setState({submit:false});
    this.setState({failure:'fail'});
  }
  switch(){
    this.setState({failure:''});
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
    this.setState({submit:true})
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

    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <br/>
          <label>Email</label>
          <br/>
          <input className="input" type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange}/>
          <br/>
          <label>Password</label>
          <br/>
          <input className="input" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
          <input className="submit-button" type="submit" value="Log In" data-test="submit"/>
        </form>
          <br/>
          {
            this.state.error &&
            <h6 data-test="error" onClick={this.dismissError}>
              <button className="button-error" onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h6>
          }
          {
            this.state.failure && 
            <h6>Incorrect Id or Password{this.state.switch}</h6>
          }
          <br/>
          {
            this.state.submit &&
            <VerifyLogin email={this.state.username} password={this.state.password} modalclose={this.props.modalclose} changename={this.props.changename} againsubmit={this.againsubmit}/>
          }
      </div>
    );
  }
}

