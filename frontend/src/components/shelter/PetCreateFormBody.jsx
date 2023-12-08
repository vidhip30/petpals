import { TextField, validatePlaintext } from "../shared/TextField";
import Button from "react-bootstrap/Button";
import { DropdownField } from "./DropdownField";
import { DescriptionField } from "./DescriptionField";
import { ImageField } from "./ImageField";

export const PetCreateFormBody = () => {
  const size_options = [
    { value: 1, label: "Small" },
    { value: 2, label: "Medium" },
    { value: 3, label: "Big" },
  ];

  const gender_options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const status_options = [
    { value: "available", label: "Available" },
    { value: "adopted", label: "Adopted" },
    { value: "pending", label: "Pending" },
    { value: "withdrawn", label: "Withdrawn" },
  ];

  return (
    <>
      <div className="row">
        <div className="col">
          <TextField
            fieldName="name"
            placeholder="Pet name"
            type="text"
            errorMessage={"Please enter the pet's name."}
            validate={validatePlaintext}
          />
        </div>
        <div className="col">
          <TextField
            fieldName="breed"
            placeholder="Breed"
            type="text"
            errorMessage={"Please enter the pet's breed."}
            validate={validatePlaintext}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <DropdownField
            fieldName="size"
            placeholder="Select Size"
            options={size_options}
            errorMessage="Please select a pet size."
            validate={(value) => value !== ""}
          />
        </div>
        <div className="col">
          <DropdownField
            fieldName="gender"
            placeholder="Select Gender"
            options={gender_options}
            errorMessage="Please select a gender."
            validate={(value) => value !== ""}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TextField
            fieldName="age"
            placeholder="Age"
            type="number"
            errorMessage="Please enter a valid age."
            validate={(value) =>
              Number.isInteger(Number(value)) && Number(value) >= 0
            }
          />
        </div>
        <div className="col">
          <DropdownField
            fieldName="status"
            placeholder="Select Status"
            options={status_options}
            errorMessage="Please select a status."
            validate={(value) => value !== ""}
          />
        </div>
      </div>
      <DescriptionField
        fieldName="description"
        placeholder="Description"
        rows={4} // Set the number of rows you desire
        errorMessage="Please enter a description."
        validate={(value) => value.trim() !== ""}
      />
      <ImageField
        fieldName="picture"
        label="pet-picture"
        accept="image/*"
        errorMessage="Please upload a valid image."
        validate={() => true}
      />
      <Button
        id="create"
        className="mb-3 mt-4 btn btn-secondary"
        type="submit"
        value="pet_listed"
      >
        List Pet
      </Button>
    </>
  );
};
