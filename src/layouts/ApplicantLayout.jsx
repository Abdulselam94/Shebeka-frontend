import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ApplicantLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navigation = [
        { name: "Dashboard", path: "/applicant/dashboard", icon: "📊" },
        { name: "Browse Jobs", path: "/jobs", icon: "🔍" },
        { name: "My Applications", path: "/applicant/applications", icon: "📝" },
        { name: "Saved Jobs", path: "/applicant/saved-jobs", icon: "💾" },
        { name: "Profile", path: "/applicant/profile", icon: "👤" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "w-64" : "w-20"
                    } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b">
                    {sidebarOpen && (
                        <Link to="/applicant/dashboard" className="text-xl font-bold text-blue-600">
                            Shebeka
                        </Link>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        {sidebarOpen ? "◀" : "▶"}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {sidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Menu */}
                <div className="border-t p-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                            {user?.name?.[0] || "U"}
                        </div>
                        {sidebarOpen && (
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        )}
                    </div>
                    {sidebarOpen && (
                        <button
                            onClick={handleLogout}
                            className="mt-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-xl">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search jobs by title, company, or keywords..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                        </div>
                    </form>

                    <div className="flex items-center space-x-4 ml-6">
                        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                            🔔
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <Link
                            to="/applicant/profile"
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            My Profile
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ApplicantLayout;
