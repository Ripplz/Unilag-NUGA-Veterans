import React, { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import swal from "sweetalert";
import Portal from "../main/portal";
import Navbar from "../main/Navbar/navbar";
import LandingPage from "../main/landing_page";
import Account from "../main/account";
import Feedback from "../main/feedback";
import Footer from "../main/Footer/footer";
import Contact from "../main/contact";
import RegistrationPage from "../main/register";
import AdminFeedback from "../main/admin/feedback";

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
          <Route exact path="/register" component={RegistrationPage} />
          <Route
            exact
            path="/edit-profile"
            render={props => <RegistrationPage {...props} isEditMode={true} />}
          />
          <Route exact path="/veteran_search" component={Portal} />
          <Route
            exact
            path="/account"
            render={props => <Account {...props} isUser={true} />}
          />
          {/* <Route exact path="/feedback" component={Feedback} /> */}
          <Route exact path="/feedback" component={Contact} />
          <Route exact path="/admin/feedback" component={AdminFeedback} />
          <Route
            exact
            path="/portal/veteran"
            render={props => <Account {...props} isUser={false} />}
          />
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
