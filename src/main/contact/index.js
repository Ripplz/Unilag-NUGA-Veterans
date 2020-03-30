import React, { useState } from "react";
import "./index.css";
import { toast } from "react-toastify";

const Contact = () => {
  const [contactMessage, setContactMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const submitContact = event => {
    event.preventDefault();
    setIsSubmitDisabled(true);
    var submitToastId = toast.info("Submitting...", {
      autoClose: false
    });
    const newContactMessage = {
      message: contactMessage,
      name,
      email,
      phone
    };
    console.log(newContactMessage);
    // let fetchUrl =
    // "https://unilag-nuga-veterans-server.now.sh/submit_contact_message";
    let fetchUrl = "http://localhost:3005/submit_contact_message";
    fetch(fetchUrl, {
      body: JSON.stringify(newContactMessage),
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        toast.success(
          "Your message has been successfully submitted. Thank you!"
        );
        resetComponent();
        setIsSubmitDisabled(false);
      })
      .catch(err => {
        console.error(err);
        setIsSubmitDisabled(false);
      })
      .finally(() => {
        toast.dismiss(submitToastId);
      });
  };

  const resetComponent = () => {
    setContactMessage("");
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div id="wrapper_contact">
      <form id="form_contact" onSubmit={submitContact}>
        <input
          className="input_contact"
          type="text"
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Full Name..."
          required
        />
        <input
          className="input_contact"
          type="email"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Email Address..."
          required
        />
        <input
          className="input_contact"
          type="number"
          name="phone"
          value={phone}
          onChange={event => setPhone(event.target.value)}
          placeholder="Phone Number (optional)..."
        />
        <textarea
          id="textarea__contact"
          name="contactMessage"
          placeholder="Enter your message..."
          value={contactMessage}
          onChange={event => setContactMessage(event.target.value)}
          required
        />
        <button id="btn_submit_contact" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
