import { useContext, useEffect, useState, useRef } from "react";
import "./Style.css";
import { Container } from "react-bootstrap";
import { Context } from "../../App";
import { TextField } from "../../components/profile/TextField";
import { updateUser, getUser, updateUserImage } from "../../api/accounts";

export const ProfilePageShelter = () => {
  const { userID, userType, profilePicURL } = useContext(Context);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mission, setMission] = useState("");

  const inputFile = useRef(null);

  const handleRender = async () => {
    const response = await getUser(userID, userType);

    setName(response["name"]);
    setLocation(response["location"]);
    setEmail(response["email"]);
    setPhone(response["phone_number"]);
    setMission(response["mission_statement"]);
  };

  useEffect(() => {
    handleRender();
  }, []);

  const handleUpdate = async (event) => {
    let payload = {};
    payload[event.target.name] = event.target.value;

    await updateUser(userID, userType, payload);
  };

  const handleUploadClick = () => {
    inputFile.current.click();
  };

  const handleUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    await updateUserImage(userID, userType, formData);
  };

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      <div className="card profile-card p-2">
        <div className="card-body">
          <h3 className="card-title text-center pb-2">Profile Update</h3>
          <div className="py-4 border-top">
            <p className="card-text fw-bold">Profile Picture</p>
            <div className="profile-frame-large border-black">
              <img id="profile-pic-large" src={profilePicURL} alt="Bootstrap" />
              <div
                id="upload-overlay"
                className="d-flex align-items-center justify-content-center"
                onClick={handleUploadClick}
              >
                {/* Source: https://stackoverflow.com/questions/37457128/react-open-file-browser-on-click-a-div */}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={inputFile}
                  onChange={handleUpload}
                />
                <img
                  id="image-upload-icon"
                  src="/images/upload-image.svg"
                  alt="upload-icon"
                />
              </div>
            </div>
          </div>
          <div className="pt-4 border-top">
            <p className="card-text fw-bold">About You</p>
            <TextField
              id="name-field"
              fieldName="name"
              label="Shelter Name"
              placeholder="Your name"
              text={name}
              setText={setName}
              handleUpdate={handleUpdate}
            />
            <TextField
              id="location-field"
              fieldName="location"
              label="Location"
              placeholder="Your location"
              text={location}
              setText={setLocation}
              handleUpdate={handleUpdate}
            />
            <div className="mt-3">
              <label for="motto-field" className="form-label">
                Mission Statement
              </label>
              <textarea
                id="motto-field"
                type="text"
                name="mission_statement"
                className="profile-field form-control border-white"
                placeholder="Your mission statement"
                required
                value={mission}
                onChange={(e) => {
                  setMission(e.target.value);
                }}
                onBlur={handleUpdate}
              ></textarea>
            </div>
          </div>
          <div className="pt-4 border-top">
            <p className="card-text fw-bold">Contact Info</p>
            <TextField
              id="email-field"
              fieldName="email"
              label="Email"
              placeholder="Your email"
              text={email}
              setText={setEmail}
              handleUpdate={handleUpdate}
            />
            <TextField
              id="phone-field"
              fieldName="phone_number"
              label="Phone number"
              placeholder="Your phone number"
              text={phone}
              setText={setPhone}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
