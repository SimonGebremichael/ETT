import React from 'react'
import pro from './pics/profile.png';
export default function Offsite_status() {
    return (
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
                    <td id="upcommingType" colspan="2">
                        <div id="offsiteLeft">
                            <button id="upCommingActivity">Feb.17.20</button>
                            <button id="upCommingActivity">Feb.2.29</button>
                            <button id="viewCalendarActivity">View on calendar</button>
                        </div>
                        <div id="offsiteRight">Remote</div>
                    </td>
                </tr>
            </table>
        </div>
    )
}
