import React, { Component } from 'react'

export default class reporter extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="report_cont" >
                <div id="reportHeader">
                    <h2>Your reports:</h2>
                </div>

                <div id="reportBody">
                    <div id="repopo">
                        <h3 class="reportTypeName">Remote </h3><br />
                        <div class="reportItem"  style={borderBot}>
                            <div  style={borderRight}>
                                <p>used</p>
                                <div style={bg}>4</div>
                            </div>
                            <div>
                                <p>left</p>
                                <div style={bg}>21</div>
                            </div>
                        </div>
                    </div>
                    <div id="repopo">
                        <h3 class="reportTypeName">Vacation </h3><br />
                        <div class="reportItem"  style={borderBot}>
                            <div  style={borderRight}>
                                <p>used</p>
                                <div style={bg}>3</div>
                            </div>
                            <div>
                                <p>left</p>
                                <div style={bg}>2</div>
                            </div>
                        </div>
                    </div>


                    <div id="repopo">
                        <h3 class="reportTypeName">Bithday </h3><br />
                        <div class="reportItem" style={borderBot}>
                            <div  style={borderRight}>
                                <p>used</p>
                                <div style={bg}>0</div>
                            </div>
                            <div>
                                <p>left</p>
                                <div style={bg}>1</div>
                            </div>
                        </div>
                    </div>

                    <div id="repopo">
                        <h3 class="reportTypeName">Sick</h3><br />
                        <div class="reportItem" style={borderBot}>
                            <div  style={borderRight}>
                                <p>used</p>
                                <div style={bg}>13</div>
                            </div>
                            <div>
                                <p>left</p>
                                <div style={bg}>20</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const bg = {
    height: "50px",
    textAlign: "center",
    paddingTop: "20%",
    fontSize: "25px",
    Color: "white",
    marginTop: "10px",
    backgroundColor: "lightgrey"
}

const borderRight = {
    borderRight: "1px solid black"
}
const borderBot = {
    borderTop: "1px solid black"
}