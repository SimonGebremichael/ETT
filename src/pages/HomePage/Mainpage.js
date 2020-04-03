import React from "react";
import Tree from "./pics/fullTree.png";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { GoogleLogin } from 'react-google-login';
import ApiCalendar from 'react-google-calendar-api';
import ApiCalendar2 from 'react-google-calendar-api/ApiCalendar';
var CLIENT_ID = '1048871087214-t3ttoli7jpjv5ep62qr91ftsh4hf7010.apps.googleusercontent.com';
var API_KEY = 'AIzaSyA0cfGXh6JoX0lXpYnjgTq09m62vO62TmM';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";


export default class mainPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {

    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", "http://localhost:8080/crud/api/getdata.php");
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4) {
    //       var data = JSON.parse(xhr.responseText);
    //       console.log(data);
    //     }
    // }
    // xhr.send();
  }

  componentDidUpdate() {

  }

  render() {
    const responseGoogle = (response) => {
      try {
        // console.log(response.googleId);
        // console.log('ID: ' + response.Qt.SU);
        // console.log('Fist Name: ' + response.Qt.vW);
        // console.log('Last Name: ' + response.Qt.wU);
        // console.log('Image URL: ' + response.Qt.UK);
        // console.log('Email: ' + response.Qt.zu);

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
            if (xhr.responseText == "true") {
              window.location.href = "http://localhost:3000/login/pending/" + response.Qt.SU;
              if (xhr.responseText == "already") {
                window.location.href = "http://localhost:3000/dashboard/" + response.Qt.SU;
              }
              console.log(xhr.responseText);
            }
          }
          xhr.send();
        }

      } catch (e) {
        console.log(e);
      }
    }

    return (
      <div>
        <div style={signIn}>
          <label style={message}>more connection, more organized, <br />enough complexity</label>
          {/* <Link to="/login/pending"> */}
          <div id="GoogleLogin">
            <GoogleLogin
              clientId="1048871087214-t3ttoli7jpjv5ep62qr91ftsh4hf7010.apps.googleusercontent.com"
              buttonText="Login with google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          {/* </Link> */}

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