import React, { component } from 'react';
import head from '../styles/main.css';
import teamlead from '../styles/teamlead.css';
import profile from '../styles/profile.css';
import animate from '../styles/animate.css';
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';

export default class appy extends React.Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.g = null;
        this.e = null;
        this.headType = false;
    }
    componentDidMount() {

    }


    render() {
        var headType = false,
            g = window.location.href.split('/'),
            e = g[g.length - 1];

        e != "login" ? headType = true : headType = false;

        // alert(e + " " + headType);

        if (headType) {
            const lleft = {
                float: "left"
            }
            const rright = {
                float: "right"
            }

            return (
                <header id="header">
                    <div style={lleft}>
                        <img src={logo} id="logo" />
                    </div>
                    <div style={rright}>
                        <ul id="options">
                            <Link to='/dashboard'>
                                <li>Home</li>
                            </Link>
                            <Link to='/calendar'>
                                <li>Public Calendar</li>
                            </Link>
                            <Link to='/export'>
                                <li>Export</li>
                            </Link>
                            <Link to="/analysis">
                                <li>Analysis</li>
                            </Link>
                            <Link to='/create'>
                                <li>Create Request</li>
                            </Link>
                            <Link to='/login'>
                                <li>Sign Out</li>
                            </Link>
                        </ul>
                    </div>
                </header >
            )
        } else {
            const btn = {
                width: "130px",
                height: "30px",
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                marginRight: "10px",
                marginTop: "5px"
            }
            const lleft = {
                float: "left"
            }
            const rright = {
                float: "right"
            }

            return (
                <header id="header">

                    <div style={lleft}>
                        <img src={logo} id="logo" />
                    </div>

                    <div style={rright}>
                        <button style={btn} >Register with Google</button>
                    </div>
                </header >
            )
        }
    }
}
