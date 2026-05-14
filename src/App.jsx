import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Loader from "./components/ui/Loader";

function DashboardPage() {
  const [search, setSearch] = React.useState("");

  const notes = [
    {
      id: 1,
      title: "Sprint Planning",
      content:
        "Discussed frontend tasks, API integration, and deployment strategy.",
      tags: ["Work", "Team"],
      pinned: true,
    },

    {
      id: 2,
      title: "React Ideas",
      content:
        "Need to improve reusable components and optimize folder structure.",
      tags: ["React", "Frontend"],
      pinned: false,
    },

    {
      id: 3,
      title: "Meeting Notes",
      content:
        "Prepare presentation slides and complete UI responsiveness testing.",
      tags: ["Project"],
      pinned: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Inkpad
            </h1>

            <p className="text-sm text-slate-500">
              Smart note management
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Input
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72"
            />

            <Button>
              + Add Note
            </Button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-80px)] bg-white border-r border-slate-200 p-6">
          <nav className="space-y-3">
            <Link
              to="/"
              className="block px-4 py-3 rounded-xl bg-primary text-white font-medium"
            >
              All Notes
            </Link>

            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 transition">
              📌 Pinned
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 transition">
              🗂 Archived
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 transition">
              🏷 Tags
            </button>
          </nav>

          <div className="mt-auto pt-6">
            <Button
              variant="outline"
              fullWidth
            >
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Mobile Actions */}
          <div className="md:hidden mb-6 space-y-4">
            <Input
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button fullWidth>
              + Add Note
            </Button>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                My Notes
              </h2>

              <p className="text-slate-500 mt-1">
                Organize your thoughts and ideas
              </p>
            </div>

            <div className="hidden md:block">
              <Button variant="secondary">
                Filter
              </Button>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800">
                    {note.title}
                  </h3>

                  {note.pinned && (
                    <span className="text-primary text-lg">
                      📌
                    </span>
                  )}
                </div>

                <p className="text-slate-600 leading-relaxed line-clamp-3">
                  {note.content}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button className="text-sm text-primary font-medium hover:underline">
                    Read More
                  </button>

                  <div className="flex items-center gap-3">
                    <button className="text-slate-500 hover:text-primary transition">
                      ✏️
                    </button>

                    <button className="text-slate-500 hover:text-red-500 transition">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State Example */}
          {notes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-2xl font-bold text-slate-700">
                No Notes Found
              </h2>

              <p className="text-slate-500 mt-2">
                Create your first note to begin.
              </p>
            </div>
          )}

          {/* Loader Example */}
          <div className="mt-16 flex justify-center">
            <Loader text="Loading more notes..." />
          </div>
        </main>
      </div>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Welcome Back
          </h1>

          <p className="text-slate-500 mt-2">
            Login to continue
          </p>
        </div>

        <form className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button
            fullWidth
            size="lg"
          >
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-primary font-medium ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Start organizing your notes
          </p>
        </div>

        <form className="space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create password"
          />

          <Button
            fullWidth
            size="lg"
          >
            Register
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-primary font-medium ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


