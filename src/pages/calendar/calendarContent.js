import React, { Component } from 'react'

export default class Socki extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            colours = ["-", "lightblue", "-", "lightgreen", "pink", "-", "lightgreen", "-"];

        var today = new Date(),
            dd = String(today.getDate()).padStart(2),
            mm = String(today.getMonth() + 1).padStart(2),
            yyyy = today.getFullYear(),
            currentDate = new Date();

        var change = false,
            change2 = false,
            listened = false;

        var d = document;
        if (true) { prntCal(); } //one time fire

        function prntCal() {

            //reset cal 
            const box = document.getElementById("date-section2");
            box.innerHTML = "";

            var Starting_dayOfTheWeek = new Date(yyyy, mm - 1, 0).getDay();
            let temp;
            let dayText;
            let res1;
            let res2;

            document.getElementById("dateTitle").innerHTML = mon[mm - 1] + ", " + yyyy;
            for (var i = 0; i < Starting_dayOfTheWeek + 1; i++) {
                if (Starting_dayOfTheWeek != 6) {
                    var emptyFeild = document.createElement("div");
                    box.appendChild(emptyFeild);
                }
            }

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
                temp.appendChild(dayText);

                var press = colours[Math.floor((Math.random() * 6) + 1)];
                if (press != "-") {
                    res1 = document.createElement("div");
                    res1.className = "reserve";
                    res1.setAttribute('style', "background-color: " + press);
                    temp.appendChild(res1);
                }

                var press2 = colours[Math.floor((Math.random() * 6) + 1)];
                if (press2 != "-") {
                    res2 = document.createElement("div");
                    res2.className = "reserve";
                    res2.setAttribute('style', "background-color: " + press2);
                    temp.appendChild(res2);
                }

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
                    document.getElementsByClassName("Calendar")[0].style.filter = "blur(2px)";
                    try {
                        document.getElementById("sideCal").style.filter = "blur(2px)";
                    } catch (e) { 
                        document.getElementById("expo_container").style.filter = "blur(2px)";
                    }
                    document.getElementById("popDate").innerHTML = this.id;
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
                    prntCal();
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
                    prntCal();
                }
            });
            document.getElementById("calNav2").addEventListener("mouseup", function () { change2 = false; });
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
        <div id="calendar">
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