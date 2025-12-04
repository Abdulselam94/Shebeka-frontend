import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobPostForm from "../../components/forms/JobPostForm";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError("");

    try {
      console.log("Posting job:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get existing jobs from localStorage
      const existingJobs = JSON.parse(
        localStorage.getItem("postedJobs") || "[]"
      );

      // Create new job
      const newJob = {
        id: Date.now(),
        ...formData,
        postedDate: new Date().toISOString(),
        status: "active",
        applications: 0,
      };

      // Save to localStorage
      const updatedJobs = [...existingJobs, newJob];
      localStorage.setItem("postedJobs", JSON.stringify(updatedJobs));

      console.log("Job posted successfully:", newJob);

      // Redirect to jobs list
      navigate("/employer/jobs");
    } catch (err) {
      console.error("Error posting job:", err);
      setError("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-600">
            Fill in the details to list your job opening
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <JobPostForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default PostJob;
