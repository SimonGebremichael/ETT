import React, { component } from 'react';
import { Link } from 'react-router-dom';
import css from './style/modify.css';
import Popup from './modify_popup';
import $ from 'jquery';
import loading from '../item/loading.gif'

var mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Novr", "Dec"];
var id;
var selected_D;
export default class Modify extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        id = this.props.match.params.id;
    }


    componentDidMount() {
        turn(false);
        turn_M(true);
        printLookupUser(localStorage.getItem("access"));
        printAllEmployees("first_name");
        grabDept(1);

        $(".modify_sort_action").click((data) => {
            turn(false);
            printAllEmployees(data.target.value);
        });
        $("#modify_action_delete").click(() => {
            deletePerson();
        });
        $("#modify_action_approve").click(() => {
            approvePerson();
        });

        $("#department_selection").click((elem) => {
            var g = $("#department_selection").val();
            console.log(g[0]);
            grabDept(g[0]);
        });

        $("#modify_action_pending").click(() => {
            turn_M(true);
        });

        $("#modify_action_offsite").click(() => {
            turn_M(false);
        });

        $("#department_actions_cont").click((elem) => {
            if (elem.target.id == "d_action_name") {
                changeDeptName(selected_D);
            } else if (elem.target.id == "d_action_new") {
                createDept();
            } else if (elem.target.id == "d_action_delete") {
                deleteDept();
            } else if (elem.target.id == "d_action_assign") {
                $("#modify_pop").show();
            } else if (elem.target.id == "d_action_add__") {
                $("#modify_pop2").show();
            }
        });

        $("#modify_action_assign").click((elem) => {
            $("#modify_pop3").show();
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
                <Popup />
                <div id="modify_page_holder">
                    <div id="modify_lookup">
                        <div id="modify_lookup_header">
                            <h2 id="modify_lookup_name"></h2><br />
                            <p id="modify_lookup_email"></p>
                            <p id="modify_lookup_id"></p>
                            <p id="modify_lookup_dept"></p>
                        </div>
                        <div id="modify_lookup_display">
                            <div id="modify_lookup_actions">
                                <button id="modify_action_delete">Delete person</button>
                                <button id="modify_action_approve">Approve pending</button>
                                <button id="modify_action_assign">Assign department</button>
                                <button id="modify_action_pending">View Pending</button>
                                <button id="modify_action_offsite">Modify offsites</button>
                            </div>
                            <div id="modify_lookup_details">
                                <center><h3>Pending requests</h3></center>
                            </div>
                            <div id="modify__offsite_container">
                                <center><h3>Entitled days</h3></center>
                                <center><p id="modify__offsite_container_err"></p></center>
                                <div id="modify__off_display">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="department_lookup">
                        <div id="department_top">
                            <div id="department_details">
                                <h1 id="dept_num_message"></h1>
                            </div>
                            <div id="dept_delection_cont">
                                <h3>Departments</h3>
                                <select id="department_selection" multiple>
                                </select>
                            </div>
                        </div>
                        <div id="department_actions_cont">
                            <button id="d_action_delete">Delete Dept</button>
                            <button id="d_action_assign">Assign Dept head</button>
                            <button id="d_action_name">Change name</button>
                            <button id="d_action_add__">Add members</button>
                            <button id="d_action_new">New Dept</button>
                        </div>
                        <div id="department_bottom">
                            <div id="department_lookup_cont">
                                <center><h4>department head</h4></center>
                                <div id="department_lookup_head">
                                </div>
                            </div>
                            <div id="department_lookup_members">
                                <center><h4 id="department_lookup_members_total"></h4></center>
                                <div id="department_lookup_members_display">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="modify_container">
                        <div id="modify_header">
                            <h2 id="modify_header_total"></h2>
                        </div>
                        <div id="modify_display_Sort">
                            <h4>Sort By:</h4>
                            <select id="offSiteSort" class="modify_sort_value">
                                <option className="modify_sort_action" value="first_name">First Name</option>
                                <option className="modify_sort_action" value="last_name">Last Name</option>
                                <option className="modify_sort_action" value="employee_status DESC">Pending</option>
                            </select>
                        </div>
                        <div id="modify_user_display">
                        </div>
                        <div id="modify_user_display2">
                            <img id="pending_img" src={loading} style={imgProfile} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function getDeptslist(person) {
    var x = localStorage.getItem("prn");
    var site = new XMLHttpRequest();
    site.open("GET", "http://localhost:8080/crud/api/getOffsites_list.php?i=" + person);
    site.onreadystatechange = function () {
        if (site.readyState == 4) {
            try {
                var data = JSON.parse(site.responseText);
                var box = document.getElementById("modify__off_display");
                box.innerHTML = "";
                for (var i = 0; i < data.Total; i++) {
                    box.appendChild(printD_list(data.off[i]));
                }
            } catch (e) { console.log(e); }
        }
    }
    site.send();
}

function printD_list(data) {
    var cont = document.createElement("div");
    cont.className = "mod_off_feilds";
    cont.style.border = "5px solid white";

    var info = document.createElement("div");
    info.style.backgroundColor = "#" + data.color;
    info.style.width = "94%";
    var lbl = document.createElement("h3");
    lbl.textContent = data.name;
    lbl.style.color = "white";
    lbl.style.width = "50%";
    info.style.height = "30px";
    info.style.paddingLeft = "10px";
    info.style.paddingTop = "5px";
    info.appendChild(lbl);

    var bottom = document.createElement("div");
    bottom.className = "mod_off_bottom";

    var input = document.createElement("input");
    input.className = "mod_off_input";
    input.type = "text";
    input.value = data.value;
    input.placeholder = "entitled amount";
    input.id = "in_" + data.id;

    var Update = document.createElement("div");
    Update.className = "mod_off_inputBTn";
    Update.textContent = "Update";
    Update.onclick = () => {
        updateDept(data);
    }
    var details = document.createElement("div");
    details.style.display = "grid";
    details.style.gridTemplateColumns = "65% 35%";
    details.style.paddingTop = "5px";

    var taken = document.createElement("label");
    taken.textContent = "Taken: " + data.taken;
    taken.style.fontSize = "10px";

    var taken2 = document.createElement("label");
    taken2.textContent = "Remaining: " + data.remaining;
    taken2.style.fontSize = "10px";

    details.appendChild(taken);
    details.appendChild(taken2);
    bottom.appendChild(input);
    bottom.appendChild(Update);
    cont.appendChild(info);
    cont.appendChild(bottom);
    cont.appendChild(details);
    return cont;
}

function updateDept(data) {
    var value = document.getElementById("in_" + data.id).value;
    try {
        var num = parseInt(value);
        if (value.length > 0) {
            var update = new XMLHttpRequest();
            update.open("GET", "http://localhost:8080/crud/api/updateOfftypes.php?i=" + data.id + "&v=" + num + "&t=" + data.taken + "&t=" + data.taken);
            update.onreadystatechange = function () {
                if (update.readyState == 4) {
                    try {
                        getDeptslist(data.googleId);
                        console.log(update.responseText);
                    } catch (e) { console.log(e); }
                }
            }
            update.send();
        } else {
            var err = document.getElementById("modify__offsite_container_err");
            err.textContent = "no value";
        }
    } catch (e) {
        console.log(e);
        var err = document.getElementById("modify__offsite_container_err");
        err.textContent = "not a number";
    }
}

function grabDept(x) {
    var dept = new XMLHttpRequest();
    dept.open("GET", "http://localhost:8080/crud/api/getDeptPeople.php?d=" + x);
    dept.onreadystatechange = function () {
        if (dept.readyState == 4) {
            try {
                var data = JSON.parse(dept.responseText);
                var box = document.getElementById("department_lookup_members_display");
                var head = document.getElementById("department_lookup_head");
                document.getElementById("department_lookup_members_total").textContent = data.Total + " members";
                var selction = document.getElementById("department_selection");
                selected_D = x;
                localStorage.setItem("dept", selected_D);
                if (data.Total != 0) {
                    box.innerHTML = "";
                    for (var i = 0; i < data.Total; i++) {
                        box.appendChild(OffsiteItem(data.employee[i]));
                    }
                } else {
                    box.innerHTML = "";
                }
                if (data.headAmt != 0) {
                    head.innerHTML = "";
                    for (var i = 0; i < data.headAmt; i++) {
                        head.appendChild(OffsiteItem(data.head));
                    }
                } else {
                    head.innerHTML = "";
                }

                if (data.deptCount != 0) {
                    selction.innerHTML = "";
                    for (var i = 0; i < data.deptCount; i++) {
                        selction.appendChild(printDeptSelection(data.dept[i]));
                        if (data.dept[i].id == x) {
                            document.getElementById("dept_num_message").innerHTML = "#" + x + "<br />" + data.dept[i].name;
                        }
                    }
                }
            } catch (e) { console.log(e); }
        }
    }
    dept.send();
}

function printDeptSelection(data) {
    var dept = document.createElement("Option");
    dept.textContent = data.name;
    dept.value = data.id;

    if (selected_D == data.id) {
        dept.selected = "selected";
    }
    return dept;
}

function changeDeptName(x) {
    var newName = prompt("new department name");
    if (newName != "" && newName != null) {
        var change = new XMLHttpRequest();
        change.open("GET", "http://localhost:8080/crud/api/updateDeptName.php?d=" + x + "&n=" + newName);
        change.onreadystatechange = function () {
            if (change.readyState == 4) {
                try {
                    if (change.responseText.length == 2) {
                        grabDept(x);
                    } else {
                        console.error("error with updating dept name");
                    }
                } catch (e) { console.log(e); }
            }
        }
        change.send();
    }
}

function createDept() {
    var newName = prompt("Department name");
    if (newName != "" && newName != null) {
        var change = new XMLHttpRequest();
        change.open("GET", "http://localhost:8080/crud/api/createDept.php?n=" + newName);
        change.onreadystatechange = function () {
            if (change.readyState == 4) {
                try {
                    var testVar = parseInt(change.responseText);
                    console.log(change.responseText);
                    grabDept(testVar);
                } catch (e) { console.error("error with updating dept name"); console.log(e); }
            }
        }
        change.send();
    }
}

function deleteDept() {
    var con = window.confirm("do you want to remove this department?");
    if (con) {
        var del = new XMLHttpRequest();
        del.open("GET", "http://localhost:8080/crud/api/deleteDept.php?d=" + selected_D);
        del.onreadystatechange = function () {
            if (del.readyState == 4) {
                try {
                    var testVar = parseInt(del.responseText);
                    console.log(del.responseText);
                    // alert("removed");
                    grabDept(1);
                } catch (e) {

                    console.error("error with updating dept name");
                    console.log(e);
                }
            }
        }
        del.send();
    }
}

function OffsiteItem(person) {
    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "OffsiteSatus";
    OffsiteSatus.style.animation = "fadeIn 0.4s";

    var OffsiteSatus_top = document.createElement("div");
    OffsiteSatus_top.id = "OffsiteSatus_top";
    OffsiteSatus_top.style.display = "grid";
    OffsiteSatus_top.style.gridTemplateColumns = "30% 70%";
    OffsiteSatus_top.style.borderRadius = "10px";
    OffsiteSatus_top.style.marginTop = "30px";
    OffsiteSatus_top.style.backgroundColor = "lightgrey";

    var OffsiteSatus_bottom = document.createElement("div");
    OffsiteSatus_bottom.id = "OffsiteSatus_bottom";
    OffsiteSatus_bottom.style.borderRadius = "10px";
    OffsiteSatus_bottom.style.display = "grid";
    OffsiteSatus_bottom.style.gridTemplateColumns = "70% 30%";

    var br = document.createElement("BR");

    var offImg = document.createElement("div");
    offImg.style.paddingTop = "0%";
    offImg.id = "offImg";
    var img = document.createElement("img");
    img.src = person.img;
    img.id = "OffsiteImg";
    offImg.appendChild(img);

    var offInfo = document.createElement("div");
    offInfo.id = "offInfo";
    offInfo.style.fontSize = "15px";
    offInfo.style.paddingLeft = "30px";
    var first_name = document.createElement("label");
    first_name.textContent = person.first_name + ", " + person.last_name;
    var active = document.createElement("button");
    active.id = "offsiteActivity";
    active.textContent = person.employee_status;
    offInfo.appendChild(first_name);
    offInfo.appendChild(br);
    offInfo.appendChild(active);

    OffsiteSatus_top.appendChild(offImg);
    OffsiteSatus_top.appendChild(offInfo);
    OffsiteSatus.appendChild(OffsiteSatus_top);
    return OffsiteSatus;
}

function deletePerson() {
    var id = document.getElementById("modify_action_delete").className;
    if (window.confirm("user is to be deleted?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/deletePerson.php?i=" + id);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                try {
                    var data = parseInt(xhr.responseText);
                } catch (e) {
                    document.getElementById("modify_action_approve").textContent = "Error occured :(";
                }
            }
        }
        xhr.send();
    }
}

function approvePerson() {
    var id = document.getElementById("modify_action_delete").className;
    document.getElementById("modify_action_approve").disabled = true;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/approvePerson.php?i=" + id);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            try {
                var data = parseInt(xhr.responseText);
                document.getElementById("modify_action_approve").textContent = "Approved";
            } catch (e) {
                document.getElementById("modify_action_approve").textContent = "Error occured :(";
            }
        }
    }
    xhr.send();
}

function printLookupUser(person) {
    getDeptslist(person);
    var lookupdata = new XMLHttpRequest();
    lookupdata.open("GET", "http://localhost:8080/crud/api/getperson.php?i=" + person);
    lookupdata.onreadystatechange = function () {
        if (lookupdata.readyState == 4) {
            localStorage.setItem("prn", person);
            var data = JSON.parse(lookupdata.responseText);
            $("#modify_lookup").css("display", "block");
            if (data.Total != 0) {
                $("#modify_lookup_name").text(data.employee.first_name + ", " + data.employee.last_name);
                $("#modify_lookup_email").text(data.employee.email);
                $("#modify_lookup_id").text(data.employee.employee_status);
                $("#modify_lookup_dept").text(data.employee.dept);
                data.employee.employee_status != "pending" ? $("#modify_action_approve").css("display", "none") : $("#modify_action_approve").css("display", "block");
                document.getElementById("modify_action_delete").className = data.employee.googleId;
                printPendingRequests(data.employee.googleId);
            } else {
                $("#modify_lookup").css("display", "block");
                $("#modify_lookup_name").text("user not found");
            }
        }
    }
    lookupdata.send();
}

function printPendingRequests(id) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/crud/api/getInbox.php?i=" + id);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            var box = document.getElementById("modify_lookup_details");
            box.innerHTML = "";
            var data = JSON.parse(request.responseText);
            if (data.Total != 0) {
                for (var i = 0; i < data.Total; i++) {
                    box.appendChild(pendingRequestItem(data.item[i]));
                }
            } else {
                document.getElementById("modify_lookup_details").innerHTML = "<center>nothing to show here</center>";
            }
        }
    }
    request.send();
}

function pendingRequestItem(person) {

    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "req_" + person.id;
    OffsiteSatus.className = "request_item_Satus";
    OffsiteSatus.style.borderRadius = "10px";

    OffsiteSatus.style.animation = "all 0.7s ease-in-out";
    OffsiteSatus.style.width = "70%";
    OffsiteSatus.style.marginLeft = "15%";

    var OffsiteSatus_top = document.createElement("div");
    OffsiteSatus_top.id = "requestSatus_top";
    OffsiteSatus_top.style.display = "grid";
    OffsiteSatus_top.style.gridTemplateColumns = "70% 30%";

    var OffsiteSatus_bottom = document.createElement("div");
    OffsiteSatus_bottom.id = "requestSatus_bottom";
    OffsiteSatus_bottom.style = "grid";
    OffsiteSatus_bottom.gridTemplateColumns = "70% 30%";

    var offInfo = document.createElement("div");
    offInfo.id = "offInfo";
    var type = document.createElement("h2");
    type.textContent = person.category + " Days";

    var offInfo2 = document.createElement("div");
    var cancel = document.createElement("button");

    offInfo.appendChild(type);
    var user = localStorage.getItem("access");
    if (user != person.googleId) {
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
        offInfo2.appendChild(aprv_btn);
        offInfo2.appendChild(decl_btn);
    }else{
        cancel.textContent = "cancel";
        cancel.style.padding = "5px";
        cancel.style.border = "none";
        cancel.style.marginTop = "10px";
        cancel.style.color = "white";
        cancel.style.width = "100%";
        cancel.className = "inbox_cancel_btn";
        cancel.onclick = function () {
            removeItem(person);
        };
    }

    

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
    label.textContent = person.days + " Day(s)";
    offsiteRight.appendChild(label);

    OffsiteSatus_top.appendChild(offInfo);
    OffsiteSatus_top.appendChild(offInfo2);
    OffsiteSatus_bottom.appendChild(offsiteLeft);
    OffsiteSatus_bottom.appendChild(offsiteRight);
    OffsiteSatus.appendChild(OffsiteSatus_top);
    if (user == person.googleId) {
    OffsiteSatus.append(cancel);
    }
    OffsiteSatus.appendChild(OffsiteSatus_bottom);
    return OffsiteSatus;
}

function removeItem(person) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/deleteRequest.php?i=" + person.id);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            try {
                var data = Boolean(xhr.responseText);
                console.log(xhr.responseText);
                if (data) {
                    $("#reg_" + person.id).fadeToggle();
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

function printAllEmployees(x) {
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
                Everyone.appendChild(printSomeone(data.employee[i]));
            }

            var emp = document.getElementsByClassName("employee");
            for (var i = 0; i < emp.length - 1; i++) {
                $("#" + emp[i].id).click((eleme) => {
                    printLookupUser(eleme.currentTarget.id.substr(1, eleme.currentTarget.id.length - 1));
                });
            }
        }
    };
    xhr.send();
}

function printSomeone(person) {
    var item;
    var img;
    var info;
    var btn;
    var emptyDiv;
    var name;
    var info_bottom;
    var email;
    var active;
    var dept;
    var br;
    item = document.createElement("div");
    item.id = "modify_user_item";

    img = document.createElement("img");
    img.src = person.img;
    img.id = "modify_user_img";

    info = document.createElement("div");
    info.id = "modify_user_info";

    btn = document.createElement("button");
    btn.className = "employee";
    btn.id = "e" + person.googleId;
    btn.innerHTML = '&#9830;';


    //FOR INFO
    emptyDiv = document.createElement("div");
    br = document.createElement("BR");

    name = document.createElement("h3");
    name.id = "modify_user_info_name";
    name.textContent = person.first_name + ", " + person.last_name;

    info_bottom = document.createElement("div");
    info_bottom.id = "modify_user_info_bottom";

    //for bottom info
    email = document.createElement("a");
    email.id = "modify_user_info_email";
    email.textContent = person.email;

    active = document.createElement("label");
    active.id = "offsiteActivity";
    active.textContent = person.employee_status;

    var isAssigned = person.dept;
    dept = document.createElement("label");
    dept.id = "modify_user_info_dept";
    if (isAssigned != 0) {
        dept.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            person.dept;
    } else { dept.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Not Assigned"; }

    info_bottom.appendChild(active);
    info_bottom.appendChild(dept);
    info.appendChild(emptyDiv);
    info.appendChild(name);
    info.appendChild(email);
    info.appendChild(info_bottom);
    item.appendChild(img);
    item.appendChild(info);
    item.appendChild(btn);
    return item;
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

function turn_M(x) {
    if (x) {
        document.getElementById("modify__offsite_container").style.display = "none";
        document.getElementById("modify_lookup_details").style.display = "block";
    }
    else {
        document.getElementById("modify__offsite_container").style.display = "block";
        document.getElementById("modify_lookup_details").style.display = "none";
    }
}

