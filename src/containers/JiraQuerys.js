import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./JiraQuerys.css";
import AppButton from "../components/AppButton";
import JiraEndpoint from "../endpoint/JiraEndpoint"

export default class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: false,
        issue: "",
        response: ""
      };
    }
  
    validateForm() {
      return this.state.issue.length > 0;
    }
  
    handleIssueChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleIssueSubmit = async event => {
      event.preventDefault();
  
      this.setState({ isLoading: true });
  
      try {
        await this.searchIssue(this.state.issue);
      } catch (e) {
        alert(e);
        this.setState({ isLoading: false });
      }
    }
    
    searchIssue(key) {
        var owner = this;
        var result = "";
        new JiraEndpoint().searchIssue(key, function(response){
            if(response.errorMessages!= null && response.errorMessages.length > 0) {
                result = "There was an Issue: "+response.errorMessages[0];
            }else if(response.name != null && String(response.name).toLowerCase().indexOf("error") > 0) {
                result = "There was an error in the search";
            }else {
                result = response;
            }
            owner.setState({ response : result });
            owner.setState({ isLoading: false });
        });
    } 
  
    render() {
      return (
        <div className="Search Issue">
          <form onSubmit={this.handleIssueSubmit}>
            <FormGroup controlId="issue" bsSize="large">
              <ControlLabel>User</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.issue}
                onChange={this.handleIssueChange}
              />
            </FormGroup>
            <AppButton
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Search Issue"
              loadingText="Searching…"
            /> 
          </form>  
          <div>
            {JSON.stringify(this.state.response)}
        </div>      
        </div>
        
      );
    }
  }
  