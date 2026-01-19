import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getApplications } from "../../api/application";
import toast from "react-hot-toast";

const ApplicationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState(null);

    useEffect(() => {
        loadApplication();
    }, [id]);

    const loadApplication = async () => {
        try {
            setLoading(true);
            const data = await getApplications();
            const app = data.applications?.find(a => a.id === parseInt(id));

            if (!app) {
                toast.error("Application not found");
                navigate("/applicant/applications");
                return;
            }

            setApplication(app);
        } catch (error) {
            console.error("Error loading application:", error);
            toast.error("Failed to load application");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        if (!confirm("Are you sure you want to withdraw this application?")) return;

        try {
            // await withdrawApplication(application.id);
            setApplication({ ...application, status: "WITHDRAWN" });
            toast.success("Application withdrawn");
        } catch (error) {
            toast.error("Failed to withdraw application");
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-blue-600">Loading application...</div>
            </div>
        );
    }

    if (!application) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-600">Application not found</p>
            </div>
        );
    }

    const statusColors = {
        PENDING: "bg-blue-100 text-blue-800",
        REVIEWED: "bg-purple-100 text-purple-800",
        ACCEPTED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
        WITHDRAWN: "bg-gray-100 text-gray-800",
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate("/applicant/applications")}
                    className="text-blue-600 hover:text-blue-700 mb-4"
                >
                    ← Back to Applications
                </button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {application.job?.title || "Job Title"}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {application.job?.company || "Company"} • {application.job?.location || "Location"}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[application.status]}`}>
                        {application.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Application Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Details</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Applied On</p>
                                <p className="text-gray-900">{new Date(application.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Status</p>
                                <p className="text-gray-900">{application.status}</p>
                            </div>
                            {application.updatedAt !== application.createdAt && (
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Last Updated</p>
                                    <p className="text-gray-900">{new Date(application.updatedAt).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cover Letter */}
                    {application.coverLetter && (
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cover Letter</h2>
                            <p className="text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
                        </div>
                    )}

                    {/* Resume */}
                    {application.resume && (
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume</h2>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <span className="text-3xl mr-3">📄</span>
                                    <div>
                                        <p className="font-medium text-gray-900">Resume.pdf</p>
                                        <p className="text-sm text-gray-600">Submitted with application</p>
                                    </div>
                                </div>
                                <a
                                    href={application.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    View Resume
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Actions */}
                    {application.status !== "WITHDRAWN" && application.status !== "REJECTED" && (
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                            <button
                                onClick={handleWithdraw}
                                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Withdraw Application
                            </button>
                        </div>
                    )}

                    {/* Job Details */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Job Details</h3>
                        <Link
                            to={`/jobs/${application.job?.id}`}
                            className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                        >
                            View Job Posting
                        </Link>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
                        <div className="space-y-4">
                            <div className="flex">
                                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-600 rounded-full"></div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                                    <p className="text-xs text-gray-500">{new Date(application.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            {application.status !== "PENDING" && (
                                <div className="flex">
                                    <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${application.status === "REVIEWED" ? "bg-purple-600" :
                                            application.status === "ACCEPTED" ? "bg-green-600" :
                                                application.status === "REJECTED" ? "bg-red-600" : "bg-gray-600"
                                        }`}></div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Status: {application.status}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(application.updatedAt || application.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetail;
