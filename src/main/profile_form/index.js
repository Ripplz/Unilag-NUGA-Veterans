import React, { useState } from "react";
import "./index.css";
import default_profile_pic from "../../images/default_profile_pic.png";
import icon_add_throwback_photo from "../../images/add.svg";
import { toast } from "react-toastify";
import swal from "sweetalert";

const ProfileForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [lastName, setLastName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [nugaYears, setNugaYears] = useState("");
  const [jerseyPositions, setJerseyPositions] = useState("");
  const [password, setPassword] = useState("");
  const [recentPhoto, setRecentPhoto] = useState(null);
  const [throwbackPhotos, setThrowbackPhotos] = useState([]);

  const submit = async event => {
    event.preventDefault();

    if (recentPhoto === null) {
      toast.warn("Please upload a profile picture");
      return;
    } else if (window.confirm("Are you sure you want to submit?")) {
      setIsDisabled(true);
      var submitToastId = toast.info("Submitting...", { autoClose: false });
      const rawPhoto = await convertFileToBase64(recentPhoto);
      const nugaYearsFormatted = nugaYears.split(",");
      const newVeteran = {
        lastName,
        otherNames,
        nugaYears: nugaYearsFormatted,
        jerseyPositions,
        password,
        recentPhoto: rawPhoto,
        throwbackPhotos
      };
      console.log(newVeteran);
      let fetchUrl = "https://unilag-nuga-veterans-server.now.sh/add_veteran";
      // let fetchUrl = "http://localhost:3005/add_veteran";
      fetch(fetchUrl, {
        body: JSON.stringify(newVeteran),
        method: "POST",
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          toast.dismiss(submitToastId);
          toast.success("Your data has been successfully submitted.");
          resetForm();
          setIsDisabled(false);
        })
        .catch(err => {
          console.error(err);
          setIsDisabled(false);
        });
    }
  };

  const resetForm = () => {
    setLastName("");
    setOtherNames("");
    setNugaYears("");
    setJerseyPositions("");
    setPassword("");
    setRecentPhoto(null);
    setThrowbackPhotos([]);
    document.getElementById("img_recent_photo").src = default_profile_pic;
  };

  const launchRecentPhotoPicker = () => {
    document.getElementById("image_picker_recent_photo").click();
  };

  const updateRecentPhoto = () => {
    const imagePicker = document.getElementById("image_picker_recent_photo");
    const files = imagePicker.files;
    if (files.length !== 0) {
      const newImage = files[0];
      const profilePic = document.getElementById("img_recent_photo");
      profilePic.src = URL.createObjectURL(newImage);
      setRecentPhoto(newImage);
    }
  };

  const launchThrowbackPhotoPicker = index => {
    document.getElementById("image_picker_throwback_photo").click();
  };

  const addThrowbackPhoto = async index => {
    const imagePicker = document.getElementById("image_picker_throwback_photo");
    const files = imagePicker.files;
    if (files.length !== 0) {
      let allThrowbacks = [...throwbackPhotos];
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const convertedFile = await convertFileToBase64(file);
        allThrowbacks.push({ throwbackPhoto: convertedFile, comment: "" });
      }
      setThrowbackPhotos(allThrowbacks);
    }
  };

  const setThrowbackPhotoComment = (comment, index) => {
    let allThrowbacks = [...throwbackPhotos];
    let throwback = allThrowbacks[index];
    throwback.comment = comment;
    allThrowbacks[index] = throwback;
    setThrowbackPhotos(allThrowbacks);
  };

  const convertFileToBase64 = file => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const showInfo = () =>
    swal({
      title: "About this portal",
      text: "This portal is for the United States of Unilag. Allows you to.",
      icon: "info",
      button: "OK"
    });

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
        <form id="form_profile_form" onSubmit={submit}>
          <div className="form_group">
            <div className="form_field">
              <div className="form_field_title">Last Name</div>
              <input
                className="input__form_field"
                type="text"
                name="lastName"
                value={lastName}
                onChange={event => setLastName(event.target.value)}
                required
              />
            </div>

            <div className="form_field">
              <div className="form_field_title">Other Names</div>
              <input
                className="input__form_field"
                type="text"
                name="otherNames"
                value={otherNames}
                onChange={event => setOtherNames(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="form_group">
            <div className="form_field">
              <div className="form_field_title">
                NUGA Years (Separate each year with a comma, e.g. "2019,2018")
              </div>
              <input
                className="input__form_field"
                type="text"
                name="nugaYears"
                value={nugaYears}
                onChange={event => setNugaYears(event.target.value)}
                required
              />
            </div>

            <div className="form_field">
              <div className="form_field_title">
                Jersey No./Position (Separate each with a comma)
              </div>
              <input
                className="input__form_field"
                type="text"
                name="jerseyPositions"
                value={jerseyPositions}
                onChange={event => setJerseyPositions(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="form_group">
            <div className="form_field">
              <div className="form_field_title">Recent Photo</div>
              <div id="wrapper_recent_photo_img">
                <img
                  id="img_recent_photo"
                  onClick={launchRecentPhotoPicker}
                  alt=""
                  src={default_profile_pic}
                />
                <input
                  type="file"
                  id="image_picker_recent_photo"
                  accept=".jpg, .jpeg, .png"
                  onChange={updateRecentPhoto}
                />
              </div>
            </div>
            <div className="form_field">
              <div className="form_field_title">Password</div>
              <input
                className="input__form_field"
                type="password"
                name="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="form_group">
            <div className="form_field_full">
              <div className="form_field_title">Throwback Photos</div>

              <div className="wrapper_throwback_photos">
                {throwbackPhotos.map((throwbackObject, index) => (
                  <div className="wrapper_throwback_photo" key={index}>
                    <img
                      alt=""
                      src={throwbackObject.throwbackPhoto}
                      className="img_throwback_photo"
                    />
                    <textarea
                      className="textarea__throwback_photo_comment"
                      name="throwbackPhotoComment"
                      placeholder="Say something about this photo..."
                      value={throwbackPhotos[index].comment}
                      onChange={event =>
                        setThrowbackPhotoComment(event.target.value, index)
                      }
                    />
                  </div>
                ))}
                <div
                  className="wrapper_throwback_photo btn_add_throwback"
                  onClick={launchThrowbackPhotoPicker}
                >
                  <img alt="" src={icon_add_throwback_photo} />
                </div>
                <input
                  type="file"
                  id="image_picker_throwback_photo"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={addThrowbackPhoto}
                />
              </div>
            </div>
          </div>

          <button id="btn_submit_profile_form" disabled={isDisabled}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
