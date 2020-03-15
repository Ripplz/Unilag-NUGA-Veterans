import React, { useState, useEffect } from "react";
import "./index.css";
import default_profile_pic from "../../images/default_profile_pic.png";
import { toast } from "react-toastify";
import swal from "sweetalert";
import VeteranSummary from "./veteran_summary";

const Portal = () => {
  const [veterans, setVeterans] = useState([]);

  
  useEffect(() => {
    //   let fetchUrl = "https://unilag-nuga-veterans-server.now.sh/get_veterans"
    let fetchUrl = "http://localhost:3005/get_veterans";
    
    var submitToastId = toast.info("Loading Veterans...", { autoClose: false });
    fetch(fetchUrl, { method: "GET" })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.dismiss(submitToastId);
        if (data) setVeterans(data);
        else toast.warn("You don't have any veteran submissions yet!");
        if (data.length <= 0)
          toast.warn("You don't have any veteran submissions yet!");
      })
      .catch(err => {
        toast.error("An error occured. Please refresh the page");
        console.error(err);
      });
  }, []);

  return (
    <div id="wrapper_portal">
      <div id="portal_title">U<small>nilag</small> N<small>UGA</small> B<small>asketball</small> V
          <small>eterans</small><span id="portal_title_decorated">portal</span></div>
      <div id="wrapper_veterans">
        {veterans &&
          veterans.map((veteran, index) => (
            <VeteranSummary key={index} data={veteran} />
          ))}
      </div>
    </div>
  );
};

export default Portal;
