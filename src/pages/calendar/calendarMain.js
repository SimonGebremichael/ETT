import React from 'react'
import css from './styles/calendar.css'
import Side from './calenarSide'
import Calendar from './calendarContent'
import Details from './calendarDetails'

export default function calendarMain() {
    return (
        <div id="publicCal">
            <Details />
            <Side />
            <Calendar />
        </div>
    )
} 