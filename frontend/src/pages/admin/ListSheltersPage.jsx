import { Container } from "react-bootstrap";
import { ShelterCard } from "../../components/admin/ShelterCard";
import { listShelters } from "../../api/accounts";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "../../components/shared/Button";

export const ListSheltersPage = () => {
  const [shelters, setShelters] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  const getShelters = async () => {
    const response = await listShelters();
    setShelters(response["results"]);
    setPrevPage(response["previous"]);
    setNextPage(response["next"]);
  };

  useEffect(() => {
    getShelters();
  }, []);

  const handleLoadPrev = async (event) => {
    const response = await listShelters(prevPage);
    setShelters(response["results"]);
    setPrevPage(response["previous"]);
    setNextPage(response["next"]);
  };

  const handleLoadNext = async (event) => {
    const response = await listShelters(nextPage);
    setShelters(response["results"]);
    setPrevPage(response["previous"]);
    setNextPage(response["next"]);
  };

  return (
    <Container className="d-flex flex-column align-items-center pt-5 pb-5 h-100 overflow-auto">
      <h2>View Shelters</h2>
      {shelters.map((shelter, index) => {
        return (
          <ShelterCard
            key={index}
            name={shelter["name"]}
            username={shelter["username"]}
            email={shelter["email"]}
            phone={shelter["phone_number"]}
            location={shelter["location"]}
            image_url={shelter["profile_image"]}
          />
        );
      })}
      <Row className="pt-4">
        <Col>
          <Button
            onClick={(event) => handleLoadPrev(event)}
            variant="primary"
            disabled={!prevPage}
            text="Previous"
          />
        </Col>
        <Col>
          <Button
            onClick={(event) => handleLoadNext(event)}
            variant="primary"
            disabled={!nextPage}
            text="Next"
          />
        </Col>
      </Row>
    </Container>
  );
};
