import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class unknown extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const back = "/login";
        return (
            <div style={un_header}>
                <h1>Uh oh... a little lost?</h1><br />
                <Link to={back}>
                    <button style={un_btn}>back to the blueprints?</button>
                </Link>
            </div>
        )
    }
}


const un_header = {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#2F93F2",
    color: "white",
    paddingTop: "20%"
}
const un_btn = {
    padding: "15px",
    background: "none",
    color: "white",
    border: "1px solid white"
}