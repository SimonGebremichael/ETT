import React, { Component } from 'react'
import Status from './calendarStatus'
import empty from '../item/empty.png'
import ApiCalendar from 'react-google-calendar-api';
import ApiCalendar2 from 'react-google-calendar-api/ApiCalendar';
import $ from 'jquery';
import { GoogleLogin } from 'react-google-login';

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
        $("#sideDatePrint").text(dd + " " + mon[mm - 1] + ", " + yyyy);
        $("#googleUpcommingRender").click(() => { getEvents();  });
    }
    render() {
        return (
            <div id="sideCal" >
            <div id='sideInfo' >
                <dive id="sideDate">
                    <h4 id="sideDatePrint" title="today"></h4>
                </dive>
            </div><br />
            
            <label id="displayFor"></label><br /><br />
            <div id="cal_side_offtype_list"></div> <br />
            
            <div id="cal_side_Display" > </div><br />

            <div id="cal_side_organizer">
                <h3>View</h3>
                <div id="cal_side_organizer_displayer"></div>
            </div><br />

            <div id="cal_side_event_container">
                <h3>Upcomming events: <label>(Only me)</label></h3>
                <div id="cal_side_event_only_displayer">
                </div>
                <button id="googleUpcommingRender">View upcomming google events</button>
                <div id="cal_side_googleLogin">
                    <GoogleLogin
                        clientId="1048871087214-t3ttoli7jpjv5ep62qr91ftsh4hf7010.apps.googleusercontent.com"
                        buttonText="View upcomming google events"
                        onSuccess={successLogin}
                        onFailure={failLogin}
                        isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
            <div id="cal_side_empty">
                <img src={empty} style={emptyImg} id="cal_side_empty_img" /><br /><br /><br />
                <center><p style={empty_P}>No events founds</p></center>
            </div>
        </div>
        )
    }
}

const emptyImg = {
    marginLeft: "40%",
    width: "100px",
    marginTop: "20%",
    opacity: "0.6",
    animation: "slideInDown 0.6s"
}
const empty_P = {
    marginTop: "20px",
    opacity: "0.6",
    animation: "slideInDown 0.6s"
}

const successLogin = (response) => {
    $("#cal_side_googleLogin").css("display", "none");
    getEvents();
}
const failLogin = (response) => {
    //nothing
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
                console.log(error);
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
            // console.log(events);
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
        $("#googleUpcommingRender").css("display", "none");
        $("#cal_side_googleLogin").css("display", "block");
        events = null;
    }
}

function printUpcomming(data) {
    var item = document.createElement("div")
    item.id = "cal_side_event_only_item";
    item.style.animation = "bounceIn 0.5s";

    var title = document.createElement("h3");
    title.textContent = data.summary;

    var from = document.createElement("p")
    from.id = "requestActivity";
    from.style.color = "white";
    from.style.border = "1px solid black";
    from.style.fontSize = "15px";
    from.style.background = "none";
    var da = new Date(data.start.dateTime);
    var dat = da.getFullYear() + "." + da.getMonth() + "." + da.getDate();
    from.textContent = dat;

    var to = document.createElement("p")
    to.id = "requestActivity";
    to.style.color = "white";
    to.style.border = "1px solid black";
    to.style.fontSize = "15px";
    to.style.background = "none";
    var daa = new Date(data.end.dateTime);
    var datt = daa.getFullYear() + "." + daa.getMonth() + "." + daa.getDate();
    to.textContent = datt;

    var a = document.createElement("a")
    a.href = data.htmlLink;
    a.target = "_blank";
    a.style.color = "white";
    a.style.textDecoration = "none";

    var view = document.createElement("p")
    view.textContent = "view on calendar";
    a.appendChild(view);

    var br = document.createElement("BR")

    item.appendChild(title);
    item.appendChild(br);
    item.appendChild(from);
    item.innerHTML += "&nbsp;&nbsp;"
    item.appendChild(to);
    item.appendChild(br);
    item.appendChild(br);
    item.appendChild(a);
    return item;
}