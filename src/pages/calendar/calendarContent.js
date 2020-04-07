import React, { Component } from 'react'
import ApiCalendar from 'react-google-calendar-api';
import ApiCalendar2 from 'react-google-calendar-api/ApiCalendar';
var CLIENT_ID = '1048871087214-t3ttoli7jpjv5ep62qr91ftsh4hf7010.apps.googleusercontent.com';
var API_KEY = 'AIzaSyA0cfGXh6JoX0lXpYnjgTq09m62vO62TmM';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var events;
var requestList;


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

        // getEvents();

        getRequestList();

        function prntCal(request) {
            console.log(request);
            const box = document.getElementById("date-section2");
            box.innerHTML = "";
            var Starting_dayOfTheWeek = new Date(yyyy, mm - 1, 0).getDay();
            let temp;
            let dayText;
            document.getElementById("dateTitle").innerHTML = mon[mm - 1] + ", " + yyyy;


            for (var i = 0; i < request.Total; i++) {
                if (new Date(request.request[i].Start).getMonth() == mm - 2) {
                    request.request[i].Start = new Date(yyyy, mm-1, 0);
                }
            }
            for (var i = 0; i < request.Total; i++) {
                if (new Date(request.request[i].End).getMonth() == mm) {
                    request.request[i].End = new Date(yyyy, mm - 1, new Date(yyyy, mm, 0).getDate());
                }
            }

            for (var i = 0; i < Starting_dayOfTheWeek + 1; i++) {
                if (Starting_dayOfTheWeek != 6) {
                    var emptyFeild = document.createElement("div");
                    box.appendChild(emptyFeild);
                }
            }

            var numeroPerguntas = request.Total;
            var isTextAddForReserve = new Array(numeroPerguntas).fill(false);

            for (var i = 1; i <= new Date(yyyy, mm, 0).getDate(); i++) {
                temp = document.createElement("div");
                temp.className = "day";
                temp.id = i + "" + mon[mm - 1] + "," + yyyy;
                temp.padding = "5px";
                temp.style.animation = "slideInLeft 0." + i + "s";
                temp.onmouseover = function () {
                    document.getElementById("r" + this.id).style.display = "none";
                    document.getElementById("h" + this.id).style.display = "block";
                };
                temp.onmouseout = function () {
                    document.getElementById("r" + this.id).style.display = "block";
                    document.getElementById("h" + this.id).style.display = "none";
                };


                var br = document.createElement("BR");

                dayText = document.createElement("label");
                dayText.textContent = i;
                dayText.style.marginLeft = "5px";
                temp.appendChild(dayText);

                var reserveCont = document.createElement("div");
                reserveCont.id = "r" + temp.id;
                reserveCont.className = "reserveCont";
                var hoverText = document.createElement("div");
                hoverText.id = "h" + temp.id;
                hoverText.style.display = "none";


                if (request.Total > 0) {
                    for (var k = 0; k < request.Total; k++) {
                        if (i >= new Date(request.request[k].Start).getDate() + 1 && i <= new Date(request.request[k].End).getDate() + 1) {
                            var reserve = document.createElement("div");
                            reserve.id = "reserve";
                            reserve.className = "r" + temp.id;
                            if (!isTextAddForReserve[k]) {
                                isTextAddForReserve[k] = !isTextAddForReserve[k];
                                reserve.textContent = request.request[k].category + ":  " + request.request[k].first_name + ", " + request.request[k].last_name.substr(0, 1);
                            }
                            reserve.setAttribute('style', "background-color: " + "#" + request.request[k].color);
                            reserveCont.appendChild(reserve);
                        }
                        // else if (new Date(request.request[k].Start).getMonth() < mm - 1) {
                        //     alert("start " + new Date(request.request[k].Start).getMonth());
                        //     alert("mm " + mm);
                        //     // console.log("before start " + new Date(request.request[k].Start).getMonth() + ", before end " + new Date(request.request[k].End).getMonth());
                        //     // console.log(request.request[k].category + " " + mm);
                        //     // request.request[k].Start = new Date(yyyy, mm, 0);

                        // } else if (new Date(request.request[k].End).getMonth() >= mm) {
                        //     // alert(new Date(request.request[k].End).getMonth());
                        //     // alert(mm);
                        //     request.request[k].End = new Date(yyyy, mm, new Date(yyyy, mm, 0).getDate());
                        // }
                    }
                } else { console.log('No upcoming events found.'); }
                hoverText.innerHTML = "<br /><h3>" + reserveCont.childNodes.length + "</h3>";
                hoverText.innerHTML += "<h4>event(s)</h4>";
                hoverText.style.textAlign = "center";

                // if (events.length > 110) {
                //     for (var k = 0; k < events.length; k++) {
                //         if (new Date(events[k].start.dateTime).getMonth() == new Date(events[k].end.dateTime).getMonth()) {
                //             if (i >= new Date(events[k].start.dateTime).getDate() && i <= new Date(events[k].end.dateTime).getDate()) {
                //                 var reserve = document.createElement("div");
                //                 reserve.className = "reserve";
                //                 if (!isTextAddForReserve[k]) {
                //                     isTextAddForReserve[k] = !isTextAddForReserve[k];
                //                     reserve.textContent = events[k].summary;
                //                 }
                //                 reserve.setAttribute('style', "background-color: " + colours[k]);
                //                 temp.appendChild(reserve);
                //             }
                //         } else if (new Date(events[k].start.dateTime).getMonth() < mm - 1) {
                //             console.log("before start " + new Date(events[k].start.dateTime).getMonth() + ", before end " + new Date(events[k].end.dateTime).getMonth());
                //             console.log(events[k].summary + " " + mm);
                //             events[k].start.dateTime = new Date(yyyy, mm - 1, 0);

                //         } else if (new Date(events[k].end.dateTime).getMonth() >= mm) {
                //             // alert(events[k].end.dateTime);
                //             events[k].end.dateTime = new Date(yyyy, mm - 1, new Date(yyyy, mm, 0).getDate());
                //         }
                //     }

                // } else { console.log('No upcoming events found.'); }
                temp.appendChild(reserveCont);
                temp.appendChild(hoverText);
                box.appendChild(temp);
                //current day marker on calendar
                if (currentDate.getMonth() == mm - 1 && currentDate.getFullYear() == yyyy) {
                    if (i < currentDate.getDate()) {
                        temp.style.opacity = "0.4";
                    } else if (i == currentDate.getDate()) {
                        dayText.style.backgroundColor = "#2F93F2";
                        // dayText.style.marginTop = "5px";
                        dayText.style.padding = "5px 10px 5px 10px";
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
                });
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
                    getRequestList();
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
                    getRequestList();
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
                    getRequestList();
                });
            } else {
                events = null;
            }
        }


        function getRequestList() {
            var all = new XMLHttpRequest();
            all.open("GET", "http://localhost:8080/crud/api/getCalendarRequest.php?y=" + yyyy + "&m=" + mm);
            all.onreadystatechange = function () {
                if (all.readyState == 4) {
                    try {
                        var data = JSON.parse(all.responseText);
                        if (data.Total != 0) {
                            prntCal(data);
                        } else {
                            console.log("no events to show");
                            prntCal("false");
                        }
                    } catch (e) {
                        console.log(e);
                        console.log("there seems to be an issue :(");
                    }
                }
            }
            all.send();
        }

    }
    render() {
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
}
