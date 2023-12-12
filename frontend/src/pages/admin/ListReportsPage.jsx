import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "../../components/shared/Button";
import { listReports } from "../../api/reports";
import { ReportCard } from "../../components/admin/ReportCard";

export const ListReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  const getReports = async () => {
    const response = await listReports();
    setReports(response["results"]);
    setPrevPage(response["previous"]);
    setNextPage(response["next"]);
  };

  useEffect(() => {
    getReports();
  }, []);

  const handleLoadPrev = async () => {
    const response = await listReports(prevPage);
    setReports(response["results"]);
    setPrevPage(response["previous"]);
    setNextPage(response["next"]);
  };

  const handleLoadNext = async () => {
    const response = await listReports(nextPage);
    setReports(response["results"]);
    setPrevPage(response["previous"]);
    setNextPage(response["next"]);
  };

  return (
    <Container className="d-flex flex-column align-items-center pt-5 pb-5 h-100 overflow-auto">
      <h2>View Reports</h2>
      {reports.map((report, index) => {
        return (
          <ReportCard
            key={index}
            reporterID={report["reporter_id"]}
            reporterName={report["reporter_name"]}
            reporteeID={report["reportee_id"]}
            reporteeName={report["reportee_name"]}
            text={report["text"]}
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
