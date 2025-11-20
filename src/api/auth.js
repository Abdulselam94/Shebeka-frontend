// api/auth.js
const API_BASE_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  return data; // Should return { token: 'jwt-token-here' }
};

export const register = async (userData) => {
  console.log("Sending registration request:", userData);

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  console.log("Registration response status:", response.status);

  const data = await response.json();
  console.log("Registration response data:", data);

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  // 👇 FIX: Accept your backend's response format
  if (data.message && data.user) {
    // Your backend returns: {message: 'User registered successfully', user: {...}}
    console.log("✅ Registration successful - user created");
    return data; // Return the data as-is
  } else if (data.token) {
    // Alternative format: { token: "...", user: {...} }
    return data;
  } else if (data.data && data.data.token) {
    // Another alternative format
    return data.data;
  } else {
    throw new Error("Invalid response format from server");
  }
};
