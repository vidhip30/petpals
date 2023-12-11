import React, { useState } from "react";

const Stars = ({ outOf = 5, onRatingSelected }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);

  const handleMouseOver = (rating) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (rating) => {
    setCurrentRating(rating);
    if (onRatingSelected) {
      onRatingSelected(rating);
    }
  };

  const renderStar = (index) => {
    if (hoverRating >= index) {
      return "★";
    } else if (!hoverRating && currentRating >= index) {
      return "★";
    }
    return "☆";
  };

  return (
    <div>
      {[...Array(outOf)].map((_, index) => (
        <span
          key={index}
          onMouseOver={() => handleMouseOver(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
          style={{ cursor: "pointer", fontSize: "24px", color: "gold" }}
        >
          {renderStar(index + 1)}
        </span>
      ))}
    </div>
  );
};

export default Stars;
