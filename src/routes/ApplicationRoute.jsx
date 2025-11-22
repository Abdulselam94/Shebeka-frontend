// src/routes/ApplicantRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ROLES } from "../utils/roles";

const ApplicantRoute = ({ children }) => {
  const { user, hasRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ApplicantRoute;
