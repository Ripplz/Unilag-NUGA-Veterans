import React from "react";
import "./index.css";

const ProfileForm = () => {
  return (
    <div id="wrapper_profile_form">
      <div id="wrapper_profile_form_header" />
      <div id="wrapper_profile_form_main">
        <div id="title_profile_form">
          U<small>nilag</small> N<small>UGA</small> B<small>asketball</small> V
          <small>eterans</small>
        </div>
        <div id="wrapper_header_form_profile_form">
          <div id="header_form_profile_form">Fill in your details below</div>
          <div id="underline_decoration" />
        </div>
        <form id="form_profile_form">
          <div className="form_group">
            <div className="form_field">
              <div className="form_field_title">Last Name</div>
              <input
                className="input__form_field"
                type="text"
                name="lastName"
                // value={lastName}
                // onChange={event => setLastName(event.target.value)}
                required
              />
            </div>

            <div className="form_field">
              <div className="form_field_title">Other Names</div>
              <input
                className="input__form_field"
                type="text"
                name="otherNames"
                // value={lastName}
                // onChange={event => setLastName(event.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
