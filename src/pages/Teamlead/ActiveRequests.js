import React, { component } from 'react';
import $ from 'jquery'
import loading from '../item/loading.gif';
var mon = ["Jan", "Feb", "Mar", "Apr",
           "May", "Jun", "Jul", "Aug",
           "Sept", "Oct", "Novr", "Dec"];

export default class AcctiveRequests extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = this.props.children;
        this.user = props.id;
    }
    componentDidMount = () => {
        turn(true);
        printControlBtns();
        getData("all");
    }

    render() {
        return (
            <div id="mainFeed">
                <div id="mainAcctions"><br /><br /><br />
                    <h2>Active Requests:</h2>
                    <div id="dash_acctionButtons">
                    </div>
                </div><br />
                <h3 id="PendingAmt"></h3><br />
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
    marginLeft: "45%",
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
    var user = localStorage.getItem("access");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/getrequests.php?o=" + x + "&i=" + user);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var box = document.getElementById("displayRequests");
            box.innerHTML = "";
            turn(false);
            try {
                var data = JSON.parse(xhr.responseText);
                document.getElementById("PendingAmt").innerHTML = data.Total + " Pending";
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

function printControlBtns() {
    var user = localStorage.getItem("access");
    var offsitesBtns = new XMLHttpRequest();
    offsitesBtns.open("GET", "http://localhost:8080/crud/api/getofftype.php");
    offsitesBtns.onreadystatechange = function () {
        if (offsitesBtns.readyState == 4) {
            var box = document.getElementById("displayRequests");
            box.innerHTML = "";
            turn(false);
            try {
                var data = JSON.parse(offsitesBtns.responseText);
                var box = document.getElementById("dash_acctionButtons");
                if (data.Total != 0) {
                    for (var i = 0; i < data.Total; i++) {
                        var o = document.createElement("button");
                        o.id = data.offtype[i].name;
                        o.className = "acctionBtn";
                        o.innerHTML = data.offtype[i].name;
                        box.appendChild(o);
                    }
                    var o = document.createElement("button");
                    o.id = "all";
                    o.className = "acctionBtn";
                    o.innerHTML = "all";
                    box.appendChild(o);
                }

                //controls for which type of requests to show
                var controls = document.getElementsByClassName("acctionBtn");
                for (var i = 0; i < controls.length; i++) {
                    controls[i].addEventListener("click", (elem) => {
                        for (var i = 0; i < controls.length; i++) {
                            controls[i].style.backgroundColor = "black";
                        }

                        turn(true);
                        getData(elem.srcElement.id);
                        document.getElementById(elem.srcElement.id).style.backgroundColor = "#333";
                        document.getElementById(elem.srcElement.id).blur();
                    });
                }

            } catch (e) {
                console.log(e);
                box.innerHTML = "there seems to be an issue :(";
            }
        }
    }
    offsitesBtns.send();
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
    var days = document.createElement("label");
    days.innerHTML = " " + person.days + " day(s)";

    var dept = document.createElement("p");
    dept.innerHTML = person.dept;

    offInfo.appendChild(first_name);
    offInfo.appendChild(br);
    offInfo.appendChild(email);
    offInfo.appendChild(br);
    offInfo.appendChild(dept);
    offInfo.appendChild(br);
    offInfo.appendChild(days);
    offInfo.appendChild(br);
    offInfo.appendChild(active);

    var memo = document.createElement("label");
    memo.innerHTML = person.memo;
    memo.style.fontSize = "10px";
    memo.style.margin = "10px 0px 0px 0px";

    var request_btn_cont = document.createElement("div");
    request_btn_cont.id = "request_btn_cont";

    if (person.googleId != localStorage.getItem("access")) {
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
    }


    var end = new Date(person.end);
    var start = new Date(person.start);
    var offsiteLeft = document.createElement("div");
    offsiteLeft.id = "offsiteLeft";
    offsiteLeft.style.backgroundColor = "#" + person.color;
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
                if (xhr.responseText.length == 0) {
                    $(".item" + person.googleId).fadeToggle();
                    setOffsiteStatus();
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

function setOffsiteStatus(){
  var offsite = new XMLHttpRequest();
  offsite.open("GET", "http://localhost:8080/crud/api/UpdatePersonStatus.php");
  offsite.onreadystatechange = function () {
    if (offsite.readyState == 4) {
        if(offsite.responseText.length.length != 0){
          console.log(offsite.responseText);
        }
      }
  }
  offsite.send();
}