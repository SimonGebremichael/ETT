import Numbers from './analysis_numbers'
import React, { Component, createElement } from 'react'

export default class analysis extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (
                <Dashboard />
        )
    }
}

const Remote = {
    id: 1,
    name: "Remote Work",
    color: "lightblue"
}

const Vacation = {
    id: 2,
    name: "Vacation",
    color: "lightgreen"
}

const Birthday = {
    id: 3,
    name: "Birthday",
    color: "pink"
}

const Sick = {
    id: 4,
    name: "Sick days",
    color: "salmon"
}



function Dashboard() {
    return (
        <div id="Dashboard_cont">
            <div id="dashHeader">
                <h2>Dashboard:</h2>
            </div>
            <div id="dash_body">
                <div id="dash_display">
                    <Numbers>
                        {Remote}
                    </Numbers>
                    <Numbers>
                        {Vacation}
                    </Numbers>
                    <Numbers>
                        {Birthday}
                    </Numbers>
                    <Numbers>
                        {Sick}
                    </Numbers>
                </div>
            </div>
        </div>
    )
}
