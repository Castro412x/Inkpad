import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Placeholder components
const NotesList = () => <div className="text-gray-700">My Notes page (coming soon)</div>;
const NoteForm = () => <div className="text-gray-700">Create a new note (coming soon)</div>;
const Login = () => <div className="text-gray-700">Login page (coming soon)</div>;

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/notes" element={<NotesList />} />
            <Route path="/notes/new" element={<NoteForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/notes" replace />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;