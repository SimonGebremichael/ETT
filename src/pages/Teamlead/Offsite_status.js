import pro from './pics/profile.png';
import React, { Component } from 'react'

export default class status extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
 
    }

    render() {
        return (<Offsite_status />)
    }
}

function Offsite_status() {
    return (
        <>
        <div id="OffsiteSatus">
            <table id="offSiteData">
                <tr>
                    <td id="offImg"><img src={pro} id="OffsiteImg" /></td>
                    <td id="offInfo">
                        <label>Anna jamson</label><br />
                        <label>anna.j@gmail.com</label><br />
                        <button id="offsiteActivity">Active</button>
                    </td>
                </tr>
                <tr>
                    <td id="upcommingType" className="upcomming_Type" colspan="2">
                        <div id="offsiteLeft">
                            <button id="requestActivity">Feb.17.20</button>&nbsp;&nbsp;
                            <button id="requestActivity">Feb.2.29</button>&nbsp;&nbsp;
                            <button id="requestActivity">View on calendar</button>
                        </div>
                        <div id="offsiteRight" className="offsite_Right"></div>
                    </td>
                </tr>
            </table>
        </div><br />
        </>
    )
}
