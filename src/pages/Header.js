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
        this.state = this.props.children;
        console.log(props);
    }
    componentDidMount = () => {
        setInterval(() => {
            var g = window.location.href.split('/'),
                e = g[g.length - 1];

            e != "login" && e != "pending" ? this.setState({ headType: true }) : this.setState({ headType: false });
            this.setState({ name: e });
            // console.log(this.state.name + ": " + this.state.headType);
        }, 500);
    }

    componentDidUpdate() {
        var items = document.getElementsByClassName("header_Item");
        // console.log(items);
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("linker")[i].style.backgroundColor = "white";
            items[i].style.color = "black";
            var find = String(window.location.href).search(items[i].id);
            console.log(find);
            if (find != -1 && this.state.headType == true) {
                items[i].style.color = "white";
                document.getElementsByClassName("linker")[i].style.backgroundColor = "#333";
            }
        }
    }

    render() {
        if (this.state.headType) {
            return (
                <header>
                    <Link className="/login/pending/3" to='/dashboard'>
                        <img src={logo} id="logo" />
                    </Link>
                    <div></div>{/* Seperator of header sections. see grid */}
                    <ul>
                        <Link className="linker" to='/dashboard'>
                            <li id="dashboard" className="header_Item">Home</li>
                        </Link>
                        <Link className="linker" to='/calendar'>
                            <li id="calendar" className="header_Item">Calendar</li>
                        </Link>
                        <Link className="linker" to='/export'>
                            <li id="export" className="header_Item">Export</li>
                        </Link>
                        <Link className="linker" to="/analysis">
                            <li id="analysis" className="header_Item">Analysis</li>
                        </Link>
                        <Link className="linker" to='/create'>
                            <li id="create" className="header_Item">Requests</li>
                        </Link>
                        <Link className="linker" to='/login'>
                            <li>Sign Out</li>
                        </Link>
                    </ul>
                </header >
            )
        } else {
            return (
                <header>
                    <Link className="pending" to='/login/pending/3'>
                        <img src={logo} id="logo" />
                    </Link>
                </header >
            )
        }
    }
}