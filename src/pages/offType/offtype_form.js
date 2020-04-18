import React, { Component } from 'react'
import css from './style/offtyper.css'
import check from './style/check.png'
import loading from '../item/loading.gif';
import $ from 'jquery';

export default class offTypes extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        turn(false);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getOffType.php");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    var box = document.getElementById("offtype_list_displayer");
                    box.style.overflowY = "auto";
                    box.style.height = "200px";
                    for (var i = 0; i < parseInt(data.Total); i++) {
                        box.appendChild(printOffsite(data.offtype[i]));
                    }
                } catch (e) { console.log(e); }
            }
        }
        xhr.send();

        document.getElementById("offtypeAddition_btn").addEventListener("click", () => {
            var name = document.getElementById("offtype_name").value;
            var limi = document.getElementById("offtype_limit").value;
            var limit = limi.replace(/[^0-9\.]+/g, "");
            var color = document.getElementById("offtype_colour").value;
            color = color.substr(1, color.length - 1);
            document.getElementById("offtype_errors").innerHTML = "";

            console.log(name);
            console.log(limit);
            console.log(color);
            try {
                var par = parseInt(limit);
                if (name.length != 0 && limit.length != 0) {
                    // turn(true);
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "http://localhost:8080/crud/api/createOffType.php?n=" + name + "&l=" + limit + "&c=" + color);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            turn(false);
                            if (xhr.responseText == "true") {
                                document.getElementsByClassName("offtypeLoadingImg")[0].src = check;
                            } else if (xhr.responseText.length == 0) {
                                alert("offtype already exists");
                                document.getElementById("offtype_errors").innerHTML += "\nofftype already exists";
                                document.getElementById("offtype_errors").style.color = "red";
                            } else {
                                document.getElementById("offtype_errors").innerHTML += "\n" + xhr.responseText;
                                document.getElementById("offtype_errors").style.color = "red";
                            }
                        }
                    }
                    // xhr.send();
                } else {
                    document.getElementById("offtype_errors").innerHTML += "\nsome feilds empty";
                    document.getElementById("offtype_errors").style.color = "red";
                    turn(false);
                }
            } catch (e) {
                document.getElementById("offtype_errors").innerHTML += "\nlimit has to a number";
                document.getElementById("offtype_errors").style.color = "red";
                turn(false);
            }
        });
    }
    render() {

        return (
            <div class="offtype_container">
                <div id="offtype_container_1">
                    <div id="offtype_header">
                        <h2>New Offtype Entry</h2>
                    </div>
                    <div id="offtype_body">
                        <label for="offtype_name">Offtype Name:</label>
                        <input type="text" id="offtype_name" name="offtypename" placeholder="The offtype name.." />
                        <label for="colour">Colour:</label>
                        <input type="color" id="offtype_colour" style={color} />
                        <label for="offtype_limit">Default Limit:</label>
                        <input type="text" id="offtype_limit" name="defaultlimit" placeholder="The default number of days" />
                    </div>
                    <div id="offtype_submition" class="row">
                        <input type="button" value="Submit" id="offtypeAddition_btn" />
                    </div><br />
                    <p id="offtype_errors"></p><br /><br />
                    <div id="offtype_list_displayer">
                    </div>
                </div>
                <div id="offtype_container_2">
                    <img src={loading} class="offtypeLoadingImg" id="pending_loading_gif" />
                </div>
            </div>
        )
    }
}
const color = { width: "100%", height: "50%", padding: "0px" }

function turn(x) {
    if (x) {
        document.getElementById("offtype_container_1").style.display = "none";
        document.getElementById("offtype_container_2").style.display = "block";
        document.getElementById("offtype_container_2").style.paddingLeft = "45%";
        document.getElementById("offtype_container_2").style.paddingTop = "5%";
    }
    else {
        document.getElementById("offtype_container_1").style.display = "block";
        document.getElementById("offtype_container_2").style.display = "none";
    }
}

function changeColor(id, color) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/updateOfftypeColor.php?i=" + id + "&c=" + color);
    xhr.send();
}

function changeName(id, name) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/updateOfftypeName.php?i=" + id + "&n=" + name);
    xhr.send();
}

function removeOff(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/updateOfftypeRemoved.php?i=" + id);
    xhr.send();
}

function printOffsite(data) {
    var item = document.createElement("div");
    item.style.padding = "10px";
    item.style.marginTop = "20px";
    item.style.borderRadius = "10px";
    item.style.display = "grid";
    item.style.gridTemplateColumns = "20% 10% 10% 60%";
    item.id = "OT_item" + data.id;

    var acction1 = document.createElement("input");
    acction1.value = "#" + data.color;
    acction1.className = "offtype_acctions";
    acction1.type = "color";
    acction1.style.width = "100%";
    acction1.style.height = "100%";
    acction1.addEventListener("change", (eleem) => {
        var color = eleem.srcElement.value.substr(1, eleem.srcElement.value.length - 1);
        var id = data.id;
        changeColor(id, color);
    });

    var acction2 = document.createElement("button");
    acction2.innerText = "Change Name";
    acction2.className = "offtype_acctions";
    acction2.id = "2" + data.id;
    acction2.addEventListener("click", () => {
        var name = prompt("New name");
        var id = data.id;
        if (name != "") {
            changeName(id, name);
            document.getElementById("off_t" + data.id).textContent = name;
        }
    });

    var acction3 = document.createElement("button");
    acction3.className = "offtype_acctions";
    acction3.innerText = "Remove";
    acction3.id = "3" + data.offsiteID;
    acction3.addEventListener("click", () => {
        var check = window.confirm("are you sure you want to delete " + data.name);
        if (check) {
            removeOff(data.id);
            $("#OT_item" + data.id).fadeOut();
        }
    });


    var info = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = data.name;
    h3.id = "off_t" + data.id;

    var br = document.createElement("BR");
    var lbl = document.createElement("lbl");
    lbl.textContent = "Limit: " + data.limit;

    info.appendChild(h3);
    info.appendChild(br);
    info.appendChild(lbl);
    item.appendChild(info);

    item.appendChild(acction2);
    item.appendChild(acction3);
    item.appendChild(acction1);
    return item;
}