import React, { Component } from 'react'
import Status from './calendarStatus'

export default class side extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            colours2 = ["lightblue", "lightgreen", "pink", "salmon"],
            colours3 = ["Remote", "Vacation", "Bithday", "Sick"];

        var currentDate = new Date();
        document.getElementById("sideDatePrint").innerHTML = weekday[currentDate.getDay() - 1] + ", " + mon[currentDate.getMonth()];

        var elem = document.getElementsByClassName("cal_stat_details");
        var elem2 = document.getElementsByClassName("cal_stat_type_value");
        for (var i = 0; i < elem.length; i++) {
            var rand = (Math.floor(Math.random() * 4) + 1) - 1;
            elem[i].style.backgroundColor = colours2[rand];
            elem2[i].innerHTML = colours3[rand];
        }
    }
    render() {
        return (<CalenarSide />)
    }
}

function CalenarSide() {
    return (
        <div id="sideCal" >
            <div id='sideInfo' >
                <dive id="sideDate">
                    <h4 id="sideDatePrint" title="today"></h4>
                </dive>
            </div>
            <br />
            <label id="displayFor">Display for: March</label>
            <br />
            <hr color="white" /><br />
            <div id="cal_side_Display" >
                <Status />
                <Status />
                <Status />
                <Status />
                <Status />
                <Status />
            </div><br />

            <div id="cal_side_btns">
                <div class="cal_side_actions">
                    <div style={left}>
                        Remote Work:
                        </div>
                    <div style={right}>
                        4
                        </div>
                </div>
                <div class="cal_side_actions">
                    <div style={left}>
                        Vacation:
                        </div>
                    <div style={right}>
                        2
                        </div>
                </div>
                <div class="cal_side_actions">
                    <div style={left}>
                        Sick days:
                        </div>
                    <div style={right}>
                        1
                         </div>
                </div>
                <div class="cal_side_actions">
                    <div style={left}>
                        Bithdays:
                        </div>
                    <div style={right}>
                        0
                        </div>
                </div>
            </div>
        </div>
    )
}

const left = {
    float: "left"
}
const right = {
    float: "right"
}