import React, { useState, useEffect } from "react";
import "./index.css";
import default_profile_pic from "../../images/default_profile_pic.png";
import { toast } from "react-toastify";
import swal from "sweetalert";
import VeteranSummary from "./veteran_summary";
import { useHistory } from "react-router-dom";

const Portal = props => {
  const [veterans, setVeterans] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (props.history.location.state) {
      let searchQuery = props.history.location.state.searchQuery;
      console.log("search query ", searchQuery);
      let fetchUrl = `${process.env.REACT_APP_SERVER_URL}/search_veteran?query=${searchQuery}`;
      var submitToastId = toast.info("Searching...", { autoClose: false });
      fetch(fetchUrl, { method: "GET" })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          toast.dismiss(submitToastId);
          if (data) setVeterans(data);
          else {
            toast.warn(
              `No veteran with the Nuga Year "${searchQuery}" was found.`
            );
            history.push("/");
          }
          if (data.length <= 0) {
            toast.warn(
              `No veteran with the Nuga Year "${searchQuery}" was found.`
            );
            history.push("/");
          }
        })
        .catch(err => {
          toast.error("An error occured. Please try again.");
          console.error(err);
          history.push("/");
        })
        .finally(() => toast.dismiss(submitToastId));
    } else {
      toast.error("No search query supplied. Please try again");
      history.push("/");
    }
  }, [props.history.location.state.searchQuery]);

  return (
    <div id="wrapper_portal">
      {/* <div id="wrapper_portal_filter">
        <form id="form_portal_filter_query" onSubmit={filterPortalList}>
          <input
            id="input_portal_filter"
            type="text"
            name="filterQuery"
            placeholder="Enter NUGA Year..."
          />
          <button id="btn_portal_filter">Filter</button>
        </form>
      </div> */}
      <div id="wrapper_veterans_list">
        {veterans &&
          veterans
            // .filter(val => {
            //   return filterQuery ? val.nugaYears.includes(filterQuery) : val;
            // })
            .map((veteran, index) => (
              <VeteranSummary key={index} data={veteran} />
            ))}
      </div>
    </div>
  );
};

export default Portal;
