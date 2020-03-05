import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route } from "react-router-dom";
import ProfileForm from "../main/profile_form";

function App() {
  return (
    <div id="wrapper_main">
      <ToastContainer />
      <BrowserRouter>
        <Route exact path="/" component={ProfileForm} />
      </BrowserRouter>
    </div>
  );
}

export default App;
