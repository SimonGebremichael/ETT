import React from 'react'
import Offsite from './Offsite'
import ActiveRequests from './ActiveRequests'
import Upcomming from './Upcomming'
import Profile from '../Profile'
import Analysis from '../analysis/dash'
export default class team extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.user = this.props.match.params.id;
        this.state = {
            done: false
        }
        localStorage.setItem("access", this.user);
    }
    componentDidMount() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/checkTeamlead.php?i=" + this.user);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                localStorage.setItem("teamlead", xhr.responseText);
            }
        }
        xhr.send();
    }

    componentWillMount() {
        this.setState({ done: true });
    }

    render() {
        if (Boolean(localStorage.getItem("teamlead")) == true) {
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
        } else {
            return (
                <div id="container_dashboard">
                    <Offsite id={this.user} />
                    <Analysis />
                    <Upcomming />
                </div>
            );
        }
    }
}
