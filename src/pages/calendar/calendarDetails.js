import Status from '../Teamlead/Offsite_status'
import React, { Component } from 'react'

export default class team extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.getElementById("popBg").addEventListener("click", function () {
            document.getElementById("popupDisplay").style.display = "none";
            document.getElementsByClassName("Calendar")[0].style.filter = "blur(0)";
            document.getElementById("sideCal").style.filter = "blur(0)";
        });
    }

    render(){
        return(
            <CalendarDetail />
        )
    }
}
function CalendarDetail() {
    return (
        <div id="popupDisplay">
            <div id="popBg"></div>
            <div id="calDetails">
                <h1 id="popDate"></h1><br /><br />
                <h2>Details:</h2><br />
                <hr color="grey"/><br /><br />
                <h3>3 Results:</h3><br />

                <div id="displayEvents">
                    <Status />
                    <Status />
                    <Status />
                </div>
            </div>
        </div>
    )
}
