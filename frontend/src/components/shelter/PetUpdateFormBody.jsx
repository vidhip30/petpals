import { TextField, validatePlaintext } from "../shared/TextField";
import Button from "react-bootstrap/Button";
import { UpdateDropdownField } from "./UpdateDropdownField";
import { UpdateDescriptionField } from "./UpdateDescriptionField";
import { UpdateImageField } from "./UpdateImageField";
import { SimpleTextField } from "../shared/SimpleTextField";

export const PetUpdateFormBody = ({ formInfo, setFormInfo }) => {
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
          <SimpleTextField
            fieldName="name"
            placeholder="Pet name"
            type="text"
            value={formInfo.name}
            errorMessage={"Please enter the pet's name."}
            validate={validatePlaintext}
            update={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
          />
        </div>
        <div className="col">
          <SimpleTextField
            fieldName="breed"
            placeholder="Breed"
            type="text"
            value={formInfo.breed}
            errorMessage={"Please enter the pet's breed."}
            validate={validatePlaintext}
            update={(e) => setFormInfo({ ...formInfo, breed: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SimpleTextField
            fieldName="size"
            placeholder="Enter size (pounds)"
            type="number"
            value={formInfo.size}
            errorMessage="Please enter a valid size."
            validate={(value) =>
              Number.isInteger(Number(value)) && Number(value) >= 0
            }
            update={(e) => setFormInfo({ ...formInfo, size: e.target.value })}
          />
        </div>
        <div className="col">
          <UpdateDropdownField
            fieldName="gender"
            placeholder="Select Gender"
            options={gender_options}
            value={formInfo.gender}
            errorMessage="Please select a gender."
            validate={(value) => value !== ""}
            update={(e) => setFormInfo({ ...formInfo, gender: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SimpleTextField
            fieldName="age"
            placeholder="Age"
            type="number"
            value={formInfo.age}
            errorMessage="Please enter a valid age."
            validate={(value) =>
              Number.isInteger(Number(value)) && Number(value) >= 0
            }
            update={(e) => setFormInfo({ ...formInfo, age: e.target.value })}
          />
        </div>
        <div className="col">
          <UpdateDropdownField
            fieldName="status"
            placeholder="Select Status"
            options={status_options}
            value={formInfo.status}
            errorMessage="Please select a status."
            validate={(value) => value !== ""}
            update={(e) => setFormInfo({ ...formInfo, status: e.target.value })}
          />
        </div>
      </div>
      <UpdateDescriptionField
        fieldName="description"
        placeholder="Description"
        rows={4} // Set the number of rows you desire
        value={formInfo.description}
        errorMessage="Please enter a description."
        validate={(value) => value.trim() !== ""}
        update={(e) =>
          setFormInfo({ ...formInfo, description: e.target.value })
        }
      />
      <UpdateImageField
        fieldName="picture"
        label="pet-picture"
        accept="image/*"
        value={formInfo.picture}
        errorMessage="Please upload a valid image."
        value={formInfo.picture || ""}
        validate={() => true}
        update={(selectedFile) =>
          setFormInfo({ ...formInfo, picture: selectedFile })
        }
      />

      <Button
        id="create"
        className="mb-3 mt-4 btn btn-secondary"
        type="submit"
        value="pet_updated"
      >
        Update Pet
      </Button>
    </>
  );
};
