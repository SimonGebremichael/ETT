import Status from '../Teamlead/Offsite_status'
import Calendar from '../calendar/calendarContent'
import css from './styles/create.css'
import loading from '../export/imgs/loading.gif'
import check from '../export/imgs/check.png'
import React, { Component } from 'react'


export default class creator extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <Calendar />
                <CreateForm />
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
                            <option value="vacation">Vacation</option>
                            <option value="remote">Remote work</option>
                            <option value="sick">Sick</option>
                            <option value="birthday">Birthday</option>
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
        type = document.getElementById("createType").checked,
        memo = document.getElementById("createMemo").value,
        c_ERR = document.getElementById("create_err");
    c_ERR.innerHTML = "";

    c_from != "" && c_to != "" ? date_vali(c_from, c_to, type, memo, c_ERR) : c_ERR.innerHTML = "<br />&nbsp;&nbsp;&nbsp;Empty dates";
}

function date_vali(from, to, type, memo, c_ERR) {
    if(from > to) {
        c_ERR.innerHTML += "<br />&nbsp;&nbsp;&nbsp;From date can't be past to date";
    }else{
        exporter_real(from, to);
    }
}

function exporter_real(x,y) {
    var swit = true;
    var resultDays = Math.round((new Date(y)-new Date(x))/(1000*60*60*24));

    setInterval(() => {
        if(swit){
            swit = false;
            document.getElementById("expo_img").src = loading;
            document.getElementById("createSide2").style.display = "none";
            document.getElementById("expo_load").style.display = "block";
            
        }else{
            document.getElementById("expo_img").src = check;
            document.getElementById("sentInfo").innerHTML = " <br /><br />sent for: <br />" + x + " - " + y;
            document.getElementById("sentInfo").innerHTML += "<br /><br />" + resultDays + " days";
            clearInterval();
        }
    }, 1000);
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