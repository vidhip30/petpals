import { useState } from "react";
import Form from "react-bootstrap/Form";

export const PasswordField = ({
  fieldName,
  placeholder,
  errorMessage,
  isValid,
  password,
  setPassword,
}) => {
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Form.Group>
      <Form.Control
        required
        className="form-field mt-3"
        type="password"
        name={fieldName}
        placeholder={placeholder}
        value={password}
        isInvalid={!isValid && isChanged}
        onChange={(e) => {
          setPassword(e.target.value);
          setIsChanged(true);
        }}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
