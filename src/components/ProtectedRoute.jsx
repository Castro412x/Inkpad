// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Checking authentication..." />
      </div>
    );
  }

  // This will redirect to login if no user exists
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
