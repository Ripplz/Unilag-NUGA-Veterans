import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const LandingPage = () => {
  return (
    <div id="wrapper_landing_page">
      <div id="img_landing_page_header" />
      <div id="landing_page_header">
        <div id="landing_page_header_title">
          Welcome to the home page of UNILAG NUGA BASKETBALL VETERANS
        </div>
        <div id="landing_page_header_instructions">
          Over the last 40+ years unilag has been home to great basketball
          players, a good number featuring in national teams, state teams and
          reputable clubs. History will not be kind to us if we do not document
          the exploits of those who did the university proud. That's what this
          site is all about. Please fill in your details if you represented
          unilag in any NUGA, West African University, or African University
          Games. The veracity of all entries will be checked with other players.
          Please post current pictures and throwback pictures.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
