import React, { Component } from "react";
import Session from '../model/Session'

export default class JiraEndpoint {
    constructor() {
        /*this.state = {
            response: ""
        };*/
    }

    searchIssue(issue, c) {
        var response = "";
        var callback = c;
        fetch('/jiraController/issue/'+issue+"/"+Session.getInstance().getSessionCookie(), {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
           })
            .then(results => {
                return results.json();        
           }).then((resource) => {       
                callback(resource);
           }).catch(error => {
                callback(error);
                console.log('There has been a problem with your fetch operation: ' + error.message);
          });
    }
}