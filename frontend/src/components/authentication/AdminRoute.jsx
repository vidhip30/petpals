import { useContext } from "react";
import { Context } from "../../App";
import { PageNotFound } from "../../pages/misc/PageNotFound";

export const AdminRoute = ({ children }) => {
  const { authenticated, isAdmin } = useContext(Context);

  if (!authenticated || !isAdmin) {
    return <PageNotFound />;
  }

  return children;
};
