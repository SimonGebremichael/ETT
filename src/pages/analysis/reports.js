import React, { Component } from 'react'
import loading from '../item/loading.gif';

export default class reporter extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        turn(true);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getReport.php?i=" + localStorage.getItem("access"));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var box = document.getElementById("reportBody");
                turn(false);
                try {
                    var data = JSON.parse(xhr.responseText);
                    document.getElementById("reportHeader_message").innerHTML += " " + data.report[0].first_name + ", " + data.report[0].last_name;
                    if (data.Total != 0) {
                        for (var i = 0; i < data.Total; i++) {
                            box.appendChild(printReport(data.report[i]));
                        }
                    } else {
                        box.innerHTML = "nothing to show here :)";
                        box.style.marginLeft = "50px";
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        xhr.send();
    }

    render() {
        return (
            <div id="report_cont" >
                <div id="reportHeader">
                    <h2 id="reportHeader_message">Your reports:</h2>
                </div>

                <div id="reportBody">
                </div>
                <div id="reportBody_loading">
                    <img src={loading} style={loadingImg} />

                </div>
            </div>
        )
    }
}
const loadingImg = {
    width: "100px",
    marginLeft: "35%",
    marginTop: "20%",
    opacity: "0.6"
}


function turn(x) {
    if (x) {
        document.getElementById("reportBody").style.display = "none";
        document.getElementById("reportBody_loading").style.display = "block";
    }
    else {
        document.getElementById("reportBody").style.display = "block";
        document.getElementById("reportBody_loading").style.display = "none";
    }
}
function printReport(report) {
    var repo = document.createElement("div");
    repo.id = "repopo";
    var br = document.createElement("BR");

    var h3 = document.createElement("h3");
    h3.className = "reportTypeName";
    h3.textContent = report.category;

    var item = document.createElement("div");
    item.className = "reportItem";
    item.style.borderTop = "1px solid black";

    var div1 = document.createElement("div");
    div1.style = borderRight;
    div1.style.borderRight = "1px solid black";
    var p1 = document.createElement("p");
    p1.textContent = "used";
    var div11 = document.createElement("div");
    div11.textContent = report.taken;
    div11.style = bg;
    div1.appendChild(p1);
    div1.appendChild(div11);

    var div2 = document.createElement("div");
    var p2 = document.createElement("p");
    p2.textContent = "left";
    var div22 = document.createElement("div");
    div22.textContent = report.remaing;
    div22.style = bg;
    div2.appendChild(p2);
    div2.appendChild(div22);

    item.appendChild(div1);
    item.appendChild(div2);
    repo.appendChild(h3);
    repo.appendChild(br);
    repo.appendChild(item);
    repo.appendChild(br);
    repo.appendChild(br);

    return repo;
}

const bg = {
    height: "50px",
    textAlign: "center",
    paddingTop: "20%",
    fontSize: "25px",
    Color: "white",
    marginTop: "10px",
    backgroundColor: "lightgrey"
}
const borderRight = {
    borderRight: "1px solid black"
}