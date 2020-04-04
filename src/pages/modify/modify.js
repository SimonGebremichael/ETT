import React, { component } from 'react';
import { Link } from 'react-router-dom';
import css from './style/modify.css'
import loading from './style/loading.gif'
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
        getData("first_name");

        if (person == null || person == 0) {
            document.getElementById("modify_lookup").style.display = "none";
        } else {
            console.log(person);
            var lookupdata = new XMLHttpRequest();
            lookupdata.open("GET", "http://localhost:8080/crud/api/getperson.php?i=" + person);
            lookupdata.onreadystatechange = function () {
                if (lookupdata.readyState == 4) {
                    console.log(person);
                    if (lookupdata.responseText != "false") {
                        var data = JSON.parse(lookupdata.responseText);
                        document.getElementById("modify_lookup_name").innerHTML = data.employee.first_name + ", " + data.employee.last_name;
                        document.getElementById("modify_lookup_email").innerHTML = data.employee.email;
                        document.getElementById("modify_lookup_id").innerHTML = data.employee.googleId;

                        if (data.employee.googleId == "pending") {
                            document.getElementById("modify_action_approve").disabled = false;
                        } else {
                            document.getElementById("modify_action_approve").disabled = true;
                            document.getElementById("modify_action_approve").textContent = "already approved";
                        }
                    } else {
                        console.log("user not found");
                        document.getElementById("modify_lookup").style.display = "none";
                    }
                }
            }
            lookupdata.send();
        }

        document.getElementsByClassName("modify_sort_action")[0].addEventListener("click", () => {
            turn(false);
            getData(document.getElementsByClassName("modify_sort_value")[0].value);
        });
        document.getElementsByClassName("modify_sort_action")[1].addEventListener("click", () => {
            turn(false);
            getData(document.getElementsByClassName("modify_sort_value")[0].value);
        });
        document.getElementsByClassName("modify_sort_action")[2].addEventListener("click", () => {
            turn(false);
            getData(document.getElementsByClassName("modify_sort_value")[0].value);
        });

        document.getElementById("modify_action_delete").addEventListener("click", () => {

        });

        document.getElementById("modify_action_approve").addEventListener("click", () => {

        });

        document.getElementById("modify_action_assign").addEventListener("click", () => {

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
                            <option className="modify_sort_action" value="email">email</option>
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
                            <button id="modify_action_delete">Delete person</button>
                            <button id="modify_action_approve">Approve pending</button>
                            <button id="modify_action_assign">Assign department</button>
                        </div>
                        <div id="modify_lookup_details">
                            <center>nothing to show here</center>
                        </div>
                    </div>
                </div>
            </>
        )
    }
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

function getData(x) {
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
                    console.log("other");
                    console.log(a.href);

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
                active.textContent = "active";

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