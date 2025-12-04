import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ApplicantDashboard from "./pages/applicant/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ApplicantRoute from "./routes/ApplicationRoute";
import JobList from "./pages/applicant/JobList";
import JobDetail from "./pages/applicant/JobDetail";
import Profile from "./pages/applicant/Profile";
import Home from "./pages/Home";
import EmployerDashboard from "./pages/employer/Dashboard";
import EmployerRoute from "./routes/EmployerRoute";
import PostJob from "./pages/employer/PostJob";
im;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

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
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetail />
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
        <Route
          path="/applicant/profile"
          element={
            // Add this route
            <ApplicantRoute>
              <Profile />
            </ApplicantRoute>
          }
        />
        <Route
          path="/employer/dashboard"
          element={
            <EmployerRoute>
              <EmployerDashboard />
            </EmployerRoute>
          }
        />
        <Route
          path="/employer/post-job"
          element={
            <EmployerRoute>
              <PostJob />
            </EmployerRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
