import { Link } from "react-router-dom";
import "./Style.css";
import Button from "react-bootstrap/esm/Button";

export const Notification = ({
  id,
  text,
  image,
  read,
  time,
  link,
  handleDelete,
}) => {
  return (
    <div className="d-flex flex-row">
      <Link className="d-flex notify row" to={link}>
        <div className="d-flex flex-row align-items-start">
          {image && (
            <span className="profile-frame">
              <img className="notify-pic column" src={image} alt="user-pic" />
            </span>
          )}
          <span className="notify-text h5">{text}</span>
        </div>
        <div className="d-flex flex-row notify-text">
          {!read && <img src="/images/status.svg" />}
          <span>{time}</span>
        </div>
      </Link>
      <Button onClick={() => handleDelete(id)} className="notify-delete-btn">
        Delete
      </Button>
    </div>
  );
};
