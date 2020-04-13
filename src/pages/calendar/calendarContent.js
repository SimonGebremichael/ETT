import React, { Component } from 'react'
import $ from 'jquery';
var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today = new Date(),
    dd = String(today.getDate()).padStart(2),
    mm = String(today.getMonth() + 1),
    yyyy = today.getFullYear(),
    currentDate = new Date(),
    change = false,
    change2 = false,
    listened = false,
    d = document;
var grab = "";
export default class Socki extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        getRequestList();
        function prntCal(request) {
            var box = document.getElementById("date-section2");
            box.innerHTML = "";
            document.getElementById("dateTitle").innerHTML = mon[mm - 1] + ", " + yyyy;

            grab = "";
            listened = false;

            //adjust formating for events before or after month
            for (var i = 0; i < request.Total; i++) {
                if (new Date(request.request[i].End).getMonth() == mm) {
                    request.request[i].End = yyyy + "-" + mm + "-" + new Date(yyyy, mm, 0).getDate();
                }
                if (new Date(request.request[i].Start).getMonth() == mm - 2) {
                    grab += "wq" + request.request[i].id + ",";
                }
            }

            //empty boxes for grid go have month start on the right day
            var Starting_dayOfTheWeek = new Date(yyyy, mm - 1, 0).getDay();
            for (var i = 0; i < Starting_dayOfTheWeek + 1; i++) {
                if (Starting_dayOfTheWeek != 6) {
                    var emptyFeild = document.createElement("div");
                    box.appendChild(emptyFeild);
                }
            }

            //titles for event print once
            var numeroPerguntas = request.Total;
            var isTextAddForReserve = new Array(numeroPerguntas).fill(false);

            for (var i = 0; i < new Date(yyyy, mm, 0).getDate(); i++) {
                var temp = document.createElement("div");
                temp.className = "day";
                temp.id = i;
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
                temp.onclick = function (elem) {
                    pullUpDay(elem);
                }

                var dayText = document.createElement("label");
                dayText.textContent = i + 1;
                dayText.style.marginLeft = "5px";
                temp.appendChild(dayText);

                var reserveCont = document.createElement("div");
                reserveCont.id = "r" + temp.id;
                reserveCont.className = "reserveCont";
                var hoverText = document.createElement("div");
                hoverText.id = "h" + temp.id;
                hoverText.style.display = "none";


                if (request.Total > 0) {
                    var ids = grab.substr(0, grab.length - 1).split(",");
                    for (var k = 0; k < request.Total; k++) {
                        if (i >= new Date(request.request[k].Start).getDate() && i <= new Date(request.request[k].End).getDate()) {
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

                        if (ids[k] == "wq" + request.request[k].id && i <= new Date(request.request[k].End).getDate() && new Date(request.request[k].End).getMonth() == mm - 1) {
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
                    }
                } else { console.log('No upcoming events found.'); }
                hoverText.innerHTML = "<br /><h3>" + reserveCont.childNodes.length + "</h3>";
                hoverText.innerHTML += "<h4>event(s)</h4>";
                hoverText.style.textAlign = "center";

                temp.appendChild(reserveCont);
                temp.appendChild(hoverText);
                box.appendChild(temp);
                if (currentDate.getMonth() == mm - 1 && currentDate.getFullYear() == yyyy) {
                    if (i < currentDate.getDate()) {
                        temp.style.opacity = "0.4";
                    } else if (i == currentDate.getDate()) {
                        dayText.style.backgroundColor = "#2F93F2";
                        dayText.style.padding = "5px 10px 5px 10px";
                        dayText.style.color = "white";
                        dayText.style.borderRadius = "10px";
                    }
                }
            }

            if (window.location.href.search("calendar") != -1) {
                $("#displayFor").text(mon[mm - 1]);
            }
        }

        function getRequestList() {
            var all = new XMLHttpRequest();
            all.open("GET", "http://localhost:8080/crud/api/getCalendarRequest.php?y=" + yyyy + "&m=" + mm);
            all.onreadystatechange = function () {
                if (all.readyState == 4) {
                    try {
                        var data = JSON.parse(all.responseText);
                        var box = document.getElementById("cal_side_Display");
                        box.innerHTML = "";
                        if (data.Total != 0) {
                            if (data.Total != 0) {
                                for (var i = 0; i < data.Total; i++) {
                                    box.appendChild(printSideCal_items(data.request[i]));
                                }
                            }
                            prntCal(data);
                        } else {
                            console.log("no events to show");
                            printEmpty();
                        }
                    } catch (e) {
                        console.log(e);
                        console.log("there seems to be an issue :(");
                    }
                }
            }
            all.send();
        }


        $("#calNav1").click(() => {
            mm--;
            if (!change) {
                if (mm <= 0) {
                    mm = 12;
                    yyyy--;
                }
                today = new Date(yyyy, mm, 0);
                change = true;
                listened = false;
                getRequestList();
            }
        });
        $("#calNav1").mouseup(() => { change = false; });

        $("#calNav2").click(() => {
            mm++;
            if (!change2) {
                if (mm >= 13) {
                    mm = 1;
                    yyyy++;
                }
                today = new Date(yyyy, mm, 0);
                change2 = true;
                listened = false;
                getRequestList();
            }
        });
        $("#calNav2").mouseup(() => { change2 = false; });

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

function printSideCal_items(person) {
    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "OffsiteSatus";

    var OffsiteSatus_top = document.createElement("div");
    OffsiteSatus_top.id = "OffsiteSatus_top";
    OffsiteSatus_top.style.display = "grid";
    OffsiteSatus_top.style.borderTopLeftRadius = "10px";
    OffsiteSatus_top.style.borderTopRightRadius = "10px";
    OffsiteSatus_top.style.gridTemplateColumns = "30% 70%";
    OffsiteSatus_top.style.marginTop = "30px";
    OffsiteSatus_top.style.backgroundColor = "lightgrey";

    var OffsiteSatus_bottom = document.createElement("div");
    OffsiteSatus_bottom.id = "OffsiteSatus_bottom";
    OffsiteSatus_bottom.style.display = "grid";
    OffsiteSatus_bottom.style.borderBottomLeftRadius = "10px";
    OffsiteSatus_bottom.style.borderBottomRightRadius = "10px";
    OffsiteSatus_bottom.style.gridTemplateColumns = "70% 30%";

    var br = document.createElement("BR");

    var offImg = document.createElement("div");
    offImg.id = "offImg";
    var img = document.createElement("img");
    img.src = person.img;
    img.id = "OffsiteImg";
    offImg.appendChild(img);

    var offInfo = document.createElement("div");
    offInfo.id = "offInfo";
    var first_name = document.createElement("label");
    first_name.textContent = person.first_name + ", " + person.last_name;
    var email = document.createElement("label");
    email.innerHTML = "<br /> " + person.email;
    var active = document.createElement("button");
    active.id = "offsiteActivity";
    active.textContent = person.employee_status;
    offInfo.appendChild(first_name);
    offInfo.appendChild(br);
    offInfo.appendChild(email);
    offInfo.appendChild(br);
    offInfo.appendChild(active);

    var end = new Date(person.End);
    var start = new Date(person.Start);
    var offsiteLeft = document.createElement("div");
    offsiteLeft.id = "offsiteLeft";
    offsiteLeft.style.borderRadius = "0px";
    offsiteLeft.style.backgroundColor = "#" + person.color;
    offsiteLeft.style.borderBottomLeftRadius = "10px";


    var btn1 = document.createElement("button");
    btn1.id = "requestActivity";
    btn1.textContent = mon[start.getMonth()] + ", " + start.getDate() + " " + start.getFullYear();
    var btn2 = document.createElement("button");
    btn2.id = "requestActivity";
    btn2.textContent = mon[end.getMonth()] + ", " + end.getDate() + " " + end.getFullYear();
    offsiteLeft.appendChild(btn1);
    offsiteLeft.innerHTML += "&nbsp;&nbsp;";
    offsiteLeft.appendChild(btn2);


    var offsiteRight = document.createElement("div");
    offsiteRight.id = "offsiteRight";
    offsiteRight.style.borderBottomRightRadius = "10px";
    offsiteRight.style.backgroundColor = "#" + person.color;
    offsiteRight.className = "offsite_Right";

    var label = document.createElement("label")
    label.textContent = person.category;
    offsiteRight.appendChild(label);

    OffsiteSatus_top.appendChild(offImg);
    OffsiteSatus_top.appendChild(offInfo);
    OffsiteSatus_bottom.appendChild(offsiteLeft);
    OffsiteSatus_bottom.appendChild(offsiteRight);
    OffsiteSatus.appendChild(OffsiteSatus_top);
    OffsiteSatus.appendChild(OffsiteSatus_bottom);
    return OffsiteSatus;
}

function printEmpty() {
    var box = document.getElementById("date-section2");
    box.innerHTML = "";
    document.getElementById("dateTitle").innerHTML = mon[mm - 1] + ", " + yyyy;

    //empty boxes for grid go have month start on the right day
    var Starting_dayOfTheWeek = new Date(yyyy, mm - 1, 0).getDay();
    for (var i = 0; i < Starting_dayOfTheWeek + 1; i++) {
        if (Starting_dayOfTheWeek != 6) {
            var emptyFeild = document.createElement("div");
            box.appendChild(emptyFeild);
        }
    }

    for (var i = 0; i < new Date(yyyy, mm, 0).getDate(); i++) {
        var temp = document.createElement("div");
        temp.className = "day";
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

        var dayText = document.createElement("label");
        dayText.textContent = i + 1;
        dayText.style.marginLeft = "5px";
        temp.appendChild(dayText);

        var reserveCont = document.createElement("div");
        reserveCont.id = "r" + temp.id;
        reserveCont.className = "reserveCont";
        var hoverText = document.createElement("div");
        hoverText.id = "h" + temp.id;
        hoverText.style.display = "none";
        hoverText.style.textAlign = "center";

        temp.appendChild(reserveCont);
        temp.appendChild(hoverText);
        box.appendChild(temp);
        if (currentDate.getMonth() == mm - 1 && currentDate.getFullYear() == yyyy) {
            if (i < currentDate.getDate()) {
                temp.style.opacity = "0.4";
            } else if (i == currentDate.getDate()) {
                dayText.style.backgroundColor = "#2F93F2";
                dayText.style.padding = "5px 10px 5px 10px";
                dayText.style.color = "white";
                dayText.style.borderRadius = "10px";
            }
        }
    }
}

function pullUpDay(day) {
    console.log(day);
    document.getElementById("popupDisplay").style.display = "block";
    var all = new XMLHttpRequest();
    all.open("GET", "http://localhost:8080/crud/api/getCalendarDay.php?y=" + yyyy + "&m=" + mm + "&d=" + day);
    all.onreadystatechange = function () {
        if (all.readyState == 4) {
            try {
                var data = JSON.parse(all.responseText);
                console.log(data);
                var box = document.getElementById("displayEvents");
                box.innerHTML = "";
                if (data.Total != 0) {
                    for (var i = 0; i < data.Total; i++) {
                        box.appendChild(printSideCal_items(data.request[i]));
                    }
                }
            } catch (e) {
                console.log(e);
                console.log("there seems to be an issue :(");
            }
        }
    }
    // all.send();
}

function pullUpItem(data) {

}