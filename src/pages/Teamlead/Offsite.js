import pro from './pics/profile.png';
import React, { Component } from 'react'
import loading from '../item/loading.gif';
var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Novr", "Dec"];

export default class offsite extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.user = localStorage.getItem("access");

    }

    componentDidMount() {
        turn(true);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getperson.php?i=" + this.user);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    document.getElementById("dash_side_name").innerHTML = data.employee.first_name + ", " + data.employee.last_name;
                    document.getElementById("dash_side_email").innerHTML = data.employee.email;
                    document.getElementById("offsiteActivity_Main").innerHTML = data.employee.employee_status;
                    document.getElementsByClassName("offsite_acc_img")[0].src = data.employee.img;

                    console.log(data.employee.googleId);
                    console.log(localStorage.getItem("access"));
                    if (data.employee.googleId != localStorage.getItem("access")) {
                        window.location.href = "http://localhost:8080/";
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        xhr.send();

        var offsite = new XMLHttpRequest();
        offsite.open("GET", "http://localhost:8080/crud/api/getOffSite.php");
        offsite.onreadystatechange = function () {
            if (offsite.readyState == 4) {
                var box = document.getElementById("offsiteDisplay");
                try {
                    var data = JSON.parse(offsite.responseText);
                    turn(false);
                    if (data.Total != 0) {
                        for (var i = 0; i < data.Total; i++) {
                            box.appendChild(OffsiteItem(data.employee[i]));
                        }
                    } else {
                        box.innerHTML = "everyone's onsite :)";
                    }
                } catch (e) {
                    console.log(e);
                    box.innerHTML = "there seems to be an issue :(";
                }
            }
        }
        offsite.send();

    }

    render() {
        return (
            <div id="sideBar">
                <div id="sideAcc">
                    <table>
                        <tr>
                            <td id="accImgBox">
                                <img src={pro} id="accImg" className="offsite_acc_img" />
                            </td>
                            <td id="accInfo">
                                <label id="dash_side_name"></label><br />
                                <label id="dash_side_email"></label><br />
                                <button id="offsiteActivity_Main"></button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="sideOffsite">
                    <h3>Currently Offsite:</h3>
                    <div id="offsiteDisplay">
                    </div>
                    <div id="offsiteDisplay_loading">
                        <img src={loading} style={loadingImg} />
                    </div>
                </div>
            </div>
        )
    }
}

const loadingImg = {
    width: "100px",
    marginLeft: "35%",
    marginTop: "20%",
    opacity: "0.6"
}

function turn(x) {
    if (x) {
        document.getElementById("offsiteDisplay").style.display = "none";
        document.getElementById("offsiteDisplay_loading").style.display = "block";
    }
    else {
        document.getElementById("offsiteDisplay").style.display = "block";
        document.getElementById("offsiteDisplay_loading").style.display = "none";
    }
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