import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import AppButton from "../components/AppButton";
import LoaderEndpoint from "../endpoint/LoaderEndpoint";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      isLoading: false,
      cookie: ""
    };
  }

  validateForm() {
    return this.state.user.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.login(this.state.user, this.state.password);
      this.props.userHasAuthenticated(true)
      this.props.history.push("/jiraQuery");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  login(user, password) {
    user+" / "+password;
    var loginCall = new LoaderEndpoint();
    this.state.cookie = loginCall.loginCall(user, password);
  } 

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="user" bsSize="large">
            <ControlLabel>User</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.user}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <AppButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          /> 
        </form>        
      </div>
    );
  }
}
