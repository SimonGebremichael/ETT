import React from 'react'
import Status from '../Teamlead/Offsite_status'

export default function calenarSide() {
    return ( <
        div id = "sideCal" >
        <
        div id = 'sideInfo' >
        <
        h2 > Offsite Status: < /h2> <
        /div>

        <
        div id = "offSiteDisplay" >
        <
        Status / >
        <
        Status / >
        <
        Status / >
        <
        /div> <
        /div>
    )
}