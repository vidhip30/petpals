import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { PageNotFound } from "../misc/PageNotFound";
import { Link } from "react-router-dom";

export const PetDetailPage = () => {
  const { petID } = useParams();
  const [pet, setPet] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch(`http://127.0.0.1:8000/petlistings/${petID}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setPet(json);
      });
  }, [petID]);

  const handleClose = () => {
    setShowModal(false);
    navigate(-1); // Navigate back to the previous page
  };

  if (!pet || pet.detail) {
    return <PageNotFound />;
  }

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Pet Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={`${pet.picture}`}
                alt="Cat"
                className="img-fluid my-3 mx-auto"
                width="300"
                height="300"
              />
            </div>
            <div className="col-md-6 my-3">
              <p className="mb-0">
                <b> Name: </b>
                {pet.name}
              </p>
              <p className="mb-0">
                <b> Age:</b> {pet.age}{" "}
              </p>
              <p className="mb-0">
                <b>Breed:</b> {pet.breed}
              </p>
              <p className="mb-0">
                <b>Size:</b> {pet.size} Pounds{" "}
              </p>
              <hl></hl>
              <p className="mb-0">{pet.description}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {userType === "seeker" && pet.status !== "available" ? (
          <Button variant="adopt-status" disabled>
            Currently {pet.status}
          </Button>
        ) : userType === "seeker" ? (
          <Link to={`/applications/${pet.id}`}>
            <Button className="adopt-button">Adopt!</Button>
          </Link>
        ) : pet.shelter == userID ? (
          <Link to={`/shelters/update-pet/${pet.id}`}>
            <Button className="adopt-button">Update</Button>
          </Link>
        ) : (
          <div></div>
        )}
      </Modal.Footer>
    </Modal>
  );
};
