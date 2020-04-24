import React, { component } from 'react';
import $ from 'jquery';


export default class Modify extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getData.php");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                var box = document.getElementById("modify_pop_display");
                var box2 = document.getElementById("modify_pop_display2");
                box.innerHTML = "";
                box2.innerHTML = "";
                if (data.Total != 0) {
                    for (var i = 0; i < data.Total; i++) {
                        var elem = document.createElement("option");
                        elem.value = data.employee[i].googleId;
                        elem.textContent = data.employee[i].first_name + ", " + data.employee[i].last_name;
                        box.appendChild(elem);
                    } 

                    for (var i = 0; i < data.Total; i++) {
                        var elem = document.createElement("option");

                        elem.value = data.employee[i].googleId;
                        elem.textContent = data.employee[i].first_name + ", " + data.employee[i].last_name;
                        box2.appendChild(elem);
                    }
                }
            };
        }
        xhr.send();

        var dept = new XMLHttpRequest();
        dept.open("GET", "http://localhost:8080/crud/api/getDept.php");
        dept.onreadystatechange = function () {
            if (dept.readyState == 4) {
                var data = JSON.parse(dept.responseText);
                console.log(data);
                var box = document.getElementById("modify_pop_display3");
                box.innerHTML = "";
                if (data.deptCount != 0) {
                    for (var i = 0; i < data.deptCount; i++) {
                        var elem = document.createElement("Option");
                        elem.value = data.dept[i].id;
                        elem.textContent = data.dept[i].name;
                        box.appendChild(elem);
                    }
                }
            };
        }
        dept.send();

        $("#modify_bg").click(() => {
            $("#modify_pop").hide();
        });

        $("#modify_bg2").click(() => {
            $("#modify_pop2").hide();
        });

        $("#modify_bg3").click(() => {
            $("#modify_pop3").hide();
        });

        $("#modify_pop_assign").click(() => {
            var member = document.getElementById("addTo_dept").id;
            var dept = localStorage.getItem("dept");
            var dd = new XMLHttpRequest();
            dd.open("GET", "http://localhost:8080/crud/api/assignDeptHead.php?i=" + member + "&d=" + dept);
            dd.onreadystatechange = function () {
                if (dd.readyState == 4) {
                    $("#modify_pop").hide();
                };
            }
            dd.send();
        });


        $("#modify_pop_assign2").click(() => {
            var member = document.getElementById("addTo_dept2").value;
            var dept = localStorage.getItem("dept");
            xhr.open("GET", "http://localhost:8080/crud/api/addToDept.php?i=" + member + "&d=" + dept);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    $("#modify_pop2").hide();
                };
            }
            xhr.send();
        });


        $("#modify_pop_assign3").click(() => {
            var dept = document.getElementById("modify_pop_display3").value;
            var member = localStorage.getItem("prn");
            xhr.open("GET", "http://localhost:8080/crud/api/addToDept.php?i=" + member + "&d=" + dept);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    console.log(xhr.responseText);
                    $("#modify_pop3").hide();
                };
            }
            xhr.send();
        });
    }
    render() {
        return (
            <>
                <div className="modify_popup" id="modify_pop">
                    <div className="modify_popup_bg" id="modify_bg"></div>
                    <div id="modidy_body">
                        <h2>Assign a department head</h2>
                        <br /><hr /><br /><br />
                        <p><i>Previouse holder will be set to unassigned. Lookup their IDs</i></p>
                        <br /><br />
                        <input type="text" className="modify_pop_dis" placeholder="search" id="addTo_dept" list="modify_pop_display" />
                        <datalist id="modify_pop_display">
                        </datalist ><br />
                        <button className="modify_pop_assi" id="modify_pop_assign">Assign</button>
                    </div>
                </div>
                <div className="modify_popup" id="modify_pop2">
                    <div className="modify_popup_bg" id="modify_bg2"></div>
                    <div id="modidy_body">
                        <h2>Add a person</h2> <br /><hr /> <br /><br />
                        <input type="text" className="modify_pop_dis" placeholder="search their IDs" id="addTo_dept2" list="modify_pop_display2" />
                        <datalist  id="modify_pop_display2">
                        </datalist ><br />
                        <button className="modify_pop_assi" id="modify_pop_assign2">Add</button>
                    </div>
                </div>
                <div className="modify_popup" id="modify_pop3">
                    <div className="modify_popup_bg" id="modify_bg3"></div>
                    <div id="modidy_body">
                        <h2>Add to a department</h2> <br /><hr /> <br /><br />
                        <select className="modify_pop_dis" id="modify_pop_display3">
                        </select><br />
                        <button className="modify_pop_assi" id="modify_pop_assign3">Add</button>
                    </div>
                </div>
            </>
        )
    }
}