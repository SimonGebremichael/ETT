import React from 'react'
import head from '../styles/main.css';
import logo from '../imgs/logo.png';

export default function Header() {
    const btn = {
        width: "150px",
        height: "40px",
        color: "black",
        backgroundColor: "white",
        border: "1px solid black",
        margin: "5px 3px"
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
                <ul id="options">
                    <button style={btn} >Register with Google</button>
                </ul>
            </div>
        </header >
    )
}