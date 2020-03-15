import React from 'react'
// import pro from '';

export default function Offsite_status() {
    return (
        <div id="cal_stat_status">
            <table id="cal_stat_Data">
                <tr>
                    <td id="offImg"><img src='' id="OffsiteImg" /></td>
                    <td id="offInfo">
                        <label>Anna jamson</label><br />
                        <label>anna.j@gmail.com</label><br />
                        <button id="offsiteActivity">Active</button>
                    </td>
                </tr>
                <tr>
                    <td id="calendarType" class="cal_stat_details" colspan="2">
                        <div id="offsiteLeft">
                            <button id="cal_stat_Activity">Feb.17.20</button>&nbsp;&nbsp;
                            <button id="cal_stat_Activity">Feb.2.29</button>
                        </div>
                        <div id="cal_stat_type">Remote</div>
                    </td>
                </tr>
            </table>
        </div>
    )
}
