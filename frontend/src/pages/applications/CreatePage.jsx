import { CreateForm } from "../../components/applications/CreateForm";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const CreatePage = () => {
  const { petID } = useParams();

  return (
    <Container className="mt-5 mb-5">
      <CreateForm listingID={petID} />
    </Container>
  );
};
