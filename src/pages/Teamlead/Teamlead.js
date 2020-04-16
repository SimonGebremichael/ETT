import React from 'react'
import Offsite from './Offsite'
import ActiveRequests from './ActiveRequests'
import Upcomming from './Upcomming'
import Profile from '../Profile'
import Inbox from '../Inbox'
export default class team extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.user = this.props.match.params.id;
        this.type = localStorage.getItem("teamlead")
    }
    componentDidMount() {
        if(localStorage.getItem("access") == null){
            window.location.href = "http://localhost:8080/login";
        }
    }

    render() {
        return (
            <>
                <Profile id={this.user} />
                <div id="container_dashboard">
                    <Offsite id={this.user} />
                    <ActiveRequests />
                    <Upcomming />
                </div>
            </>
        );
    }
}
