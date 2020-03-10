import React from 'react'
import head from '../styles/main.css';
import teamlead from '../styles/teamlead.css';
import profile from '../styles/profile.css';
import animate from '../styles/animate.css';
import logo from '../imgs/logo.png';

export default function Header() {
    return (
        <header id="header">
            <div id="left">
                <img src={logo} id="logo" />
            </div>
            <div id="right">
                <ul id="options">
                    <li>Sign Out</li>
                    <li>Create Request</li>
                    <li>Analysis</li>
                    <li>Export Calendar</li>
                    <li>Public Calendar</li>
                </ul>
            </div>
        </header>
    )
}