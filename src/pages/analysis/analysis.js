import SideAccount from '../Teamlead/Offsite'
import Reports from './reports'
import css from './styles/analysis.css'
import React, { Component } from 'react'

export default class analysis extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {}
    
    render() {
        return (
            <>
                <div style={container}>
                    <SideAccount />
                    <Dashboard />
                    <Reports />
                </div>
            </>
        )
    }
}
function Dashboard() {
    return (
        <div id="Dashboard_cont">
            <div id="dashHeader">
                <h2>Dashboard:</h2>
            </div>
        </div>
    )
}

const container = {
    width: "100%",
    height: "86.7%",
    float: "left",
    paddingTop: "3%"
}
