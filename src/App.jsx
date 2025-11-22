import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ApplicantDashboard from "./pages/applicant/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ApplicantRoute from "./routes/ApplicationRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<div className="p-8">Home Page - Coming Soon</div>}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<div className="p-8 text-center">Page Not Found</div>}
        />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Generic Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ApplicantDashboard /> {/* Use ApplicantDashboard for now */}
            </ProtectedRoute>
          }
        />

        {/* Applicant Routes */}
        <Route
          path="/applicant/dashboard"
          element={
            <ApplicantRoute>
              <ApplicantDashboard />
            </ApplicantRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
