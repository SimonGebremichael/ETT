import React from 'react'
import Status from './Offsite_status'

export default function Upcomming() {
    return (
        <div id="upcomming">
            <div id="upcomingTtile">
                <h3>Upcomming Offsites:</h3>
            </div><br />
            <div id="upcommingSort">
                <h4>Sort By:</h4>
                <select id="offSiteSort" value="Recent">
                    <option value="Recent">Recent</option>
                    <option value="allTime">All Time</option>
                    <option value="thisDay">This Day</option>
                    <option value="thisMonth">This Month</option>
                    <option value="thisYear">This Year</option>
                </select>
            </div>

            <div id="upcommingResults">
                <Status />
                <Status />
                <Status />
                <Status />
            </div>
        </div>
    )
}
