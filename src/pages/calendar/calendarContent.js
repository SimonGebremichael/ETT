import React, { Component } from 'react'
import ApiCalendar from 'react-google-calendar-api';
import ApiCalendar2 from 'react-google-calendar-api/ApiCalendar';
var CLIENT_ID = '1048871087214-t3ttoli7jpjv5ep62qr91ftsh4hf7010.apps.googleusercontent.com';
var API_KEY = 'AIzaSyA0cfGXh6JoX0lXpYnjgTq09m62vO62TmM';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var events;
export default class Socki extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            colours = ["lightblue", "salmon", "pink", "lightgreen", "lightblue", "salmon", "pink", "lightgreen", "lightblue", "salmon", "pink", "lightgreen"];

        var today = new Date(),
            dd = String(today.getDate()).padStart(2),
            mm = String(today.getMonth() + 1).padStart(2),
            yyyy = today.getFullYear(),
            currentDate = new Date();
        var change = false,
            change2 = false,
            listened = false;
        var d = document;

        getEvents();



        // if (grabber != null) { prntCal(); } //one time fire
        function prntCal() {
            // //reset cal 
            // var wasTextAddedForReserve = [];
            // for (var i = 0; i < events.length; i++) {
            //     wasTextAddedForReserve.push(false);
            // }

            const box = document.getElementById("date-section2");
            box.innerHTML = "";

            var Starting_dayOfTheWeek = new Date(yyyy, mm - 1, 0).getDay();
            let temp;
            let dayText;

            document.getElementById("dateTitle").innerHTML = mon[mm - 1] + ", " + yyyy;

            console.log(events);

            //gets what day of the month it starts with
            for (var i = 0; i < Starting_dayOfTheWeek + 1; i++) {
                if (Starting_dayOfTheWeek != 6) {
                    var emptyFeild = document.createElement("div");
                    box.appendChild(emptyFeild);
                }
            }

            var numeroPerguntas = events.length;
            var isTextAddForReserve = new Array(numeroPerguntas).fill(false);

            for (var i = 1; i <= new Date(yyyy, mm, 0).getDate(); i++) {
                temp = document.createElement("div");
                temp.className = "day";
                temp.id = i + " " + mon[mm - 1] + ", " + yyyy;
                temp.padding = "5px";
                temp.style.animation = "slideInLeft 0." + i + "s";

                var br = document.createElement("BR");
                temp.appendChild(br);

                dayText = document.createElement("label");
                dayText.textContent = i;
                dayText.style.marginLeft = "5px";
                temp.appendChild(dayText);

                if (events.length > 0) {
                    for (var k = 0; k < events.length; k++) {
                        if (new Date(events[k].start.dateTime).getMonth() == new Date(events[k].end.dateTime).getMonth()) {
                            if (i >= new Date(events[k].start.dateTime).getDate() && i <= new Date(events[k].end.dateTime).getDate()) {
                                var reserve = document.createElement("div");
                                reserve.className = "reserve";
                                if (!isTextAddForReserve[k]) {
                                    isTextAddForReserve[k] = !isTextAddForReserve[k];
                                    reserve.textContent = events[k].summary;
                                }
                                reserve.setAttribute('style', "background-color: " + colours[k]);
                                temp.appendChild(reserve);
                            }
                        } else if (new Date(events[k].start.dateTime).getMonth() < mm - 1) {
                            console.log("before start " + new Date(events[k].start.dateTime).getMonth() + ", before end " + new Date(events[k].end.dateTime).getMonth());
                            console.log(events[k].summary + " " + mm);
                            events[k].start.dateTime = new Date(yyyy, mm - 1, 0);

                        } else if (new Date(events[k].end.dateTime).getMonth() >= mm) {
                            alert(events[k].end.dateTime);
                            events[k].end.dateTime = new Date(yyyy, mm - 1, new Date(yyyy, mm, 0).getDate());
                        }
                    }

                } else { console.log('No upcoming events found.'); }

                box.appendChild(temp);

                //current day marker on calendar
                if (currentDate.getMonth() == mm - 1 && currentDate.getFullYear() == yyyy) {
                    if (i < currentDate.getDate()) {
                        temp.style.opacity = "0.4";

                    } else if (i == currentDate.getDate()) {
                        dayText.style.backgroundColor = "#2F93F2";
                        dayText.style.padding = "5px 7px 5px 5px";
                        dayText.style.color = "white";
                        dayText.style.borderRadius = "10px";
                    }
                }
            }
            if (!listened) {
                init();
                listened = true;
            } else {
                addEvent();
            }
        }
        function addEvent() {
            var temp = d.getElementsByClassName("day");
            for (var i = 0; i < temp.length; i++) {
                temp[i].addEventListener("click", function () {
                    document.getElementById("popupDisplay").style.display = "block";
                    document.getElementById("container_" + window.location.href.split("/")[3]).style.filter = "blur(2px)";
                }, false)
            }
        }

        function init() {
            addEvent();
            document.getElementById("calNav1").addEventListener("click", function () {
                mm--;
                if (!change) {
                    if (mm <= 0) {
                        mm = 12;
                        yyyy--;
                    }
                    today = new Date(yyyy, mm, 0);
                    console.log(today);
                    change = true;
                    getEvents();
                }
            });
            document.getElementById("calNav1").addEventListener("mouseup", function () { change = false; });


            document.getElementById("calNav2").addEventListener("click", function () {
                mm++;
                if (!change2) {
                    if (mm >= 13) {
                        mm = 1;
                        yyyy++;
                    }
                    today = new Date(yyyy, mm, 0);
                    console.log(today);
                    change = true;
                    getEvents();
                }
            });
            document.getElementById("calNav2").addEventListener("mouseup", function () { change2 = false; });
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
                    prntCal();
                });
            } else {
                events = null;
            }
        }
    }
    render() {
        return (<CalendarContent />)
    }
}

function CalendarContent() {
    const left1 = {
        float: "left",
        padding: "10px"
    }
    const right1 = {
        float: "right",
        padding: "10px"
    }
    return (
        <div id="public_calendar">
            <div id="header">
                <button style={left1} id="calNav1">&#8592;</button>
                <h1 id="dateTitle"></h1>
                <button style={right1} id="calNav2">&rarr;</button><br />
            </div>

            <main id="date-section">
                <h2>Sun</h2>
                <h2>Mon</h2>
                <h2>Tue</h2>
                <h2>Wed</h2>
                <h2>Thu</h2>
                <h2>Fri</h2>
                <h2>Sat</h2>
            </main>
            <main id="date-section2"></main>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous" />
        </div>
    )
}

