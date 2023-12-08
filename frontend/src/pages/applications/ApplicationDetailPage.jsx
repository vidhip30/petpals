import { getApplication, getPetListingName } from "../../api/applications";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageNotFound } from "../misc/PageNotFound";
import { Link, useNavigate } from "react-router-dom";

export const ApplicationDetailPage = () => {
  const navigate = useNavigate();
  const { applicationID } = useParams();
  const [application, setApplication] = useState([]);
  const [pet, setPet] = useState("");

  const handleRender = async () => {
    const response = await getApplication(applicationID);
    setApplication(response);
  };
  const handleRender2 = async () => {
    const response = await getPetListingName(applicationID);
    setPet(response);
  };

  useEffect(() => {
    handleRender();
  }, []);

  useEffect(() => {
    handleRender2();
  }, []);

  if (!application || !application.id) {
    return <PageNotFound />;
  }

  return (
    <form
      classNameName="px-5 py-4 border rounded shadow-sm needs-validation"
      id="application-summary"
      method="POST"
      novalidate
    >
      <h1 id="form-title" className="d-flex justify-content-center mb-4 mt-4">
        Your Adoption Application for {pet}
      </h1>
      <hr className="hr" />
      <div id="contact-info" className="row row-cols-1 row-cols-sm-2">
        <div id="address-field" className="col field">
          <label className="question" for="address">
            Address:
          </label>
          <input
            id="address"
            className="form-control"
            type="text"
            value={application.address}
            readonly
          />
          <div className="invalid-feedback">Please enter your address.</div>
        </div>
        <div id="phone-field" className="col field">
          <label className="question" for="phone">
            Phone Number:
          </label>
          <input
            type="text"
            id="phone"
            className="form-control"
            value={application.phone_number}
            readonly
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
        <label for="house">House</label>
        <br />
        <input
          type="radio"
          id="apartment"
          name="housing"
          value="Apartment"
          checked={application.living_situation === "apartment"}
          disabled
        />
        <label for="apartment">Apartment</label>
        <br />
        <input
          type="radio"
          id="condo"
          name="housing"
          value="Condo"
          disabled
          checked={application.living_situation === "condo"}
        />
        <label for="condo">Condo</label>
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
        <label for="own">Own</label>
        <br />
        <input
          type="radio"
          id="rent"
          name="renting"
          value="Rent"
          checked={application.ownership === "rent"}
          disabled
        />
        <label for="rent">Rent</label>
        <div className="invalid-feedback">Please select an option.</div>
      </div>
      <div className="field">
        <label className="question" for="occupation">
          What is your occupation?
        </label>
        <input
          type="text"
          id="occupation"
          className="form-control"
          value={application.occupation}
          readonly
        />
        <div className="invalid-feedback">Please enter your occupation.</div>
      </div>
      <div className="field">
        <label className="question" for="pet-census">
          How many pets do you have?
        </label>
        <input
          type="number"
          id="pet-census"
          className="form-control"
          value={application.number_of_pets}
          readonly
        />
        <div className="invalid-feedback">Please enter a value.</div>
      </div>
      <div className="field">
        <label className="question" for="exercise">
          How many hours of exercise can you give your pet everyday?
        </label>
        <input
          type="number"
          id="exercise"
          className="form-control"
          value={application.exercise_hours}
          readonly
        />
        <div className="invalid-feedback">Please enter a value.</div>
      </div>
      <div className="field">
        <label className="question" for="alone">
          How many hours a day will your pet spend alone?
        </label>
        <input
          type="number"
          id="alone"
          className="form-control"
          value={application.alone_hours}
          readonly
        />
        <div className="invalid-feedback">Please enter a value.</div>
      </div>
      <div className="field">
        <label className="question" for="why">
          Why do you want to adopt this pet?
        </label>
        <textarea id="why" className="form-control" rows="3" readonly>
          {application.adoption_reason}
        </textarea>
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
      </div>
    </form>
  );
};
