import React from 'react'
import Offsite from './Offsite'
import ActiveRequests from './ActiveRequests'
import Upcomming from './Upcomming'
import Profile from '../Profile'

export default function Teamlead() {
    return (
        <div id="content">
            <Profile />
            <Offsite />
            <ActiveRequests />
            <Upcomming />
        </div>
    )
}
