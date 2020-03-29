import React, { Component } from 'react'
import css from './style/offtyper.css'

export default class offTypes extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
                <div class="offtype_container">
                    <div id="offtype_header">
                        <h2>New Offtype Entry</h2>
                    </div>
                    <div id="offtype_body">
                        <label for="otname">Offtype Name:</label>
                        <input type="text" id="otname" name="offtypename" placeholder="The offtype name.." />
                        <label for="colour">Colour:</label>
                        <select id="colour">
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="orange">Orange</option>
                        </select>
                        <label for="limit">Default Limit:</label>
                        <input type="text" id="dlimit" name="defaultlimit" placeholder="The default number of days" />
                    </div>

                    <div id="offtype_submition" class="row">
                    <input type="submit" value="Submit" />
                </div>
                </div>
        )
    }
}