import React, { component } from 'react';
import css from './style/pend.css'
import thumpsUp from './pics/thumbs.png'
import loading from './pics/loading.gif'
import { Link } from 'react-router-dom';

export default class Pending extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.user = this.props.match.params.id;
    }
    componentDidMount() {
        turn(true);
        console.log("from pending " + this.user);
        localStorage.setItem("access", this.user);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getperson.php?i=" + this.user);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    turn(false);
                    if (data.employee.employee_status == "pending") {
                        document.getElementById("pending_message").innerHTML = "Checked back in when your account is approved, Thank you";
                        document.getElementById("pending_header_message").innerHTML = "Your Account is Currently Pending!";
                        document.getElementById("pending_btn_back").style.display = "block";
                    } else {
                        document.getElementById("pending_message").innerHTML = "your account has been aprroved";
                        document.getElementById("pending_header_message").innerHTML = "You're all set :)";
                        document.getElementById("pending_btn_ok").style.display = "block";
                    }
                    document.getElementById("pending_username").innerHTML += data.employee.first_name + ", " + data.employee.last_name;
                    document.getElementById("pending_email").innerHTML += data.employee.email;
                    document.getElementById("pending_id").innerHTML += "ID: " + data.employee.googleId;
                    document.getElementById("pending_img").src = data.employee.img;
                    console.log(data);
                } catch (e) {
                    console.log(e);
                    document.getElementById("pending_message").innerHTML = "account might have been delete";
                    document.getElementById("pending_header_message").innerHTML = "User not found";
                    document.getElementById("pending_header_message").style.display = "pending_bottom_info";
                    document.getElementById("pending_btn_back").style.display = "block";
                }
            }
        }
        xhr.send();
    }
    render() {
        const image = {
            width: "30px",
        }
        const imgProfile = {
            width: "100px",
            height: "100px",
            backgroundColor: "black",
            marginLeft: "30%",
            marginTop: "10%",
            borderRadius: "50%",
            border: "5px solid white",
            backgroundColor: "gray",
            objectFit: "cover"
        }

        const bottom_info = {
            backgroundColor: "black",
            paddingBottom: "10px",
            paddingTop: "50px",
            color: "white"
        }
        var dashId = "/dashboard/" + this.user;
        return (
            <>
                <div class="pending_container">
                    <div id="pending_header">
                        <h2 id="pending_header_message"></h2>
                        <img src={thumpsUp} style={image} />
                    </div><br />
                    <p id="pending_message"></p><br /><br />
                    <div style={bottom_info} id="pending_bottom_info">
                        <div id="pending_profile" >
                            <div id="pending_pro_img_container">
                                <img id="pending_img" src="" style={imgProfile} />
                            </div>

                            <div id="pending_pro_detainer">
                                <p id="pending_username"></p><br />
                                <p id="pending_email"></p><br />
                                <p id="pending_id"></p>
                            </div>
                        </div>

                        <div class="row">
                            <Link to={dashId}>
                                <input id="pending_btn_ok" type="submit" value="Go To Dashboard" />
                            </Link>
                            <Link to="/">
                                <input id="pending_btn_back" type="submit" value="back" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="pending_container2">
                    <img src={loading} id="pending_loading_gif" />
                </div>
            </>

        )
    }
}

function turn(x) {
    if (x) {
        document.getElementsByClassName("pending_container")[0].style.display = "none";
        document.getElementsByClassName("pending_container2")[0].style.display = "block";
    }
    else {
        document.getElementsByClassName("pending_container")[0].style.display = "block";
        document.getElementsByClassName("pending_container2")[0].style.display = "none";
    }
}