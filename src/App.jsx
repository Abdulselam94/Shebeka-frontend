import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import EmployerLayout from "./layouts/EmployerLayout";
import Analytics from "./pages/employer/Analytics";
import Settings from "./pages/employer/Settings";
import ApplicationDetail from "./pages/employer/ApplicationDetail";
import ApplicantLayout from "./layouts/ApplicantLayout";
import MyApplications from "./pages/applicant/MyApplications";
import SavedJobs from "./pages/applicant/SavedJobs";
import ApplicantApplicationDetail from "./pages/applicant/ApplicationDetail";
import ApplicantSettings from "./pages/applicant/Settings";
import Companies from "./pages/Companies";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about" element={<About />} />

        {/* Fallback */}
        <Route
          path="*"
          element={<div className="p-8 text-center">Page Not Found</div>}
        />

        {/* Protected Routes - Generic Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />

        {/* Applicant Routes - Wrapped in Layout */}
        <Route
          path="/applicant"
          element={
            <ApplicantRoute>
              <ApplicantLayout />
            </ApplicantRoute>
          }
        >
          <Route path="dashboard" element={<ApplicantDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="applications/:id" element={<ApplicantApplicationDetail />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="settings" element={<ApplicantSettings />} />
        </Route>

        {/* Employer Routes - Wrapped in Layout */}
        <Route
          path="/employer"
          element={
            <EmployerRoute>
              <EmployerLayout />
            </EmployerRoute>
          }
        >
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="jobs" element={<EmployerJobs />} />
          <Route path="jobs/:id" element={<EmployerJobDetail />} />
          <Route path="jobs/:id/edit" element={<EditJob />} />
          <Route path="applications" element={<EmployerApplications />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<CompanyProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
