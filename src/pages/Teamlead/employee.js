import React from 'react'
import Offsite from './Offsite'
import Upcomming from './Upcomming'
import Inbox from '../Inbox'
export default class team2 extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.user = this.props.match.params.id;
        this.type = localStorage.getItem("teamlead")
    }
    componentDidMount() {

    }

    render() {
        return (
            <div id="container_dashboard">
                <Offsite id={this.user} />
                <Inbox />
                <Upcomming />
            </div>
        );
    }
}
