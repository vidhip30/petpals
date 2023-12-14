import Form from "react-bootstrap/Form";
import { PetCreateFormBody } from "./PetCreateFormBody";
import "./Style.css";
import { useState } from "react";
import { createPetListing } from "../../api/shelter";
import { useNavigate } from "react-router-dom";

// Source: https://react-bootstrap.netlify.app/docs/forms/validation
export const PetCreateForm = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = new FormData(form);
    const response = await createPetListing(payload);

    if (response.status === 201) {
      navigate("/");
    } else {
      console.error("Error with pet creation!");
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
      <h1 id="listpettitle">List Your Pet!</h1>
      <hr className="hr" />
      <PetCreateFormBody />
    </Form>
  );
};
