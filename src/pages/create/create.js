import Calendar from '../calendar/calendarContent'
import Popup from '../calendar/calendarDetails'
import css from './styles/create.css'
import loading from '../export/imgs/loading.gif'
import check from '../export/imgs/check.png'
import React, { Component } from 'react'
var user;

export default class creator extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.u = window.location.href.split("\/");
        this.u2 = this.u[this.u.length - 1];
        user = this.u2;
    }

    componentDidMount() {
        var off = new XMLHttpRequest();
        off.open("GET", "http://localhost:8080/crud/api/getofftype.php");
        off.onreadystatechange = function () {
            if (off.readyState == 4) {
                var data = JSON.parse(off.responseText);
                var box = document.getElementById("createType");
                console.log(off.responseText);
                if (data.Total != 0) {
                    for (var i = 0; i < data.Total; i++) {
                        var o = document.createElement("option");
                        o.value = data.offtype[i].id;
                        o.innerHTML = data.offtype[i].name;
                        box.appendChild(o);
                    } } } }
        off.send();
    }

    render() {
        return (
            <>
                <Popup />
                <div id="container_create">
                    <Calendar />
                    <CreateForm />
                </div>
            </>
        )
    }
}
function CreateForm() {
    return (
        <>
            <div id="createSide">
                <div id="createSide2">
                    <div id="createHeader">
                        <h2>Create Request</h2>
                        <br /><br />
                    </div><br /><br />

                    <div id="createForm">

                        <div id="leftCreate" style={leftCreate}>
                            <h3>From:</h3><br /><br />
                            <h3>To:</h3><br /><br />
                        </div>

                        <div id="leftCreate" style={leftCreate}>
                            <input type="date" id="create_from" /><br /><br /><br />
                            <input type="date" id="create_to" /><br /><br />
                        </div><br /><br />

                        <div id="createBottom" style={createBottom}>
                            <h3>Type of request</h3><br /><br />
                            <select id="createType">
                            </select>
                        </div><br /><br />


                        <h3>leave a memo</h3><br />
                        <textarea id="createMemo" style={createMemo} placeholder="(optional)"></textarea>

                    </div>
                </div>
                <div id="expo_load" style={expo_load}>
                    <img id="expo_img" src={loading} style={expo_img} /><br />
                    <p id="sentInfo"></p>
                </div>
                <div id="create_btns">
                    <input type="button" onClick={expo_vali} id="create_request" value="Create" />
                </div>
            </div>
            <label id="create_err" style={create_err}></label>
        </>
    )
}

function expo_vali() {
    var c_from = document.getElementById("create_from").value,
        c_to = document.getElementById("create_to").value,
        type = document.getElementById("createType").value,
        memo = document.getElementById("createMemo").value,
        c_ERR = document.getElementById("create_err");
    c_ERR.innerHTML = "";

    c_from != "" && c_to != "" ? date_vali(c_from, c_to, type, memo, c_ERR) : c_ERR.innerHTML = "<br />&nbsp;&nbsp;&nbsp;Empty dates";
}

function date_vali(from, to, type, memo, c_ERR) {
    if (from > to) {
        c_ERR.innerHTML += "<br />&nbsp;&nbsp;&nbsp;Start date can't be past end date";
    } else {
        exporter_real(from, to, type, memo, c_ERR);
    }
}

function exporter_real(x, y, type, memo, c_ERR) {
    var resultDays = Math.round((new Date(y) - new Date(x)) / (1000 * 60 * 60 * 24));
    var Start = new Date(x).getFullYear() + "-" + new Date(x).getMonth() + "-" + (new Date(x).getDate() + 1);
    var end = new Date(y).getFullYear() + "-" + new Date(y).getMonth() + "-" + (new Date(y).getDate() + 1);
    console.log(user);
    console.log(x);
    console.log(y);
    console.log(type);
    console.log(memo);
    console.log(resultDays);
    document.getElementById("expo_img").src = loading;
    document.getElementById("createSide2").style.display = "none";
    document.getElementById("expo_load").style.display = "block";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/crud/api/createRequest.php?" +
        "g=" + user +
        "&t=" + type +
        "&s=" + Start +
        "&e=" + end +
        "&m=" + memo +
        "&days=" + resultDays);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.responseText.length == 4 || xhr.responseText.length == 5) {
                document.getElementById("expo_img").src = check;
                document.getElementById("sentInfo").innerHTML = " <br /><br />sent for: <br />" + x + " - " + y;
                document.getElementById("sentInfo").innerHTML += "<br /><br />" + resultDays + " days";
                c_ERR.innerHTML = xhr.responseText;
            } else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send();
}

const createBottom = {
    clear: "both",
}
const leftCreate = {
    float: "left",
    width: "30%"
}
const createMemo = {
    width: "60%",
    height: "70px",
    resize: "none",
    color: "black",
    padding: "5px"
}
const create_err = {
    marginTop: "10px",
    marginLeft: "50px"
}

const expo_img = {
    width: "50px",
    marginTop: "60%",
    opacity: "0.6"
}
const expo_load = {
    display: "none",
    width: "100%",
    height: "500px",
    textAlign: "center",
    backgroundColor: "white"
}