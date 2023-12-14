import Stars from "./Stars";
import { createComment } from "../../api/comments";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { TextField, validatePlaintext } from "../shared/TextField";
export const CommentFormWithStars = ({
  objectID,
  objectType,
  seeker,
  shelter,
  onCommentPosted,
}) => {
  const [validated, setValidated] = useState(false);
  const [stars, setStars] = useState(0);

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

    if (stars > 0) {
      payload.stars = stars;
    }

    const response = await createComment(
      objectID,
      payload,
      objectType,
      seeker,
      shelter,
    );

    if (response) {
      onCommentPosted();
    } else {
      console.error("Error with comment creation!");
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
      <Stars onRatingSelected={setStars} />

      <label className="fs-5" htmlFor="reply-input">
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
