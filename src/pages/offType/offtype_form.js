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
                <h2>New Offtype Entry</h2>
                <div class="row">
                    <div class="col-25">
                        <label for="otname">Offtype Name:</label>
                    </div>
                    <div class="col-75">
                        <input type="text" id="otname" name="offtypename" placeholder="The offtype name.." />
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="limit">Default Limit</label>
                    </div>
                    <div class="col-75">
                        <input type="text" id="dlimit" name="defaultlimit" placeholder="The default number of days" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="colour">Colour</label>
                    </div>
                    <div class="col-75">
                        <select id="colour" name="colour">
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="orange">Orange</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <input type="submit" value="Submit" />
                </div>
            </div>
        )
    }
}