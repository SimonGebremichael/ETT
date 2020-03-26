import React from 'react'
import head from '../styles/main.css';
import logo from '../imgs/logo.png';

export default function Header() {
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