import { useContext } from "react";
import { Context } from "../../App";
import { PageNotFound } from "../../pages/misc/PageNotFound";

// Source: https://www.robinwieruch.de/react-router-private-routes/
export const ProtectedRoute = ({ children }) => {
  const { authenticated, setAuthenticated } = useContext(Context);

  if (!authenticated) {
    return <PageNotFound />;
  }

  return children;
};
