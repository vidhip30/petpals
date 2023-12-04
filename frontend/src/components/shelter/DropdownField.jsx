import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const DropdownField = ({
  fieldName,
  placeholder,
  options,
  errorMessage,
  validate,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Form.Group>
      <Form.Control
        as="select"
        required
        className="form-field mt-3"
        name={fieldName}
        value={selectedValue}
        isInvalid={!isValid && isChanged}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          setIsValid(validate(e.target.value));
          setIsChanged(true);
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
