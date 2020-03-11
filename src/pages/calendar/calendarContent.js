import React from 'react'

export default function calendarContent() {
    return (
        <div class="Calendar">
        <header>
            <i class="fas fa-caret-left"></i>
            <h1>Month</h1>
            <i class="fas fa-caret-right"></i><br /><br />

        </header>
        <main id="date-section">
            <h2>Sun</h2>
            <h2>Mon</h2>
            <h2>Tue</h2>
            <h2>Wed</h2>
            <h2>Thu</h2>
            <h2>Fri</h2>
            <h2>Sat</h2>
        </main>
    </div>
    )
}
