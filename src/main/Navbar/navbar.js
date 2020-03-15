import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Navbar = props => {
  const navRoutes = ["Home", "Register", "Portal", "Profile", "Feedback"];

  const showInfo = () => {
    swal({
      title: "About this app",
      text:
        "This app was created to collate and manage information about veteran players in Unilag's NUGA Basketball team.\n\n\n\nProject Manager: Dr. Ayo\n\nSoftware Developer: Stephen Ojo",
      icon: "info",
      button: "OK"
    });
  };

  return (
    <div id="wrapper_navbar">
      <Link to="/">
        <div id="navbar_logo" />
      </Link>
      <div id="wrapper_nav_items">
        {navRoutes.map((navItem, key) => (
          <Link
            to={`${key == 0 ? "/" : navItem.toLowerCase()}`}
            className="wrapper_nav_item"
            id={`${props.activeNav == key ? "nav_item_selected" : ""}`}
            onClick={() => props.onNavSelected(key)}
            key={key}
          >
            {navItem}
          </Link>
        ))}
        <div className="wrapper_nav_item" onClick={showInfo}>
          About
        </div>
      </div>
    </div>
  );
};

export default Navbar;
