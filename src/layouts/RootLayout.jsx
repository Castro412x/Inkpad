import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export function PrivateLayout() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}

export function PublicLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/notes";
  if (user) return <Navigate to={from} replace />;
  return <Outlet />;
}

export function AuthGate({ children }) {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-2 border-[#0E7C66] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return children;
}