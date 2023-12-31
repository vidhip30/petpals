import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { updatePetListing } from "../../api/shelter";

export const UpdateDescriptionField = ({
  fieldName,
  placeholder,
  rows,
  errorMessage,
  validate,
  update,
  value,
}) => {
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
        value={value}
        isInvalid={!isValid && isChanged}
        onChange={(e) => {
          const inputValue = e.target.value;
          update(e);
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
