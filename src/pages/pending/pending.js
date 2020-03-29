import React, { component } from 'react';
import css from './style/pend.css'
import thumpsUp from './pics/thumbs.png'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default class Pending extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        const image = {
            width: "30px",
        }

        return (
            <div class="pending_container">
                <div id="pending_header">
                    <h2>Your Account is Currently Pending!</h2>
                    <img src={thumpsUp} style={image} />
                </div><br />
                <p>You will  be notified once approved, hank you</p><br /><br />
                <p>Pending user:</p><br />
                <p>Email:</p><br />
                <p>ID:</p>
                <div class="row">
                    <Link to="/">
                        <input type="submit" value="OK" />
                    </Link>
                </div>
            </div>
        )
    }
}
