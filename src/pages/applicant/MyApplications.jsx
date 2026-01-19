import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getApplications } from "../../api/application";
import toast from "react-hot-toast";

const MyApplications = () => {
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
            const data = await getApplications();
            setApplications(data.applications || []);
        } catch (error) {
            console.error("Error loading applications:", error);
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async (appId) => {
        if (!confirm("Are you sure you want to withdraw this application?")) return;

        try {
            // await withdrawApplication(appId);
            setApplications(applications.map(app =>
                app.id === appId ? { ...app, status: "WITHDRAWN" } : app
            ));
            toast.success("Application withdrawn");
        } catch (error) {
            toast.error("Failed to withdraw application");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-blue-100 text-blue-800";
            case "REVIEWED":
                return "bg-purple-100 text-purple-800";
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
            app.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
            app.job?.company?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Calculate stats
    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === "PENDING").length,
        reviewed: applications.filter(a => a.status === "REVIEWED").length,
        accepted: applications.filter(a => a.status === "ACCEPTED").length,
        rejected: applications.filter(a => a.status === "REJECTED").length,
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-blue-600">Loading applications...</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                <p className="text-gray-600 mt-2">Track and manage your job applications</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <p className="text-sm text-gray-600">Reviewed</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.reviewed}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <p className="text-sm text-gray-600">Accepted</p>
                    <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <p className="text-sm text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
            </div>

            {/* Filters */}
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
                                    ? "border-purple-500 bg-purple-50 text-purple-700"
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
                            placeholder="Search by job title..."
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
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    <Link
                                                        to={`/jobs/${app.job?.id}`}
                                                        className="hover:text-blue-600"
                                                    >
                                                        {app.job?.title || "Job Title"}
                                                    </Link>
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {app.job?.company || "Company Name"} • {app.job?.location || "Location"}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                    app.status
                                                )}`}
                                            >
                                                {app.status}
                                            </span>
                                        </div>

                                        {/* Timeline */}
                                        <div className="mt-4 flex items-center space-x-2 text-xs text-gray-500">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                                                <span>Applied</span>
                                            </div>
                                            {app.status !== "PENDING" && (
                                                <>
                                                    <span>→</span>
                                                    <div className="flex items-center">
                                                        <div className={`w-2 h-2 rounded-full mr-1 ${app.status === "REVIEWED" ? "bg-purple-500" :
                                                                app.status === "ACCEPTED" ? "bg-green-500" :
                                                                    app.status === "REJECTED" ? "bg-red-500" : "bg-gray-500"
                                                            }`}></div>
                                                        <span>{app.status}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {app.status !== "WITHDRAWN" && app.status !== "REJECTED" && (
                                            <button
                                                onClick={() => handleWithdraw(app.id)}
                                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                                            >
                                                Withdraw
                                            </button>
                                        )}
                                        <Link
                                            to={`/applicant/applications/${app.id}`}
                                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            View Details
                                        </Link>
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
                        <p className="mt-2">
                            {filter === "all"
                                ? "You haven't applied to any jobs yet."
                                : `No ${filter.toLowerCase()} applications.`}
                        </p>
                        <Link
                            to="/jobs"
                            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
