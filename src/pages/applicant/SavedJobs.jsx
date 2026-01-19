import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadSavedJobs();
    }, []);

    const loadSavedJobs = async () => {
        try {
            setLoading(true);
            // In production: const data = await getSavedJobs();

            // Mock data for now
            setSavedJobs([
                {
                    id: 1,
                    job: {
                        id: 1,
                        title: "Senior Frontend Developer",
                        company: "Tech Corp",
                        location: "Remote",
                        salary: "$120k - $150k",
                        jobType: "FULL_TIME",
                        createdAt: new Date().toISOString(),
                    },
                    savedAt: new Date().toISOString(),
                    notes: "Great company culture",
                },
            ]);
        } catch (error) {
            console.error("Error loading saved jobs:", error);
            toast.error("Failed to load saved jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleUnsave = async (jobId) => {
        try {
            // await unsaveJob(jobId);
            setSavedJobs(savedJobs.filter(saved => saved.job.id !== jobId));
            toast.success("Job removed from saved");
        } catch (error) {
            toast.error("Failed to remove job");
        }
    };

    const filteredJobs = savedJobs.filter((saved) =>
        saved.job.title.toLowerCase().includes(search.toLowerCase()) ||
        saved.job.company.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-blue-600">Loading saved jobs...</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
                <p className="text-gray-600 mt-2">
                    Jobs you've saved for later ({savedJobs.length})
                </p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <input
                    type="text"
                    placeholder="Search saved jobs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Saved Jobs List */}
            <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((saved) => (
                        <div
                            key={saved.id}
                            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                <Link
                                                    to={`/jobs/${saved.job.id}`}
                                                    className="hover:text-blue-600"
                                                >
                                                    {saved.job.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600 mt-1">
                                                {saved.job.company} • {saved.job.location}
                                            </p>
                                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    💼 {saved.job.jobType?.replace("_", " ")}
                                                </span>
                                                {saved.job.salary && (
                                                    <span className="flex items-center">
                                                        💰 {saved.job.salary}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {saved.notes && (
                                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Note:</span> {saved.notes}
                                            </p>
                                        </div>
                                    )}

                                    <p className="text-xs text-gray-500 mt-4">
                                        Saved on {new Date(saved.savedAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <Link
                                        to={`/jobs/${saved.job.id}`}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                                    >
                                        View Job
                                    </Link>
                                    <button
                                        onClick={() => handleUnsave(saved.job.id)}
                                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border p-12 text-center text-gray-500">
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
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                        </svg>
                        <p className="text-lg font-medium">No saved jobs yet</p>
                        <p className="mt-2">
                            {search
                                ? "No jobs match your search."
                                : "Save jobs you're interested in to apply later."}
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

export default SavedJobs;
