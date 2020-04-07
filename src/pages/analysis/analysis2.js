import Account from '../Teamlead/Offsite'
import Reports from './reports'
import css from './styles/analysis.css'
import Dashboard from './dash'
import React, { Component, createElement } from 'react'

export default class analysis extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (
            <div id="analysis_container">
                <Account />
                <Dashboard />
                <Reports />
            </div>
        )
    }
}
