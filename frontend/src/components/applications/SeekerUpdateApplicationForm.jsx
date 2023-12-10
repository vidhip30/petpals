import React, { useState, useEffect } from "react";
import { updateApplication } from "../../api/applications";

import "./Style.css";
export const SeekerUpdateApplicationForm = ({
  applicationID,
  statusInfo,
  setStatusInfo,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are valid

    const payload = {
      status: "withdrawn",
    };

    const response = await updateApplication(applicationID, payload);
    setStatusInfo("withdrawn");
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

      <input
        id="submit"
        className="mt-4 btn btn-secondary"
        type="submit"
        value="Withdraw"
      />
    </form>
  );
};
