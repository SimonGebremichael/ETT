import React from 'react'
import Status from '../Teamlead/Offsite_status'

export default function calenarSide() {
    return (

        <div id="sideCal" >

            <div id='sideInfo' >
                <dive id="sideDate">
                    <h2 id="sideDatePrint"></h2>
                </dive>

            </div>


            <div id="offSiteDisplay" >
                <Status />
                <Status />
                <Status />
            </div>
        </div>
    )
}