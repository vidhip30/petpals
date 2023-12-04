import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useState, useEffect } from 'react';
import './style.css';

function PetCard({ pets }) {
  const [shelters, setShelters] = useState({});
  
  useEffect(() => {
    const fetchShelterData = async () => {
      try {
        
        const shelterPromises = pets.map(async (pet) => {
          const response = 'await fetch(`http://127.0.0.1:8000/accounts/shelter/${pet.shelter}`);'
          const json = await response.json();
          return { [pet.shelter]: json.name }; // Assuming each pet has a unique ID
        });

        const shelterDataArray = await Promise.all(shelterPromises);
        
       
        const mergedShelterData = shelterDataArray.reduce((acc, data) => ({ ...acc, ...data }), {});

      
        setShelters(mergedShelterData);
      } catch (error) {
        console.error('Error fetching shelter name:', error);
      }
    };

    fetchShelterData();
  }, [pets]);

 


  if (!pets || !Array.isArray(pets)) {
    return null;
  }

  return (
    <Row>
      {pets.map((pet, index) => (
        <Col key={index} md={4} lg={3} sm={6}>
          <Card className="mb-4">
            <div className="img-container">
              {/* <img
                src="/images/dog-temp.jpg"
                className="card-img-top custom-img"
                alt="Image-Dog"
              /> */}
            </div>
            <div className="text-center mt-1">
              <Link
                type="button"
                className="pet-link"
                data-bs-toggle="modal"
                data-bs-target="#petInfoModal"
              >
                <Card.Title>
                  {pet.name}
                  {pet.gender === 'female' ? '♀' : '♂'}
                </Card.Title>
              </Link>
            </div>
            <div className="card-body">
              <div className="d-flex">
                <div>
                  <p className="card-text">
                    <Link to={`./shelter/${pet.shelter}`} className="pet-link">

                   
           




                      Shelter: {shelters[pet.shelter]}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="card-text breed">Breed: {pet.breed}</p>
                  <p className="card-text">Size: {pet.size} pounds</p>
                </div>
                <div>
                  <p className="card-text age">Age: {pet.age} </p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default PetCard;

