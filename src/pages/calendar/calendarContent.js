import generateCal from './js/generateCal';
import React, { Component } from 'react'

class Socki extends React.Component {
    render() {

        return (
            <>
            <CalendarContent />
            
            </>
        )
    }
}

function CalendarContent() {
    const left1 = {
        float: "left",
        padding: "15px"
    }
    const right1 = {
        float: "right",
        padding: "15px"
    }
    return (
        <div class="Calendar" id="calicali">
            <header>
                <button style={left1} id="calNav1">&#8592;</button>
                <h1 id="dateTitle"></h1>
                <button style={right1} id="calNav2">&rarr;</button><br />
            </header>

            <main id="date-section">
                <h2></h2>
                <h2></h2>
                <h2></h2>
                <h2></h2>
                <h2></h2>
                <h2></h2>
                <h2></h2>
                <h2>Sun</h2>
                <h2>Mon</h2>
                <h2>Tue</h2>
                <h2>Wed</h2>
                <h2>Thu</h2>
                <h2>Fri</h2>
                <h2>Sat</h2>
            </main>
            <script src={generateCal}></script>
            <main id="date-section2"></main>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous" />
        </div>
    )
}

export default Socki;