import React, { useState, useEffect } from "react";
import "./index.css";
import default_profile_pic from "../../images/default_profile_pic.png";
import Carousel, { Modal, ModalGateway } from "react-images";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Profile = props => {
  const [galleryTbPhotos, setGalleryTbPhotos] = useState([]);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [validVet, setValidVet] = useState(null);
  const [emptyDataText, setEmptyDataText] = useState(
    "Data not found. Please reload"
  );
  const [shouldLoginConfirmed, setShouldLoginConfirmed] = useState(false);

  const history = useHistory();

  const resolveGalleryTbPhotos = source => {
    const newPhotos = source.throwbackPhotos.map(val => ({
      source: val.throwbackPhoto,
      caption: val.comment
    }));
    setGalleryTbPhotos(newPhotos);
  };

  useEffect(() => {
    if (
      !props.isUser &&
      (props.history.location.state && props.history.location.state.data)
    ) {
      const data = props.history.location.state.data;
      resolveGalleryTbPhotos(data);
      setValidVet(data);
    } else if (props.isUser) {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        setEmptyDataText("Loading Profile...");
        const userData = sessionStorage.getItem(userId);
        if (userData) {
          const data = JSON.parse(userData);
          resolveGalleryTbPhotos(data);
          setValidVet(data);
        } else {
          // let fetchUrl = `https://unilag-nuga-veterans-server.now.sh/get_veteran_by_id?vetId=${userId}`;
          let fetchUrl = `http://localhost:3005/get_veteran_by_id?vetId=${userId}`;
          fetch(fetchUrl, { method: "GET" })
            .then(response => response.json())
            .then(vetData => {
              console.log(vetData);
              if (vetData && vetData[0]) {
                const data = vetData[0];
                sessionStorage.setItem("userId", data._id);
                sessionStorage.setItem(data._id, JSON.stringify(data));
                resolveGalleryTbPhotos(data);
                setValidVet(data);
              } else setShouldLoginConfirmed(true);
            })
            .catch(err => {
              setShouldLoginConfirmed(true);
              console.error(err);
            });
        }
        setEmptyDataText("Data not found. Please reload");
      } else {
        setShouldLoginConfirmed(true);
      }
    }
  }, []);

  const loginProfile = event => {
    event.preventDefault();
    setIsLoginButtonDisabled(true);
    const email = document.getElementById("input_profile_login_email").value;
    const password = document.getElementById("input_profile_login_password")
      .value;
    // let fetchUrl = `https://unilag-nuga-veterans-server.now.sh/get_veteran?email=${email}&password=${password}`;
    let fetchUrl = `http://localhost:3005/get_veteran?email=${email}&password=${password}`;
    fetch(fetchUrl, { method: "GET" })
      .then(response => response.json())
      .then(vetData => {
        console.log(vetData);
        if (vetData && vetData[0]) {
          const data = vetData[0];
          sessionStorage.setItem("userId", data._id);
          sessionStorage.setItem(data._id, JSON.stringify(data));
          resolveGalleryTbPhotos(data);
          setValidVet(data);
        } else toast.warn("Could not login. Please try again.");
        setIsLoginButtonDisabled(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("An error occured. Please try again.");
        setIsLoginButtonDisabled(false);
      });
  };

  const launchEditProfile = () => {
    history.push("/edit-profile", { data: validVet });
  };

  const startDeleteProfile = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your veteran profile? This action cannot be undone"
      )
    ) {
      const currentPassword = window.prompt(
        "Please enter your password to continue"
      );
      if (currentPassword === validVet.password) {
        setIsDeleteDisabled(true);
        var submitToastId = toast.info("Deleting profile...", {
          autoClose: false
        });
        let fetchUrl = "http://localhost:3005/delete_veteran";
        fetch(fetchUrl, {
          body: JSON.stringify({
            _id: validVet._id,
            password: validVet.password
          }),
          method: "POST",
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            toast.dismiss(submitToastId);
            toast.success("Profile successfully deleted");
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem(validVet._id);
            setIsDeleteDisabled(false);
            history.push("/");
          })
          .catch(err => {
            console.error(err);
            setIsDeleteDisabled(false);
          });
      } else {
        alert("The password you entered isn't correct. Please try again");
        return;
      }
    }
  };

  const validContent = validVet ? (
    <div id="wrapper_veteran_profile">
      <img
        id="img_veteran_profile_photo"
        alt=""
        src={validVet.recentPhoto ? validVet.recentPhoto : default_profile_pic}
      />
      {props.isUser && (
        <div id="wrapper_profile_actions">
          <button
            id="btn_edit_profile"
            className="btn_profile_action"
            onClick={launchEditProfile}
          >
            Edit
          </button>
          <button
            className="btn_profile_action"
            id="btn_delete_profile"
            onClick={startDeleteProfile}
            disabled={isDeleteDisabled}
          >
            Delete
          </button>
        </div>
      )}
      <div id="wrapper_veteran_profile_name">{`${validVet.lastName} ${validVet.otherNames}`}</div>
      {props.isUser && (
        <div id="wrapper_veteran_profile_email">{validVet.email}</div>
      )}
      {props.isUser && (
        <div id="wrapper_veteran_profile_phone">{validVet.phone}</div>
      )}
      <div id="wrapper_veteran_profile_nuga_years">
        {validVet.nugaYears.join(" - ")}
      </div>
      <div id="wrapper_veteran_jersey_positions">
        {validVet.jerseyPositions}
      </div>
      <div id="title_tbp">
        Throwback Photos <small>(click to see comment)</small>
      </div>
      <div id="wrapper_veteran_profile_throwback_photos">
        {validVet.throwbackPhotos.map((val, key) => (
          <div
            className="single_throwback_photo"
            key={key}
            onClick={() => {
              setSelectedIndex(key);
              setIsModalOpen(!isModalOpen);
            }}
          >
            <img
              className="img_single_throwback_photo"
              src={val.throwbackPhoto}
              alt={val.comment}
            />
          </div>
        ))}
        <ModalGateway>
          {isModalOpen ? (
            <Modal onClose={() => setIsModalOpen(!isModalOpen)}>
              <Carousel views={galleryTbPhotos} currentIndex={selectedIndex} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    </div>
  ) : (
    <div id="content_profile_empty">{emptyDataText}</div>
  );

  const loginContent = (
    <div id="wrapper_profile_login">
      <form id="form_profile_login" onSubmit={loginProfile}>
        <input
          id="input_profile_login_email"
          type="email"
          name="email"
          required
        />
        <input
          id="input_profile_login_password"
          type="password"
          name="password"
          required
        />
        <button id="btn_profile_login_submit" disabled={isLoginButtonDisabled}>
          Login
        </button>
      </form>
    </div>
  );

  const content = props.isUser
    ? validVet
      ? validContent
      : shouldLoginConfirmed
      ? loginContent
      : validContent
    : validContent;

  return <div id="wrapper_profile">{content}</div>;
};

export default Profile;
