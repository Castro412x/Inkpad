import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-teal-700 text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/notes" className="text-xl font-semibold tracking-tight">
          Inkpad
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/notes" className="hover:text-teal-200 transition-colors duration-150">
            My Notes
          </Link>
          <Link to="/notes/new" className="hover:text-teal-200 transition-colors duration-150">
            New Note
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-teal-700 px-3 py-1.5 rounded-md font-medium hover:bg-teal-100 transition"
          >
            Logout
          </button>
        </div>
        <div className="md:hidden">
          <button className="focus:outline-none focus:ring-2 focus:ring-white rounded" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}