import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="d-flex justify-content-end align-items-center px-3 gap-3">
      <Link to="/profile" className="link-light">
        Profile
      </Link>
      <a className="link-light" href="application-summary-user.html">
        Applications
      </a>
      <a className="link-light" href="../signup-login/login.html">
        Log Out
      </a>
    </footer>
  );
};
