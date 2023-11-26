import Form from "react-bootstrap/Form";
import { ShelterFormBody } from "./ShelterFormBody";
import { FormHeader } from "./FormHeader";
import "./Style.css";
import { useState } from "react";
import { SeekerFormBody } from "./SeekerFormBody";

export const SignupForm = () => {
  const [accountType, setAccountType] = useState("Pet Shelter");

  return (
    <Form
      className="p-5 pt-0 border rounded shadow-sm needs-validation"
      id="account-form"
      noValidate
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
