import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getUser } from "../../api/accounts";
import { useParams } from "react-router-dom";
import { ReadOnlyTextField as TextField } from "../../components/profile/ReadOnlyTextField";
import { PageNotFound } from "../misc/PageNotFound";
import Spinner from "react-bootstrap/Spinner";

export const SeekerDetailPage = () => {
  const { userID } = useParams();
  const [loading, setLoading] = useState(true);
  const [userFound, setUserFound] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicURL, setProfilePicURL] = useState("");

  const handleRender = async () => {
    const response = await getUser(userID, "seeker");

    if (response["status"] !== 200) {
      setUserFound(false);
    } else {
      setUserFound(true);

      setName(response["name"]);
      setLocation(response["location"]);
      setEmail(response["email"]);
      setPhone(response["phone_number"]);
      setProfilePicURL(response["profile_image"]);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleRender();
  }, []);

  if (loading && !userFound) {
    return (
      <Container className="mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!loading && !userFound) {
    return <PageNotFound />;
  }

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      <div className="card profile-card p-2">
        <div className="card-body">
          <h3 className="card-title text-center pb-2">Pet Seeker Detail</h3>
          <div className="py-4 border-top">
            <p className="card-text fw-bold">Profile Picture</p>
            <div className="profile-frame-large border-black">
              <img
                id="profile-pic-large"
                src={
                  profilePicURL === "null" || !profilePicURL
                    ? "/images/default-profile-pic.jpg"
                    : profilePicURL
                }
                alt="Profile image"
              />
            </div>
          </div>
          <div className="pt-4 border-top">
            <p className="card-text fw-bold">About</p>
            <TextField
              id="name-field"
              fieldName="name"
              label="Name"
              placeholder="Your name"
              text={name}
            />
            <TextField
              id="location-field"
              fieldName="location"
              label="Location"
              placeholder="Your location"
              text={location}
            />
          </div>
          <div className="pt-4 border-top">
            <p className="card-text fw-bold">Contact Info</p>
            <TextField
              id="email-field"
              fieldName="email"
              label="Email"
              placeholder="Your email"
              text={email}
            />
            <TextField
              id="phone-field"
              fieldName="phone_number"
              label="Phone number"
              placeholder="Your phone number"
              text={phone}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
