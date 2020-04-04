import React, { component } from 'react';
import Request from './ActiveRequest_items'
import $ from 'jquery'

export default class AcctiveRequests extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = this.props.children;
        this.user = props.id;
    }
    componentDidMount = () => {
        $("#remoteBtn").on("click", () => {
            
        });

        $("#vacationBtn").on("click", () => {
            
        });

        $("#birthdayBtn").on("click", () => {
            
        });

        $("#sickBtn").on("click", () => {
            
        });

        $("#allBtn").on("click", () => {
            alert("ee");
        });
    }


    render() {
        return (
            <div id="mainFeed">
                <div id="mainAcctions"><br /><br /><br />
                    <h2>Active Requests:</h2>

                    <div id="acctionButtons">
                        <input type="button" id="remoteBtn" class="acctionBtn" value="Remote" />
                        <input type="button" id="vacationBtn" class="acctionBtn" value="Vacation" />
                        <input type="button" id="birthdayBtn" class="acctionBtn" value="Birthdays" />
                        <input type="button" id="sickBtn" class="acctionBtn" value="Sick" />
                        <input type="button" id="allBtn" class="acctionBtn" value="All" />
                    </div>
                </div><br />
                <h3 id="PendingAmt">5 Pending:</h3><br />
                <div id="displayRequests">
                    <Request />
                    <Request />
                    <Request />
                    <Request />
                    <Request />
                    <Request />
                    <Request />
                </div>
            </div>
        )
    }

}
