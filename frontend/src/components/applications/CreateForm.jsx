import React, { useState, useEffect } from "react";
import { getPetListingName } from "../../api/applications";
import { createApplication } from "../../api/applications";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import { useNavigate } from "react-router-dom";

export const CreateForm = ({ listingID }) => {
  const [petName, setPetName] = useState("");
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    address: "",
    phone: "",
    housing: "",
    renting: "",
    occupation: "",
    petCensus: "",
    exercise: "",
    alone: "",
    why: "",
  });

  useEffect(() => {
    // Fetch pet name when the component mounts
    fetchPetName();
  }, [formErrors]);

  const fetchPetName = async () => {
    try {
      const name = await getPetListingName(listingID);
      setPetName(name);
    } catch (error) {
      console.error("Error fetching pet name:", error.message);
    }
  };

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    housing: "",
    renting: "",
    occupation: "",
    petCensus: "",
    exercise: "",
    alone: "",
    why: "",
  });

  const validateField = (name, value, regexPattern) => {
    const fieldIsValid = regexPattern.test(value);
    setFormData({
      ...formData,
      [name]: value,
    });
    return fieldIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate each field
    const addressValid = validateField("address", formData.address, /.+/);
    if (!addressValid) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        address: "Please enter an address.",
      }));
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        address: "",
      }));
    }
    const phoneValid = validateField("phone", formData.phone, /.+/);
    if (!phoneValid) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        phone: "Please enter a phone number.",
      }));
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        phone: "",
      }));
    }
    const housingValid = validateField("housing", formData.housing, /.+/);
    if (!housingValid) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        housing: "Please choose an option.",
      }));
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        housing: "",
      }));
    }
    const rentingValid = validateField("renting", formData.renting, /.+/);
    if (!rentingValid) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        renting: "Please choose an option.",
      }));
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        renting: "",
      }));
    }
    const occupationValid = validateField(
      "occupation",
      formData.occupation,
      /.+/,
    );
    if (!occupationValid) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        occupation: "Please enter an occupation.",
      }));
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        occupation: "",
      }));
    }
    const whyValid = validateField("why", formData.why, /.+/);
    if (!whyValid) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        why: "Please enter a reason.",
      }));
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        why: "",
      }));
    }

    // Custom validation for positive integers
    const petCensusValid = validateField(
      "petCensus",
      formData.petCensus,
      /^\d+$/,
    );
    if (!petCensusValid) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        petCensus: "Please enter a valid number of pets.",
      }));
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        petCensus: "",
      }));
    }
    const exerciseValid = validateField("exercise", formData.exercise, /^\d+$/);
    if (!exerciseValid) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        exercise: "Please enter a valid number of hours.",
      }));
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        exercise: "",
      }));
    }
    const aloneValid = validateField("alone", formData.alone, /^\d+$/);
    if (!aloneValid) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        alone: "Please enter a valid number of hours.",
      }));
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        alone: "",
      }));
    }

    // Check if all fields are valid
    if (
      addressValid &&
      phoneValid &&
      housingValid &&
      rentingValid &&
      occupationValid &&
      whyValid &&
      petCensusValid &&
      exerciseValid &&
      aloneValid
    ) {
      const payload = {
        address: formData.address,
        phone_number: formData.phone,
        living_situation: formData.housing,
        ownership: formData.renting,
        occupation: formData.occupation,
        number_of_pets: formData.petCensus,
        exercise_hours: formData.exercise,
        alone_hours: formData.alone,
        adoption_reason: formData.why,
      };

      try {
        const response = await createApplication(listingID, payload);

        if (response && response.ok) {
          // Application submitted successfully
          navigate("/applications/list");
        } else {
          console.error(
            "Failed to submit application:",
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error submitting application:", error.message);
      }
    } else {
      console.error("Form has errors. Cannot submit.");
    }
  };

  return (
    <form
      className="px-5 py-4 border rounded shadow-sm needs-validation"
      id="application-form"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 id="form-title" className="d-flex justify-content-center mb-4 mt-4">
        Adoption Application for {petName}
      </h1>
      <hr className="hr" />
      <div className="row row-cols-1 row-cols-sm-2">
        <div className="col field">
          <label className="question" htmlFor="address">
            Address:
          </label>
          <input
            type="text"
            id="address"
            className={`form-control `}
            name="address"
            value={formData.address}
            onChange={(event) => {
              setFormData({
                ...formData,
                address: event.target.value,
              });
            }}
          />
          <div className="text-danger">{formErrors.address}</div>
        </div>
        <div className="col field">
          <label className="question" htmlFor="phone">
            Phone Number:
          </label>
          <input
            type="text"
            id="phone"
            className={`form-control`}
            name="phone"
            value={formData.phone}
            onChange={(event) => {
              setFormData({
                ...formData,
                phone: event.target.value,
              });
            }}
          />
          <div className="text-danger">{formErrors.phone}</div>
        </div>
      </div>
      <div className="field">
        <p className="question">I live in a:</p>
        <label>
          <input
            type="radio"
            name="housing"
            value="house"
            checked={formData.housing === "house"}
            required
            onChange={(event) => {
              setFormData({
                ...formData,
                housing: event.target.value,
              });
            }}
          />
          House
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="housing"
            value="apartment"
            checked={formData.housing === "apartment"}
            onChange={(event) => {
              setFormData({
                ...formData,
                housing: event.target.value,
              });
            }}
          />
          Apartment
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="housing"
            value="condo"
            checked={formData.housing === "condo"}
            onChange={(event) => {
              setFormData({
                ...formData,
                housing: event.target.value,
              });
            }}
          />
          Condo
        </label>
        <div className="text-danger">{formErrors.housing}</div>
      </div>
      <div className="field">
        <p className="question">Do you own or rent?</p>
        <label>
          <input
            type="radio"
            name="renting"
            value="own"
            checked={formData.renting === "own"}
            required
            onChange={(event) => {
              setFormData({
                ...formData,
                renting: event.target.value,
              });
            }}
          />
          Own
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="renting"
            value="rent"
            checked={formData.renting === "rent"}
            onChange={(event) => {
              setFormData({
                ...formData,
                renting: event.target.value,
              });
            }}
          />
          Rent
        </label>
        <div className="text-danger">{formErrors.renting}</div>
      </div>
      <div className="field">
        <label className="question" htmlFor="occupation">
          What is your occupation?
        </label>
        <input
          type="text"
          id="occupation"
          className={`form-control`}
          name="occupation"
          value={formData.occupation}
          onChange={(event) => {
            setFormData({
              ...formData,
              occupation: event.target.value,
            });
          }}
        />
        <div className="text-danger">{formErrors.occupation}</div>
      </div>
      <div className="field">
        <label className="question" htmlFor="petCensus">
          How many pets do you have?
        </label>
        <input
          type="text"
          id="petCensus"
          className={`form-control`}
          name="petCensus"
          value={formData.petCensus}
          onChange={(event) => {
            setFormData({
              ...formData,
              petCensus: event.target.value,
            });
          }}
        />
        <div className="text-danger">{formErrors.petCensus}</div>
      </div>
      <div className="field">
        <label className="question" htmlFor="exercise">
          How many hours of exercise can you give your pet everyday?
        </label>
        <input
          type="text"
          id="exercise"
          className={`form-control`}
          name="exercise"
          value={formData.exercise}
          onChange={(event) => {
            setFormData({
              ...formData,
              exercise: event.target.value,
            });
          }}
        />
        <div className="text-danger">{formErrors.exercise}</div>
      </div>
      <div className="field">
        <label className="question" htmlFor="alone">
          How many hours a day will your pet spend alone?
        </label>
        <input
          type="text"
          id="alone"
          className={`form-control`}
          name="alone"
          value={formData.alone}
          onChange={(event) => {
            setFormData({
              ...formData,
              alone: event.target.value,
            });
          }}
        />
        <div className="text-danger">{formErrors.alone}</div>
      </div>
      <div className="field">
        <label className="question" htmlFor="why">
          Why do you want to adopt this pet?
        </label>
        <textarea
          id="why"
          className={`form-control`}
          rows="3"
          name="why"
          value={formData.why}
          onChange={(event) => {
            setFormData({
              ...formData,
              why: event.target.value,
            });
          }}
        ></textarea>
        <div className="text-danger">{formErrors.why}</div>
      </div>
      <input
        id="submit"
        className="mt-4 btn btn-secondary"
        type="submit"
        value="Submit"
      />
    </form>
  );
};
