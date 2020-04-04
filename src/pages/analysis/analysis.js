import SideAccount from '../Teamlead/Offsite'
import Reports from './reports'
import css from './styles/analysis.css'
import Numbers from './analysis_numbers'
import Profile from '../Profile'
import Dashboard from './dash'
import React, { Component, createElement } from 'react'

export default class analysis extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (
            <>
            <Profile />
            <div style={container} id="analysis_container">
                <SideAccount />
                <Dashboard />
                <Reports />
            </div>
            </>
        )
    }
}


const container = {
    width: "100%",
    height: "86.7%",
    float: "left",
    paddingTop: "3%"
}