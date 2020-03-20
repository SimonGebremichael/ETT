import React, { Component } from 'react'
import Calendar from '../calendar/calendarContent'
import Popup from '../calendar/calendarDetails'
import css from './style/expo_style.css'

export default class exporter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <Popup />
                <DataExpo />
            </>
        );
    }

}

function DataExpo() {
    return (
        <>
            <SideData />
            <Calendar />
        </>
    )
}

function SideData() {
    return (
        <>
            <div id="expo_container">
                <div id="expo_container2">
                    <div id="expo_header">
                        <h2>Export to excel</h2><br />
                    </div><br /><br /><br />
                    <div id="expo_form">
                        <h3>From:</h3><br />
                        <input type="date" id="expo_from" /><br /><br />
                        <h3>To:</h3><br />
                        <input type="date" id="expo_to" /><br /><br />
                        <h3>Include:</h3><br />
                        <select>
                            <option>all</option>
                            <option>custom</option>
                        </select>
                    </div>
                </div>
                <div id="expo_btns">
                    <div id="expo_export">Export</div>
                </div>
            </div>
        </>
    )
}