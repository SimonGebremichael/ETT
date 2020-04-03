import Status from './Offsite_status'
import pro from './pics/profile.png';
import React, { Component } from 'react'

export default class offsite extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        console.log("offside");
        console.log(props);
        this.pros = props;
   
    }

    componentDidMount() {
        var colours2 = ["lightblue", "lightgreen", "pink", "salmon"],
            colours3 = ["Remote", "Vacation", "Bithday", "Sick"];

        var elem = document.getElementsByClassName("upcomming_Type  ");
        var elem2 = document.getElementsByClassName("offsite_Right");
        for (var i = 0; i < elem.length; i++) {
            var rand = (Math.floor(Math.random() * 4) + 1) - 1;
            elem[i].style.backgroundColor = colours2[rand];
            elem2[i].innerHTML = colours3[rand];
        }

        // setInterval(() => {
        //     this.setState({ count: (Math.floor(Math.random() * 5) + 1) });
        // }, 500);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getperson.php?i=" + this.user);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    document.getElementById("dash_side_name").innerHTML = this.data.employee.first_name + ", " + this.data.employee.last_name;
                    document.getElementById("dash_side_email").innerHTML = this.data.employee.email;
                    document.getElementById("offsiteActivity_Main").innerHTML = this.data.employee.employee_status;
                    document.getElementsByClassName("offsite_acc_img")[0].src = this.data.employee.img;
                    console.log(data);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        xhr.send();
    }

    componentDidUpdate() {
        console.log("offside");
        console.log(this.pros);
    }

    render() {
        return (
            <div id="sideBar">
                <div id="sideAcc">
                    <table>
                        <tr>
                            <td id="accImgBox">
                                <img src={pro} id="accImg" className="offsite_acc_img"/>
                            </td>
                            <td id="accInfo">
                                <label id="dash_side_name"></label><br />
                                <label id="dash_side_email"></label><br />
                                <button id="offsiteActivity_Main"></button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="sideOffsite">
                    <h3>Currently Offsite:</h3>
                    <div id="offsiteDisplay">
                        <Status />
                        <Status />
                        <Status />
                        <Status />
                    </div>
                </div>
            </div>
        )
    }
}