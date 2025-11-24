// src/components/ProfilePage.jsx
import { useState, useEffect } from "react";
import ProfileForm from "../../components/forms/ProfileForm";
import { getProfile, updateProfile } from "../api/profile";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  const fetchUserProfile = async () => {
    try {
      console.log("🔄 Fetching user profile...");
      const profileData = await getProfile();
      console.log("✅ Profile data received:", profileData);
      setUserData(profileData);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      // Fallback to empty data structure
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
  };

  const handleProfileSubmit = async (formData) => {
    setLoading(true);
    setSaveMessage("");

    try {
      console.log("📤 Sending profile data...", formData);

      // Prepare the data for the backend
      const profileData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        experience: formData.experience,
        education: formData.education,
      };

      const result = await updateProfile(profileData);
      console.log("✅ Profile saved successfully:", result);
      setSaveMessage("Profile saved successfully!");

      // Refresh the profile data
      await fetchUserProfile();
    } catch (error) {
      console.error("❌ Error saving profile:", error);
      setSaveMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);

      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  // Test backend connection
  const testBackendConnection = async () => {
    try {
      console.log("🔍 Testing backend connection...");
      await getProfile();
      console.log("✅ Backend connection successful!");
      alert("Backend connection successful!");
    } catch (error) {
      console.error("❌ Backend connection failed:", error);
      alert(`Backend connection failed: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Your Profile</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update your professional information
        </p>

        {/* Debug button */}
        <div className="mt-4">
          <button
            onClick={testBackendConnection}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Test Backend Connection
          </button>
        </div>

        {saveMessage && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              saveMessage.includes("Error")
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {saveMessage}
          </div>
        )}
      </div>

      <ProfileForm
        userData={userData}
        onSubmit={handleProfileSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Profile;
