import useAuth from "../hooks/useAuth";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token } = useAuth();

//   if (!user || (requiredRole && !isAuthorized(requiredRole))) {
  if (!token) {

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
