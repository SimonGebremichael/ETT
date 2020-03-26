import React from 'react'
import modify from './Teamlead/pics/modify.png'
import settings from './Teamlead/pics/settings.png'
import Scheme from './Teamlead/pics/theme.png'
import profile from './Teamlead/pics/profile.png'
import { Link } from 'react-router-dom'
import $ from 'jquery'

export default class Profiler extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $("#ProfileColours").fadeOut();
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

        $("#colour_Scheme").click(() => {
            clear();
            $("#ProfileColours").show();
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
            $("#ProfileColours").hide();
            $("#profileSettings").hide();
            $("#ProfileSideAcc").hide();
        }
    }

    render() {
        return (
            <div id="profile">
                <div id="proBG"></div>
                <div id="prfileSlide">
                    <div id="ProfileSideAcc">
                        <table>
                            <tr>
                                <td id="accImgBox">
                                    <img src={profile} id="accImg" />
                                </td>
                                <td id="accInfo">
                                    <label>John Smith</label><br />
                                    <label>j.smith8080@gmail.com</label><br />
                                    <button id="offsiteActivity">Active</button>
                                </td>
                            </tr>

                        </table>
                        <table id="profileOptions">
                            <tr>
                                <td>Modify Account</td>
                                <td id="Options_Items">
                                    <img src={modify} id="proimg" /></td>
                            </tr>
                            <tr>
                                <td id="settings">Settings</td>
                                <td id="Options_Items">
                                    <img src={settings} id="proimg" /></td>
                            </tr>

                            <tr>
                                <td id="colour_Scheme">Colour Scheme</td>
                                <td id="Options_Items">
                                    <img src={Scheme} id="proimg" /></td>
                            </tr>
                        </table>
                    </div>

                    <div id="ProfileColours">
                        <div id="colourHeader">
                            <button class="backhomeBtn">Back</button><br /><br />
                            <label><font size="30px">Colour Scheme</font></label>
                        </div>
                        <table id="profileOptions">
                            <tr id="theme1"><td>Sea Navy</td></tr>
                            <tr id="theme2"><td >Grizzely bear</td></tr>
                            <tr id="theme3"><td>Paprika</td></tr>
                            <tr id="theme4"><td>Default</td></tr>
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

                    <div id="profileSettings">
                        <div id="colourHeader">
                            <button class="backhomeBtn">Back</button><br /><br />
                            <label><font size="30px">Settings</font></label>
                        </div>
                        <table id="profileOptions">
                            <tr>
                                <td>
                                    <Link to='/offtype'>Add new off type </Link>
                                </td>
                            </tr>
                            <tr><td >remove person</td></tr>
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