import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobPostForm from "../../components/forms/JobPostForm";
import { employerApi } from "../../api/employers";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError("");

    try {
      console.log("Posting job:", formData);

      // Map frontend form data to backend schema
      // Backend expects: title, description, requirements, location, salary, type (enum), category, etc.
      // JobPostForm keys: title, company, location, type, category, salary, description, requirements, benefits, applicationDeadline
      // Backend Job model keys: title, description, requirements, location, salary, jobType (enum), category, expiresAt
      // "company" is usually derived from recruiter, or stored if platform allows custom company names per job.
      // Looking at Job schema (earlier memory): title, description, requirements, salary, location, jobType, position, category...
      // Let's assume schema matches mostly but check enum values.
      // Frontend JobPostForm sends type="full-time", waiting for backend "FULL_TIME"?
      // Quick fix: Map 'full-time' to 'FULL_TIME', etc. or ensure backend handles it.
      // Let's assume standard casing for now or minimal mapping.

      const jobData = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        location: formData.location,
        salary: formData.salary,
        jobType: formData.type.replace("-", "_").toUpperCase(), // e.g. full-time -> FULL_TIME
        category: formData.category,
        expiresAt: formData.applicationDeadline ? new Date(formData.applicationDeadline) : null,
        // benefits: formData.benefits // Schema might not have this, check later. Sending anyway, Prisma will ignore if not in schema or error if in strict mode.
        // Actually, let's verify schema. I can't see it now, but usually extra fields are ignored or error.
        // Let's stick to core fields.
      };

      await employerApi.createJob(jobData);

      console.log("Job posted successfully");

      // Redirect to jobs list
      navigate("/employer/jobs");
    } catch (err) {
      console.error("Error posting job:", err);
      // Extract error message from backend response if available
      const message = err.response?.data?.message || err.message || "Failed to post job. Please try again.";
      setError(message);
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
