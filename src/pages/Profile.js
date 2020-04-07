import React from 'react'
import modify from './Teamlead/pics/modify.png'
import settings from './Teamlead/pics/settings.png'
import { Link } from 'react-router-dom'
import $ from 'jquery'

export default class Profiler extends React.Component {

    constructor(props) {
        super(props);
        this.user = localStorage.getItem("access");
        this.teamlead = localStorage.getItem("teamlead");
    }
    componentDidMount() {
        if (this.teamlead == "true") {
            $("#profileSettings").fadeOut();
            $("#ProfileSideAcc").fadeIn();

            $("#proBG").click(() => {
                document.getElementById("container_" + window.location.href.split("/")[3]).style.filter = "blur(0)";
                document.getElementById("profile").style.display = "none";
            });
            $("#sideAcc").click(() => {
                document.getElementById("container_" + window.location.href.split("/")[3]).style.filter = "blur(2px)";
                document.getElementById("profile").style.display = "block";
            });


            $(".backhomeBtn").click(() => {
                clear();
                $("#ProfileSideAcc").show();
            });

            $("#settings").click(() => {
                clear();
                $("#profileSettings").show();
            });

            function clear() {
                $("#profileSettings").hide();
                $("#ProfileSideAcc").hide();
            }
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getperson.php?i=" + this.user);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    document.getElementById("profile_name_print").innerHTML = data.employee.first_name + ", " + data.employee.last_name;
                    document.getElementById("profile_email_print").innerHTML = data.employee.email;
                    document.getElementsByClassName("profile_stat_print")[0].innerHTML = data.employee.employee_status;
                    document.getElementsByClassName("profile_stat_accImg")[0].src = data.employee.img;
                } catch (e) {
                    console.log(e);
                }
            }
        }
        xhr.send();
    }

    render() {
        var offtypeEmployee = '/offtype/' + this.user;
        var modifyEmployees = '/profile/modify/' + this.user;
        return (
            <div id="profile">
                <div id="proBG"></div>
                <div id="prfileSlide">
                    <div id="ProfileSideAcc">
                        <table>
                            <tr>
                                <td id="accImgBox">
                                    <img src="" class="profile_stat_accImg" id="accImg" />
                                </td>
                                <td id="accInfo">
                                    <label id="profile_name_print">John Smith</label><br />
                                    <label id="profile_email_print">j.smith8080@gmail.com</label><br />
                                    <button class="profile_stat_print" id="offsiteActivity">Active</button>
                                </td>
                            </tr>

                        </table>
                        <table id="profileOptions">
                            <tr>
                                <td><Link to={modifyEmployees}>Modify people</Link></td>
                                <td id="Options_Items">
                                    <img src={modify} id="proimg" /></td>
                            </tr>
                            <tr>
                                <td id="settings">Settings</td>
                                <td id="Options_Items">
                                    <img src={settings} id="proimg" /></td>
                            </tr>

                        </table>
                    </div>

                    <div id="profileSettings">
                        <div id="colourHeader">
                            <button class="backhomeBtn">Back</button><br /><br />
                            <label><font size="30px">Settings</font></label>
                        </div>
                        <table id="profileOptions">
                            <tr>
                                <td>
                                    <Link to={offtypeEmployee}>Add new OffType</Link>
                                </td>
                            </tr>
                        </table>

                        <style dangerouslySetInnerHTML={{
                            __html: `
                     #theme1 { background-image: linear-gradient(to right, lightblue , rgb(228, 131, 228), rgb(81, 81, 199)); }
                     #theme2 { background-image: linear-gradient(to right, rgb(95, 49, 55) , rgb(168, 77, 60), rgb(78, 42, 42)); }
                     #theme3 { background-image: linear-gradient(to right, rgb(107, 103, 79) , rgb(192, 128, 56), rgb(195, 204, 110));" }
                     #theme4 { background-image: linear-gradient(to right, #222 , #333, #222); }
                     #Options_Items{text-align: center; margin-right: 50px;}
                    `}} />
                    </div>
                </div>
            </div>
        )
    }
}