import client from "./client";

export const employerApi = {
    // Get jobs posted by the logged-in recruiter
    getPostedJobs: async () => {
        const response = await client.get("/jobs/my/jobs"); // Matches backend route /api/jobs/my/jobs
        return response.data;
    },

    // Create a new job
    createJob: async (jobData) => {
        const response = await client.post("/jobs", jobData);
        return response.data;
    },

    // Update an existing job
    updateJob: async (jobId, jobData) => {
        const response = await client.put(`/jobs/${jobId}`, jobData);
        return response.data;
    },

    // Update job status (using the general update endpoint)
    updateJobStatus: async (jobId, status) => {
        const response = await client.put(`/jobs/${jobId}`, { status });
        return response.data;
    },

    // Delete a job
    deleteJob: async (jobId) => {
        const response = await client.delete(`/jobs/${jobId}`);
        return response.data;
    },

    // Get applications for a specific job (Recruiter view)
    getJobApplications: async (jobId) => {
        const response = await client.get(`/applications/job/${jobId}`);
        return response.data;
    },

    // Update application status
    updateApplicationStatus: async (applicationId, status) => {
        const response = await client.put(`/applications/${applicationId}/status`, { status });
        return response.data;
    },

    // Get all applications for current recruiter
    getRecruiterApplications: async () => {
        const response = await client.get("/applications/recruiter/all");
        return response.data;
    },

    // Get recruiting stats
    getStats: async () => {
        const response = await client.get("/applications/stats");
        return response.data;
    }
};
