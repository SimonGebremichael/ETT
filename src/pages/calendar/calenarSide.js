import React, { Component } from 'react'
import Status from './calendarStatus'

export default class side extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            currentDate = new Date();
        document.getElementById("sideDatePrint").innerHTML =
            weekday[currentDate.getDay()] + ", " +
            currentDate.getDay() + " " +
            mon[currentDate.getMonth()];
    }
    render() {
        return (<CalenarSide />)
    }
}

function CalenarSide() {
    return (
        <>
            <div id="sideCal" >
                <div id='sideInfo' >
                    <dive id="sideDate">
                        <h4 id="sideDatePrint" title="today"></h4>
                    </dive>
                </div>
                <br />
                <br />
                <label>Display for: </label>
                <div id="cal_side_Display" >
                    <Status />
                    <Status />
                    <Status />
                    <Status />
                    <Status />
                    <Status />
                </div><br />

                <div id="cal_side_btns">
                    <button class="cal_side_actions">Create Request</button>&nbsp;
                    <button class="cal_side_actions">Export Calendar</button>&nbsp;
                    <button class="cal_side_actions">Analytics</button>
                </div>
            </div>
        </>
    )
}