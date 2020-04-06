import React from 'react'
import loading from '../item/loading.gif';
import { getDefaultNormalizer } from '@testing-library/react';
var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Novr", "Dec"];

export default class upcomming extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.user = localStorage.getItem("access");
    }

    componentDidMount() {
        turn(true);
        getData("recent");

        document.getElementById("offsote_acc_recent").addEventListener("click", () => {
            turn(true);
            getData("recent");
        });

        document.getElementById("offsote_acc_month").addEventListener("click", () => {
            turn(true);
            getData("month");
        });

        document.getElementById("offsote_acc_year").addEventListener("click", () => {
            turn(true);
            getData("year");
        });
    }
    render() {
        return (
            <div id="upcomming">
                <div id="upcomingTittile">
                    <h2>Upcomming Offsites:</h2>
                </div><br />
                <div id="upcommingSort">
                    <h4>Sort By:</h4>
                    <select id="offSiteSort">
                        <option id="offsote_acc_recent" value="recent">Recent</option>
                        <option id="offsote_acc_month" value="month">This Month</option>
                        <option id="offsote_acc_year" value="year">This Year</option>
                    </select>
                </div>

                <div id="upcommingResults">

                </div>
                <div id="upcommingResults_Loading">
                    <img src={loading} style={loadingImg} />
                </div>
            </div>
        )
    }
}
function getData(order) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/getUpcommingOffsites.php?o=" + order);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var box = document.getElementById("upcommingResults");
            box.innerHTML = "";
            try {
                var data = JSON.parse(xhr.responseText);
                turn(false);
                if (data.Total != 0) {
                    for (var i = 0; i < data.Total; i++) {
                        box.appendChild(OffsiteItem(data.request[i]));
                    }
                } else {
                    box.innerHTML = "no comming offsites :)";
                }
            } catch (e) {
                console.log(e);
                box.innerHTML = "there seems to be an issue :(";
            }
        }
    }
    xhr.send();
}

const loadingImg = {
    width: "100px",
    marginLeft: "35%",
    marginTop: "20%",
    opacity: "0.6"
}

function OffsiteItem(person) {

    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "OffsiteSatus";


    var OffsiteSatus_top = document.createElement("div");
    OffsiteSatus_top.id = "OffsiteSatus_top";

    var OffsiteSatus_bottom = document.createElement("div");
    OffsiteSatus_bottom.id = "OffsiteSatus_bottom";

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

    var end = new Date(person.end);
    var start = new Date(person.start);
    var offsiteLeft = document.createElement("div");
    offsiteLeft.id = "offsiteLeft";
    offsiteLeft.style.backgroundColor = "#" + person.color;
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

function turn(x) {
    if (x) {
        document.getElementById("upcommingResults").style.display = "none";
        document.getElementById("upcommingResults_Loading").style.display = "block";
    }
    else {
        document.getElementById("upcommingResults").style.display = "block";
        document.getElementById("upcommingResults_Loading").style.display = "none";
    }
}