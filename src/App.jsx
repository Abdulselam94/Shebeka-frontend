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
import DashboardRedirect from "./pages/DashboardRedirect";
import EmployerJobs from "./pages/employer/Jobs";
import EmployerApplications from "./pages/employer/Applications";
import EditJob from "./pages/employer/EditJob";
import EmployerJobDetail from "./pages/employer/JobDetail";
import CompanyProfile from "./pages/employer/CompanyProfile";

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
              <DashboardRedirect />
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
            <ApplicantRoute>
              <Profile />
            </ApplicantRoute>
          }
        />

        {/* Employer Routes */}
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
        <Route
          path="/employer/jobs"
          element={
            <EmployerRoute>
              <EmployerJobs />
            </EmployerRoute>
          }
        />
        <Route
          path="/employer/jobs/:id"
          element={
            <EmployerRoute>
              <EmployerJobDetail />
            </EmployerRoute>
          }
        />
        <Route
          path="/employer/jobs/:id/edit"
          element={
            <EmployerRoute>
              <EditJob />
            </EmployerRoute>
          }
        />
        <Route
          path="/employer/applications"
          element={
            <EmployerRoute>
              <EmployerApplications />
            </EmployerRoute>
          }
        />
        <Route
          path="/employer/profile"
          element={
            <EmployerRoute>
              <CompanyProfile />
            </EmployerRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
