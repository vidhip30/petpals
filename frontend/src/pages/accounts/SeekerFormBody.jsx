import { TextField, validatePassword, validatePlaintext } from "./TextField";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SeekerFormBody = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <TextField
            fieldName="First name"
            type="text"
            errorMessage={"Please enter your first name."}
            validate={validatePlaintext}
          />
        </div>
        <div className="col">
          <TextField
            fieldName="Last name"
            type="text"
            errorMessage={"Please enter your last name."}
            validate={validatePlaintext}
          />
        </div>
      </div>
      <TextField
        fieldName="Email"
        type="email"
        errorMessage={"Please enter a valid email address."}
        validate={validatePlaintext}
      />
      <TextField
        fieldName="Username"
        type="text"
        errorMessage={"Please choose a username."}
        validate={validatePlaintext}
      />
      <TextField
        fieldName="Password"
        type="password"
        errorMessage={"Please choose a valid password."}
        validate={validatePassword}
      />
      <Form.Text id="passwordHelpBlock" className="form-text mb-3">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces or emoji.
      </Form.Text>
      <TextField
        fieldName="Confirm password"
        type="password"
        errorMessage={"Please confirm your password."}
        validate={validatePassword}
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
