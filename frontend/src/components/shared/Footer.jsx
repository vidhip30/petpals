import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";

export const Footer = () => {
  const { authenticated } = useContext(Context);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <footer className="d-flex justify-content-end align-items-center px-3 gap-3">
      {authenticated ? (
        <>
          <Link to="/profile" className="link-light">
            Profile
          </Link>
          <Link to="/applications" className="link-light">
            Applications
          </Link>
          <Link onClick={logout} className="link-light">
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link to="/accounts/signup" className="link-light">
            Register
          </Link>
          <Link to="/accounts/login" className="link-light">
            Log In
          </Link>
        </>
      )}
    </footer>
  );
};
