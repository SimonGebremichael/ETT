import React from 'react'
import CalStatus from './calendarStatus'
import stausGenerating from './js/generateStatus'

export default function calenarSide() {
    return (
        <>
        <div id="sideCal" >
            <div id='sideInfo' >
                <dive id="sideDate">
                    <h4 id="sideDatePrint" title="today"></h4>
                </dive>
            </div>
            <br />
            <br />
            <label>Display for: </label>
            <div id="cal_side_Display" >
                <CalStatus />
                <CalStatus />
                <CalStatus />
                <CalStatus />
                <CalStatus />
                <CalStatus />
            </div><br />

            <div id="cal_side_btns">
                <button class="cal_side_actions">Create Request</button>&nbsp;
                <button class="cal_side_actions">Create Request</button>&nbsp;
                <button class="cal_side_actions">Create Request</button>
            </div>
        </div>
{/* 
        <div>
        asda
        </div> */}
        </>
    )
}