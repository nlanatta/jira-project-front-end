import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from "./Routes";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import RouteNavItem from "./components/RouteNavItem";
import { authUser, signOutUser } from "./libs/authLib";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      response: ''
    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  
  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }
  
  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });

    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }  

  callApi = async () => {
    const response = await fetch('/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
        !this.state.isAuthenticating && 
	<div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
	<Navbar.Collapse>
          <Nav pullRight>
            {this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
              : [
                  <RouteNavItem key={1} href="/signup">
                    Signup
                  </RouteNavItem>,
                  <RouteNavItem key={2} href="/login">
                    Login
                  </RouteNavItem>
                ]}
          </Nav>
        </Navbar.Collapse>
        </Navbar>
	<Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
