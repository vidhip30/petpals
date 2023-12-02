import Form from "react-bootstrap/Form";
import { ShelterFormBody } from "./ShelterFormBody";
import { FormHeader } from "./FormHeader";
import "./Style.css";
import { useState } from "react";
import { SeekerFormBody } from "./SeekerFormBody";
import { registerPetSeeker, registerShelter } from "../../api/accounts";

// Source: https://react-bootstrap.netlify.app/docs/forms/validation
export const SignupForm = () => {
  const [accountType, setAccountType] = useState("Pet Shelter");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const registerData = new FormData(form);
    const payload = {};

    registerData.forEach((value, field) => {
      payload[field] = value;
    });

    let response;

    if (accountType === "Pet Shelter") {
      response = await registerShelter(payload);
    } else {
      response = await registerPetSeeker(payload);
    }

    if (response.status === 201) {
      console.log("Registration successful!");
    } else {
      console.log("Error with registration!");
    }
  };

  return (
    <Form
      className="p-5 pt-0 border rounded shadow-sm needs-validation"
      id="account-form"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <FormHeader
        accountType={accountType}
        handleSeekerClick={() => {
          setAccountType("Pet Seeker");
        }}
        handleShelterClick={() => {
          setAccountType("Pet Shelter");
        }}
      />
      <hr className="hr" />
      {accountType === "Pet Seeker" && <SeekerFormBody />}
      {accountType === "Pet Shelter" && <ShelterFormBody />}
      <p id="haveacc">
        Already have an account?&nbsp;
        <a id="loginlink" href="login.html">
          Log in
        </a>
      </p>
    </Form>
  );
};
