import React, { useState } from "react";

export const ImageField = ({
  fieldName,
  label,
  errorMessage,
  accept,
  validate,
}) => {
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setIsValid(validate(file));
    setIsChanged(true);
  };

  return (
    <div>
      <input
        type="file"
        className="form-field mt-3"
        name={fieldName}
        accept={accept}
        onChange={handleFileChange}
      />
      {!isValid && isChanged && <p>{errorMessage}</p>}
    </div>
  );
};
