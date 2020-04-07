import React, { component } from 'react';
import { Link } from 'react-router-dom';
import css from './style/modify.css';
import $ from 'jquery';

import loading from '../item/loading.gif'
var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Novr", "Dec"];
var id;
var person;
export default class Modify extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        id = this.props.match.params.id;
        person = this.props.match.params.person;
    }

    componentDidMount() {
        turn(false);
        printAllEmployees("first_name");

        if (person == null || person == 0) {
            document.getElementById("modify_lookup").style.display = "none";
        } else {
            printLookupUser(person);
        }

        $(".modify_sort_action")[0].click(() => {
            turn(false);
            printAllEmployees(document.getElementsByClassName("modify_sort_value")[0].value);
        });
        $(".modify_sort_action")[1].click(() => {
            turn(false);
            printAllEmployees(document.getElementsByClassName("modify_sort_value")[0].value);
        });
        $(".modify_sort_action")[2].click(() => {
            turn(false);
            printAllEmployees(document.getElementsByClassName("modify_sort_value")[0].value);
        });

        $("#modify_action_delete").click(() => {
            deletePerson();
        });
        $("#modify_action_approve").click(() => {

        });
        $("#modify_action_assign").click(() => {

        });
    }
    render() {

        const imgProfile = {
            marginLeft: "45%",
            marginTop: "30%",
            width: "100px"
        }
        return (
            <>
                <div id="modify_container">
                    <div id="modify_header">
                        <h2 id="modify_header_total"></h2>
                    </div>
                    <div id="modify_display_Sort">
                        <h4>Sort By:</h4>
                        <select id="offSiteSort" class="modify_sort_value">
                            <option className="modify_sort_action" value="first_name">First Name</option>
                            <option className="modify_sort_action" value="last_name">Last Name</option>
                            <option className="modify_sort_action" value="employee_status DESC">status</option>
                        </select>
                    </div>
                    <div id="modify_user_display">
                    </div>
                    <div id="modify_user_display2">
                        <img id="pending_img" src={loading} style={imgProfile} />
                    </div>
                </div>

                <div id="modify_lookup">
                    <div id="modify_lookup_header">
                        <h2 id="modify_lookup_name"></h2><br />
                        <p id="modify_lookup_email"></p>
                        <p id="modify_lookup_id"></p>
                    </div>
                    <div id="modify_lookup_display">
                        <div id="modify_lookup_actions">
                            <button id="modify_action_delete" onclick={deletePerson} >Delete person</button>
                            <button id="modify_action_approve">Approve pending</button>
                            <button id="modify_action_assign">Assign department</button>
                        </div>
                        <div id="modify_lookup_details">
                            <center><h3>Pening requests</h3></center>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
function deletePerson() {
    alert(document.getElementById("modify_action_delete").className);
}
function printLookupUser(person) {
    var lookupdata = new XMLHttpRequest();
    lookupdata.open("GET", "http://localhost:8080/crud/api/getperson.php?i=" + person);
    lookupdata.onreadystatechange = function () {
        if (lookupdata.readyState == 4) {
            console.log(person);
            if (lookupdata.responseText != "false") {
                var data = JSON.parse(lookupdata.responseText);
                document.getElementById("modify_lookup_name").innerHTML = data.employee.first_name + ", " + data.employee.last_name;
                document.getElementById("modify_lookup_email").innerHTML = data.employee.email;
                document.getElementById("modify_lookup_id").innerHTML = data.employee.employee_status;

                if (data.employee.employee_status == "pending") {
                    document.getElementById("modify_action_approve").disabled = false;
                } else {
                    document.getElementById("modify_action_approve").disabled = true;
                    document.getElementById("modify_action_approve").textContent = "already approved";
                }
                document.getElementById("modify_action_delete").className = data.employee.googleId;
                printRequests(data.employee.googleId);
            } else {
                console.log("user not found");
                document.getElementById("modify_lookup").style.display = "none";
            }
        }
    }
    lookupdata.send();
}

function printRequests(id) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/crud/api/getInbox.php?i=" + id);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            var box = document.getElementById("modify_lookup_details");
            var data = JSON.parse(request.responseText);
            if (data.Total != 0) {
                for (var i = 0; i < data.Total; i++) {
                    box.appendChild(requestItem(data.item[i]));
                }
            } else {
                document.getElementById("modify_lookup_details").innerHTML = "<center>nothing to show here</center>";
            }
        }
    }
    request.send();
}

function requestItem(person) {

    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "OffsiteSatus";
    OffsiteSatus.className = "item" + person.googleId;
    OffsiteSatus.style.width = "70%";
    OffsiteSatus.style.marginLeft = "15%";

    var OffsiteSatus_top = document.createElement("div");
    OffsiteSatus_top.id = "OffsiteSatus_top_inbox";
    OffsiteSatus_top.style.gridTemplateColumns = "70% 30%";
    var OffsiteSatus_bottom = document.createElement("div");
    OffsiteSatus_bottom.id = "OffsiteSatus_bottom";

    var offInfo = document.createElement("div");
    offInfo.id = "offInfo";
    var type = document.createElement("h2");
    type.textContent = person.category + " Days";

    var offInfo2 = document.createElement("div");

    var aprv_btn = document.createElement("button");
    aprv_btn.textContent = "approve";
    aprv_btn.id = "aprv_btn";
    aprv_btn.style.padding = "10px";
    aprv_btn.onclick = function () {
        Approved(person, "true");
    };

    var decl_btn = document.createElement("button");
    decl_btn.textContent = "decline";
    decl_btn.style.padding = "10px";
    decl_btn.id = "decl_btn";
    decl_btn.onclick = function () {
        Approved(person, "false");
    };


    offInfo.appendChild(type);
    offInfo2.appendChild(aprv_btn);
    offInfo2.appendChild(decl_btn);

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
    OffsiteSatus_top.appendChild(offInfo2);
    OffsiteSatus_bottom.appendChild(offsiteLeft);
    OffsiteSatus_bottom.appendChild(offsiteRight);
    OffsiteSatus.appendChild(OffsiteSatus_top);
    OffsiteSatus.appendChild(OffsiteSatus_bottom);
    return OffsiteSatus;
}

function printAllEmployees(x) {
    let item;
    let img;
    let info;
    let btn;
    let emptyDiv;
    let name;
    let info_bottom;
    let email;
    let active;
    let dept;
    let br;
    let a;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/getdataByOrder.php?order=" + x);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var data = JSON.parse(xhr.responseText);
            var Everyone = document.getElementById("modify_user_display");
            Everyone.innerHTML = "";
            turn(true);

            document.getElementById("modify_header_total").innerHTML = "Everyone: " + data.Total + " found";
            for (var i = 0; i < data.Total; i++) {
                item = document.createElement("div");
                item.id = "modify_user_item";

                img = document.createElement("img");
                img.src = data.employee[i].img;
                img.id = "modify_user_img";

                info = document.createElement("div");
                info.id = "modify_user_info";

                btn = document.createElement("button");
                btn.className = data.employee[i].googleId;
                a = document.createElement("a");
                a.id = "modify_linkto_lookup";
                if (person == null) {
                    a.href = "http://localhost:3000/profile/modify/" + id + "\/" + data.employee[i].googleId;
                    console.log("null");
                    console.log(a.href);
                } else {
                    a.href = data.employee[i].googleId;
                }

                a.innerHTML = '&#9830;';
                btn.appendChild(a);
                //FOR INFO
                emptyDiv = document.createElement("div");
                br = document.createElement("BR");

                name = document.createElement("h3");
                name.id = "modify_user_info_name";
                name.textContent = data.employee[i].first_name + ", " + data.employee[i].last_name;

                info_bottom = document.createElement("div");
                info_bottom.id = "modify_user_info_bottom";

                //for bottom info
                email = document.createElement("a");
                email.id = "modify_user_info_email";
                email.textContent = data.employee[i].email;

                active = document.createElement("label");
                active.id = "offsiteActivity";
                active.textContent = data.employee[i].employee_status;

                dept = document.createElement("label");
                dept.id = "modify_user_info_dept";
                dept.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    data.employee[i].employee_status;

                info_bottom.appendChild(active);
                info_bottom.appendChild(dept);
                info.appendChild(emptyDiv);
                info.appendChild(name);
                info.appendChild(email);
                info.appendChild(info_bottom);
                item.appendChild(img);
                item.appendChild(info);
                item.appendChild(a);
                Everyone.appendChild(item);
            }
        }
    }; xhr.send();

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

function turn(x) {
    if (x) {
        document.getElementById("modify_user_display2").style.display = "none";
        document.getElementById("modify_user_display").style.display = "block";
    }
    else {
        document.getElementById("modify_user_display2").style.display = "block";
        document.getElementById("modify_user_display").style.display = "none";
    }
}