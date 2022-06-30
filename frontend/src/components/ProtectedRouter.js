import React from "react";
import { Navigate } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";

const ProtectedRouter = ({ children }) => {
  const loggedInUser = useLoggedInUser();

  if (!loggedInUser || loggedInUser === null || loggedInUser === undefined) {
    return <Navigate to="/not-auth" />;
  }

  return children;
};

export default ProtectedRouter;
