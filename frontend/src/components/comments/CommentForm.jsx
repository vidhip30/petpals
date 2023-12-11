import { createComment } from "../../api/comments";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { TextField, validatePlaintext } from "../shared/TextField";
export const CommentForm = ({ objectID, objectType, seeker, shelter }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = Array.from(event.target.elements)
      .filter((input) => input.name)
      .reduce(
        (obj, input) => Object.assign(obj, { [input.name]: input.value }),
        {},
      );
    const response = await createComment(
      objectID,
      payload,
      objectType,
      seeker,
      shelter,
    );

    if (response) {
      console.log("comment creation successful!");
    } else {
      console.log("Error with comment creation!");
    }
  };

  return (
    <Form
      id="reply-form"
      className="message-container align-self-start col-12"
      encType="multipart/form-data"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <label class="fs-5" for="reply-input">
        Comment:
      </label>

      <TextField
        fieldName="content"
        placeholder="comment"
        errorMessage="Please enter a comment."
        validate={(value) => value.trim() !== ""}
      />
      <Button
        id="create"
        className="mb-3 mt-4 btn btn-secondary"
        type="submit"
        value="comment_create"
      >
        Post
      </Button>
    </Form>
  );
};
