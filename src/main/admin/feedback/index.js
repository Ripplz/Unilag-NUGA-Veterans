import React, { useState } from "react";
import "./index.css";
import swal from "sweetalert";

const AdminFeedback = () => {
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [feedbackList, setFeedbackList] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginAdminFeedback = event => {
    event.preventDefault();
    const password = document.getElementById("input_feedback_login_password")
      .value;
    if (password === "123456asdfgh") {
      setIsLoggedIn(true);
      loadFeedback();
    }
  };

  const loadFeedback = () => {
    let fetchUrl = `${process.env.REACT_APP_SERVER_URL}/get_all_contact`;
    fetch(fetchUrl, { method: "GET" })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFeedbackList(data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const displayFeedbackMessage = feedbackMessage => {
    swal({
      title: "Feedback Message",
      text: feedbackMessage,
      icon: "info",
      button: "Dismiss"
    });
  };

  return (
    <div id="wrapper_admin_feedback">
      {isLoggedIn ? (
        <div id="wrapper_feedback_list">
          <div className="wrapper_admin_single_feedback">
            <span className="wrapper_admin_feedback_detail">Name</span>
            <span className="wrapper_admin_feedback_detail">Phone</span>
            <span className="wrapper_admin_feedback_detail">Email</span>
            <span className="wrapper_admin_feedback_detail">
              Date Submitted
            </span>
            <span className="wrapper_admin_feedback_detail">Message</span>
          </div>
          {feedbackList &&
            feedbackList.map((feedback, index) => (
              <div className="wrapper_admin_single_feedback" key={index}>
                <span className="wrapper_admin_feedback_detail">
                  {feedback.name}
                </span>
                <span className="wrapper_admin_feedback_detail">
                  {feedback.phone}
                </span>
                <span className="wrapper_admin_feedback_detail">
                  {feedback.email}
                </span>
                <span className="wrapper_admin_feedback_detail">
                  {`${new Date(feedback.timestamp).getFullYear()}/${new Date(
                    feedback.timestamp
                  ).getMonth() + 1}/${new Date(feedback.timestamp).getDate()}`}
                </span>
                <span
                  className="wrapper_admin_feedback_detail"
                  onClick={() => displayFeedbackMessage(feedback.message)}
                  style={{ cursor: "pointer" }}
                >
                  Click to View
                </span>
              </div>
            ))}
        </div>
      ) : (
        <div id="wrapper_feedback_admin_login">
          <form id="form_feedback_admin_login" onSubmit={loginAdminFeedback}>
            <input
              id="input_feedback_login_password"
              type="password"
              name="password"
              placeholder="Enter your password to access the admin portal"
              required
            />
            <button
              id="btn_feedback_admin_login_continue"
              disabled={isLoginButtonDisabled}
            >
              Continue
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
