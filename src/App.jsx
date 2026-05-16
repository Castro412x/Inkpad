import { useState, useCallback, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateLayout, PublicLayout, AuthGate } from './layouts/RootLayout';
import { ToastContainer } from './components/Toast';
import Login from './pages/login';
import Register from './pages/register';
import DashboardPage from './pages/DashboardPage';
import NotePage from './pages/NotePage';

const ToastContext = createContext(null);
export function useToast() { return useContext(ToastContext); }

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((message, type = 'success', duration = 3500) => {
    setToasts((p) => [...p, { id: Date.now() + Math.random(), message, type, duration }]);
  }, []);
  const remove = useCallback((id) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  const toast = {
    success: (m, d) => add(m, 'success', d),
    error:   (m, d) => add(m, 'error', d),
    info:    (m, d) => add(m, 'info', d),
    warning: (m, d) => add(m, 'warning', d),
  };
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={remove} />
    </ToastContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AuthGate>
            <Routes>
              <Route path="/" element={<Navigate to="/notes" replace />} />
              <Route element={<PublicLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<PrivateLayout />}>
                <Route path="/notes" element={<DashboardPage />} />
                <Route path="/notes/:id" element={<NotePage />} />
              </Route>
              <Route path="*" element={
                <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-slate-500">
                  <span className="text-6xl font-mono text-[#0E7C66]">404</span>
                  <p>Page not found.</p>
                  <a href="/notes" className="text-sm underline underline-offset-4 hover:text-[#0E7C66]">← Back to notes</a>
                </div>
              } />
            </Routes>
          </AuthGate>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}