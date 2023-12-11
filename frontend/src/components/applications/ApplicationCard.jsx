import React, { useState, useEffect } from "react";
import { fetchPetDetails } from "../../api/applications";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./Style.css";

export const ApplicationCard = ({ applicationID }) => {
  const [petDetails, setPetDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchPetDetails(applicationID);
        setPetDetails(details);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchData();
  }, [applicationID]);

  if (!petDetails) {
    // If details are still loading or an error occurred
    return null; // or you can render a loading indicator or error message
  }

  // Destructure petDetails
  const { picture, name, gender, shelterName, breed, size, age, user } =
    petDetails;

  console.log(user);

  // Determine the gender symbol
  const symbol = gender === "male" ? "♂" : "♀";

  // Construct the HTML string
  return (
    <Card>
      <img
        src={picture}
        className="card-img-top custom-img mx-auto"
        alt={`Image-${name}`}
      />
      <div className="text-center mt-1">
        {/* Use React Router Link for navigation */}
        <Link to={`/applications/${applicationID}/`} className="pet-link">
          {`${name} ${symbol}`}
        </Link>
      </div>
      <Card.Body>
        <div className="d-flex">
          <div>
            <p className="card-text">
              <Link to={`/shelters/${user}`} className="pet-link">
                Shelter: {shelterName}
              </Link>
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <p className="card-text breed">Breed: {breed}</p>
            <p className="card-text">Size: {size}</p>
          </div>
          <div>
            <p className="card-text age">Age: {age}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
