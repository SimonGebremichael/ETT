import React from 'react'
import Request from './ActiveRequest_items'

export default function ActiveRequests() {
    return (
            <div id="mainFeed">
                <div id="mainAcctions"><br /><br /><br />
                    <h2>Active Requests:</h2><br />

                    <div id="acctionButtons">
                        <input type="button" id="remoteBtn" class="acctionBtn" value="Remote" />
                        <input type="button" id="vacationBtn" class="acctionBtn" value="Vacation" />
                        <input type="button" id="birthdayBtn" class="acctionBtn" value="Birthdays" />
                        <input type="button" id="sickBtn" class="acctionBtn" value="Sick" />
                        <input type="button" id="allBtn" class="acctionBtn" value="All" />
                    </div>
                </div><br />

                <div id="displayRequests">
                    <Request />
                    <Request />
                    <Request />
                    <Request />
                </div>
            </div>
    )
}
