import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobPostForm from "../../components/forms/JobPostForm";
import { getJob } from "../../api/jobs";
import { employerApi } from "../../api/employers";

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [job, setJob] = useState(null);

    useEffect(() => {
        loadJob();
    }, [id]);

    const loadJob = async () => {
        try {
            const data = await getJob(id);
            // Backend returns { job: ... } or just the job object
            setJob(data.job || data);
        } catch (err) {
            console.error("Error loading job:", err);
            setError("Failed to load job details.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            setError("");

            const jobData = {
                title: formData.title,
                description: formData.description,
                requirements: formData.requirements,
                location: formData.location,
                salary: formData.salary,
                jobType: formData.type.replace("-", "_").toUpperCase(),
                category: formData.category,
                expiresAt: formData.applicationDeadline ? new Date(formData.applicationDeadline) : null,
            };

            await employerApi.updateJob(id, jobData);
            console.log("Job updated successfully");
            navigate("/employer/jobs");
        } catch (err) {
            console.error("Error updating job:", err);
            setError(err.response?.data?.message || err.message || "Failed to update job.");
            setLoading(false); // Only stop loading on error, on success we navigate
        }
    };

    if (loading && !job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-blue-600">Loading job details...</div>
            </div>
        );
    }

    if (error && !job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    // Transform backend data to form format if needed
    // JobPostForm expects: type (lowercase), etc.
    // Backend returns: jobType (UPPERCASE)
    const initialData = {
        ...job,
        type: job.jobType?.toLowerCase().replace("_", "-") || "full-time",
        applicationDeadline: job.expiresAt ? new Date(job.expiresAt).toISOString().split('T')[0] : "",
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Job</h1>
                    <p className="text-gray-600">Update your job posting</p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                <JobPostForm
                    onSubmit={handleSubmit}
                    loading={loading}
                    initialData={initialData}
                />
            </div>
        </div>
    );
};

export default EditJob;
