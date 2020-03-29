import React from "react";
import Tree from "./pics/fullTree.png";
import goog_img from "./pics/google.png";
import { Link } from 'react-router-dom';

export default function Mainpage() {
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

  const pager = {
    width: "100%",
    height: "80%"
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

  return (
    <div style={pager}>
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
