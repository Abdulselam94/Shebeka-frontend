import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileForm from "../../components/forms/ProfileForm";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Mock user profile data - replace with API call
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: "",
    skills: [],
    experience: [],
    education: [],
  });

  // Simulate loading profile data
  useEffect(() => {
    // TODO: Replace with actual API call
    const mockProfileData = {
      fullName: user?.name || "John Doe",
      email: user?.email || "",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      bio: "Experienced software developer with 5+ years in web development. Passionate about creating efficient and scalable applications.",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
      experience: [
        {
          id: 1,
          company: "Tech Solutions Inc",
          position: "Senior Frontend Developer",
          startDate: "2020-03",
          endDate: "2023-12",
          current: false,
          description:
            "Led frontend development for multiple client projects using React and TypeScript.",
        },
      ],
      education: [
        {
          id: 1,
          institution: "University of Technology",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2014-09",
          endDate: "2018-05",
          current: false,
        },
      ],
    };
    setUserProfile(mockProfileData);
  }, [user]);

  const handleSaveProfile = async (formData) => {
    setLoading(true);
    setSaveMessage("");

    try {
      // TODO: Replace with actual API call
      console.log("Saving profile:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUserProfile(formData);
      setSaveMessage("Profile updated successfully!");
    } catch (error) {
      setSaveMessage("Error saving profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const profileCompletion = calculateProfileCompletion(userProfile);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">
                Manage your professional information
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Profile Completion</div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {profileCompletion}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Success Message */}
        {saveMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              saveMessage.includes("successfully")
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {saveMessage}
          </div>
        )}

        <ProfileForm
          userData={userProfile}
          onSubmit={handleSaveProfile}
          loading={loading}
        />
      </div>
    </div>
  );
};

// Helper function to calculate profile completion percentage
function calculateProfileCompletion(profile) {
  let completedFields = 0;
  const totalFields = 7; // Adjust based on what fields you consider important

  if (profile.fullName?.trim()) completedFields++;
  if (profile.email?.trim()) completedFields++;
  if (profile.phone?.trim()) completedFields++;
  if (profile.location?.trim()) completedFields++;
  if (profile.bio?.trim()) completedFields++;
  if (profile.skills?.length > 0) completedFields++;
  if (profile.experience?.length > 0) completedFields++;

  return Math.round((completedFields / totalFields) * 100);
}

export default Profile;
