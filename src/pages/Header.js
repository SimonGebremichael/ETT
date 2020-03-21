import React from 'react'
import head from '../styles/main.css';
import teamlead from '../styles/teamlead.css';
import profile from '../styles/profile.css';
import animate from '../styles/animate.css';
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
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
                        <li>Export Calendar</li>
                    </Link>
                    <Link to="/analysis">
                        <li>Analysis</li>
                    </Link>
                    <Link to='/create'>
                        <li>Create Request</li>
                    </Link>
                    <Link to='/'>
                        <li>Sign Out</li>
                    </Link>
                </ul>
            </div>
        </header >
    )
}