// make a class and export it
import React, { Component } from "react";
import PolicyDataService from "../services/policy-data.service";

export default class PoliciesList extends Component {
    // what to render, initial state of component, what to do as things inside component change
    constructor() {
        super();
        this.retrievePolicies = this.retrievePolicies.bind(this);
        this.state = {
            policies:[],
            currentPolicy: null,
            currentIndex: -1
        };
    };

    componentDidMount() {
        this.retrievePolicies();
    }

    //call to API through policy data service
    retrievePolicies() {
        PolicyDataService.getAll()
            .then(res => {
                this.setState({
                    policies: res.data
                })
            })
            .catch(error => {
                console.log (error);
            });
    }

    render() {

        return (
            <div> 
                {this.state.policies}
            </div>
        )
    }
}