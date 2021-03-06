import React from "react";
import { useHistory } from "react-router-dom";
import default_profile_pic from "../../images/default_profile_pic.png";
import "./index.css";

const VeteranSummary = props => {
  console.log(props);
  const history = useHistory();

  const openVeteranProfile = () => {
    history.push('/portal/veteran', { data: props.data });
  };

  return (
    <div className="wrapper_veteran" onClick={openVeteranProfile}>
      <div className="wrapper_veteran_header">
        <img
          className="img_veteran_profile_pic"
          alt=""
          src={
            props.data.recentPhoto
              ? props.data.recentPhoto
              : default_profile_pic
          }
        />
        <div className="title_veteran_name">{`${props.data.lastName} ${props.data.otherNames}`}</div>
      </div>
      <div className="wrapper_veteran_details">
        <span className="wrapper_veteran_nuga_years">
          {props.data.nugaYears.join(" - ")}
        </span>
        <span className="wrapper_veteran_jersey_positions">
          {props.data.jerseyPositions}
        </span>
      </div>
    </div>
  );
};

export default VeteranSummary;
