import React from "react";
import "./style.css"

export default class SignUp extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      error: '',
      password2:'',
      submit: false,
      name: '',
      failure: ''
    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handlePass2Change = this.handlePass2Change.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlemailChange = this.handlemailChange.bind(this);
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

    if (!this.state.name) {
      return this.setState({ error: 'name is required' });
    }
    if (!this.state.email) {
      return this.setState({ error: 'Email is required' });
    }
    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
    if (!this.state.password2) {
      return this.setState({ error: 'Retype Password' });
    }
    if(!(this.state.password===this.state.password2)){
      return this.setState({ error: 'Password does not match' });
    }
    this.props.modalclose();

    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      name: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }
  handlePass2Change(evt) {
    this.setState({
      password2: evt.target.value,
    });
  }
  handlemailChange(evt) {
    this.setState({
      email: evt.target.value,
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
          <br/>
          <label>Name</label>
          <br/>
          <input className="input" type="text" data-test="name" value={this.state.name} onChange={this.handleUserChange}/>
          <br/>
          <label>Email</label>
          <br/>
          <input className="input" type="text" data-test="email" value={this.state.email} onChange={this.handlemailChange}/>
          <br/>
          <label>Password</label>
          <br/>
          <input className="input" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
          <br/>
          <label>Retype Password</label>
          <br/>
          <input className="input" type="password" data-test="password2" value={this.state.password2} onChange={this.handlePass2Change} />
          <input className="submit-button" type="submit" value="Sign Up" data-test="submit"/>
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
      </div>
    );
  }
}


