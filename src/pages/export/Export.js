import React, { Component } from 'react'
import Calendar from '../calendar/calendarContent'
import Popup from '../calendar/calendarDetails'
import css from './style/expo_style.css'
import loading from './imgs/loading.gif'
import check from './imgs/check.png'

export default class exporter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var include = document.getElementById("include"),
            list = document.getElementById("includeList");
        include.checked = true;
        list.disabled = true;

        include.addEventListener("click", () => {
            include.checked ? list.disabled = true : list.disabled = false;
        });
        exporter_real();
    }

    render() {
        return (
            <>
                <Popup />
                <DataExpo />
            </>
        );
    }
}

function expo_vali() {
    var from = document.getElementById("expo_from").value,
        to = document.getElementById("expo_to").value,
        All = document.getElementById("include").checked,
        list = document.getElementById("includeList").value,
        ERR = document.getElementById("expo_err");
    ERR.innerHTML = "";

    from != "" && to != "" ? expo_vali2(All, list, ERR) : ERR.innerHTML = "<br />Empty dates";
}

function expo_vali2(all, list, ERR) {
    if (all) {
        exporter_real();
    } else {
        list != "" ? exporter_real() : ERR.innerHTML += "<br />No persons selected";
    }
}

function exporter_real() {
    var swit = true;
    setInterval(() => {
        if(swit){
            swit = false;
            document.getElementById("expo_container2").style.display = "none";
            document.getElementById("expo_load").style.display = "block";
        }else{
            document.getElementById("expo_img").src = check;
            document.getElementById("expo_img").style.opacity = "0.6";
        }
    }, 1000);
}

function DataExpo() {

    return (
        <>
            <SideData />
            <Calendar />
        </>
    )
}

function SideData() {
    return (
        <div id="expo_container">
            <div id="expo_container2">
                <div id="expo_header">
                    <h2>Export to excel</h2><br />
                </div><br /><br /><br />
                <div id="expo_form">
                    <h3>From:</h3><br />
                    <input type="date" id="expo_from" /><br /><br />
                    <h3>To:</h3><br />
                    <input type="date" id="expo_to" /><br /><br />
                    <h3>Include:</h3><br />
                    <input type="checkbox" id="include" />
                    <label for="include">&nbsp;&nbsp;All</label><br /><br />
                    <select style={expoListStyle} id="includeList" multiple="multiple">
                        <option>john james</option>
                        <option>frank businesman</option>
                        <option>mary piperwork</option>
                        <option>eric gates</option>
                        <option>aidan stinson</option>
                        <option>luther summerhayes</option>
                    </select>
                </div>
            </div>
            <div id="expo_load" style={expo_load}>
                <img id="expo_img" src={loading} style={expo_img} />
            </div>
            <div id="expo_btns">
                <label id="expo_err" style={expo_err}></label>
                <input type="button" onClick={expo_vali} id="expo_export" value="Export" />
            </div>
        </div>
    )
}
const expoListStyle = {
    height: "120px"
}

const expo_err = {
    color: "red",
    marginTop: "10px",
    marginLeft: "10px"
}

const expo_img = {
    width: "50px",
    marginTop: "60%"
}
const expo_load = {
    display: "none",
    width: "100%",
    height: "500px",
    textAlign: "center",
    backgroundColor: "white"
}