import React, { Component } from 'react'
import Status from './calendarStatus'
import ApiCalendar from 'react-google-calendar-api';
import ApiCalendar2 from 'react-google-calendar-api/ApiCalendar';
import $ from 'jquery';
var CLIENT_ID = '1048871087214-t3ttoli7jpjv5ep62qr91ftsh4hf7010.apps.googleusercontent.com';
var API_KEY = 'AIzaSyA0cfGXh6JoX0lXpYnjgTq09m62vO62TmM';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var events;
var today = new Date(),
    dd = String(today.getDate()).padStart(2),
    mm = String(today.getMonth() + 1).padStart(2),
    yyyy = today.getFullYear();

export default class side extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.getElementById("sideDatePrint").innerHTML = dd + " " + mon[mm - 1] + ", " + yyyy;
        // var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        //     weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        //     colours2 = ["lightblue", "lightgreen", "pink", "salmon"],
        //     colours3 = ["Remote", "Vacation", "Bithday", "Sick"];

        // var currentDate = new Date();
        // document.getElementById("sideDatePrint").innerHTML = weekday[currentDate.getDay() - 1] + ", " + currentDate.getDate() + " of " + mon[currentDate.getMonth()];

        // var elem = document.getElementsByClassName("cal_stat_details");
        // var elem2 = document.getElementsByClassName("cal_stat_type_value");
        // for (var i = 0; i < elem.length; i++) {
        //     var rand = (Math.floor(Math.random() * 4) + 1) - 1;
        //     elem[i].style.backgroundColor = colours2[rand];
        //     elem2[i].innerHTML = colours3[rand];
        // }

        // printSideCal();
        printOfftypes();
        $("#googleUpcommingRender").click(() => {
            getEvents();
        });
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
            <label id="displayFor"></label>
            <br />
            <br />
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
            <br />
            <div id="cal_side_Display" >
            </div><br />

            <div id="cal_side_organizer">
                <h3>View</h3>
                <div id="cal_side_organizer_displayer">
                </div>
            </div>
            <br />
            <div id="cal_side_event_container">
                <h3>Upcomming events: <label>(Only me)</label></h3>
                <div id="cal_side_event_only_displayer">
                </div>
                <button id="googleUpcommingRender">View upcomming google events</button>
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
function getEvents() {
    if (ApiCalendar.sign) {
        ApiCalendar.listUpcomingEvents(10)
        ApiCalendar.gapi.load('client:auth2', () => {
            ApiCalendar.gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(function () {
                console.log("success baby");
            }, function (error) {
                console.log(JSON.stringify(error, null, 2));
            });
        });
        ApiCalendar.gapi.auth2.getAuthInstance().signIn();
        ApiCalendar.gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date(yyyy, mm, 0)).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function (sendBack) {
            events = sendBack.result.items;
            console.log(events);
            var box = document.getElementById("cal_side_event_only_displayer");
            if (events.length != 0) {
                for (var i = 0; i < events.length; i++) {
                    box.appendChild(printUpcomming(events[i]));
                }
                $("#googleUpcommingRender").css("display", "none");
            } else {
                $("#googleUpcommingRender").text("no upcomming events");
            }
        });
    } else {
        events = null;
    }
}

function printOfftypes() {
    var off = new XMLHttpRequest();
    off.open("GET", "http://localhost:8080/crud/api/getofftype.php");
    off.onreadystatechange = function () {
        if (off.readyState == 4) {
            var data = JSON.parse(off.responseText);
            var box = document.getElementById("cal_side_organizer_displayer");
            box.innerHTML = "";
            console.log(off.responseText);
            if (data.Total != 0) {
                for (var i = 0; i < data.Total; i++) {
                    var div = document.createElement("div");
                    div.id = "cal_side_organizer_item";

                    var input = document.createElement("input");
                    input.className = "cal_organizer_type";
                    input.type = "checkbox";
                    input.checked = "true";
                    input.id = "offsite" + data.offtype[i].id;

                    var lbl = document.createElement("label");
                    lbl.textContent = data.offtype[i].name;
                    div.appendChild(input);
                    div.appendChild(lbl);
                    box.appendChild(div);
                }
            }
        }
    }
    off.send();
}

function printUpcomming(data) {
    var item = document.createElement("div")
    item.id = "cal_side_event_only_item";

    var title = document.createElement("h3")
    title.textContent = data.summary;

    var from = document.createElement("p")
    from.id = "requestActivity";
    from.style.color = "black";
    from.style.border = "1px solid black";
    from.style.fontSize = "15px";
    var da = new Date(data.start.dateTime);
    var dat = da.getFullYear() + "." + da.getMonth() + "." + da.getDate();
    from.textContent = dat;

    var to = document.createElement("p")
    to.id = "requestActivity";
    to.style.color = "black";
    to.style.border = "1px solid black";
    to.style.fontSize = "15px";
    to.style.marginLeft = "5px";
    var daa = new Date(data.end.dateTime);
    var datt = daa.getFullYear() + "." + daa.getMonth() + "." + daa.getDate();
    to.textContent = datt;

    var a = document.createElement("a")
    a.href = data.htmlLink;
    a.target = "_blank";

    var view = document.createElement("p")
    view.textContent = "view on calendar";
    a.appendChild(view);

    var br = document.createElement("BR")

    item.appendChild(title);
    item.appendChild(from);
    item.appendChild(to);
    item.appendChild(br);
    item.appendChild(br);
    item.appendChild(a);
    return item;
}