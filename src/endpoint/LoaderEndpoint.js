import React, { Component } from "react";
import Session from '../model/Session'
export default class LoaderEndpoint extends Component {
    constructor() {
        super();
    }

    loginCall(username, password) {
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
            Session.getInstance().setCookie(resource.cookie);            
            console.log(resource.cookie);

       }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
    }
}