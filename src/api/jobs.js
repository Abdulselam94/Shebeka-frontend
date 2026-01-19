import client from "./client";

export const getJobs = async (params = {}) => {
    const response = await client.get("/jobs", { params });
    return response.data;
};

export const getJob = async (id) => {
    const response = await client.get(`/jobs/${id}`);
    return response.data;
};
