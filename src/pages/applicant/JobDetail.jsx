import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

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

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // TODO: Add API call to save/unsave job
  };

  const handleApply = () => {
    setHasApplied(true);
    // TODO: Add API call to apply for job
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
                disabled={hasApplied}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  hasApplied
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {hasApplied ? "Applied ✓" : "Apply Now"}
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
                  <div
                    key={similarJob.id}
                    className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
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
                  </div>
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
