import React, { Component } from 'react'
import css from './style/offtyper.css'
import check from './style/check.png'
import loading from '../item/loading.gif';

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
                console.log(xhr.responseText);
                try {
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);
                    var box = document.getElementById("offtype_list_displayer");
                    box.style.overflowY = "auto";
                    box.style.height = "200px";

                    for (var i = 0; i < parseInt(data.Total); i++) {
                        var div = document.createElement("div");
                        var div2 = document.createElement("div");
                        var div3 = document.createElement("div");
                        div.style.padding = "10px";
                        div.style.marginTop = "20px";
                        div.style.borderRadius = "10px";
                        div.style.display = "grid";
                        div.style.gridTemplateColumns = "20% 80%";
                        div3.style.backgroundColor = "#" + data.offtype[i].color;
                        div3.style.width = "100%";
                        div3.style.height = "100%";

                        var h3 = document.createElement("h3");
                        h3.textContent = data.offtype[i].name;
                        var br = document.createElement("BR");
                        var lbl = document.createElement("lbl");
                        lbl.textContent = "Limit: " + data.offtype[i].limit;
                        div2.appendChild(h3);
                        div2.appendChild(br);
                        div2.appendChild(lbl);
                        div.appendChild(div2)
                        div.appendChild(div3)
                        box.appendChild(div);
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

            try {
                var par = parseInt(limit);
                if (name.length != 0 && limit.length != 0) {
                    turn(true);
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "http://localhost:8080/crud/api/createOffType.php?n=" + name + "&l=" + limit + "&c=" + color);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            console.log(xhr.responseText);
                            if (xhr.responseText == "true") {
                                document.getElementsByClassName("offtypeLoadingImg")[0].src = check;
                            } else if (xhr.responseText == "already") {
                                alert("offtype already exists");
                                turn(false);
                            }
                        }
                    }
                    xhr.send();
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
                        <input type="color" id="offtype_colour" value="#190707" />
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