import React from "react";
import Tree from "./pics/fullTree.png";
import goog_img from "./pics/google.png";
import { Link } from 'react-router-dom';
import $ from 'jquery';

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
    return (
      <div>
        <label style={message}>more connection, more organized, <br />enough complexity</label>
        <div style={signIn}>
          <Link to="/login/pending">
            <button style={btn}>
              <img src={goog_img} style={btnImg} />
              <label style={btnlbl}>Sign in with google</label>
            </button>
          </Link>
        </div>
        <div style={treeDisplay}>
          <img src={Tree} style={fullTree} alt="tree" />
        </div>
      </div>
    );
  }
}
// var CLIENT_ID = '1048871087214-t3ttoli7jpjv5ep62qr91ftsh4hf7010.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyA0cfGXh6JoX0lXpYnjgTq09m62vO62TmM';
// var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

// var authorizeButton = document.getElementById('authorize_button');
// var signoutButton = document.getElementById('signout_button');
// var gapi;
// function handleClientLoad() {
//   gapi.load('client:auth2', initClient);
// }
// function initClient() {
//   gapi.client.init({
//     apiKey: API_KEY,
//     clientId: CLIENT_ID,
//     discoveryDocs: DISCOVERY_DOCS,
//     scope: SCOPES
//   }).then(function () {
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
//     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//     authorizeButton.onclick = handleAuthClick;
//     signoutButton.onclick = handleSignoutClick;
//   }, function (error) {
//     appendPre(JSON.stringify(error, null, 2));
//   });
// }

// function updateSigninStatus(isSignedIn) {
//   if (isSignedIn) {
//     authorizeButton.style.display = 'none';
//     signoutButton.style.display = 'block';
//     printUserData();
//   } else {
//     authorizeButton.style.display = 'block';
//     signoutButton.style.display = 'none';
//   }
// }

// function handleAuthClick(event) {
//   gapi.auth2.getAuthInstance().signIn();
// }
// function handleSignoutClick(event) {
//   gapi.auth2.getAuthInstance().signOut();
// }

// function appendPre(message) {
//   var pre = document.getElementById('content');
//   var textContent = document.createTextNode(message + '\n');
//   pre.appendChild(textContent);
// }

// function printUserData() {

//   gapi.client.calendar.events.list({
//     'calendarId': 'primary',
//     'timeMin': (new Date()).toISOString(),
//     'showDeleted': false,
//     'singleEvents': true,
//     'maxResults': 10,
//     'orderBy': 'startTime'
//   }).then(function (response) {
//     var events = response.result.items;
//     appendPre('Upcoming events:');
//     if (events.length > 0) {
//       for (var i = 0; i < events.length; i++) {
//         var event = events[i];
//         var when = event.start.dateTime;
//         if (!when) {
//           when = event.start.date;
//         }
//         appendPre(event.summary + ' (' + when + ')')
//       }
//     } else {
//       console.log(response);
//       appendPre('No upcoming events found.');
//     }
//   });

//   var profile = gapi.auth2.getAuthInstance().currentUser.get().Qt;
//   console.log('ID: ' + profile.SU);
//   console.log('Fist Name: ' + profile.vW);
//   console.log('Last Name: ' + profile.wU);
//   console.log('Image URL: ' + profile.UK);
//   console.log('Email: ' + profile.zu);
// }


const btn = {
  width: "200px",
  height: "40px",
  bottom: "-20%",
  color: "black",
  backgroundColor: "white",
  border: "1px solid black",
  position: "absolute",
  bottom: "5%",
  left: "3%"
}

const signIn = {
  width: "20%",
  height: "100%",
  float: "left"
}

const message = {
  width: "20%",
  height: "100%",
  float: "left",
  marginTop: "10%",
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


const btnImg = {
  width: "50px",
  height: "100%",
  backgroundColor: "black",
  float: "left",
  objectFit: "contain"
}

const btnlbl = {
  float: "right",
  margin: "10px 20px 10px 0px"
}