import React, { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ProfileForm from "../main/profile_form";
import swal from "sweetalert";
import Portal from "../main/portal";
import Navbar from "../main/Navbar/navbar";
import LandingPage from "../main/landing_page";
import Profile from "../main/profile";
import Feedback from "../main/feedback";
import Footer from "../main/Footer/footer";

function App() {
  const [currentNav, setCurrentNav] = useState(0);

  const handleNavSelected = index => {
    setCurrentNav(index);
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div id="wrapper_main">
          <Navbar activeNav={currentNav} onNavSelected={handleNavSelected} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={ProfileForm} />
          <Route
            exact
            path="/edit-profile"
            render={props => <ProfileForm {...props} isEditMode={true} />}
          />
          <Route exact path="/portal" component={Portal} />
          <Route
            exact
            path="/profile"
            render={props => <Profile {...props} isUser={true} />}
          />
          <Route exact path="/feedback" component={Feedback} />
          <Route
            exact
            path="/portal/veteran"
            render={props => <Profile {...props} isUser={false} />}
          />
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
