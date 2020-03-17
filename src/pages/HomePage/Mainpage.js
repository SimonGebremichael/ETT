import React from "react";
import Tree from "./pics/tree.png";
import Calendar from "./pics/calendar.png";
import Leafs from "./pics/leafs.png";
import Calendar_s from "./pics/calendar-shadow.png";
import Man_s from "./pics/man-shadow.png";
import Man from "./pics/man.png";
import Cloud_s from "./pics/cloud-shadow.png";
import Cloud from "./pics/cloud.png";
import Pie_s from "./pics/pie-shadow.png";
import Pie from "./pics/pie.png";
import Signin_s from "./pics/signin-shadow.png";
import Signin from "./pics/signin.png";
import style from './styles/mainpage.css'

export default function Mainpage() {
  return (
    <div>
      <img src={Tree} id="tree" alt="tree" />
      <img src={Calendar_s} id="calendar_s" alt="calendar shadow" />
      <img src={Calendar} id="calendar" alt="calendar" />
      <img src={Leafs} id="leafs" alt="leafs" />
      <img src={Man_s} id="man_s" alt="man shadow" />
      <img src={Man} id="man" alt="man" />
      <img src={Cloud_s} id="cloud_s" alt="cloud shadow" />
      <img src={Cloud} id="cloud" alt="cloud" />
      <img src={Pie_s} id="pie_s" alt="pie shadow" />
      <img src={Pie} id="pie" alt="pie" />
      <img src={Signin_s} id="signin_s" alt="signin shadow" />
      <a href="https://www.w3schools.com">
        <img src={Signin} id="btnSignin" alt="signin button" />
      </a>
    </div>
  );
}
