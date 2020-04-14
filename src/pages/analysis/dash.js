import React, { Component, createElement } from 'react'

export default class analysis extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var user = localStorage.getItem("access");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getAnalysis.php?i=" + user);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var box = document.getElementById("dash_display");
                box.innerHTML = "";
                try {
                    var data = JSON.parse(xhr.responseText);
                    if (data.Total != 0) {
                        for (var i = 0; i < data.Total; i++) {
                            box.appendChild(printAnalysis(data.off[i]));
                        }

                    } else { box.innerHTML = "<br /><br />nothing to show here :)."; }
                } catch (e) { console.log(e); }
            }
        }
        xhr.send();
    }

    render() {
        return (
            <div id="Dashboard_cont">
                <div id="dashHeader">
                    <h2>Dashboard:</h2>
                </div>
                <div id="dash_body">
                    <div id="dash_display">

                    </div>
                </div>
            </div>
        )
    }
}

function printAnalysis(data) {
    var container = document.createElement("div");
    container.style.paddingTop = "2%";
    container.id = "dash_cont_";

    var label = document.createElement("h2");
    label.textContent = data.name;
    label.style.marginLeft = "2%";

    var val = [
        "J", "F", "M", "A",
        "M", "J", "J", "A",
        "S", "O", "N", "D"];

    var chart = document.createElement("div");
    chart.className = "stat_displayer";
    chart.style.width = "100%";
    chart.style.paddingTop = "10px";
    chart.style.marginTop = "20px";
    chart.style.borderTop = "1px solid black";

    for (var i = 0; i < 12; i++) {
        var carrier = document.createElement("div");

        var diver = document.createElement("div");
        diver.style.height = "100%";
        diver.style.backgroundColor = "#" + data.color;
        diver.style.animation = "bounceIn 1." + "s";

        if (i < 11) { diver.style.borderRight = "1px solid black"; }

        var range = document.createElement("div");
        range.style.width = "100%";
        if (data.value[i] > 10) {
            range.style.height = "100%";
        } else { range.style.height = (10 - data.value[i]) + "0%"; }
        range.style.backgroundColor = "#E6E6E6";

        var label1 = document.createElement("label");
        label1.style.marginLeft = "40%";
        label1.textContent = data.value[i];

        var label2 = document.createElement("label");
        label2.style.marginLeft = "40%";
        label2.textContent = val[i];

        diver.appendChild(range);
        carrier.appendChild(label1);
        carrier.appendChild(diver);
        carrier.appendChild(label2);
        chart.appendChild(carrier);
    }

    container.appendChild(label);
    container.appendChild(chart);
    return container;
}

