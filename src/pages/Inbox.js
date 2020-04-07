import React, { Component, createElement } from 'react'
import loading from './item/loading.gif';
var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Novr", "Dec"];

export default class Inbox extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        turn(true);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getInbox.php?i=" + localStorage.getItem("access"));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var box = document.getElementById("Inbox_display");
                try {
                    var data = JSON.parse(xhr.responseText);
                    turn(false);
                    if (data.Total != 0) {
                        document.getElementById("dashHeader_lbl").innerHTML += "  " + data.Total; 
                        for (var i = 0; i < data.Total; i++) {
                            box.appendChild(OffsiteItem(data.item[i]));
                        }
                    } else {
                        document.getElementById("dashHeader_lbl").innerHTML +="  " + 0; 
                        box.innerHTML = "nothing to show here";
                    }
                } catch (e) {
                    console.log(e);
                    box.innerHTML = "there seems to be an issue :(";
                }
            }
        }
        xhr.send();
     }

    render() {
        return (
            <div id="Dashboard_cont">
                <div id="dashHeader">
                    <h2 id="dashHeader_lbl">Inbox:</h2>
                </div>
                <div id="dash_body">
                    
                    <div id="Inbox_display">
                    <h3>Pending:</h3>
                    </div>
                    <div id="Inbox_Display_loading">
                        <img src={loading} style={loadingImg} />
                    </div>
                </div>
            </div>
        )
    }
}

const loadingImg = {
    width: "100px",
    marginLeft: "40%",
    marginTop: "20%",
    opacity: "0.6"
}

function turn(x) {
    if (x) {
        document.getElementById("Inbox_display").style.display = "none";
        document.getElementById("Inbox_Display_loading").style.display = "block";
    }
    else {
        document.getElementById("Inbox_display").style.display = "block";
        document.getElementById("Inbox_Display_loading").style.display = "none";
    }
}

function OffsiteItem(person) {

    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "OffsiteSatus";

    var OffsiteSatus_top = document.createElement("div");
    OffsiteSatus_top.id = "OffsiteSatus_top";
    OffsiteSatus_top.style.gridTemplateColumns = "none";
    var OffsiteSatus_bottom = document.createElement("div");
    OffsiteSatus_bottom.id = "OffsiteSatus_bottom";

    var br = document.createElement("BR");

    var offInfo = document.createElement("div");
    offInfo.id = "offInfo";
    var type = document.createElement("h2");
    type.textContent = person.category + " Days";
    offInfo.appendChild(type);
    offInfo.appendChild(br);

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
    label.textContent = "pending";
    offsiteRight.appendChild(label);

    OffsiteSatus_top.appendChild(offInfo);
    OffsiteSatus_bottom.appendChild(offsiteLeft);
    OffsiteSatus_bottom.appendChild(offsiteRight);
    OffsiteSatus.appendChild(OffsiteSatus_top);
    OffsiteSatus.appendChild(OffsiteSatus_bottom);
    return OffsiteSatus;
}