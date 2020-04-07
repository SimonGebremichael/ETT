import React from "react";
import Tree from "./pics/fullTree.png";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { GoogleLogin } from 'react-google-login';
import ApiCalendar from 'react-google-calendar-api';
import ApiCalendar2 from 'react-google-calendar-api/ApiCalendar';

export default class mainPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("teamlead");
  }

  render() {
    const errr = (response) => {
      alert("error");
    }

    const responseGoogle = (response) => {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/createPerson.php?" +
          "fname=" + response.Qt.vW +
          "&lname=" + response.Qt.wU +
          "&email=" + response.Qt.zu +
          "&dob=01/01/1998" +
          "&eStatus=pending" +
          "&deptID=1" +
          "&gId=" + response.Qt.SU +
          "&img=" + response.Qt.UK);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            console.log(xhr.responseText);
            try {
              if (xhr.responseText == "already") {
                var check = new XMLHttpRequest();
                check.open("GET", "http://localhost:8080/crud/api/checkTeamlead.php?i=" + response.Qt.SU);
                check.onreadystatechange = function () {
                  if (check.readyState == 4) {
                    console.log(check.responseText);
                    if (check.responseText == 'true') {
                      localStorage.setItem("teamlead", check.responseText);
                      localStorage.setItem("access", response.Qt.SU);
                      window.location.href = "http://localhost:3000/dashboard/" + response.Qt.SU;
                    } else {
                      localStorage.setItem("teamlead", check.responseText);
                      localStorage.setItem("access", response.Qt.SU);
                      window.location.href = "http://localhost:3000/dashboard/2/" + response.Qt.SU;
                    }
                  }
                }
                check.send();
              } else {
                window.location.href = "http://localhost:3000/login/pending/" + response.Qt.SU;
              }
            } catch (e) { console.log(e); }
          }
        }


        xhr.send();
      } catch (e) { console.log(e); }
    }



    return (
      <div>
        <div style={signIn}>
          <label style={message}>more connection, more organized, <br />enough complexity</label>
          <div id="GoogleLogin">
            <GoogleLogin
              clientId="1048871087214-t3ttoli7jpjv5ep62qr91ftsh4hf7010.apps.googleusercontent.com"
              buttonText="Login with google"
              onSuccess={responseGoogle}
              onFailure={errr}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          <style dangerouslySetInnerHTML={{
            __html: `
             #GoogleLogin { 
              margin-top: 130%;
              margin-left: 3%;
              position: absobute;
             }
                    `}} />
        </div>
        <div style={treeDisplay}>
          <img src={Tree} style={fullTree} alt="tree" />
        </div>
      </div>
    );
  }
}

function isTeamlead(response) {

}
const signIn = {
  width: "30%",
  height: "100%",
  float: "left"
}

const message = {
  height: "100%",
  float: "left",
  marginTop: "60%",
  marginLeft: "3%",
  color: "white",
  fontSize: "20px"
}

const fullTree = {
  width: "50%",
  position: "absolute",
  bottom: "0px",
  right: "15px",
  bottom: "0px"
}

const treeDisplay = {
  width: "50%",
  height: "100%",
  float: "right"
}

