import React, { Component } from 'react'
import Calendar from '../calendar/calendarContent'
import Popup from '../calendar/calendarDetails'
import css from './style/expo_style.css'
import loading from './imgs/loading.gif'
import check from './imgs/check.png'
import $ from 'jquery';

export default class exporter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // var include = document.getElementById("include"),
        //     list = document.getElementById("includeList");
        // include.checked = true;
        // list.disabled = true;

        // include.addEventListener("click", () => {
        //     include.checked ? list.disabled = true : list.disabled = false;
        // });
    }

    render() {
        return (
            <>
                <Popup />
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
                            <input type="radio" id="expo_include_dept" name="include" value="demp" checked />
                            <label for="male">My Dept</label><br /><br /><br />
                            <input type="radio" id="expo_include_all" name="include" value="all" />
                            <label for="male">All Depts</label><br />
                        </div>
                    </div>
                    <div id="expo_load" style={expo_load}>
                        <img id="expo_img" src={loading} style={expo_img} />
                    </div>
                    <div id="expo_btns">
                        <input type="button" onClick={expo_vali} id="expo_export" value="Export" />
                    </div>
                </div>
                <label id="expo_err" style={expo_err}></label>
                <Calendar />
            </>
        );
    }
}

function expo_vali() {
    var from = document.getElementById("expo_from").value,
        to = document.getElementById("expo_to").value,
        All = document.getElementById("expo_include_dept").checked,
        ERR = document.getElementById("expo_err");
    ERR.innerHTML = "";

    from != "" && to != "" ? expo_vali2(from, to, All, ERR) : ERR.innerHTML = "<br />Empty dates";

}

function expo_vali2(f, t, all, ERR) {

    if (new Date(f) < new Date(t)) {
        exporter_real(f, t, all);
    } else {
        ERR.innerHTML += "<br />from date can't be ahead of to date";
    }
}

function exporter_real(x, y, getDepartment) {
    var user = localStorage.getItem("access");
    var Start = new Date(x).getFullYear() + "-" + new Date(x).getMonth() + "-" + new Date(x).getDate();
    var end = new Date(y).getFullYear() + "-" + new Date(y).getMonth() + "-" + new Date(y).getDate();
    document.getElementById("expo_img").src = loading;
    $("#expo_container2").css("display", "none");
    $("#expo_load").css("display", "block");
    window.open("http://localhost:8080/crud/api/dataExport.php?f=" + Start + "&t=" + end + "&d=" + getDepartment + "&i="+user, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=100,height=100");
    $("#expo_container2").css("display", "block");
    $("#expo_load").css("display", "none");
}

const expo_err = {
    color: "red",
    marginTop: "10px",
    marginLeft: "30px"
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