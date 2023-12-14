import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const DescriptionField = ({
  fieldName,
  placeholder,
  rows,
  errorMessage,
  validate,
}) => {
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Form.Group>
      <Form.Control
        as="textarea"
        required
        className="form-field mt-3"
        name={fieldName}
        placeholder={placeholder}
        rows={rows}
        value={text}
        isInvalid={!isValid && isChanged}
        onChange={(e) => {
          const inputValue = e.target.value;
          setText(inputValue);
          setIsValid(validate(inputValue));
          setIsChanged(true);
        }}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
