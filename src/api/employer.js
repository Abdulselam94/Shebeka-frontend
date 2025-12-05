const API_BASE_URL = "http://localhost:5000/api";

export const employerApi = {
  // Get employer's posted jobs
  getPostedJobs: async () => {
    const token = localStorage.getItem("token");

    // For demo - return mock data
    const mockJobs = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Corp",
        status: "active",
        applications: 47,
        postedDate: "2024-01-15",
        views: 320,
        type: "Full-time",
        location: "Remote",
      },
      {
        id: 2,
        title: "UX Designer",
        company: "Design Co",
        status: "active",
        applications: 23,
        postedDate: "2024-01-10",
        views: 189,
        type: "Full-time",
        location: "New York, NY",
      },
      {
        id: 3,
        title: "Backend Engineer",
        company: "Data Systems",
        status: "draft",
        applications: 0,
        postedDate: "2024-01-18",
        views: 45,
        type: "Contract",
        location: "Remote",
      },
      {
        id: 4,
        title: "Product Manager",
        company: "Startup Inc",
        status: "closed",
        applications: 89,
        postedDate: "2023-12-05",
        views: 520,
        type: "Full-time",
        location: "San Francisco, CA",
      },
    ];

    return { jobs: mockJobs };
  },

  // Get applications for a specific job
  getJobApplications: async (jobId) => {
    const token = localStorage.getItem("token");

    // Mock applications data
    const mockApplications = [
      {
        id: 1,
        applicantName: "John Doe",
        applicantEmail: "john@example.com",
        jobTitle: "Frontend Developer",
        appliedDate: "2024-01-16",
        status: "reviewed",
        resumeUrl: "#",
        experience: "5 years",
        skills: ["React", "JavaScript", "TypeScript"],
      },
      {
        id: 2,
        applicantName: "Jane Smith",
        applicantEmail: "jane@example.com",
        jobTitle: "Frontend Developer",
        appliedDate: "2024-01-17",
        status: "new",
        resumeUrl: "#",
        experience: "3 years",
        skills: ["Vue", "JavaScript", "CSS"],
      },
      {
        id: 3,
        applicantName: "Bob Johnson",
        applicantEmail: "bob@example.com",
        jobTitle: "Frontend Developer",
        appliedDate: "2024-01-15",
        status: "shortlisted",
        resumeUrl: "#",
        experience: "7 years",
        skills: ["React", "Next.js", "Node.js"],
      },
    ];

    return { applications: mockApplications };
  },

  // Update application status
  updateApplicationStatus: async (applicationId, status) => {
    const token = localStorage.getItem("token");

    console.log(`Updating application ${applicationId} to status: ${status}`);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: `Application status updated to ${status}`,
    };
  },

  // Post a new job
  postJob: async (jobData) => {
    const token = localStorage.getItem("token");

    console.log("Posting new job:", jobData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Job posted successfully",
      jobId: Date.now(),
    };
  },

  // Update job status
  updateJobStatus: async (jobId, status) => {
    const token = localStorage.getItem("token");

    console.log(`Updating job ${jobId} status to: ${status}`);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: `Job status updated to ${status}`,
    };
  },

  // Delete a job
  deleteJob: async (jobId) => {
    const token = localStorage.getItem("token");

    console.log(`Deleting job: ${jobId}`);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: "Job deleted successfully",
    };
  },
};
