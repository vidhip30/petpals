// Source: https://react-bootstrap.netlify.app/docs/components/modal/
import Modal from "react-bootstrap/Modal";
import { Notification } from "./Notification";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "../../components/shared/Button";

export const NotifyModal = ({
  show,
  notifications,
  handleClose,
  prevPage,
  nextPage,
  handleLoadPrev,
  handleLoadNext,
  setFilter,
}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="h3">Notifications</Modal.Header>
      <Modal.Body>
        <div className="pb-4">
          <h5>Filters</h5>
          <div className="d-flex flex-direction">
            <span className="d-flex flex-direction-row gap-1">
              <input
                id="clear-filter"
                type="radio"
                value="none"
                name="notify-filter"
                onChange={handleFilterChange}
              />
              <label htmlFor="clear-filter">None</label>
            </span>
            <span className="d-flex flex-direction-row gap-1">
              <input
                id="read-filter"
                type="radio"
                value="read"
                name="notify-filter"
                onChange={handleFilterChange}
              />
              <label htmlFor="read-filter">Read</label>
            </span>
            <span className="d-flex flex-direction-row gap-1">
              <input
                id="unread-filter"
                type="radio"
                value="unread"
                name="notify-filter"
                onChange={handleFilterChange}
              />
              <label htmlFor="unread-filter">Unread</label>
            </span>
          </div>
        </div>
        <div id="notifications" className="container-fluid d-flex flex-column">
          {notifications.map((notification, index) => (
            <Notification
              key={index}
              text={notification.text}
              image={notification.image}
              read={notification.read}
              time={notification.created_at}
              link={notification.link}
            />
          ))}
        </div>
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
      </Modal.Body>
    </Modal>
  );
};
