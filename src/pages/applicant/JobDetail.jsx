import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { applyForJob } from "../../api/applications";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  // Mock data - replace with API call using the id
  const job = {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    type: "Full-time",
    category: "Engineering",
    salary: "$80,000 - $120,000",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing design systems.",
    fullDescription: `
      <p>Tech Corp is seeking a talented Frontend Developer to join our growing team. In this role, you'll work on building responsive, accessible, and performant user interfaces for our web applications.</p>
      
      <h3>Responsibilities:</h3>
      <ul>
        <li>Develop and maintain high-quality web applications using React.js</li>
        <li>Collaborate with designers to implement pixel-perfect UI designs</li>
        <li>Write clean, maintainable, and well-documented code</li>
        <li>Participate in code reviews and team meetings</li>
        <li>Optimize applications for maximum speed and scalability</li>
        <li>Stay up-to-date with emerging frontend technologies</li>
      </ul>

      <h3>Requirements:</h3>
      <ul>
        <li>3+ years of experience in frontend development</li>
        <li>Proficiency in React.js, JavaScript, HTML5, and CSS3</li>
        <li>Experience with state management libraries (Redux, Context API)</li>
        <li>Familiarity with modern frontend build tools and pipelines</li>
        <li>Knowledge of responsive design principles</li>
        <li>Experience with version control (Git)</li>
      </ul>

      <h3>Nice to Have:</h3>
      <ul>
        <li>Experience with TypeScript</li>
        <li>Knowledge of testing frameworks (Jest, React Testing Library)</li>
        <li>Familiarity with backend technologies (Node.js, Express)</li>
        <li>Experience with cloud platforms (AWS, Azure, GCP)</li>
      </ul>
    `,
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of professional frontend development experience",
      "Strong proficiency in JavaScript and React.js",
      "Experience with responsive web design",
      "Excellent problem-solving skills",
    ],
    benefits: [
      "Health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "401(k) with company matching",
      "Unlimited paid time off",
      "Stock options",
    ],
    companyInfo: {
      name: "Tech Corp",
      description:
        "Tech Corp is a leading technology company focused on building innovative solutions that transform industries. We believe in creating products that make a difference in people's lives.",
      size: "201-500 employees",
      industry: "Technology",
      website: "https://techcorp.example.com",
      founded: "2015",
    },
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    applicants: 47,
  };

  // Load user profile and check application status
  useEffect(() => {
    // Load user profile from localStorage (replace with API call)
    const profile = JSON.parse(localStorage.getItem("userProfile") || "null");
    setUserProfile(profile);

    // Check if user has already applied
    const userApplications = JSON.parse(
      localStorage.getItem("userApplications") || "[]"
    );
    const hasAppliedToJob = userApplications.some(
      (app) => app.jobId === parseInt(id)
    );
    setHasApplied(hasAppliedToJob);
  }, [id]);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // TODO: Add API call to save/unsave job
  };

  const handleApply = async () => {
    setApplying(true);
    setApplyError("");

    try {
      // Check if user has completed profile
      if (!userProfile || !userProfile.fullName || !userProfile.email) {
        setApplyError("Please complete your profile before applying");
        setApplying(false);
        return;
      }

      // Check if resume is uploaded
      if (!userProfile.resumeUrl) {
        setApplyError("Please upload your resume before applying");
        setApplying(false);
        return;
      }

      // Prepare application data
      const applicationData = {
        applicantName: userProfile.fullName,
        applicantEmail: userProfile.email,
        applicantPhone: userProfile.phone || "",
        coverLetter: `I am excited to apply for the ${job.title} position at ${
          job.company
        }. With my skills in ${
          userProfile.skills?.join(", ") || "web development"
        }, I believe I would be a great fit for this role.`,
        resumeUrl: userProfile.resumeUrl,
        skills: userProfile.skills || [],
      };

      // Submit application
      const result = await applyForJob(job.id, applicationData);

      // Update local state
      setHasApplied(true);

      // Store in localStorage for demo
      const userApplications = JSON.parse(
        localStorage.getItem("userApplications") || "[]"
      );
      userApplications.push({
        id: Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        appliedDate: new Date().toISOString(),
        status: "applied",
      });
      localStorage.setItem(
        "userApplications",
        JSON.stringify(userApplications)
      );

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

  const similarJobs = [
    {
      id: 2,
      title: "React Developer",
      company: "Web Solutions",
      location: "Remote",
      type: "Full-time",
      salary: "$85,000 - $125,000",
    },
    {
      id: 3,
      title: "UI Developer",
      company: "Design Tech",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $130,000",
    },
    {
      id: 4,
      title: "Frontend Engineer",
      company: "Startup Labs",
      location: "Remote",
      type: "Contract",
      salary: "$75,000 - $110,000",
    },
  ];

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
                {applyError.includes("complete your profile") && (
                  <Link
                    to="/applicant/profile"
                    className="ml-2 text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Complete Profile
                  </Link>
                )}
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
                <p className="text-lg text-gray-600">{job.company}</p>
                <span className="text-gray-400">•</span>
                <p className="text-gray-600">{job.location}</p>
                <span className="text-gray-400">•</span>
                <p className="text-gray-600">{job.type}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSaveJob}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                  isSaved
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
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  hasApplied
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
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: job.fullDescription }}
              />
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
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
                      className={`w-5 h-5 mr-2 ${
                        userProfile?.fullName
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
                        userProfile?.fullName
                          ? "text-gray-700"
                          : "text-gray-500"
                      }
                    >
                      Complete Profile
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className={`w-5 h-5 mr-2 ${
                        userProfile?.resumeUrl
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
                        userProfile?.resumeUrl
                          ? "text-gray-700"
                          : "text-gray-500"
                      }
                    >
                      Upload Resume
                    </span>
                  </div>
                  {(!userProfile?.fullName || !userProfile?.resumeUrl) && (
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

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About {job.companyInfo.name}
              </h3>
              <p className="text-gray-700 mb-4">
                {job.companyInfo.description}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Size:</span>
                  <span className="text-gray-900">{job.companyInfo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="text-gray-900">
                    {job.companyInfo.industry}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded:</span>
                  <span className="text-gray-900">
                    {job.companyInfo.founded}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Website:</span>
                  <a
                    href={job.companyInfo.website}
                    className="text-blue-600 hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Job Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary:</span>
                  <span className="text-gray-900 font-medium">
                    {job.salary}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <span className="text-gray-900">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-gray-900">{job.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="text-gray-900">{job.postedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Application Deadline:</span>
                  <span className="text-gray-900">
                    {job.applicationDeadline}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applicants:</span>
                  <span className="text-gray-900">
                    {job.applicants} applicants
                  </span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Similar Jobs
              </h3>
              <div className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <Link
                    key={similarJob.id}
                    to={`/jobs/${similarJob.id}`}
                    className="block border rounded-lg p-4 hover:border-blue-300 transition-colors hover:bg-blue-50"
                  >
                    <h4 className="font-semibold text-gray-900 hover:text-blue-600">
                      {similarJob.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {similarJob.company}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-500 text-sm">
                        {similarJob.location}
                      </span>
                      <span className="text-blue-600 text-sm font-medium">
                        {similarJob.salary}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
