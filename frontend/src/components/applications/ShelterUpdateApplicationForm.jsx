import React, { useState, useEffect } from "react";
import { updateApplication } from "../../api/applications";

import "./Style.css";
export const ShelterUpdateApplicationForm = ({
  applicationID,
  statusInfo,
  setStatusInfo,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      status: selectedOption,
    };

    const response = await updateApplication(applicationID, payload);
    setStatusInfo(selectedOption);
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
        Adoption Application
      </h1>

      <div className="form-check">
        <input
          type="radio"
          id="accepted"
          className="form-check-input"
          name="statusOption"
          value="accepted"
          checked={selectedOption === "accepted"}
          onChange={() => setSelectedOption("accepted")}
        />
        <label htmlFor="accepted" className="form-check-label">
          Accepted
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="declined"
          className="form-check-input"
          name="statusOption"
          value="declined"
          checked={selectedOption === "declined"}
          onChange={() => setSelectedOption("declined")}
        />
        <label htmlFor="declined" className="form-check-label">
          Declined
        </label>
      </div>

      <div className="text-center">
        <button id="submit" className="mt-4 btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
