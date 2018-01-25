import React, { Component } from "react";

export default class LoaderBackground extends Component {
    constructor() {
        super();
        this.state = {
            response: {}
        };
    }

    loginCall(username, password) {
      var response = {};
      fetch('/dologin', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
         "username": username,
         "password": password,
        })
       })
        .then(results => {
            return results.json();        
       }).then((resource) => {
            response = resource;
            console.log(resource.cookie);
       }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
      this.setState({response: response});
    }
}