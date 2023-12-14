import { SeekerUpdateApplicationForm } from "../../components/applications/SeekerUpdateApplicationForm";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getApplication } from "../../api/applications";
import { useState, useEffect } from "react";

export const SeekerUpdateApplicationPage = () => {
  const [statusInfo, setStatusInfo] = useState("");

  const { applicationID } = useParams();
  const fetchApplication = async () => {
    const applicationData = await getApplication(applicationID);
    setStatusInfo(applicationData.status);
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <SeekerUpdateApplicationForm
        applicationID={applicationID}
        statusInfo={statusInfo}
        setStatusInfo={setStatusInfo}
      />
    </Container>
  );
};
