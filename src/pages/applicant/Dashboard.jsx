// src/pages/applicant/Dashboard.jsx
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ApplicantDashboard = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const stats = {
    appliedJobs: 3,
    savedJobs: 5,
    profileViews: 12,
    interviews: 1,
  };

  const recentApplications = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      status: "Under Review",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Co",
      status: "Applied",
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Startup Inc",
      status: "Rejected",
      date: "2024-01-10",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || user?.email}!
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/applicant/profile"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Complete Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Applied Jobs
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.appliedJobs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Saved Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.savedJobs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Profile Views
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.profileViews}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.interviews}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Applications
              </h2>
              <Link
                to="/applicant/applications"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {application.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {application.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        application.status === "Under Review"
                          ? "bg-blue-100 text-blue-800"
                          : application.status === "Applied"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {application.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/jobs"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <svg
                  className="w-8 h-8 text-gray-400 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-900">Browse Jobs</p>
              </Link>

              <Link
                to="/applicant/profile"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <svg
                  className="w-8 h-8 text-gray-400 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-900">
                  Update Profile
                </p>
              </Link>

              <Link
                to="/applicant/resume"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition-colors"
              >
                <svg
                  className="w-8 h-8 text-gray-400 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-900">
                  Upload Resume
                </p>
              </Link>

              <Link
                to="/applicant/saved-jobs"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-orange-500 hover:bg-orange-50 transition-colors"
              >
                <svg
                  className="w-8 h-8 text-gray-400 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-900">Saved Jobs</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicantDashboard;
