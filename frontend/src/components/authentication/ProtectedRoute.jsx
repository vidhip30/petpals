import { useContext } from "react";
import { Context } from "../../App";
import { PageNotFound } from "../../pages/misc/PageNotFound";

// Source: https://www.robinwieruch.de/react-router-private-routes/
export const ProtectedRoute = ({ children }) => {
  const { authenticated } = useContext(Context);

  if (!authenticated) {
    return <PageNotFound />;
  }

  return children;
};
