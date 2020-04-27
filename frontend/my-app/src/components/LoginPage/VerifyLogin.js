import React from "react";
import "./style.css"
import axios from "axios";

export default class VerifyLogin extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: props.email,
      password: props.password,
      failure: false
    }
  }
  componentDidMount() {
    var bodyFormData = new FormData();
    bodyFormData.append('email', this.state.email);
    bodyFormData.append('password', this.state.password);
    axios.post('http://localhost:5050/api/u/user/login',bodyFormData)
    .then (response => {
      console.log(response.data);
      this.props.storestate(response.data);
      this.props.modalclose();
      window.location.reload();
    })
    .catch(err => {
      this.props.againsubmit();
      this.setState({failure:true});
      console.log(err);
    })
  }
  render() {

    return (
        
          <div> 
          {
            this.state.failure &&
            <h6>
            incorrect id or password
            </h6>
          }
          </div>
        
    );
  }
}


