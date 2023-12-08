import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { updatePetListing } from "../../api/shelter";

export const DropdownField = ({
  fieldName,
  placeholder,
  options,
  errorMessage,
  validate,
  value,
  update,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Form.Group>
      <Form.Control
        as="select"
        required
        className="form-field mt-3"
        name={fieldName}
        value={value}
        isInvalid={!isValid && isChanged}
        onChange={(e) => {
          update(e);
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
