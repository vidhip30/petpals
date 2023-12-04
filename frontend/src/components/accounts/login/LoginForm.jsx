import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../signup/Style.css";
import { login } from "../../../api/accounts";
import { Context } from "../../../App";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    setUsernameError("");
    setPasswordError("");

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);

      if (username === "") {
        setUsernameError("Please enter a username.");
      }

      if (password === "") {
        setPasswordError("Please enter a password.");
      }

      return;
    }

    const loginResult = await login({ username, password });

    if (loginResult.success) {
      // Redirect to the index page upon successful login
      navigate("/");
    } else {
      // Update the state with the error message
      setValidated(true);
      setUsernameError("Invalid Username.");
      setPasswordError("Invalid Password.");
    }

    // Reset form fields if needed
    setUsername("");
    setPassword("");
  };

  return (
    <Form
      className="account-form p-5 pt-0 border rounded shadow-sm needs-validation"
      id="loginform"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="form-header">
        <h1 id="formtitle" className="d-flex justify-content-center">
          <span id="logintitle"> Login </span>
        </h1>
      </div>
      <hr className="hr" />
      {/* Render form fields here, you can customize this part */}
      <Form.Control
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        isInvalid={validated && !!usernameError}
      />
      <Form.Control.Feedback type="invalid">
        {usernameError}
      </Form.Control.Feedback>
      <Form.Control
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        isInvalid={validated && !!passwordError}
      />
      <Form.Control.Feedback type="invalid">
        {passwordError}
      </Form.Control.Feedback>

      {/* Submit button */}
      <Button
        id="login"
        className="mb-3 mt-4 btn btn-secondary"
        type="submit"
        value="Login Account"
      >
        Submit
      </Button>

      {/* Link to register */}
      <p id="haveacc">
        Don't have an account?&nbsp;
        <Link id="signuplink" to="/accounts/signup">
          Sign up
        </Link>
      </p>
    </Form>
  );
};
