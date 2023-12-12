import React from 'react';

const StaticStars = ({ rating, outOf = 5 }) => {
  const filledStars = Math.round(rating);
  const emptyStars = outOf - filledStars;

  const starStyle = {
    color: 'gold',
    fontSize: '24px',
  };

  return (
    <div style={starStyle}>
      {'★'.repeat(filledStars)}
      {'☆'.repeat(emptyStars)}
    </div>
  );
};

export default StaticStars;
