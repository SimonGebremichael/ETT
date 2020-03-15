import React from 'react'
import CalStatus from './calendarStatus'

export default function calenarSide() {
    return (

        <div id="sideCal" >

            <div id='sideInfo' >
                <dive id="sideDate">
                    <h4 id="sideDatePrint"></h4>
                </dive>

            </div>


            <div id="offSiteDisplay" >
                <CalStatus />
                <CalStatus />
                <CalStatus />
                <CalStatus />
            </div>
        </div>
    )
}