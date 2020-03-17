import React, { useState, useEffect } from "react";
import "./index.css";
import default_profile_pic from "../../images/default_profile_pic.png";
import icon_add_throwback_photo from "../../images/add.svg";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const ProfileForm = props => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastName, setLastName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nugaYears, setNugaYears] = useState("");
  const [jerseyPositions, setJerseyPositions] = useState("");
  const [password, setPassword] = useState("");
  const [recentPhoto, setRecentPhoto] = useState(null);
  const [throwbackPhotos, setThrowbackPhotos] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initProfile, setInitProfile] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (props.isEditMode && props.history.location.state) {
      setIsEditMode(true);
      const data = props.history.location.state.data;
      if (data) {
        console.log(data);
        data.nugaYears = data.nugaYears.toString();
        data.jerseyPositions = data.jerseyPositions.toString();

        setInitProfile(data);
        setLastName(data.lastName);
        setOtherNames(data.otherNames);
        setEmail(data.email);
        setPhone(data.phone);
        setNugaYears(data.nugaYears);
        setJerseyPositions(data.jerseyPositions);
        setPassword(data.password);
        setRecentPhoto(data.recentPhoto);
        setThrowbackPhotos(data.throwbackPhotos);
        document.getElementById("img_recent_photo").src = data.recentPhoto;
      }
    }
  }, []);

  const isProfileEdited = () => {
    if (!initProfile) return false;
    return (
      initProfile.lastName === lastName &&
      initProfile.otherNames === otherNames &&
      initProfile.email === email &&
      initProfile.password === password &&
      initProfile.phone === phone &&
      initProfile.nugaYears === nugaYears &&
      initProfile.jerseyPositions === jerseyPositions &&
      initProfile.recentPhoto === recentPhoto &&
      initProfile.throwbackPhotos === throwbackPhotos
    );
  };

  const submit = async event => {
    event.preventDefault();
    console.log(nugaYears);

    if (recentPhoto === null) {
      toast.warn("Please upload a profile picture");
      return;
    } else {
      if (isEditMode) {
        if (initProfile.password !== password) {
          const currentPassword = window.prompt(
            "Please enter your current password to continue"
          );
          if (currentPassword === initProfile.password) updateProfile();
          else {
            alert("The password you entered isn't correct. Please try again");
            return;
          }
        } else updateProfile();
      } else {
        if (window.confirm("Are you sure you want to submit?")) {
          setIsDisabled(true);
          var submitToastId = toast.info("Submitting...", { autoClose: false });
          const nugaYearsFormatted = nugaYears.split(",");
          const jerseyPositionsFormatted = jerseyPositions.split(",");
          const newVeteran = {
            lastName,
            otherNames,
            email,
            phone,
            nugaYears: nugaYearsFormatted,
            jerseyPositions: jerseyPositionsFormatted,
            password,
            recentPhoto,
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
      }
    }
  };

  const updateProfile = () => {
    if (window.confirm("Are you sure you want to update your profile?")) {
      setIsUpdating(true);
      var submitToastId = toast.info("Updating profile...", {
        autoClose: false
      });
      const nugaYearsFormatted = nugaYears.split(",");
      const jerseyPositionsFormatted = jerseyPositions.split(",");
      const updatedVeteran = {
        _id: initProfile._id,
        lastName,
        otherNames,
        email,
        phone,
        nugaYears: nugaYearsFormatted,
        jerseyPositions: jerseyPositionsFormatted,
        password,
        recentPhoto,
        throwbackPhotos
      };
      console.log(updatedVeteran);
      let fetchUrl = "https://unilag-nuga-veterans-server.now.sh/update_veteran";
      // let fetchUrl = "http://localhost:3005/update_veteran";
      fetch(fetchUrl, {
        body: JSON.stringify(updatedVeteran),
        method: "POST",
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          toast.dismiss(submitToastId);
          toast.success("Profile updated successfully.");
          setIsUpdating(false);
          sessionStorage.setItem(
            updatedVeteran._id,
            JSON.stringify(updatedVeteran)
          );
          history.push("/profile");
        })
        .catch(err => {
          console.error(err);
          setIsUpdating(false);
        });
    }
  };

  const resetForm = () => {
    setLastName("");
    setOtherNames("");
    setEmail("");
    setPhone("");
    setNugaYears("");
    setJerseyPositions("");
    setPassword("");
    setRecentPhoto(null);
    setThrowbackPhotos([]);
  };

  const launchRecentPhotoPicker = () => {
    document.getElementById("image_picker_recent_photo").click();
  };

  const updateRecentPhoto = async () => {
    const imagePicker = document.getElementById("image_picker_recent_photo");
    const files = imagePicker.files;
    if (files.length !== 0) {
      const newImage = files[0];
      const newRecentPhoto = await convertFileToBase64(newImage);
      setRecentPhoto(newRecentPhoto);
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

  const removeThrowbackPhoto = index => {
    let allThrowbacks = [...throwbackPhotos];
    allThrowbacks.splice(index, 1);
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
          {isEditMode ? "Edit Profile" : "Register"}
        </div>
        <div id="header_mobile_profile_form" />
        {!isEditMode && (
          <div id="wrapper_header_form_profile_form">
            <div id="header_form_profile_form">Fill in your details below</div>
            <div id="underline_decoration" />
          </div>
        )}
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
              <div className="form_field_title">Email Address</div>
              <input
                className="input__form_field"
                type="email"
                name="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form_field">
              <div className="form_field_title">Phone Number</div>
              <input
                className="input__form_field"
                type="number"
                name="phone"
                value={phone}
                onChange={event => setPhone(event.target.value)}
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
                  src={recentPhoto ? recentPhoto : default_profile_pic}
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
                    <span
                      className="btn_remove_throwback_photo"
                      onClick={() => removeThrowbackPhoto(index)}
                    />
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

          <button
            id="btn_submit_profile_form"
            disabled={isEditMode ? isProfileEdited() || isUpdating : isDisabled}
          >
            {isEditMode ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
