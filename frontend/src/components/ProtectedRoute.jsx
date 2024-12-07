import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import propTypes from "prop-types";
import Navbar from "./Navbar";

const ProtectedRoute = ({ roles= [], children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
  roles: propTypes.array,
  children: propTypes.node,
}