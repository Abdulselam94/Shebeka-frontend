// src/components/ProfilePage.jsx
import { useState, useEffect } from "react";
import ProfileForm from "../../components/forms/ProfileForm";
import { useNavigate } from "react-router-dom"; // If using React Router

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const navigate = useNavigate(); // For redirecting to login

  const token = localStorage.getItem("token"); // <-- add this

  // Check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    setDebugInfo(
      `Auth Status:\n- Token: ${token ? "Exists" : "Missing"}\n- User: ${
        user || "Not found"
      }`
    );

    if (!token) {
      setSaveMessage("Please log in to access your profile");
      // Optional: Redirect to login page after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
      return false;
    }
    return true;
  };

  const fetchUserProfile = async () => {
    // Check auth first
    if (!checkAuth()) return;

    try {
      const token = localStorage.getItem("token");
      console.log("🔄 Fetching user profile with token...");

      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (response.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      console.log("✅ Profile data received:", data);
      setUserData(data);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);

      if (error.message.includes("Authentication failed")) {
        // Clear invalid token and redirect to login
        localStorage.removeItem("token");
        setSaveMessage("Session expired. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setSaveMessage(`Error: ${error.message}`);
        // Fallback to empty data for form
        setUserData({
          fullName: "",
          email: "",
          phone: "",
          location: "",
          bio: "",
          skills: [],
          experience: [],
          education: [],
          resumeUrl: null,
          resumeName: null,
        });
      }
    }
  };

  const handleProfileSubmit = async (formData) => {
    if (!checkAuth()) return;

    setLoading(true);
    setSaveMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio,
          experience: formData.experience,
          education: formData.education,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      console.log("✅ Profile saved successfully:", data);
      setSaveMessage("Profile saved successfully!");

      await fetchUserProfile();
    } catch (error) {
      console.error("❌ Error saving profile:", error);
      setSaveMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  // Test authentication
  const testAuth = async () => {
    setDebugInfo("Testing authentication...\n");

    const token = localStorage.getItem("token");
    setDebugInfo((prev) => prev + `Token: ${token ? "Exists" : "Missing"}\n`);

    if (!token) {
      setDebugInfo((prev) => prev + "❌ No token found. Please log in.\n");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setDebugInfo((prev) => prev + `Status: ${response.status}\n`);
      setDebugInfo(
        (prev) => prev + `Response: ${JSON.stringify(data, null, 2)}\n`
      );
    } catch (error) {
      setDebugInfo((prev) => prev + `Error: ${error.message}\n`);
    }
  };

  useEffect(() => {
    // Check auth when component loads
    if (checkAuth()) {
      fetchUserProfile();
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">
          {saveMessage.includes("log in")
            ? saveMessage
            : "Loading your profile..."}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Your Profile</h1>

        {/* Debug buttons */}
        <div className="mt-4 space-x-2">
          <button
            onClick={testAuth}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Test Authentication
          </button>
          <button
            onClick={fetchUserProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Fetch Profile
          </button>
          <button
            onClick={checkAuth}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Check Auth Status
          </button>
        </div>

        {saveMessage && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              saveMessage.includes("Error") || saveMessage.includes("log in")
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {saveMessage}
          </div>
        )}

        {/* Debug info */}
        {debugInfo && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Information:</h3>
            <pre className="text-sm whitespace-pre-wrap bg-white p-3 rounded border">
              {debugInfo}
            </pre>
          </div>
        )}
      </div>

      <ProfileForm
        userData={userData}
        onSubmit={handleProfileSubmit}
        loading={loading}
        token={token}
      />
    </div>
  );
};

export default Profile;
