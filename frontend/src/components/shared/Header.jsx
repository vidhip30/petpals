import { Link } from "react-router-dom";
import "./Style.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import { NotifyModal } from "./NotifyModal";
import {
  getNotifications,
  updateNotification,
  getFilteredNotifications,
} from "../../api/notifications";
import { deleteNotification } from "../../api/notifications";

// Source: https://react-bootstrap.netlify.app/docs/components/modal/
export const Header = () => {
  const { username, userID, userType, profilePicURL } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [filter, setFilter] = useState("none");

  const handleRender = async () => {
    const response = await getNotifications(userID, userType);
    updateStates(response);
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = async (notifyID) => {
    await deleteNotification(userID, userType, notifyID);

    setNotifications(
      notifications.filter((notification) => {
        notification.id !== notifyID;
      }),
    );
  };

  useEffect(() => {
    handleRender();
    markAsRead();
  }, []);

  useEffect(() => {
    markAsRead();
  }, [getNotifications]);

  const handleFilterUpdate = async () => {
    let response;

    if (filter === "read") {
      response = await getFilteredNotifications(userID, userType, "True");
    } else if (filter === "unread") {
      response = await getFilteredNotifications(userID, userType, "False");
    } else {
      response = await getNotifications(userID, userType);
    }

    updateStates(response);
  };

  useEffect(() => {
    handleFilterUpdate();
  }, [filter]);

  const updateStates = (response) => {
    setNotifications(response["results"] || []);
    setPrevPage(response["previous"]);
    setNextPage(response["next"]);
  };

  const handleClickPrev = async () => {
    const response = await getNotifications(userID, userType, prevPage);
    updateStates(response);
  };

  const handleClickNext = async () => {
    const response = await getNotifications(userID, userType, nextPage);
    updateStates(response);
  };

  const markAsRead = () => {
    const read_notifications = notifications.map((notification) => {
      return { ...notification, read: true };
    });

    read_notifications
      .filter((notification) => {
        !notification.read;
      })
      .forEach(async (notification) => {
        await updateNotification(userID, userType, notification["id"], {
          read: notification.read,
        });
      });

    setNotifications(read_notifications);
  };

  return (
    <>
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
              <button type="button" className="btn" onClick={handleOpen}>
                <img
                  id="notify-icon"
                  src={
                    notifications
                      ? "/images/bell-pin-light.svg"
                      : "/images/bell-light.svg"
                  }
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
      <NotifyModal
        show={showModal}
        notifications={notifications || []}
        prevPage={prevPage}
        nextPage={nextPage}
        handleClose={handleClose}
        handleLoadPrev={handleClickPrev}
        handleLoadNext={handleClickNext}
        handleDelete={handleDelete}
        setFilter={setFilter}
      />
    </>
  );
};
