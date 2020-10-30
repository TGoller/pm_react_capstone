// make a class and export it
import React, { Component } from "react";
import PolicyDataService from "../services/policy-data.service";

export default class PoliciesList extends Component {
    // what to render, initial state of component, what to do as things inside component change
    constructor(props) {
        super(props);
        this.retrievePolicies = this.retrievePolicies.bind(this);
        this.setActivePolicy = this.setActivePolicy.bind(this);

        this.state = {
            policies: [],
            currentPolicy: null,
            currentIndex: -1
        };
    }

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
                console.log(error);
            });
    }

    setActivePolicy(policy, index) {
        this.setState({
            currentPolicy: policy,
            currentIndex: index
        });

    }


    render() {

        return (
            <div>
                <div>
                    <h2>Policy List:</h2>
                    <ul>
                        {this.state.policies.map((policy, index) =>
                            <li
                                onClick={() => this.setActivePolicy(policy, index)}
                                key={index}
                            >{policy.holder_first_name}  {policy.holder_last_name} - {policy.name}  index is {index} </li>)}
                    </ul>
                </div>
                <div>
                    {this.state.currentPolicy ?

                        <div>
                            <div>
                                <label><strong>Policy name:</strong></label>{" "}
                                {this.state.currentPolicy.name}
                            </div>

                            <div>
                                <label><strong>Policy Holder first Name:</strong></label>{" "}
                                {this.state.currentPolicy.holder_first_name}
                            </div>

                            <div>
                                <label><strong>Policy Holder last name:</strong></label>{" "}
                                {this.state.currentPolicy.holder_last_name}
                            </div>

                            <div>
                                <label><strong>Policy Holder account ID:</strong></label>{" "}
                                {this.state.currentPolicy.holder_account_id}
                            </div>

                            <div>
                                <label><strong>Policy active?:</strong></label>{" "}
                                {this.state.currentPolicy.is_active ? "yes":"no"}
                            </div>

                            <div>
                                <label><strong>Policy has active claim:</strong></label>{" "}
                                {this.state.currentPolicy.has_active_claim ? "yes":"no"}
                            </div>

                            <div>
                                <label><strong>Policy effective date:</strong></label>{" "}
                                {new Date(this.state.currentPolicy.effective_date).toDateString()}
                            </div>

                            <div>
                                <label><strong>Policytermination date:</strong></label>{" "}
                                {new Date(this.state.currentPolicy.termination_date).toDateString()}
                            </div>

                        </div>

                        : <div>
                            Click on a policy to see details
                     </div>
                    }
                </div>
            </div>
        )
    }
} 
