import Form from "react-bootstrap/Form";
import { PetUpdateFormBody } from "./PetUpdateFormBody";
import "./Style.css";
import { useState, useEffect } from "react";
import { updatePetListing } from "../../api/shelter";
import { getPetListing } from "../../api/shelter";
import { useNavigate } from "react-router-dom";

// Source: https://react-bootstrap.netlify.app/docs/forms/validation
export const PetUpdateForm = ({ listingId, formInfo, setFormInfo }) => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  //const [rendered, setrendered] = useState(true);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = new FormData(form);
    const response = await updatePetListing(listingId, payload);

    if (response.status === 200) {
      navigate("/");
    } else {
      console.error("Error with pet update!");
    }
  };

  return (
    <Form
      className="p-5 pt-0 border rounded shadow-sm needs-validation"
      id="pet-create-form"
      encType="multipart/form-data"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <h1 id="listpettitle">Update Your Pet!</h1>
      <hr className="hr" />
      <PetUpdateFormBody formInfo={formInfo} setFormInfo={setFormInfo} />
    </Form>
  );
};
