import Status from './Offsite_status'
import pro from './pics/profile.png';
import React, { Component } from 'react'

export default class offsite extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

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