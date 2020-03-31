import React from "react";
import Tree from "./pics/fullTree.png";
import goog_img from "./pics/google.png";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { GoogleLogin } from 'react-google-login';

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
    // handleClientLoad();
  }

  componentDidUpdate() {

  }
  render() {
    const responseGoogle = (response) => {
      try {
        console.log(response.googleId);
        console.log('ID: ' + response.Qt.SU);
        console.log('Fist Name: ' + response.Qt.vW);
        console.log('Last Name: ' + response.Qt.wU);
        console.log('Image URL: ' + response.Qt.UK);
        console.log('Email: ' + response.Qt.zu);
        window.location = "http://localhost:3000/login/pending?i=" + response.googleId;

      } catch (e) {
        console.log(e);
        console.log(response);
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
              style={{ marginTop: "50%", color: 'green' }}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
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