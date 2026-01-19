import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { applyForJob, getApplications } from "../../api/application";
import { getJob } from "../../api/jobs";
import { getProfile } from "../../api/profile";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch job details
        const jobData = await getJob(id);
        setJob(jobData.job);

        // Fetch user profile and applications to check status
        if (user) {
          const profileData = await getProfile();
          // Profile API returns { message, user: { ... } }
          setUserProfile(profileData.user || profileData);

          const applicationsData = await getApplications();
          // Applications API returns { message, applications: [...] }
          const myApps = applicationsData.applications || [];

          const hasAppliedParams = myApps.some(
            (app) => app.jobId === parseInt(id)
          );
          setHasApplied(hasAppliedParams);
        }
      } catch (err) {
        console.error("Error loading job details:", err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // TODO: Add API call to save/unsave job
  };

  const handleApply = async () => {
    setApplying(true);
    setApplyError("");

    try {
      // Check if user has required profile info
      if (!userProfile) {
        setApplyError("Please log in to apply.");
        setApplying(false);
        return;
      }

      // Check resume - backend calls it 'resume'
      if (!userProfile.resume) {
        setApplyError("Please upload your resume in your profile before applying");
        setApplying(false);
        return;
      }

      // Prepare application data - Backend only expects coverLetter and optional resume
      // Since the user already has a resume on profile, backend uses it by default if we don't send one.
      const applicationData = {
        coverLetter: `I am executing to apply for the ${job.title} position at ${job.title // job.company is not top level in schema, it's job.recruiter (user) or just omitted. 
          // Wait, backend Job schema doesn't have 'company'. It has 'recruiter' (User). 
          // Recruitment platforms usually have a Company profile, but here it seems simple.
          // Let's just say "your company" or use recruiter name if available.
          } `,
      };

      // Submit application
      const result = await applyForJob(job.id, applicationData);

      // Update local state
      setHasApplied(true);

      // Show success message
      console.log("Application submitted:", result);
    } catch (error) {
      console.error("Application error:", error);
      setApplyError(
        error.message || "Failed to submit application. Please try again."
      );
    } finally {
      setApplying(false);
    }
  };

  // Helper to display requirements
  const renderRequirements = (reqs) => {
    if (!reqs) return <p className="text-gray-500">No specific requirements listed.</p>;
    // If it's a string, we can split by newlines or just show it
    if (typeof reqs === 'string') {
      return (
        <ul className="space-y-2">
          {reqs.split('\n').map((line, i) => (
            line.trim() && (
              <li key={i} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{line}</span>
              </li>
            )
          ))}
        </ul>
      );
    }
    return <p>{reqs}</p>;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error || !job) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl font-bold text-gray-800">Job Not Found</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link to="/jobs" className="text-blue-600 hover:underline">Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Apply Error */}
          {applyError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {applyError}
                {applyError.includes("upload your resume") && (
                  <Link
                    to="/applicant/profile"
                    className="ml-2 text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Upload Resume
                  </Link>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Link to="/jobs" className="hover:text-blue-600">
              All Jobs
            </Link>
            <span>›</span>
            <span>Job Details</span>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <p className="text-lg text-gray-600">{job.recruiter?.name || "Company Confidential"}</p>
                <span className="text-gray-400">•</span>
                <p className="text-gray-600">{job.location}</p>
                <span className="text-gray-400">•</span>
                <p className="text-gray-600">{job.jobType}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSaveJob}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${isSaved
                    ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isSaved ? "currentColor" : "none"}
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
                <span>{isSaved ? "Saved" : "Save Job"}</span>
              </button>

              <button
                onClick={handleApply}
                disabled={hasApplied || applying}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${hasApplied
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : applying
                      ? "bg-blue-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                {applying ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Applying...
                  </div>
                ) : hasApplied ? (
                  "Applied ✓"
                ) : (
                  "Apply Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Requirements
              </h2>
              {renderRequirements(job.requirements)}
            </div>

            {/* Benefits - (If available in API, otherwise standard text) */}
            {/*  <div className="bg-white rounded-lg shadow-sm border p-6"> ... </div> */}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Application Requirements */}
            {!hasApplied && (
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Application Requirements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      className={`w-5 h-5 mr-2 ${userProfile?.name // Backend User model has 'name'
                          ? "text-green-500"
                          : "text-gray-400"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={
                        userProfile?.name
                          ? "text-gray-700"
                          : "text-gray-500"
                      }
                    >
                      Complete Profile
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className={`w-5 h-5 mr-2 ${userProfile?.resume // Backend User model has 'resume'
                          ? "text-green-500"
                          : "text-gray-400"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={
                        userProfile?.resume
                          ? "text-gray-700"
                          : "text-gray-500"
                      }
                    >
                      Upload Resume
                    </span>
                  </div>
                  {(!userProfile?.name || !userProfile?.resume) && (
                    <Link
                      to="/applicant/profile"
                      className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Complete Requirements
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Job Details Sidebar */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Job Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary:</span>
                  <span className="text-gray-900 font-medium">
                    {job.salary || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <span className="text-gray-900">{job.jobType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-gray-900">{job.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                {job.expiresAt && <div className="flex justify-between">
                  <span className="text-gray-600">Expires:</span>
                  <span className="text-gray-900">{new Date(job.expiresAt).toLocaleDateString()}</span>
                </div>}

              </div>
            </div>

            {/* Similar Jobs - OMITTED FOR NOW AS WE DONT HAVE API FOR IT YET */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
