import useAuth from "../hooks/useAuth";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;  // Or a spinner, or simply render nothing for now
  }
  
//   if (!user || (requiredRole && !isAuthorized(requiredRole))) {
  if (!token) {

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
