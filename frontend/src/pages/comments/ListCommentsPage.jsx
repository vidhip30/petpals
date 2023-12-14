import { listComments } from "../../api/comments";
import { getApplication, fetchPetDetails } from "../../api/applications";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Comment } from "../../components/comments/Comment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "../../components/shared/Button";
import "./Style.css";
import { CommentForm } from "../../components/comments/CommentForm";
import { CommentFormWithStars } from "../../components/comments/CommentFormWithStars"; // Adjust import path as necessary

export const CommentsListPage = () => {
  const [comments, setComments] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [application, setApplication] = useState([]);
  const [pet, setPet] = useState([]);
  const { commentType, modelID } = useParams();
  const userType = localStorage.getItem("userType");

  const getComments = async () => {
    try {
      const response = await listComments(commentType, modelID, undefined);
      setComments(response["results"]);
      setPrevPage(response["previous"]);
      setNextPage(response["next"]);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleLoadPrev = async (event) => {
    const response = await listComments(commentType, modelID, prevPage);
    setComments(response["results"]);
    setPrevPage(response["previous"]);
    setNextPage(response["next"]);
  };

  const handleLoadNext = async (event) => {
    const response = await listComments(commentType, modelID, nextPage);
    setComments(response["results"]);
    setPrevPage(response["previous"]);
    setNextPage(response["next"]);
  };
  const handleapp = async () => {
    const response = await getApplication(modelID);
    setApplication(response);
  };

  const handlepet = async () => {
    const response = await fetchPetDetails(modelID);
    setPet(response);
  };

  useEffect(() => {
    getComments();
  }, [commentType, modelID]);

  useEffect(() => {
    handleapp();
  }, [modelID]);

  useEffect(() => {
    handlepet();
  }, [modelID]);

  return (
    <main>
      <Row className="justify-content-center my-4">
        <Col className="text-center">
          <h1 className="display-4">Comments</h1>
        </Col>
      </Row>

      <Row className="justify-content-center my-4">
        <Col md={6}>
          {commentType === "shelter" ? (
            <CommentFormWithStars
              objectID={modelID}
              objectType="shelter"
              seeker={localStorage.getItem("userID")}
              shelter={modelID}
              onCommentPosted={getComments}
            />
          ) : userType === "seeker" ? (
            <CommentForm
              objectID={modelID}
              objectType="application"
              seeker={localStorage.getItem("userID")}
              shelter={pet.shelter}
              onCommentPosted={getComments}
            />
          ) : (
            <CommentForm
              objectID={modelID}
              objectType="application"
              seeker={application.user}
              shelter={localStorage.getItem("userID")}
              onCommentPosted={getComments}
            />
          )}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          {" "}
          {/* Adjust the column size as needed */}
          {comments.map((comment, index) => (
            <div key={comment.id} className="my-2">
              <Comment
                content={comment.content}
                stars={comment.stars}
                commenter={
                  comment.shelter
                    ? { shelter: comment.shelter }
                    : { petseeker: comment.petseeker }
                }
              />
              {index < comments.length - 1 && <hr />}
            </div>
          ))}
        </Col>
      </Row>

      <Row className="pt-4 my-4">
        <Col className="text-center">
          <Button
            onClick={(event) => handleLoadPrev(event)}
            variant="primary"
            disabled={!prevPage}
            text="Previous"
            className="custom-button"
          />
          <Button
            onClick={(event) => handleLoadNext(event)}
            disabled={!nextPage}
            variant="primary"
            text="Next"
            className="custom-button"
          />
        </Col>
      </Row>
    </main>
  );
};
