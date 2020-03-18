import React, { Component } from 'react'
export default class states extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var colours2 = ["lightblue", "lightgreen", "pink", "salmon"];
        var elem = document.getElementsByClassName("cal_stat_details");
        for (var i = 0; i <= 3; i++)
            elem[i].style.backgroundColor = colours2[(Math.floor(Math.random() * 4) + 1) - 1];

    }
    render() {
        return (<Offsite_status />)
    }
}
function Offsite_status() {
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
                            <button id="cal_stat_Activity">Feb.17.20</button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button id="cal_stat_Activity">Feb.2.29</button>
                        </div>
                        <div id="cal_stat_type">Remote</div>
                    </td>
                </tr>
            </table>
        </div>
    )
}
