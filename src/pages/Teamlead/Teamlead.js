import React from 'react'
import Offsite from './Offsite'
import ActiveRequests from './ActiveRequests'
import Upcomming from './Upcomming'
import Profile from '../Profile'

export default class team extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var proBG = document.getElementById("proBG").addEventListener("click", () => {
            document.getElementById("upcomming").style.filter = "blur(0)";
            document.getElementById("mainFeed").style.filter = "blur(0)";
            document.getElementById("sideBar").style.filter = "blur(0)";
            document.getElementById("profile").style.display = "none";
        });
        var sideAcc = document.getElementById("sideAcc").addEventListener("click", () => {
            document.getElementById("upcomming").style.filter = "blur(2px)";
            document.getElementById("mainFeed").style.filter = "blur(2px)";
            document.getElementById("sideBar").style.filter = "blur(2pxs)";
            document.getElementById("profile").style.display = "block";
        });

        var sideAcc = document.getElementById("colour_Scheme").addEventListener("click", () => {
            document.getElementById("ProfileColours").style.display = "block";
            document.getElementById("ProfileSideAcc").style.display = "none";
        });

        var sideAcc = document.getElementById("colourBtn").addEventListener("click", () => {
            document.getElementById("ProfileSideAcc").style.display = "block";
            document.getElementById("ProfileColours").style.display = "none";
        });


        var colours2 = ["lightblue", "lightgreen", "pink", "salmon"],
            colours3 = ["Remote", "Vacation", "Bithday", "Sick"];

        var elem = document.getElementsByClassName("request_Type");
        var elem2 = document.getElementsByClassName("request_Type_info");
        for (var i = 0; i < elem.length; i++) {
            var rand = (Math.floor(Math.random() * 4) + 1) - 1;
            elem[i].style.backgroundColor = colours2[rand];
            elem2[i].innerHTML = colours3[rand];
        }
    }

    render() {
        return (<Teamleader />)
    }
}

function Teamleader() {
    return (
        <div id="content">
            <Profile />
            <Offsite />
            <ActiveRequests />
            <Upcomming />
        </div>
    )
}
