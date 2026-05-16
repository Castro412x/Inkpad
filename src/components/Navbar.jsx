import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };
  return (
    <nav className="bg-[#0E7C66] text-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/notes" className="font-semibold tracking-tight">Inkpad</Link>
        <div className="flex items-center gap-5">
          <Link to="/notes" className="text-sm text-teal-100 hover:text-white transition">Notes</Link>
          <Link to="/notes/new" className="text-sm text-teal-100 hover:text-white transition">+ New</Link>
          <button onClick={handleLogout} className="text-sm bg-white text-[#0E7C66] px-3 py-1.5 rounded-md font-medium hover:bg-teal-50 transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}