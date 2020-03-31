import React, { useState, useEffect } from "react";
import "./index.css";
import { toast } from "react-toastify";

const Feedback = props => {
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [userId, setUserId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const loginFeedback = event => {
    event.preventDefault();
    setIsLoginButtonDisabled(true);
    var loginToastId = toast.info("Logging in...", {
      autoClose: false
    });
    const email = document.getElementById("input_feedback_login_email").value;
    const password = document.getElementById("input_feedback_login_password")
      .value;
    let fetchUrl = `${process.env.REACT_APP_SERVER_URL}/get_veteran_id?email=${email}&password=${password}`;
    fetch(fetchUrl, { method: "GET" })
      .then(response => response.json())
      .then(vetData => {
        console.log(vetData);
        if (vetData && vetData[0]) {
          const data = vetData[0];
          sessionStorage.setItem("userId", data._id);
          setUserId(data._id);
        } else toast.warn("Could not login. Please try again.");
        setIsLoginButtonDisabled(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("An error occured. Please try again.");
        setIsLoginButtonDisabled(false);
      })
      .finally(() => toast.dismiss(loginToastId));
  };

  const submitFeedback = event => {
    event.preventDefault();
    setIsSubmitDisabled(true);
    var submitToastId = toast.info("Submitting feedback...", {
      autoClose: false
    });
    const newFeedback = {
      message: feedbackMessage,
      userId
    };
    console.log(newFeedback);
    let fetchUrl = `${process.env.REACT_APP_SERVER_URL}/submit_feedback`;
    fetch(fetchUrl, {
      body: JSON.stringify(newFeedback),
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(submitToastId);
        toast.success("Your feedback has been successfully submitted.");
        setFeedbackMessage("");
        setIsSubmitDisabled(false);
      })
      .catch(err => {
        console.error(err);
        setIsSubmitDisabled(false);
      });
  };

  const loginContent = (
    <div id="wrapper_feedback_login">
      <form id="form_feedback_login" onSubmit={loginFeedback}>
        <input
          id="input_feedback_login_email"
          type="email"
          name="email"
          required
        />
        <input
          id="input_feedback_login_password"
          type="password"
          name="password"
          required
        />
        <button id="btn_feedback_login_submit" disabled={isLoginButtonDisabled}>
          Login
        </button>
      </form>
    </div>
  );

  const validContent = userId ? (
    <div id="wrapper_feedback_main">
      <form id="form_feedback" onSubmit={submitFeedback}>
        <textarea
          id="textarea__feedback"
          name="feedbackMessage"
          placeholder="Enter your feedback..."
          value={feedbackMessage}
          onChange={event => setFeedbackMessage(event.target.value)}
          required
        />
        <button id="btn_submit_feedback" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
    </div>
  ) : (
    loginContent
  );

  return <div id="wrapper_feedback">{validContent}</div>;
};

export default Feedback;
