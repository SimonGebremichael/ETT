import React, { component } from 'react';
import css from './style/pend.css'
import thumpsUp from './pics/thumbs.png'
import loading from './pics/loading.gif'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default class Pending extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.getElementsByClassName("pending_container")[0].style.display = "none";
        document.getElementsByClassName("pending_container2")[0].style.display = "block";
        var url = window.location.href.split("?")[1];
        var user = url.split("=")[1];
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getperson.php?i=" + user);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText);
                document.getElementsByClassName("pending_container")[0].style.display = "block";
                document.getElementsByClassName("pending_container2")[0].style.display = "none";

                if(data.employee.employee_status != "onsite"){
                    document.getElementById("pending_message").innerHTML = "You will  be notified once approved, Thank you";
                    document.getElementById("pending_header_message").innerHTML = "Your Account is Currently Pending!";
                }else{
                    document.getElementById("pending_message").innerHTML = "your account has been aprroved";
                    document.getElementById("pending_header_message").innerHTML = "Your all set :)";
                }
                document.getElementById("pending_username").innerHTML += data.employee.first_name + ", " + data.employee.last_name;
                document.getElementById("pending_email").innerHTML += data.employee.email;
                document.getElementById("pending_id").innerHTML += "ID: " + data.employee.employeeID;
                document.getElementById("pending_img").src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Pd0tR4zfjYF6MwkYlbQcyQHaEn%26pid%3DApi&f=1";
                console.log(data);
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
            border: "3px solid black",
            backgroundColor: "gray"
        }

        const bottom_info = {
            backgroundColor: "black",
            paddingBottom: "10px",
            paddingTop: "50px",
            color: "white"
        }
        return (
            <>
            <div class="pending_container">
                <div id="pending_header">
                    <h2 id="pending_header_message"></h2>
                    <img src={thumpsUp} style={image} />
                </div><br />
                <p id="pending_message"></p><br /><br />
                <div style={bottom_info}>
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
                        <Link to="/dashboard">
                            <input type="submit" value="OK" />
                        </Link>
                        <Link to="/">
                            <input type="submit" value="Cancel" />
                        </Link>
                    </div>
                </div>
            </div>
            <div class="pending_container2">
                <img src={loading} id="pending_loading_gif"/>
            </div>
            </>

        )
    }
}
