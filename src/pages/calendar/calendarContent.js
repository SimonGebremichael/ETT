import React from 'react'

export default function calendarContent() {
    return (
        <div class="Calendar">
            <header>
                <i class="fas fa-caret-left"></i>
                <h1 id="dateTitle"></h1>
                <i class="fas fa-caret-right"></i><br />
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

            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous" />
        </div>
    )
}
