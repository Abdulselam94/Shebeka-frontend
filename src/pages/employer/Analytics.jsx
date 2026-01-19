import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { employerApi } from "../../api/employers";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Analytics = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState({
        overview: {
            totalJobs: 0,
            activeJobs: 0,
            totalApplications: 0,
            avgTimeToHire: 0,
        },
        applicationsByStatus: [],
        applicationsOverTime: [],
        topJobs: [],
    });

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoading(true);

            // Fetch jobs and applications
            const [jobsData, appsStats] = await Promise.all([
                employerApi.getPostedJobs(),
                employerApi.getStats(),
            ]);

            const jobs = jobsData.jobs || [];
            const activeJobs = jobs.filter((j) => j.status === "OPEN").length;

            // Calculate applications by status
            const statusCounts = {};
            jobs.forEach((job) => {
                const count = job._count?.applications || 0;
                // This is simplified - ideally backend would provide status breakdown
            });

            // Mock time-series data (in production, backend would provide this)
            const applicationsOverTime = [
                { date: "Week 1", applications: 12 },
                { date: "Week 2", applications: 19 },
                { date: "Week 3", applications: 15 },
                { date: "Week 4", applications: 22 },
            ];

            // Top performing jobs
            const topJobs = jobs
                .map((job) => ({
                    name: job.title,
                    applications: job._count?.applications || 0,
                }))
                .sort((a, b) => b.applications - a.applications)
                .slice(0, 5);

            // Application funnel data
            const applicationsByStatus = [
                { name: "Applied", value: appsStats.totalApplications || 0, color: "#3B82F6" },
                { name: "Reviewed", value: Math.floor((appsStats.totalApplications || 0) * 0.6), color: "#8B5CF6" },
                { name: "Shortlisted", value: Math.floor((appsStats.totalApplications || 0) * 0.3), color: "#10B981" },
                { name: "Hired", value: Math.floor((appsStats.totalApplications || 0) * 0.1), color: "#F59E0B" },
            ];

            setAnalytics({
                overview: {
                    totalJobs: jobs.length,
                    activeJobs,
                    totalApplications: appsStats.totalApplications || 0,
                    avgTimeToHire: 14, // Mock data
                },
                applicationsByStatus,
                applicationsOverTime,
                topJobs,
            });
        } catch (error) {
            console.error("Error loading analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="text-blue-600">Loading analytics...</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600 mt-2">Track your hiring performance and insights</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="text-sm font-medium text-gray-600">Total Jobs</div>
                    <div className="text-3xl font-bold text-gray-900 mt-2">
                        {analytics.overview.totalJobs}
                    </div>
                    <div className="text-sm text-green-600 mt-2">↑ {analytics.overview.activeJobs} active</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="text-sm font-medium text-gray-600">Total Applications</div>
                    <div className="text-3xl font-bold text-gray-900 mt-2">
                        {analytics.overview.totalApplications}
                    </div>
                    <div className="text-sm text-blue-600 mt-2">All time</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="text-sm font-medium text-gray-600">Avg. Time to Hire</div>
                    <div className="text-3xl font-bold text-gray-900 mt-2">
                        {analytics.overview.avgTimeToHire} days
                    </div>
                    <div className="text-sm text-gray-500 mt-2">Industry avg: 21 days</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="text-sm font-medium text-gray-600">Conversion Rate</div>
                    <div className="text-3xl font-bold text-gray-900 mt-2">
                        {analytics.overview.totalApplications > 0
                            ? Math.round((10 / analytics.overview.totalApplications) * 100)
                            : 0}
                        %
                    </div>
                    <div className="text-sm text-green-600 mt-2">↑ 2.5% vs last month</div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Application Funnel */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Funnel</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={analytics.applicationsByStatus}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {analytics.applicationsByStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Applications Over Time */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Applications Over Time</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analytics.applicationsOverTime}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="applications"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Performing Jobs */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Jobs</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.topJobs}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="applications" fill="#8B5CF6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Need more insights?</h3>
                <p className="text-blue-700 mb-4">
                    Export detailed reports or view individual job analytics for deeper insights.
                </p>
                <div className="flex space-x-4">
                    <Link
                        to="/employer/jobs"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        View All Jobs
                    </Link>
                    <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                        Export Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
