import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './style.css';

function PetCard({ pets, shelterNames }) {
  

  if (!pets || !Array.isArray(pets) || pets.length === 0) {
    return (
      <div className="text-center mt-3">
        <p>No results match your search!</p>
      </div>
    );
  }

  return (
    <Row className='cardrow'>
      {pets.map((pet, index) => (
        <Col key={index} md={4} lg={3} sm={6}>
          <Card className="mb-4 ">
            <div className="img-container">
              <img
                src={`${pet.picture}`}
                className="card-img-top custom-img"
                alt="Image-pet"
              />
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
                    <Link to={`/shelters/${pet.shelter}`} className="pet-link">



                      Shelter: {shelterNames[pet.shelter]}
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

