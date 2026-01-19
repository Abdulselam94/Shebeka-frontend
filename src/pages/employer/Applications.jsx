import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { employerApi } from "../../api/employers";

const EmployerApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            setLoading(true);
            const data = await employerApi.getRecruiterApplications();
            setApplications(data.applications || []);
        } catch (error) {
            console.error("Error loading applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            await employerApi.updateApplicationStatus(appId, newStatus);
            // Update local state
            setApplications(
                applications.map((app) =>
                    app.id === appId ? { ...app, status: newStatus } : app
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-blue-100 text-blue-800";
            case "REVIEWED":
                return "bg-yellow-100 text-yellow-800";
            case "ACCEPTED":
                return "bg-green-100 text-green-800";
            case "REJECTED":
                return "bg-red-100 text-red-800";
            case "WITHDRAWN":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredApplications = applications.filter((app) => {
        const matchesFilter = filter === "all" || app.status === filter;
        const matchesSearch =
            app.applier.name.toLowerCase().includes(search.toLowerCase()) ||
            app.job.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading applications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
                    <p className="text-gray-600">Review and manage candidate applications</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${filter === "all"
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter("PENDING")}
                                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${filter === "PENDING"
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilter("REVIEWED")}
                                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${filter === "REVIEWED"
                                        ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Reviewed
                            </button>
                            <button
                                onClick={() => setFilter("ACCEPTED")}
                                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${filter === "ACCEPTED"
                                        ? "border-green-500 bg-green-50 text-green-700"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Accepted
                            </button>
                            <button
                                onClick={() => setFilter("REJECTED")}
                                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${filter === "REJECTED"
                                        ? "border-red-500 bg-red-50 text-red-700"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Rejected
                            </button>
                        </div>

                        <div className="w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search applicant or job..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    {filteredApplications.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {filteredApplications.map((app) => (
                                <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl overflow-hidden">
                                                {app.applier.avatar ? (
                                                    <img src={app.applier.avatar} alt={app.applier.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    app.applier.name.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {app.applier.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Applied for <span className="font-medium text-blue-600">{app.job.title}</span>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(app.createdAt).toLocaleDateString()}
                                                </p>
                                                {app.applier.skills && app.applier.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {app.applier.skills.slice(0, 3).map((skill, i) => ( // Show first 3 skills
                                                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {app.applier.skills.length > 3 && <span className="text-xs text-gray-500">+{app.applier.skills.length - 3} more</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                    app.status
                                                )}`}
                                            >
                                                {app.status}
                                            </span>

                                            <div className="flex space-x-2">
                                                {/* Quick actions for stats */}
                                                {app.status === 'PENDING' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'REVIEWED')}
                                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        Mark Reviewed
                                                    </button>
                                                )}
                                                {app.status === 'REVIEWED' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                                                            className="text-sm text-green-600 hover:text-green-800 font-medium"
                                                        >
                                                            Shortlist
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                                                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}

                                                <Link
                                                    to={`/employer/applications/${app.id}`}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            <svg
                                className="w-12 h-12 mx-auto mb-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <p className="text-lg font-medium">No applications found</p>
                            <p className="mt-2">Try adjusting your filters or search query.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployerApplications;
