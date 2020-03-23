import React from 'react'
import Offsite from './Offsite'
import ActiveRequests from './ActiveRequests'
import Upcomming from './Upcomming'
import Profile from '../Profile'

export default class team extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var colours2 = ["lightblue", "lightgreen", "pink", "salmon"],
            colours3 = ["Remote", "Vacation", "Bithday", "Sick"];

        var elem = document.getElementsByClassName("request_Type");
        var elem2 = document.getElementsByClassName("request_Type_info");
        for (var i = 0; i < elem.length; i++) {
            var rand = (Math.floor(Math.random() * 4) + 1) - 1;
            elem[i].style.backgroundColor = colours2[rand];
            elem2[i].innerHTML = colours3[rand];
        }
    }

    render() {
        return (<Teamleader />)
    }
}

function Teamleader() {
    return (
        <>
            <Profile />
            <div id="content">
                <Offsite />
                <ActiveRequests />
                <Upcomming />
            </div>
        </>
    )
}
