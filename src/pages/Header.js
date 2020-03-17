import React from 'react'
import head from '../styles/main.css';
import teamlead from '../styles/teamlead.css';
import profile from '../styles/profile.css';
import animate from '../styles/animate.css';
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header id="header">

            <div id="left">
                <img src={logo} id="logo" />
            </div>

            <div id="right">
                <ul id="options">
                    <Link to='/dashboard'>
                        <li>Home</li>
                    </Link>
                    <Link to='/calendar'>
                        <li>Public Calendar</li>
                    </Link>
                    <li>Export Calendar</li>
                    <li>Analysis</li>
                    <li>Create Request</li>
                    <Link to='/'>
                        <li>Sign Out</li>
                    </Link>
                </ul>
            </div>
        </header >
    )
}