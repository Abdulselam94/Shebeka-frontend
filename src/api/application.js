// src/api/applications.js
const API_BASE_URL = "http://localhost:5000/api";

export const applyForJob = async (jobId, applicationData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/applications/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      jobId,
      ...applicationData,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Application failed");
  }

  return await response.json();
};

export const getApplications = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/applications/my-applications`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  return await response.json();
};
