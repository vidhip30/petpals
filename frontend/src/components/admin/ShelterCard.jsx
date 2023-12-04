import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export const ShelterCard = ({
  name,
  username,
  email,
  phone,
  location,
  image_url,
}) => {
  return (
    <Card className="w-25 mt-4">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <Card.Img variant="bottom" src={image_url} />
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Username: {username}</ListGroup.Item>
        <ListGroup.Item>Email: {email}</ListGroup.Item>
        <ListGroup.Item>Phone Number: {phone}</ListGroup.Item>
        <ListGroup.Item>Location: {location}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
