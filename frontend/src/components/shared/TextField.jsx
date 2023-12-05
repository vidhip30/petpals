import { useState } from "react";
import Form from "react-bootstrap/Form";

export const TextField = ({
  fieldName,
  placeholder,
  type,
  errorMessage,
  validate,
  prevValue
}) => {
  const [text, setText] = useState(prevValue) !== undefined ? prevValue : "");
  const [isValid, setIsValid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Form.Group>
      <Form.Control
        required
        className="form-field mt-3"
        name={fieldName}
        placeholder={placeholder}
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

export const validateEmail = (email) => {
  // Source: https://stackoverflow.com/a/46181
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
};
