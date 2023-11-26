import { useState } from "react";
import Form from "react-bootstrap/Form";

export const TextField = ({ fieldName, type, errorMessage, validate }) => {
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Form.Group>
      <Form.Control
        required
        className="form-field mt-3"
        placeholder={fieldName}
        type={type}
        value={text}
        isInvalid={!isValid && isChanged}
        onChange={(e) => {
          setText(e.target.value);
          setIsValid(validate(e.target.value));
          setIsChanged(true);
        }}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const validatePlaintext = (text) => {
  return text.trim().length > 0;
};

export const validatePassword = (password) => {
  if (password.length < 8 || password.length > 20) {
    return false;
  }

  // Source: https://javascript.plainenglish.io/check-if-string-is-alphanumeric-in-javascript-e325caa3ee?gi=338b1017d1a4
  return /^[a-zA-Z0-9]+$/.test(password);
};
