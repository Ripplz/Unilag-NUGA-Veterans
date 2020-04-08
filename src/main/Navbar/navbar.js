import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const Navbar = props => {
  const navRoutes = ["Home", "Register", "Login", "Feedback"];
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const history = useHistory();

  const showInfo = () => {
    swal({
      title: "About this app",
      text:
        "This app was created to collate and manage information about veteran players in Unilag's NUGA Basketball team.\n\n\nConceptual Design: Dr. Daniel Ayo (danielayo@hotmail.com)\n\nSoftware Development: Stephen Ojo (ojostephendev@gmail.com)",
      icon: "info",
      button: "OK"
    });
  };

  const toggleSearch = () => setIsSearchBarVisible(!isSearchBarVisible);

  const performVeteranSearch = event => {
    event.preventDefault();
    const searchQuery = document.getElementById("input_veteran_search").value;
    history.push("/veteran_search", { searchQuery });
  };

  return (
    <div id="wrapper_navbar">
      <Link to="/" style={{"text-decoration": "none"}}>
        <div id="navbar_logo">UNILAG NUGA<br />BASKETBALL VETERANS</div>
      </Link>
      <div id="wrapper_nav_items">
        {navRoutes.map((navItem, key) => (
          <Link
            to={`${key === 0 ? "/" : "/" + navItem.toLowerCase()}`}
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
        <div id="wrapper_nav_veteran_search">
          <form id="form_veteran_search" onSubmit={performVeteranSearch}>
            <input
              id="input_veteran_search"
              type="number"
              name="searchQuery"
              placeholder="Enter Year (e.g. 2020)"
              required
            />
            <button id="btn_veteran_search">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
