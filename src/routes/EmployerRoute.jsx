import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ROLES } from "../utils/roles";

const EmployerRoute = ({ children }) => {
  const { user, hasRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has employer role
  if (!hasRole(ROLES.RECRUITER)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default EmployerRoute;
