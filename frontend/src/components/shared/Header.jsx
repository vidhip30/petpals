import { Link } from "react-router-dom";
import "./Style.css";
import { useContext } from "react";
import { Context } from "../../App";

export const Header = () => {
  const { username, profilePicURL } = useContext(Context);

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid flex-nowrap">
          <Link
            id="brand-name"
            to="/search"
            className="navbar-brand d-flex justify-content-center align-items-center text-decoration-none fs-1"
          >
            <img
              id="brand-logo"
              src="/images/paw.png"
              alt="Logo"
              className="d-inline-block align-text-top me-3"
            />
            PetPals
          </Link>
          <div id="profile-widget" className="d-flex align-items-center fs-5">
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#notify-modal"
            >
              <img
                id="notify-icon"
                src="/images/notify-bell-alert.svg"
                alt="Notification icon"
              />
            </button>
            <span id="username">{username}</span>
            <div id="profile-frame">
              <img id="profile-pic" src={profilePicURL} alt="Profile image" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
