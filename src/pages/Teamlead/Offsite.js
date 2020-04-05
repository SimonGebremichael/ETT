import pro from './pics/profile.png';
import React, { Component } from 'react'

export default class offsite extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.user = localStorage.getItem("access");
    }

    componentDidMount() {
        var colours2 = ["lightblue", "lightgreen", "pink", "salmon"],
            colours3 = ["Remote", "Vacation", "Bithday", "Sick"];

        var elem = document.getElementsByClassName("upcomming_Type  ");
        var elem2 = document.getElementsByClassName("offsite_Right");
        for (var i = 0; i < elem.length; i++) {
            var rand = (Math.floor(Math.random() * 4) + 1) - 1;
            elem[i].style.backgroundColor = colours2[rand];
            elem2[i].innerHTML = colours3[rand];
        }


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
                    console.log(data);
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
                try {
                    var data = JSON.parse(offsite.responseText);
                    var box = document.getElementById("offsiteDisplay");
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
                </div>
            </div>
        )
    }
}

function OffsiteItem(person) {

    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "OffsiteSatus";
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

    var offsiteLeft = document.createElement("div");
    offsiteLeft.id = "offsiteLeft";
    var btn1 = document.createElement("button");
    btn1.id = "requestActivity";
    btn1.textContent = "Feb.17.20";
    var btn2 = document.createElement("button");
    btn2.id = "requestActivity";
    btn2.textContent = "Feb.17.20";
    offsiteLeft.appendChild(btn1);
    offsiteLeft.innerHTML += "&nbsp;&nbsp;";
    offsiteLeft.appendChild(btn2);


    var offsiteRight = document.createElement("div");
    offsiteRight.id = "offsiteRight";
    offsiteRight.className = "offsite_Right";
    var label = document.createElement("label")
    label.textContent = "remote";
    offsiteRight.appendChild(label);

    OffsiteSatus.appendChild(offImg);
    OffsiteSatus.appendChild(offInfo);
    OffsiteSatus.appendChild(offsiteLeft);
    OffsiteSatus.appendChild(offsiteRight);
    return OffsiteSatus;
}