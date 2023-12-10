import Form from "react-bootstrap/Form";
import { ShelterFormBody } from "./ShelterFormBody";
import { FormHeader } from "./FormHeader";
import "./Style.css";
import { useState } from "react";
import { SeekerFormBody } from "./SeekerFormBody";
import { registerPetSeeker, registerShelter } from "../../../api/accounts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Source: https://react-bootstrap.netlify.app/docs/forms/validation
export const SignupForm = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("Pet Shelter");
  const [validated, setValidated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      navigate("/accounts/login");
    } else if (response.status === 400) {
      setErrorMsg("Username is already taken");
    } else {
      setErrorMsg("Unknown error occurred");
    }
  };

  return (
    <Form
      className="account-form p-5 pt-0 border rounded shadow-sm needs-validation"
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
      <p className="invalid-form-feedback">{errorMsg}</p>
      <p id="haveacc">
        Already have an account?&nbsp;
        <Link id="loginlink" to="/accounts/login">
          Log in
        </Link>
      </p>
    </Form>
  );
};
