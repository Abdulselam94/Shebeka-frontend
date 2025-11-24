// src/api/profile.js
const API_BASE_URL = "http://localhost:5000/api";

// Get user profile
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
};

// Update user profile
export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update profile");
  }

  return await response.json();
};

// Upload resume file
export const uploadResume = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch(`${API_BASE_URL}/users/resume`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to upload resume");
  }

  return await response.json();
};

// Skills management
export const addSkill = async (skill) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/users/skills`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ skill }),
  });

  if (!response.ok) {
    throw new Error("Failed to add skill");
  }

  return await response.json();
};

export const removeSkill = async (skill) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/users/skills/${encodeURIComponent(skill)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove skill");
  }

  return await response.json();
};
