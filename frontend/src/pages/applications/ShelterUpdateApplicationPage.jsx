import { ShelterUpdateApplicationForm } from "../../components/applications/ShelterUpdateApplicationForm";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getApplication } from "../../api/applications";
import { useState, useEffect } from "react";

export const ShelterUpdateApplicationPage = () => {

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
      <ShelterUpdateApplicationForm applicationID={applicationID} statusInfo={statusInfo} setStatusInfo={setStatusInfo}/>
    </Container>
  );
};