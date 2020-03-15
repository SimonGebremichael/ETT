import React from 'react'
import generateCal from './js/generateCal'
import css from './styles/calendar.css'
import arrow from './styles/arrow.css'
import Side from './calenarSide'
import Calendar from './calendarContent'
import PopUp from './calendarDetails'
import stausGenerating from './js/generateStatus'

export default function calendarMain() {
    return (
        <>
            <PopUp />
            <Side />
            <Calendar />
        </>
    )
}