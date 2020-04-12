import Inbox from '../Inbox'
import Reports from './reports'
import css from './styles/analysis.css'
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
                <div id="analysis_container">
                    <Inbox />
                    <Dashboard />
                    <Reports />
                </div>
            </>
        )
    }
}
