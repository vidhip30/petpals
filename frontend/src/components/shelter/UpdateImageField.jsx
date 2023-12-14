import React, { useState } from "react";
import { updatePetListing } from "../../api/shelter";

export const UpdateImageField = ({
  fieldName,
  label,
  errorMessage,
  accept,
  validate,
  update,
  value,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const handleFileChange = (e) => {
    //const selectedFile = e.target.files[0];
    const selectedFile = e.target.files[0];
    update(selectedFile);
    setIsValid(validate(selectedFile));
    setIsChanged(true);
  };

  return (
    <div>
      {value && <img src={value} alt="Current Pet" className="pet-image" />}
      <div>
        <input
          type="file"
          className="form-field mt-3"
          name={fieldName}
          accept={accept}
          onChange={handleFileChange}
        />
      </div>
      {!isValid && isChanged && <p>{errorMessage}</p>}
    </div>
  );
};
