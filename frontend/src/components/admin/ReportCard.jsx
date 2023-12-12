import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import { deleteUser } from "../../api/accounts";

export const ReportCard = ({
  reporterID,
  reporterName,
  reporteeID,
  reporteeName,
  text,
}) => {
  const [reporterBanned, setReporterBanned] = useState(false);
  const [reporteeBanned, setReporteeBanned] = useState(false);

  const getReportResult = () => {
    if (!reporterBanned && !reporteeBanned) {
      return "No action taken";
    }

    if (reporterBanned) {
      return "Reporting user banned";
    }

    if (reporteeBanned) {
      return "Reported shelter banned";
    }

    return "Both users banned";
  };

  const handleReporterDelete = async () => {
    await deleteUser(reporterID, "seeker");
    setReporterBanned(true);
  };

  const handleReporteeDelete = async () => {
    await deleteUser(reporteeID, "shelter");
    setReporteeBanned(true);
  };

  return (
    <Card className="w-25 mt-4">
      <Card.Body>
        <Card.Title>{reporteeName}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Reporter: {reporterName}</ListGroup.Item>
        <ListGroup.Item>Details: {text}</ListGroup.Item>
        <ListGroup.Item>Result: {getReportResult()}</ListGroup.Item>
        <ListGroup.Item className="d-flex flex-direction-row justify-content-between">
          <Button onClick={handleReporterDelete} disabled={reporterBanned}>
            Ban Reporter
          </Button>
          <Button onClick={handleReporteeDelete} disabled={reporteeBanned}>
            Ban Reportee
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
