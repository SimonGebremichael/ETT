import React from "react";
import Tree from "./pics/fullTree.png";
import { GoogleLogin } from 'react-google-login';

export default class mainPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    setOffsiteStatus();
    
    localStorage.removeItem("access");
    localStorage.removeItem("teamlead");

    var checkIfNewYear = new XMLHttpRequest();
    checkIfNewYear.open("GET", "http://localhost:8080/crud/api/newYearReset.php");
    checkIfNewYear.onreadystatechange = function () {
      if (checkIfNewYear.readyState == 4) { } }
    checkIfNewYear.send();
  }

  render() {
    const errr = (response) => {
      console.log(response);
    }

    const responseGoogle = (response) => {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/createPerson.php?" +
          "fname=" + response.profileObj.givenName +
          "&lname=" + response.profileObj.familyName +
          "&email=" + response.profileObj.email +
          "&eStatus=pending" +
          "&deptID=0" +
          "&gId=" + response.googleId +
          "&img=" + response.profileObj.imageUrl);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            console.log(xhr.responseText);
            try {
              if (xhr.responseText == "already") {
                checkIfTeamLead(response);
              } else {
                window.location.href = "http://localhost:3000/login/pending/" + response.googleId;
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

function checkIfTeamLead(response){
  var check = new XMLHttpRequest();
  check.open("GET", "http://localhost:8080/crud/api/checkTeamlead.php?i=" + response.googleId);
  check.onreadystatechange = function () {
    if (check.readyState == 4) {
      try {
        var where = check.responseText;
        var num = parseInt(where);
        localStorage.setItem("teamlead", "_true_");
        localStorage.setItem("access", response.googleId);
        window.location.href = "http://localhost:3000/dashboard/" + response.googleId;
      } catch (e) {
        localStorage.setItem("teamlead", check.responseText);
        localStorage.setItem("access", response.googleId);
        window.location.href = "http://localhost:3000/dashboard/" + response.googleId;
      }
    }
  }
  check.send();
}

function setOffsiteStatus(){
  var offsite = new XMLHttpRequest();
  offsite.open("GET", "http://localhost:8080/crud/api/UpdatePersonStatus.php");
  offsite.onreadystatechange = function () {
    if (offsite.readyState == 4) {
        if(offsite.responseText.length.length != 0){
          console.log(offsite.responseText);
        }
      }
  }
  offsite.send();
}