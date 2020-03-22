import Status from './Offsite_status'
import pro from './pics/profile.png';
import React, { Component } from 'react'

export default class offsite extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var colours2 = ["lightblue", "lightgreen", "pink", "salmon"],
            colours3 = ["Remote", "Vacation", "Bithday", "Sick"];

        var elem = document.getElementsByClassName("upcomming_Type  ");
        var elem2 = document.getElementsByClassName("offsite_Right");
        for (var i = 0; i < elem.length; i++) {
            var rand = (Math.floor(Math.random() * 4) + 1) - 1;
            elem[i].style.backgroundColor = colours2[rand];
            elem2[i].innerHTML = colours3[rand]; 
        }
    }

    render() {
        return (
            <>
                <Offsite />
            </>
        )
    }
}
function Offsite() {
    return (
        <div id="sideBar">
            <div id="sideAcc">
                <table>
                    <tr>
                        <td id="accImgBox">
                            <img src={pro} id="accImg" />
                        </td>
                        <td id="accInfo">
                            <label>John Smith</label><br />
                            <label>j.smith8080@gmail.com</label><br />
                            <button id="offsiteActivity_Main">Active</button>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="sideOffsite">
                <h3>Currently Offsite:</h3>
                <div id="offsiteDisplay">
                    <Status />
                    <Status />
                    <Status />
                    <Status />
                </div>
            </div>
        </div>
    );
}