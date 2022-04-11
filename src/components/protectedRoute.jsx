import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../services/authService";
import componentWrapper from "./componentWrapper";

const ProtectedRoute = (props) => {
  //   const location = useLocation();

  return auth.getCurrentUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: props.location }} />
  );
};

export default componentWrapper(ProtectedRoute);
