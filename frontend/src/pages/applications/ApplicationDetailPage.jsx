import {
  getApplication,
  getPetListingName,
  getPetListingID,
} from "../../api/applications";

import { CommentForm } from "../../components/comments/CommentForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageNotFound } from "../misc/PageNotFound";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export const ApplicationDetailPage = () => {
  const navigate = useNavigate();
  const { applicationID } = useParams();
  const [application, setApplication] = useState([]);
  const [pet, setPet] = useState("");
  const [petID, setPetID] = useState("");
  const [shelter, setShelter] = useState("");
  const storedUserType = localStorage.getItem("userType");
  const url =
    storedUserType === "shelter"
      ? `/applications/update/shelters/${applicationID}`
      : `/applications/update/seekers/${applicationID}`;
  const comments = `/comments/list/application/${applicationID}`;

  const handleRender = async () => {
    const response = await getApplication(applicationID);
    setApplication(response);
  };
  const handleRender2 = async () => {
    const response = await getPetListingID(applicationID);
    setPetID(response);
  };
  const handleRender3 = async () => {
    if (petID === "") {
      return;
    }

    const response = await getPetListingName(petID);
    setPet(response);
  };

  useEffect(() => {
    handleRender();
  }, []);

  useEffect(() => {
    handleRender2();
  }, []);

  useEffect(() => {
    handleRender3();
  }, [petID]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (petID === "") {
      return;
    }

    fetch(`http://127.0.0.1:8000/petlistings/${petID}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setShelter(json.shelter);
      });
  }, [petID]);

  if (!application || !application.id) {
    return <PageNotFound />;
  }

  return (
    <>
      <form
        className="px-5 py-4 border rounded shadow-sm needs-validation"
        id="application-summary"
        method="POST"
        noValidate
      >
        <h1 id="form-title" className="d-flex justify-content-center mb-4 mt-4">
          Your Adoption Application For {pet}
        </h1>
        <hr className="hr" />
        <div id="contact-info" className="row row-cols-1 row-cols-sm-2">
          <div id="address-field" className="col field">
            <label className="question" htmlFor="address">
              Address:
            </label>
            <input
              id="address"
              className="form-control"
              type="text"
              value={application.address}
              readOnly
            />
            <div className="invalid-feedback">Please enter your address.</div>
          </div>
          <div id="phone-field" className="col field">
            <label className="question" htmlFor="phone">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={application.phone_number}
              readOnly
            />
            <div className="invalid-feedback">
              Please enter your phone number.
            </div>
          </div>
        </div>
        <div id="home-field" className="field">
          <p className="question">I live in a:</p>
          <input
            type="radio"
            id="house"
            name="housing"
            value="House"
            checked={application.living_situation === "house"}
            disabled
          />
          <label htmlFor="house">House</label>
          <br />
          <input
            type="radio"
            id="apartment"
            name="housing"
            value="Apartment"
            checked={application.living_situation === "apartment"}
            disabled
          />
          <label htmlFor="apartment">Apartment</label>
          <br />
          <input
            type="radio"
            id="condo"
            name="housing"
            value="Condo"
            disabled
            checked={application.living_situation === "condo"}
          />
          <label htmlFor="condo">Condo</label>
          <div className="invalid-feedback">Please select an option.</div>
        </div>
        <div id="own-field" className="field">
          <p className="question">Do you own or rent?</p>
          <input
            type="radio"
            id="own"
            name="renting"
            value="Own"
            checked={application.ownership === "own"}
            disabled
          />
          <label htmlFor="own">Own</label>
          <br />
          <input
            type="radio"
            id="rent"
            name="renting"
            value="Rent"
            checked={application.ownership === "rent"}
            disabled
          />
          <label htmlFor="rent">Rent</label>
          <div className="invalid-feedback">Please select an option.</div>
        </div>
        <div className="field">
          <label className="question" htmlFor="occupation">
            What is your occupation?
          </label>
          <input
            type="text"
            id="occupation"
            className="form-control"
            value={application.occupation}
            readOnly
          />
          <div className="invalid-feedback">Please enter your occupation.</div>
        </div>
        <div className="field">
          <label className="question" htmlFor="pet-census">
            How many pets do you have?
          </label>
          <input
            type="number"
            id="pet-census"
            className="form-control"
            value={application.number_of_pets}
            readOnly
          />
          <div className="invalid-feedback">Please enter a value.</div>
        </div>
        <div className="field">
          <label className="question" htmlFor="exercise">
            How many hours of exercise can you give your pet everyday?
          </label>
          <input
            type="number"
            id="exercise"
            className="form-control"
            value={application.exercise_hours}
            readOnly
          />
          <div className="invalid-feedback">Please enter a value.</div>
        </div>
        <div className="field">
          <label className="question" htmlFor="alone">
            How many hours a day will your pet spend alone?
          </label>
          <input
            type="number"
            id="alone"
            className="form-control"
            value={application.alone_hours}
            readOnly
          />
          <div className="invalid-feedback">Please enter a value.</div>
        </div>
        <div className="field">
          <label className="question" htmlFor="why">
            Why do you want to adopt this pet?
          </label>
          <textarea
            id="why"
            className="form-control"
            rows="3"
            value={application.adoption_reason}
            readOnly
          />
          <div className="invalid-feedback">Please answer this question.</div>
        </div>
        <div className="d-flex justify-content-center">
          <Link
            onClick={() => {
              navigate(-1);
            }}
            className="mt-4 btn btn-secondary"
            type="button"
            href="application-summary-user.html"
          >
            Go Back
          </Link>

          <Link to={url} className="mt-4 btn btn-secondary" type="button">
            Update Application
          </Link>
        </div>
      </form>

      <div className="d-flex justify-content-center mt-4 mb-4">
        <Link to={comments} className="btn btn-secondary" type="button">
          Comment
        </Link>
      </div>
    </>
  );
};
