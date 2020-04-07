import React, { component } from 'react';
import $ from 'jquery'
import loading from '../item/loading.gif';
var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Novr", "Dec"];

export default class AcctiveRequests extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = this.props.children;
        this.user = props.id;
    }
    componentDidMount = () => {
        turn(true);
        getData("all");
        $("#remoteBtn").on("click", () => {
            turn(true);
            getData("remote");
        });
        $("#vacationBtn").on("click", () => {
            turn(true);
            getData("vacation");
        });
        $("#birthdayBtn").on("click", () => {
            turn(true);
            getData("birthday");
        });
        $("#sickBtn").on("click", () => {
            turn(true);
            getData("sick");
        });
        $("#allBtn").on("click", () => {
            turn(true);
            getData("all");
        });
    }

    render() {

        return (
            <div id="mainFeed">
                <div id="mainAcctions"><br /><br /><br />
                    <h2>Active Requests:</h2>

                    <div id="acctionButtons">
                        <input type="button" id="remoteBtn" class="acctionBtn" value="Remote" />
                        <input type="button" id="vacationBtn" class="acctionBtn" value="Vacation" />
                        <input type="button" id="birthdayBtn" class="acctionBtn" value="Birthdays" />
                        <input type="button" id="sickBtn" class="acctionBtn" value="Sick" />
                        <input type="button" id="allBtn" class="acctionBtn" value="All" />
                    </div>
                </div><br />
                <h3 id="PendingAmt">5 Pending:</h3><br />
                <div id="displayRequests">

                </div>
                <div id="displayRequests_loader">
                    <img src={loading} style={loadingImg} />
                </div>
            </div>
        )
    }
}

const loadingImg = {
    width: "100px",
    marginLeft: "35%",
    marginTop: "10%",
    opacity: "0.6"
}

function turn(x) {
    if (x) {
        document.getElementById("displayRequests").style.display = "none";
        document.getElementById("displayRequests_loader").style.display = "block";
    }
    else {
        document.getElementById("displayRequests").style.display = "block";
        document.getElementById("displayRequests_loader").style.display = "none";
    }
}
function getData(x) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/getrequests.php?o=" + x);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var box = document.getElementById("displayRequests");
            box.innerHTML = "";
            turn(false);
            try {
                var data = JSON.parse(xhr.responseText);
                if (data.Total != 0) {
                    for (var i = 0; i < data.Total; i++) {
                        box.appendChild(printRequest(data.request[i]));
                    }
                } else {
                    box.innerHTML = "<br /><br />nothing to show here :).";
                }
            } catch (e) {
                console.log(e);
                box.innerHTML = "there seems to be an issue :(";
            }
        }
    }
    xhr.send();
}

function printRequest(person) {
    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "request_item_Satus";
    OffsiteSatus.style.animation = "all 0.7s ease-in-out";
    OffsiteSatus.className = "item" + person.googleId;

    var OffsiteSatus_top = document.createElement("div");
    OffsiteSatus_top.id = "requestSatus_top";

    var OffsiteSatus_bottom = document.createElement("div");
    OffsiteSatus_bottom.id = "requestSatus_bottom";

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

    var memo = document.createElement("label");
    memo.innerHTML = person.memo;
    memo.style.fontSize = "10px";
    memo.style.margin = "10px 0px 0px 0px";

    var request_btn_cont = document.createElement("div");
    request_btn_cont.id = "request_btn_cont";

    var aprv_btn = document.createElement("button");
    aprv_btn.textContent = "approve";
    aprv_btn.id = "aprv_btn";
    aprv_btn.onclick = function () {
        Approved(person, "true");
    };

    var decl_btn = document.createElement("button");
    decl_btn.textContent = "decline";
    decl_btn.id = "decl_btn";
    decl_btn.onclick = function () {
        Approved(person, "false");
    };

    request_btn_cont.appendChild(aprv_btn);
    request_btn_cont.appendChild(decl_btn);

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
    label.style.textShadow = "3px 3px 13px black";
    offsiteRight.appendChild(label);

    OffsiteSatus_top.appendChild(offImg);
    OffsiteSatus_top.appendChild(offInfo);
    OffsiteSatus_top.appendChild(memo);
    OffsiteSatus_top.appendChild(request_btn_cont);
    OffsiteSatus_bottom.appendChild(offsiteLeft);
    OffsiteSatus_bottom.appendChild(offsiteRight);
    OffsiteSatus.appendChild(OffsiteSatus_top);
    OffsiteSatus.appendChild(OffsiteSatus_bottom);
    return OffsiteSatus;
}

function Approved(person, x) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/approveRequest.php?i=" + person.id + "&t=" + x);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            try {
                var data = Boolean(xhr.responseText);
                if (data) {
                    $(".item" + person.googleId).fadeToggle();
                } else {
                    alert("there seems to be an issue");
                }
            } catch (e) {
                console.log(e);
                alert("there seems to be an issue");
            }
        }
    }
    xhr.send();
}