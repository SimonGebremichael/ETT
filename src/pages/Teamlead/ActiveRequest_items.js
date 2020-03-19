import React from 'react'
import pro from './pics/profile.png'

export default function ActiveRequest_items() {
    return (
        <div id="requests">
            <table id="requesteData">
                <tr>
                    <td rowspan="2" id="requestImg">
                        <img src={pro} id="requestImage" />

                    </td>
                    <td rowspan="2" id="requestInfo">
                        <label>Anna jamson</label><br />
                        <label>anna.j@gmail.com</label>
                        <button id="offsiteActivity">Active</button><br />15 days
                    </td>
                    <td valign="top" rowspan="2" id="requestDes">
                        <p id="requestReason">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed
                        nunc dignissim, rutrum justo ut, consequat orci. Vestibulum auctor accumsan quam, id
                        finibus tellus. Vivamus ornare dictum ante, non congue enim lacinia nec. Nulla
                                        euismod lorem non eros maximus semper</p>
                    </td>
                    <td id="resultBtn1">Approve</td>
                </tr>
                <tr>
                    <td id="resultBtn2" rowspan="1">Decline</td>
                </tr>

                <tr>
                    <td id="requestType" colspan="4">
                        &nbsp;&nbsp;
                        <button id="requestActivity">Feb.17.20</button>&nbsp;&nbsp;
                        <button id="requestActivity">Mar.3.20</button>&nbsp;&nbsp;
                        <button id="requestActivity">View on calendar</button>
                        <label>Remote Work</label>
                    </td>
                </tr>
            </table><br /><br /><br /><br /><br /><br />
        </div>
    )
}
