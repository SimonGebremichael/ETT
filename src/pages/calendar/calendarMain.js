import React from 'react'
import css from './styles/calendar.css'
import arrow from './styles/arrow.css'
import Side from './calenarSide'
import Calendar from './calendarContent'
import PopUp from './calendarDetails'


 function calendarMain() {
    return (
        <>
            <PopUp />
            <Side />
            <Calendar />
        </>
    )
}

export default calendarMain;