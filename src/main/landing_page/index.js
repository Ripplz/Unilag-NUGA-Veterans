import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const LandingPage = () => {
  return (
    <div id="wrapper_landing_page">
      <div id="wrapper_landing_page_main">
        <div id="img_landing_page_header" />
        <div id="landing_page_header">
          <div id="landing_page_header_title">
            Welcome to the home of Unilag NUGA Basketball Veterans
          </div>
          <div id="landing_page_header_cta_title">Are you a veteran?</div>
          <Link id="btn_landing_page_header_cta" to="/register">
            Register
          </Link>
        </div>
      </div>
      <div id="wrapper_landing_page_features">
        <Link to="/register" className="wrapper_landing_page_feature">
          <div
            className="landing_page_feature_img"
            id="landing_page_feature_img_register"
          />
          <div className="landing_page_feature_title">
            Register as a Veteran
          </div>
          <div className="landing_page_feature_text">
            Fill in your details as a Unilag NUGA Basketball Veteran
          </div>
        </Link>
        <Link to="/portal" className="wrapper_landing_page_feature">
          <div
            className="landing_page_feature_img"
            id="landing_page_feature_img_portal"
          />
          <div className="landing_page_feature_title">Access the Portal</div>
          <div className="landing_page_feature_text">
            Browse through every veteran in history!
          </div>
        </Link>
        <Link to="/profile" className="wrapper_landing_page_feature">
          <div
            className="landing_page_feature_img"
            id="landing_page_feature_img_profile"
          />
          <div className="landing_page_feature_title">Enter your Profile</div>
          <div className="landing_page_feature_text">
            View and Edit your Veteran Profile
          </div>
        </Link>
        <Link to="/feedback" className="wrapper_landing_page_feature">
          <div
            className="landing_page_feature_img"
            id="landing_page_feature_img_feedback"
          />
          <div className="landing_page_feature_title">
            Have Questions? Shoot!
          </div>
          <div className="landing_page_feature_text">
            Drop us a message on the Feedback page
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
