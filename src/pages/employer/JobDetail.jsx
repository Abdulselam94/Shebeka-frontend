import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getJob } from "../../api/jobs";
import { employerApi } from "../../api/employers";

const EmployerJobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await getJob(id);
                const jobData = data.job || data;
                setJob(jobData);

                // Optional: Fetch basic stats for this job here if not included in getJob
                // But getJob is public, so it might not include application counts unless we are the owner
                // Actually, for the owner, we might want to fetch application counts separately if not in jobData
            } catch (err) {
                console.error("Error fetching job:", err);
                setError("Failed to load job details.");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        try {
            await employerApi.updateJobStatus(id, newStatus);
            setJob(prev => ({ ...prev, status: newStatus }));
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this job? This cannot be undone.")) {
            try {
                await employerApi.deleteJob(id);
                navigate("/employer/jobs");
            } catch (err) {
                console.error("Error deleting job:", err);
                alert("Failed to delete job");
            }
        }
    }

    if (loading) return <div className="p-8 text-center text-blue-600">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
    if (!job) return <div className="p-8 text-center">Job not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <Link to="/employer/jobs" className="text-gray-500 hover:text-gray-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                        </div>

                        <p className="text-gray-600 ml-8 mt-1">
                            {job.companyName || "Your Company"} • {job.location} • Posted on {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to={`/employer/jobs/${id}/edit`}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 bg-white font-medium"
                        >
                            Edit Job
                        </Link>
                        <Link
                            to={`/employer/applications?search=${encodeURIComponent(job.title)}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                            View Applications
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
                            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                                {job.description}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
                            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                                {job.requirements}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Status</h2>
                            <div className="flex items-center justify-between mb-6">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                                        job.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {job.status}
                                </span>
                                <div className="text-sm text-gray-500">
                                    ID: {job.id}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {job.status === 'OPEN' ? (
                                    <button onClick={() => handleStatusChange("APP_CLOSED")} className="w-full py-2 border border-yellow-500 text-yellow-700 rounded-lg hover:bg-yellow-50 font-medium">
                                        Close Applications
                                    </button>
                                ) : (
                                    <button onClick={() => handleStatusChange("OPEN")} className="w-full py-2 border border-green-500 text-green-700 rounded-lg hover:bg-green-50 font-medium">
                                        Open Applications
                                    </button>
                                )}
                                <button onClick={handleDelete} className="w-full py-2 border border-red-500 text-red-700 rounded-lg hover:bg-red-50 font-medium">
                                    Delete Job
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
                            <ul className="space-y-4 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-gray-500">Job Type</span>
                                    <span className="font-medium text-gray-900">{job.jobType}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-500">Category</span>
                                    <span className="font-medium text-gray-900">{job.category}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-500">Salary</span>
                                    <span className="font-medium text-gray-900">{job.salary || 'Not specified'}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-500">Expires</span>
                                    <span className="font-medium text-gray-900">{job.expiresAt ? new Date(job.expiresAt).toLocaleDateString() : 'No expiry'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerJobDetail;
