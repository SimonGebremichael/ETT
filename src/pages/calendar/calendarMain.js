import React from 'react'
import css from './styles/calendar.css'
import Side from './calenarSide'
import Calendar from './calendarContent'
import Details from './calendarDetails'

 function calendarMain() {
    return (
        <>
            <Details />
            <Side />
            <Calendar />
        </>
    )
} 

export default calendarMain;