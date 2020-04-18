import React, { Component } from 'react'
import $ from 'jquery';
var mon = [
    "January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];
var today = new Date(),
    dd = String(today.getDate()).padStart(2),
    mm = String(today.getMonth() + 1),
    yyyy = today.getFullYear(),
    currentDate = new Date(),
    change = false,
    change2 = false,
    listened = false,
    grab1 = "",
    grab2 = "",
    forToday;

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
            forToday = request;
            grab1 = [null, null, null, null, null, null, null, null, null, null, null, null];
            grab2 = [null, null, null, null, null, null, null, null, null, null, null, null];
            listened = false;

            //adjust formating for events before or after month
            for (var i = 0; i < request.Total; i++) {
                if (new Date(request.request[i].Start).getMonth() != new Date(request.request[i].End).getMonth()) {
                    if (parseInt(new Date(request.request[i].End).getMonth()) === parseInt(mm - 1)) {
                        grab2[i] = request.request[i].id;
                    }
                    if (new Date(request.request[i].End).getMonth() == mm - 2) {
                        grab1[i] = request.request[i].id;
                    }
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

                function appecndReserve(k) {
                    var reserve = document.createElement("div");
                    reserve.className = "reserve";
                    reserve.id = "r_" + request.request[k].category;
                    reserve.style.transition = "all 0.3s ease-in-out";

                    if (!isTextAddForReserve[k]) {
                        isTextAddForReserve[k] = !isTextAddForReserve[k];
                        reserve.textContent = request.request[k].category + ":  " + request.request[k].first_name + ", " + request.request[k].last_name.substr(0, 1);
                    }
                    reserve.setAttribute('style', "background-color: " + "#" + request.request[k].color);
                    return reserve;
                }

                if (request.Total > 0) {
                    for (var k = 0; k < request.Total; k++) {

                        //render dates from request object
                        if (i >= new Date(request.request[k].Start).getDate() && i <= new Date(request.request[k].End).getDate()) {
                            reserveCont.appendChild(appecndReserve(k));
                        }

                        //render dates that start from the month before
                        if (grab1[k] == request.request[k].id && i <= new Date(request.request[k].End).getDate()) {
                            reserveCont.appendChild(appecndReserve(k));
                        }
                        //render dates that continue till next month
                        if (grab2[k] === request.request[k].id && i >= new Date(request.request[k].Start).getDate()) {
                            reserveCont.appendChild(appecndReserve(k));
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
                    } else if (i == (currentDate.getDate() - 1)) {
                        dayText.style.backgroundColor = "#2F93F2";
                        dayText.style.padding = "7px 4px 5px 5px";
                        dayText.style.color = "white";
                        dayText.style.marginLeft = "-5px";
                        dayText.style.width = "100px";
                        dayText.style.borderBottomRightRadius = "10px";
                    }
                }
            }

            //listener for each box of the day
            var tempper = document.getElementsByClassName("day");
            for (var i = 0; i < tempper.length; i++) {
                tempper[i].addEventListener("click", function () {
                    pullUpDay((mm - 1), (parseInt(this.id) + 1)); //pulling up that day
                })
            }

        }

        //grabs events from db through XHR requests than it is parsed as JSON
        function getRequestList() {
            $("#displayFor").text(mon[mm - 1]);

            var all = new XMLHttpRequest();
            all.open("GET", "http://localhost:8080/crud/api/getCalendarRequest.php?y=" + yyyy + "&m=" + (mm - 1));
            all.onreadystatechange = function () {
                if (all.readyState == 4) {
                    try {
                        var data = JSON.parse(all.responseText);
                        if (data.Total != 0) {
                            prntCal(data);
                            if (window.location.href.search("calendar") != -1) {
                                displayStatusOfMonth(data);
                                printAmountofoffTypes();
                                showIfOrNotEmpty(true);
                            }
                        } else {
                            if (window.location.href.search("calendar") != -1) {
                                showIfOrNotEmpty(false);
                            }
                            console.log("no events to show");
                            printEmpty();
                        }
                    } catch (e) {
                        console.log(e);
                        printEmpty();
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

function showIfOrNotEmpty(isNot) {
    if (isNot) {
        document.getElementById("cal_side_offtype_list").style.display = "grid";
        document.getElementById("cal_side_Display").style.display = "grid";
        document.getElementById("cal_side_organizer").style.display = "grid";
        document.getElementById("cal_side_event_container").style.display = "grid";
        document.getElementById("cal_side_empty").style.display = "none";
    } else {
        document.getElementById("cal_side_offtype_list").style.display = "none";
        document.getElementById("cal_side_Display").style.display = "none";
        document.getElementById("cal_side_organizer").style.display = "none";
        document.getElementById("cal_side_event_container").style.display = "none";
        document.getElementById("cal_side_empty").style.display = "grid";
    }
}

function printSideCal_items(person) {
    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "OffsiteSatus";
    OffsiteSatus.style.animation = "slideInLeft 0.5s";

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

    var dept = document.createElement("p");
    dept.innerHTML = person.dept;

    offInfo.appendChild(first_name);
    offInfo.appendChild(email);
    offInfo.appendChild(dept);
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
    btn1.textContent = mon[start.getMonth() + 1] + ", " + (start.getDate() + 1) + " " + start.getFullYear();
    var btn2 = document.createElement("button");
    btn2.id = "requestActivity";
    btn2.textContent = mon[end.getMonth() + 1] + ", " + (end.getDate() + 1) + " " + end.getFullYear();
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

function pullUpDay(month, day) {
    document.getElementById("popupDisplay").style.display = "block";
    document.getElementById("popDate").innerHTML = day + " " + mon[month - 1] + ", " + yyyy;
    var all = new XMLHttpRequest();
    all.open("GET", "http://localhost:8080/crud/api/getCalendarDay.php?y=" + yyyy + "&m=" + month + "&d=" + day);
    all.onreadystatechange = function () {
        if (all.readyState == 4) {
            try {
                var data = JSON.parse(all.responseText);
                console.log(data);
                document.getElementById("cal_pop_amt_").textContent = data.Total + " For this day";
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
    all.send();
}

function displayStatusOfMonth(data) {
    var box = document.getElementById("cal_side_Display");
    box.innerHTML = "";
    if (data.Total != 0) {
        for (var i = 0; i < data.Total; i++) {
            box.appendChild(printSideCal_items(data.request[i]));
        }
    }
}

function printAmountofoffTypes() {
    var offTypes_List = new XMLHttpRequest();
    offTypes_List.open("GET", "http://localhost:8080/crud/api/getRequestType_cal.php?y=" + yyyy + "&m=" + (mm - 1));
    offTypes_List.onreadystatechange = function () {
        if (offTypes_List.readyState == 4) {
            try {

                //print both total offtypes and offtype controls
                var data = JSON.parse(offTypes_List.responseText);
                var box = document.getElementById("cal_side_offtype_list");
                var box2 = document.getElementById("cal_side_organizer_displayer");
                box.innerHTML = "";
                box2.innerHTML = "";
                for (var i = 0; i < data.Total; i++) {
                    box.appendChild(renderOffType_Item(data.off[i]));
                    box2.appendChild(renderOffType_controls(data.off[i]));
                }


                //listeners for reserve elements for control checkboxes
                var controls = document.getElementsByClassName("cal_side_organizer_item");
                for (var i = 0; i < controls.length; i++) {
                    controls[i].addEventListener("click", (elem) => {
                        var res = document.getElementsByClassName("reserve");
                        for (var k = 0; k < res.length; k++) {
                            if (res[k].id == elem.srcElement.id) {
                                if (!elem.explicitOriginalTarget.checked) {
                                    res[k].style.opacity = "0";
                                } else {
                                    res[k].style.opacity = "1";
                                }
                            }
                        }
                    });
                }
            } catch (e) { console.log(e); }
        }
    }
    offTypes_List.send();
}

function renderOffType_Item(data) {
    var item = document.createElement("div");
    item.className = "cal_side_actions";
    item.style.animation = "fadeIn 0.8s";

    var left = document.createElement("div");
    left.style.float = "left";
    left.textContent = data.name;

    var right = document.createElement("div");
    right.style.float = "right";
    right.textContent = data.value;

    item.appendChild(left);
    item.appendChild(right);
    return item;
}

function renderOffType_controls(data) {
    var item = document.createElement("div");
    item.className = "cal_side_organizer_item";

    var left = document.createElement("input");
    left.type = "checkbox";
    left.className = "cal_organizer_type";
    left.id = "r_" + data.name;

    if (data.value > 0) {
        left.checked = "checked";
    }
    var right = document.createElement("label");
    right.textContent = data.name;

    item.appendChild(left);
    item.appendChild(right);
    return item;
}