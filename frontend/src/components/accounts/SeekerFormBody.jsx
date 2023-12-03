import {
  TextField,
  validateEmail,
  validatePlaintext,
} from "../shared/TextField";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { PasswordField } from "./PasswordField";

export const SeekerFormBody = () => {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [password, setPassword] = useState("");

  const [isPasswordRptValid, setIsPasswordRptValid] = useState(false);
  const [passwordRpt, setPasswordRpt] = useState("");

  useEffect(() => {
    setIsPasswordValid(validatePassword(password));
  }, [setIsPasswordValid, password]);

  useEffect(() => {
    setIsPasswordRptValid(validatePasswordRepeat(password, passwordRpt));
  }, [isPasswordRptValid, password, passwordRpt]);

  return (
    <>
      <div className="row">
        <div className="col">
          <TextField
            fieldName="first_name"
            placeholder="First name"
            type="text"
            errorMessage={"Please enter your first name."}
            validate={validatePlaintext}
          />
        </div>
        <div className="col">
          <TextField
            fieldName="last_name"
            placeholder="Last name"
            type="text"
            errorMessage={"Please enter your last name."}
            validate={validatePlaintext}
          />
        </div>
      </div>
      <TextField
        fieldName="email"
        placeholder="Email"
        type="email"
        errorMessage={"Please enter a valid email address."}
        validate={validateEmail}
      />
      <TextField
        fieldName="username"
        placeholder="Username"
        type="text"
        errorMessage={"Please choose a username."}
        validate={validatePlaintext}
      />
      <PasswordField
        fieldName="password"
        placeholder="Password"
        errorMessage={"Please choose a valid password."}
        isValid={isPasswordValid}
        password={password}
        setPassword={setPassword}
      />
      <Form.Text id="passwordHelpBlock" className="form-text mb-3">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces or emoji.
      </Form.Text>
      <PasswordField
        fieldName="password_repeat"
        placeholder="Confirm password"
        errorMessage={"Please confirm your password."}
        isValid={isPasswordRptValid}
        password={passwordRpt}
        setPassword={setPasswordRpt}
      />
      <Button
        id="create"
        className="mb-3 mt-4 btn btn-secondary"
        type="submit"
        value="Create Account"
      >
        Submit
      </Button>
    </>
  );
};

const validatePassword = (password) => {
  if (password.length < 8 || password.length > 20) {
    return false;
  }

  // Source: https://javascript.plainenglish.io/check-if-string-is-alphanumeric-in-javascript-e325caa3ee?gi=338b1017d1a4
  return /^[a-zA-Z0-9]+$/.test(password);
};

const validatePasswordRepeat = (password, repeat) => {
  return password === repeat;
};
