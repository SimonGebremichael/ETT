import React, { component } from 'react';
import { Link } from 'react-router-dom';
import css from './style/modify.css'

export default class Modify extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = this.props.children;
    }

    componentDidMount() {
        let person;
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

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getdata.php");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);

                var Everyone = document.getElementById("modify_user_display");
                Everyone.innerHTML = "";

                document.getElementById("modify_header_total").innerHTML = "Everyone: " + data.Total + " found";
                for (var i = 0; i < data.Total; i++) {
                    person = document.createElement("div");
                    person.id = "modify_user_item";

                    img = document.createElement("img");
                    img.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FHeWCkLSbB-0%2Fmaxresdefault.jpg&f=1&nofb=1";
                    img.id = "modify_user_img";

                    info = document.createElement("div");
                    info.id = "modify_user_info";

                    btn = document.createElement("button");
                    btn.innerHTML = '&#9830;';

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
                    person.appendChild(img);
                    person.appendChild(info);
                    person.appendChild(btn);
                    Everyone.appendChild(person);

                }
            }
        }; xhr.send();


    }
    render() {
        return (
            <>
                <div id="modify_container">
                    <div id="modify_header">
                        <h2 id="modify_header_total"></h2>
                    </div>
                    <div id="modify_display_Sort">
                        <h4>Sort By:</h4>
                        <select id="offSiteSort" value="Recent">
                            <option value="First">First Name</option>
                            <option value="Last">Last Name</option>
                            <option value="ZA">Z - A</option>
                        </select>
                    </div>
                    <div id="modify_user_display">
                    </div>
                </div>

                <div id="modify_lookup">
                    <div id="modify_lookup_header">
                        <h2>same smith</h2>
                    </div>
                    <div id="modify_lookup_display">
                        <div id="modify_lookup_actions">
                            <button>Delete person</button>
                            <button>change name</button>
                            <button>remove requests</button>
                            <button>Delete person</button>
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