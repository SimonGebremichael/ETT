import React from 'react'
import Status from '../Teamlead/Offsite_status'

export default function calendarDetails() {
    return (
        <div id="popupDisplay">
            <div id="popBg"></div>
            <div id="calDetails">
                <h1 id="popDate"></h1><br /><br />
                <h4>Events:</h4><br />
                <div id="displayEvents">
                    <Status />
                    <Status />
                    <Status />
                </div>
            </div>
        </div>
    )
}
